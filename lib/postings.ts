import { API_BASE_URL } from './auth';
import { Project } from './projects';
import { SignedOutError } from './matches';

// FR-13 / UC4: job postings a Job Lister publishes directly on TORmax.

export interface PostingInput {
  title: string;
  description: string;
  category: string;
  agency: string;
  skillNames: string[];
  budgetMin: number | null;
  budget: number | null;
  deadline: string; // ISO instant
  contact: { name: string; email: string; phone: string };
  sourceUrl: string;
  procurementStatus?: 'open' | 'closed';
}

// Field-level messages from the API, keyed like "title" or "contact.email".
export class PostingValidationError extends Error {
  constructor(message: string, public fields: Record<string, string>) { super(message); }
}

async function send(path: string, method: string, body?: unknown): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (response.status === 401) throw new SignedOutError();
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    if (response.status === 400 && data?.errors) throw new PostingValidationError(data.message, data.errors);
    throw new Error(data?.message || data?.error || `Request failed (${response.status})`);
  }
  return response;
}

export async function getMyPostings(signal?: AbortSignal): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/api/projects/mine`, { credentials: 'include', signal });
  if (response.status === 401) throw new SignedOutError();
  if (!response.ok) throw new Error('Could not load your postings');
  return (await response.json()).projects;
}

export async function getPosting(id: string, signal?: AbortSignal): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/api/projects/${encodeURIComponent(id)}`, { credentials: 'include', signal });
  if (!response.ok) throw new Error(response.status === 404 ? 'not-found' : 'Could not load posting');
  return response.json();
}

export async function createPosting(input: PostingInput): Promise<Project> {
  return (await send('/api/projects', 'POST', input)).json();
}

export async function updatePosting(id: string, patch: Partial<PostingInput>): Promise<Project> {
  return (await send(`/api/projects/${encodeURIComponent(id)}`, 'PATCH', patch)).json();
}

export async function deletePosting(id: string): Promise<void> {
  await send(`/api/projects/${encodeURIComponent(id)}`, 'DELETE');
}

// <input type="datetime-local"> values are read and written as Thailand time (GMT+7, no DST).
export function toBangkokLocalInput(iso?: string) {
  if (!iso || Number.isNaN(Date.parse(iso))) return '';
  return new Date(Date.parse(iso) + 7 * 3600000).toISOString().slice(0, 16);
}

export function fromBangkokLocalInput(value: string) {
  const date = value ? new Date(`${value}:00+07:00`) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toISOString() : '';
}
