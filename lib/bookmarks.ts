'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useAuth } from '@/context/AuthContext';
import { API_BASE_URL } from '@/lib/auth';

// Signed-in users' bookmarks are stored on their account (/api/bookmarks).
// Signed-out users keep them in this browser; they are copied to the account on sign-in.
const STORAGE_KEY = 'bookmarks';
const ENDPOINT = `${API_BASE_URL}/api/bookmarks`;

interface Snapshot { ids: string[]; loading: boolean }
const LOADING: Snapshot = { ids: [], loading: true };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach(listener => listener());

// undefined = sign-in state not known yet, null = signed out, string = signed-in user id.
let owner: string | null | undefined;
let accountSnapshot: Snapshot = LOADING;

let cachedRaw: string | null = null;
let localSnapshot: Snapshot = { ids: [], loading: false };

function readLocal(): Snapshot {
  let raw: string | null = null;
  try { raw = localStorage.getItem(STORAGE_KEY); } catch { /* Storage can be blocked; fall back to the last known list. */ return localSnapshot; }
  if (raw === cachedRaw) return localSnapshot;
  cachedRaw = raw;
  let ids: string[] = [];
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) ids = parsed.filter((id): id is string => typeof id === 'string');
  } catch { /* Ignore corrupt storage. */ }
  localSnapshot = { ids, loading: false };
  return localSnapshot;
}

function writeLocal(ids: string[]) {
  cachedRaw = JSON.stringify(ids);
  localSnapshot = { ids, loading: false };
  try {
    if (ids.length) localStorage.setItem(STORAGE_KEY, cachedRaw);
    else localStorage.removeItem(STORAGE_KEY);
  } catch { /* Keep the in-memory list for this session. */ }
  emit();
}

function getSnapshot(): Snapshot {
  if (owner === undefined) return LOADING;
  return owner ? accountSnapshot : readLocal();
}

function setAccountIds(userId: string, ids: string[]) {
  if (owner !== userId) return;
  accountSnapshot = { ids, loading: false };
  emit();
}

async function request(method: 'GET' | 'PUT' | 'DELETE', id?: string): Promise<string[] | null> {
  try {
    const response = await fetch(id ? `${ENDPOINT}/${encodeURIComponent(id)}` : ENDPOINT, { method, credentials: 'include' });
    if (!response.ok) return null;
    const body: { ids?: unknown } = await response.json();
    return Array.isArray(body.ids) ? body.ids.filter((value): value is string => typeof value === 'string') : null;
  } catch { return null; }
}

async function loadAccount(userId: string) {
  let ids = await request('GET');
  if (owner !== userId) return;
  if (!ids) { setAccountIds(userId, []); return; }

  // Copy bookmarks made while signed out. Oldest first so the newest stays on top.
  const local = readLocal().ids;
  const keep: string[] = [];
  for (const id of [...local].reverse()) {
    if (ids.includes(id)) continue;
    const response = await fetch(`${ENDPOINT}/${encodeURIComponent(id)}`, { method: 'PUT', credentials: 'include' }).catch(() => null);
    if (response?.ok) ids = ((await response.json()) as { ids: string[] }).ids;
    // Keep only failures that may succeed later; drop projects that no longer exist.
    else if (response?.status !== 404) keep.unshift(id);
  }
  if (local.length) writeLocal(keep);
  setAccountIds(userId, ids);
}

function setOwner(next: string | null) {
  if (owner === next) return;
  owner = next;
  if (next) {
    accountSnapshot = LOADING;
    void loadAccount(next);
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep other tabs in sync while signed out.
  const onStorage = (event: StorageEvent) => { if (event.key === STORAGE_KEY) listener(); };
  window.addEventListener('storage', onStorage);
  return () => { listeners.delete(listener); window.removeEventListener('storage', onStorage); };
}

async function saveToAccount(userId: string, id: string, add: boolean) {
  const previous = accountSnapshot.ids;
  // Update the icon immediately, then settle on what the server saved.
  setAccountIds(userId, add ? [id, ...previous.filter(saved => saved !== id)] : previous.filter(saved => saved !== id));
  const ids = await request(add ? 'PUT' : 'DELETE', id);
  setAccountIds(userId, ids ?? previous);
}

export function useBookmarks() {
  const { user, isLoading } = useAuth();
  const userId = isLoading ? undefined : user?._id ?? null;
  useEffect(() => { if (userId !== undefined) setOwner(userId); }, [userId]);

  const { ids, loading } = useSyncExternalStore(subscribe, getSnapshot, () => LOADING);
  const change = (id: string, add: boolean) => {
    if (owner) void saveToAccount(owner, id, add);
    else if (owner === null) {
      const current = readLocal().ids.filter(saved => saved !== id);
      // Newest bookmarks first.
      writeLocal(add ? [id, ...current] : current);
    }
  };

  return {
    ids,
    loading,
    savedToAccount: Boolean(userId),
    isBookmarked: (id: string) => ids.includes(id),
    toggleBookmark: (id: string) => change(id, !ids.includes(id)),
    removeBookmark: (id: string) => change(id, false),
  };
}
