import { API_BASE_URL, reportSignedOut } from './auth';
import { SignedOutError } from './matches';

// Open Issue 2: tell admins a TOR was misclassified.
export type ReportReason = 'not-it' | 'wrong-category' | 'other';

export async function reportMisclassification(projectId: string, reason: ReportReason, note: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/projects/${encodeURIComponent(projectId)}/classification-report`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason, note }),
  });
  if (response.status === 401) { reportSignedOut(); throw new SignedOutError(); }
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || data?.error || `Request failed (${response.status})`);
  }
}
