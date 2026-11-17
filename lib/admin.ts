import { API_BASE_URL, reportSignedOut } from './auth';
import { SignedOutError } from './matches';

// US9 / US10 / UC5: admin console API. Every endpoint requires an Admin session.

export interface AdminPublisher { _id: string; email: string; realName?: string; companyName?: string; status: 'Active' | 'Disabled'; role: string }

export interface AdminPost {
  _id: string;
  title: string;
  agency?: string;
  externalId?: string;
  budget?: number;
  budgetMin?: number | null;
  deadline?: string;
  procurementStatus?: string;
  contact?: { name?: string; email?: string; phone?: string };
  publisherId?: AdminPublisher | null;
  createdAt?: string;
  open: boolean;
  openReports: number;
}

export type PostReportReason = 'spam' | 'fraud' | 'not-it' | 'offensive' | 'other';
export type ReportStatus = 'open' | 'resolved' | 'dismissed';

export interface PostReportItem {
  _id: string;
  projectId: (Omit<AdminPost, 'open' | 'openReports'>) | null;
  projectTitle: string;
  userId: { _id: string; email: string; realName?: string } | null;
  reason: PostReportReason;
  note: string;
  status: ReportStatus;
  outcome: '' | 'removed';
  updatedAt: string;
}

export interface ClassificationReportItem {
  _id: string;
  projectId: { _id: string; title: string; agency?: string; source?: string; externalId?: string; classification?: string } | null;
  userId: { _id: string; email: string; realName?: string } | null;
  reason: 'not-it' | 'wrong-category' | 'other';
  note: string;
  status: ReportStatus;
  updatedAt: string;
}

export interface AdminUser { _id: string; email: string; realName?: string; username?: string; companyName?: string; role: 'Vendor' | 'JobLister' | 'Admin'; status: 'Active' | 'Disabled'; createdAt?: string }

export interface ModerationLogItem {
  _id: string;
  adminId: { email?: string; username?: string } | null;
  targetUserId: { _id: string; email?: string } | null;
  reason: string;
  projectTitle?: string;
  publisherEmail?: string;
  accountDisabled?: boolean;
  otherPostingsClosed?: number;
  createdAt: string;
}

export interface Paged<T> { items: T[]; total: number; page: number; limit: number }

export interface RemovalResult { message: string; accountDisabled: boolean; otherPostingsClosed: number; reportsResolved: number }

// The admin API answers 401 when the session ended and 403 when the account is not an admin.
export class ForbiddenError extends Error {}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...init,
    headers: init.body === undefined ? init.headers : { 'Content-Type': 'application/json', ...init.headers },
  });
  if (response.status === 401) { reportSignedOut(); throw new SignedOutError(); }
  const data = await response.json().catch(() => null);
  if (response.status === 403) throw new ForbiddenError(data?.message || 'Admin access required');
  if (!response.ok) throw new Error(data?.message || data?.error || `Request failed (${response.status})`);
  return data as T;
}

const query = (params: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) if (value !== undefined && value !== '') search.set(key, String(value));
  return search.toString();
};

export async function getPostReports(status: ReportStatus | 'all', page: number, signal?: AbortSignal): Promise<Paged<PostReportItem>> {
  const data = await request<{ reports: PostReportItem[]; total: number; page: number; limit: number }>(`/api/admin/post-reports?${query({ status, page })}`, { signal });
  return { items: data.reports, total: data.total, page: data.page, limit: data.limit };
}

export function reviewPostReport(id: string, status: ReportStatus) {
  return request(`/api/admin/post-reports/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify({ status }) });
}

export async function getAdminPosts(status: 'open' | 'closed' | 'all', search: string, page: number, signal?: AbortSignal): Promise<Paged<AdminPost>> {
  const data = await request<{ posts: AdminPost[]; total: number; page: number; limit: number }>(`/api/admin/posts?${query({ status, search, page })}`, { signal });
  return { items: data.posts, total: data.total, page: data.page, limit: data.limit };
}

// FR-14: removes the posting and disables the publisher's account in one admin action.
export function removePost(id: string, reason: string) {
  return request<RemovalResult>(`/api/admin/posts/${encodeURIComponent(id)}`, { method: 'DELETE', body: JSON.stringify({ reason }) });
}

export async function getClassificationReports(status: ReportStatus | 'all', page: number, signal?: AbortSignal): Promise<Paged<ClassificationReportItem>> {
  const data = await request<{ reports: ClassificationReportItem[]; total: number; page: number; limit: number }>(`/api/admin/classification-reports?${query({ status, page })}`, { signal });
  return { items: data.reports, total: data.total, page: data.page, limit: data.limit };
}

export function reviewClassificationReport(id: string, status: ReportStatus, markNonSoftware = false) {
  return request(`/api/admin/classification-reports/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify({ status, markNonSoftware }) });
}

export async function getUsers(filters: { search?: string; role?: string; status?: string }, page: number, signal?: AbortSignal): Promise<Paged<AdminUser>> {
  const data = await request<{ users: AdminUser[]; total: number; page: number; limit: number }>(`/api/users?${query({ ...filters, page, limit: 20 })}`, { signal });
  return { items: data.users, total: data.total, page: data.page, limit: data.limit };
}

export function setUserStatus(id: string, status: 'Active' | 'Disabled') {
  return request(`/api/admin/users/${encodeURIComponent(id)}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
}

export async function getModerationLogs(page: number, signal?: AbortSignal): Promise<Paged<ModerationLogItem>> {
  const data = await request<{ logs: ModerationLogItem[]; total: number }>(`/api/admin/moderation-logs?${query({ page, limit: 20 })}`, { signal });
  return { items: data.logs, total: data.total, page, limit: 20 };
}

// UC5: any signed-in user can flag a direct job posting for admin review.
export function reportPost(projectId: string, reason: PostReportReason, note: string) {
  return request(`/api/projects/${encodeURIComponent(projectId)}/report`, { method: 'POST', body: JSON.stringify({ reason, note }) });
}
