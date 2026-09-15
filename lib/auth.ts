import { AuthUser } from '@/types';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function getGoogleLoginUrl(): string {
  return `${API_BASE_URL}/auth/google`;
}

export function getLogoutUrl(): string {
  return `${API_BASE_URL}/auth/logout`;
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
  patch: Partial<AuthUser>
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
