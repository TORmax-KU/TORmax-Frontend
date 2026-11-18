'use client';

import { useEffect, useState } from 'react';
import { RiInboxLine } from '@remixicon/react';
import { ForbiddenError, Paged } from '@/lib/admin';
import { SignedOutError } from '@/lib/matches';
import { TORCardSkeleton } from '@/component/TORCardSkeleton';

export type Lang = 'th' | 'en';

// Loads one page of an admin list. `key` identifies the query (filters + page); changing it reloads.
// Earlier data stays visible while the next page loads, so the list does not jump.
export function usePaged<T>(key: string, load: (signal: AbortSignal) => Promise<Paged<T>>) {
  const [reload, setReload] = useState(0);
  const [result, setResult] = useState<{ key: string; data?: Paged<T>; error?: unknown }>();
  const fullKey = `${key}#${reload}`;
  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal)
      .then(data => { if (!controller.signal.aborted) setResult({ key: fullKey, data }); })
      .catch(error => { if (!controller.signal.aborted) setResult(previous => ({ key: fullKey, data: previous?.data, error })); });
    return () => controller.abort();
    // `load` is rebuilt every render; `fullKey` captures everything it depends on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullKey]);
  return {
    data: result?.data,
    error: result?.key === fullKey ? result.error : undefined,
    loading: result?.key !== fullKey,
    refresh: () => setReload(value => value + 1),
  };
}

export function errorMessage(error: unknown, lang: Lang) {
  const th = lang === 'th';
  if (error instanceof SignedOutError) return th ? 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง' : 'Your session ended. Please sign in again.';
  if (error instanceof ForbiddenError) return th ? 'บัญชีนี้ไม่มีสิทธิ์ผู้ดูแลระบบ' : 'This account does not have admin access.';
  return error instanceof Error ? error.message : (th ? 'ดำเนินการไม่สำเร็จ' : 'Something went wrong.');
}

// Loading, error and empty states shared by every tab. Returns null when the list should render.
export function ListState<T>({ state, lang, empty }: { state: ReturnType<typeof usePaged<T>>; lang: Lang; empty: string }) {
  const th = lang === 'th';
  if (state.loading && !state.data) return <TORCardSkeleton count={3} label={th ? 'กำลังโหลด…' : 'Loading…'} className="space-y-3" />;
  if (state.error && !state.data) return <div role="alert" className="ui-empty">
    <p className="max-w-md text-sm text-ink-2">{errorMessage(state.error, lang)}</p>
    <button className="ui-btn ui-btn-secondary ui-btn-sm mt-2" onClick={state.refresh}>{th ? 'ลองอีกครั้ง' : 'Retry'}</button>
  </div>;
  if (state.data && !state.data.items.length) return <div className="ui-empty py-14">
    <div className="ui-empty-icon"><RiInboxLine className="h-5 w-5" /></div>
    <p className="font-medium text-ink">{empty}</p>
  </div>;
  return null;
}

export function Segmented<V extends string>({ value, options, onChange, label }: { value: V; options: Array<[V, string]>; onChange: (value: V) => void; label: string }) {
  return <div role="group" aria-label={label} className="ui-segmented">
    {options.map(([option, text]) => <button key={option} type="button" aria-pressed={value === option} onClick={() => onChange(option)}>{text}</button>)}
  </div>;
}

export function formatDateTime(value: string | undefined, lang: Lang) {
  if (!value || Number.isNaN(Date.parse(value))) return '—';
  return new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Bangkok' }).format(new Date(value));
}

export function AccountBadge({ status, lang }: { status?: 'Active' | 'Disabled'; lang: Lang }) {
  if (!status) return null;
  const th = lang === 'th';
  return <span className={`ui-badge ui-badge-dot ${status === 'Active' ? 'ui-badge-ok' : 'ui-badge-danger'}`}>
    {status === 'Active' ? (th ? 'บัญชีใช้งานได้' : 'Active') : (th ? 'บัญชีถูกระงับ' : 'Disabled')}
  </span>;
}

// A modal confirmation. Escape and the cancel button close it; `children` holds extra fields.
export function ConfirmDialog({ title, body, confirmLabel, danger, busy, error, onConfirm, onCancel, lang, children }: {
  title: string; body: React.ReactNode; confirmLabel: string; danger?: boolean; busy?: boolean; error?: string;
  onConfirm: () => void; onCancel: () => void; lang: Lang; children?: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape' && !busy) onCancel(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [busy, onCancel]);
  return <div role="dialog" aria-modal="true" aria-labelledby="admin-confirm-title" className="ui-backdrop">
    <form className="ui-dialog" onSubmit={event => { event.preventDefault(); onConfirm(); }} noValidate>
      <h2 id="admin-confirm-title" className="ui-section-title text-lg">{title}</h2>
      <div className="space-y-2 text-sm leading-relaxed text-ink-2">{body}</div>
      {children}
      {error && <p role="alert" className="ui-error-text">{error}</p>}
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" disabled={busy} onClick={onCancel} className="ui-btn ui-btn-secondary">{lang === 'th' ? 'ยกเลิก' : 'Cancel'}</button>
        <button type="submit" disabled={busy} className={`ui-btn ${danger ? 'ui-btn-danger' : 'ui-btn-primary'}`}>{busy ? (lang === 'th' ? 'กำลังดำเนินการ…' : 'Working…') : confirmLabel}</button>
      </div>
    </form>
  </div>;
}
