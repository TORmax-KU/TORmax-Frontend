import { AuthUser } from '@/types';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

// NFR-07: the backend signs a session out after 2 hours without activity. Automatic refreshes
// send this header so an unattended tab does not keep the session alive.
export const BACKGROUND_HEADERS = { 'X-Background-Request': '1' };

const SIGNED_OUT_EVENT = 'tormax:signed-out';

// Called when an API request reports the session has ended, so the UI shows signed out.
export function reportSignedOut() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(SIGNED_OUT_EVENT));
}

export function onSignedOut(listener: () => void) {
  window.addEventListener(SIGNED_OUT_EVENT, listener);
  return () => window.removeEventListener(SIGNED_OUT_EVENT, listener);
}

// Checks the session without counting as activity. 'unknown' means the check itself failed.
export async function checkSession(): Promise<'signedIn' | 'signedOut' | 'unknown'> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, { credentials: 'include', headers: BACKGROUND_HEADERS });
    return res.status === 401 ? 'signedOut' : res.ok ? 'signedIn' : 'unknown';
  } catch {
    return 'unknown';
  }
}

export function getGoogleLoginUrl(): string {
  return `${API_BASE_URL}/auth/google`;
}

export function getLogoutUrl(): string {
  return `${API_BASE_URL}/auth/logout`;
}

export interface RegisterInput {
  email: string;
  password: string;
  realName?: string;
  role: 'Vendor' | 'JobLister';
}

async function postCredentials(path: string, body: object): Promise<AuthUser> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message || data?.error || `Request failed (${res.status})`);
  }

  return await res.json();
}

export function loginWithPassword(email: string, password: string): Promise<AuthUser> {
  return postCredentials('/auth/login', { email, password });
}

export function registerWithPassword(input: RegisterInput): Promise<AuthUser> {
  return postCredentials('/auth/register', input);
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      credentials: 'include',
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchUserById(id: string): Promise<AuthUser | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      credentials: 'include',
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function updateUser(
  id: string,
  patch: Partial<AuthUser> & { skillNames?: string[] }
): Promise<AuthUser | null> {
  const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || body?.message || `Failed to update user (${res.status})`);
  }

  return await res.json();
}
