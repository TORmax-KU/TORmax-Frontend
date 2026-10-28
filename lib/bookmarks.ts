'use client';

import { useSyncExternalStore } from 'react';

// Bookmarks live in this browser only until the backend stores them per user.
const STORAGE_KEY = 'bookmarks';
const EMPTY: string[] = [];
const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedIds: string[] = EMPTY;

function readIds(): string[] {
  let raw: string | null = null;
  try { raw = localStorage.getItem(STORAGE_KEY); } catch { /* Storage can be blocked; fall back to the last known list. */ return cachedIds; }
  if (raw === cachedRaw) return cachedIds;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cachedIds = Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : EMPTY;
  } catch { cachedIds = EMPTY; }
  return cachedIds;
}

function writeIds(ids: string[]) {
  cachedIds = ids;
  cachedRaw = JSON.stringify(ids);
  try { localStorage.setItem(STORAGE_KEY, cachedRaw); } catch { /* Keep the in-memory list for this session. */ }
  listeners.forEach(listener => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep other tabs in sync.
  const onStorage = (event: StorageEvent) => { if (event.key === STORAGE_KEY) listener(); };
  window.addEventListener('storage', onStorage);
  return () => { listeners.delete(listener); window.removeEventListener('storage', onStorage); };
}

export function useBookmarks() {
  const ids = useSyncExternalStore(subscribe, readIds, () => EMPTY);
  return {
    ids,
    isBookmarked: (id: string) => ids.includes(id),
    toggleBookmark: (id: string) => {
      const current = readIds();
      // Newest bookmarks first.
      writeIds(current.includes(id) ? current.filter(saved => saved !== id) : [id, ...current]);
    },
    removeBookmark: (id: string) => writeIds(readIds().filter(saved => saved !== id)),
  };
}
