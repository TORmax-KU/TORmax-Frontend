'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useAuth } from '@/context/AuthContext';
import { API_BASE_URL, BACKGROUND_HEADERS, reportSignedOut } from '@/lib/auth';
import { NotificationItem } from '@/interface/NotificationItem';

// Match and TOR-state alerts produced by the backend matching sweep (FR-10).
// One store is shared by the navbar badge and the notifications page so they never disagree.
const ENDPOINT = `${API_BASE_URL}/api/notifications`;
const POLL_MS = 60_000;

export type TorState = 'open' | 'closed' | 'awarded' | 'cancelled' | 'draft';

export interface ApiNotification {
  _id: string;
  type: 'NewMatch' | 'StatusChange';
  read: boolean;
  createdAt: string;
  matchPercentage?: number;
  fromState?: TorState;
  toState?: TorState;
  // null once the TOR has been removed from TORmax
  projectId: { _id: string; title: string; agency?: string } | null;
}

interface Snapshot { items: ApiNotification[]; unreadCount: number; status: 'loading' | 'ready' | 'error' }
const INITIAL: Snapshot = { items: [], unreadCount: 0, status: 'loading' };
const listeners = new Set<() => void>();

let snapshot = INITIAL;
// Signed-in user whose notifications the snapshot holds.
let owner: string | null = null;

function set(next: Snapshot) {
  snapshot = next;
  listeners.forEach(listener => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

// `background` marks timer-driven polls, which must not count as session activity (NFR-07).
async function refresh(userId: string, background = false) {
  try {
    const res = await fetch(`${ENDPOINT}?limit=50`, { credentials: 'include', headers: background ? BACKGROUND_HEADERS : undefined });
    if (res.status === 401) reportSignedOut();
    if (!res.ok) throw new Error(`Failed to load notifications (${res.status})`);
    const body = await res.json();
    if (owner === userId) set({ items: body.notifications, unreadCount: body.unreadCount, status: 'ready' });
  } catch {
    // Keep showing the last good list; only a first load reports an error.
    if (owner === userId && snapshot.status !== 'ready') set({ ...snapshot, status: 'error' });
  }
}

// Optimistic: update locally first, then reload from the server if the request fails.
function send(path: string, init: RequestInit) {
  const userId = owner;
  void fetch(`${ENDPOINT}${path}`, { credentials: 'include', ...init })
    .then(res => { if (!res.ok) throw new Error(`Request failed (${res.status})`); })
    .catch(() => { if (userId) void refresh(userId); });
}

function setRead(id: string, read: boolean) {
  const item = snapshot.items.find(n => n._id === id);
  if (!item || item.read === read) return;
  set({
    ...snapshot,
    items: snapshot.items.map(n => (n._id === id ? { ...n, read } : n)),
    unreadCount: Math.max(0, snapshot.unreadCount + (read ? -1 : 1)),
  });
  send(`/${encodeURIComponent(id)}/read`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ read }),
  });
}

function remove(id: string) {
  const item = snapshot.items.find(n => n._id === id);
  if (!item) return;
  set({
    ...snapshot,
    items: snapshot.items.filter(n => n._id !== id),
    unreadCount: Math.max(0, snapshot.unreadCount - (item.read ? 0 : 1)),
  });
  send(`/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

function markAllRead() {
  set({ ...snapshot, items: snapshot.items.map(n => ({ ...n, read: true })), unreadCount: 0 });
  send('/read-all', { method: 'PATCH' });
}

export function useNotifications({ poll = false }: { poll?: boolean } = {}) {
  const { user, isLoading } = useAuth();
  const userId = user?._id ?? null;
  const state = useSyncExternalStore(subscribe, () => snapshot, () => INITIAL);

  useEffect(() => {
    if (owner !== userId) {
      owner = userId;
      set(INITIAL);
    }
    if (!userId) return;
    void refresh(userId);
    if (!poll) return;
    const timer = setInterval(() => void refresh(userId, true), POLL_MS);
    return () => clearInterval(timer);
  }, [userId, poll]);

  return {
    ...state,
    signedOut: !isLoading && !user,
    toggleRead: (id: string) => setRead(id, !state.items.find(n => n._id === id)?.read),
    remove,
    markAllRead,
    retry: () => { if (userId) void refresh(userId); },
  };
}

const STATE_LABELS: Record<TorState, [en: string, th: string]> = {
  open: ['open for bids', 'เปิดรับข้อเสนอ'],
  closed: ['closed', 'ปิดรับแล้ว'],
  awarded: ['awarded', 'ประกาศผู้ชนะแล้ว'],
  cancelled: ['cancelled', 'ยกเลิก'],
  draft: ['draft', 'ร่าง'],
};

const stateLabel = (state: TorState | undefined, th: boolean) =>
  state ? (STATE_LABELS[state]?.[th ? 1 : 0] ?? state) : '';

export function toNotificationItem(n: ApiNotification, th: boolean): NotificationItem {
  const project = n.projectId;
  const name = project?.title ?? '';
  const removed = { en: 'This TOR has been removed from TORmax.', th: 'TOR นี้ถูกนำออกจาก TORmax แล้ว' };
  const timestamp = new Date(n.createdAt).toLocaleString(th ? 'th-TH' : 'en-GB', {
    dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Bangkok',
  });
  const base = { id: n._id, read: n.read, timestamp, link: project ? `/tor-page/${project._id}` : undefined };

  if (n.type === 'NewMatch') {
    const pct = n.matchPercentage == null ? '' : ` · ${Math.round(n.matchPercentage)}%`;
    return {
      ...base,
      type: 'match',
      title: 'New TOR matches your profile',
      titleTh: 'พบ TOR ที่ตรงกับโปรไฟล์ของคุณ',
      message: project ? `${name}${project.agency ? ` — ${project.agency}` : ''} (skill match${pct})` : removed.en,
      messageTh: project ? `${name}${project.agency ? ` — ${project.agency}` : ''} (ทักษะตรงกัน${pct})` : removed.th,
    };
  }

  return {
    ...base,
    type: 'update',
    title: 'Matched TOR status changed',
    titleTh: 'สถานะ TOR ที่ตรงกับคุณเปลี่ยนแปลง',
    message: project
      ? `${name}: ${stateLabel(n.fromState, false)} → ${stateLabel(n.toState, false)}`
      : removed.en,
    messageTh: project
      ? `${name}: ${stateLabel(n.fromState, true)} → ${stateLabel(n.toState, true)}`
      : removed.th,
  };
}
