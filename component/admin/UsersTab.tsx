'use client';

import { useState } from 'react';
import { RiSearchLine } from '@remixicon/react';
import { useAuth } from '@/context/AuthContext';
import { AdminUser, getUsers, setUserStatus } from '@/lib/admin';
import { Pagination } from '@/component/Pagination';
import { AccountBadge, ConfirmDialog, errorMessage, formatDateTime, Lang, ListState, usePaged } from './shared';

const ROLE_LABELS: Record<AdminUser['role'], [string, string]> = { Vendor: ['ผู้ให้บริการ', 'Vendor'], JobLister: ['ผู้ประกาศงาน', 'Job Lister'], Admin: ['ผู้ดูแลระบบ', 'Admin'] };

// US10: accounts disabled by moderation can be reviewed and re-enabled; others disabled by hand.
export function UsersTab({ lang }: { lang: Lang }) {
  const th = lang === 'th';
  const { user: me } = useAuth();
  const [draft, setDraft] = useState('');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const state = usePaged(`${search}:${role}:${status}:${page}`, signal => getUsers({ search, role, status }, page, signal));
  const [pending, setPending] = useState<{ user: AdminUser; next: 'Active' | 'Disabled' }>();
  const [busy, setBusy] = useState(false);
  const [dialogError, setDialogError] = useState('');

  async function apply() {
    if (!pending) return;
    setBusy(true);
    setDialogError('');
    try { await setUserStatus(pending.user._id, pending.next); setPending(undefined); state.refresh(); }
    catch (error) { setDialogError(errorMessage(error, lang)); }
    finally { setBusy(false); }
  }

  return <div className="space-y-4">
    <form role="search" className="flex flex-wrap items-center gap-2" onSubmit={event => { event.preventDefault(); setSearch(draft.trim()); setPage(1); }}>
      <div className="relative flex min-w-56 flex-1 items-center">
        <RiSearchLine size={15} className="pointer-events-none absolute left-3 text-ink-3" aria-hidden />
        <input type="search" value={draft} onChange={event => setDraft(event.target.value)} maxLength={200}
          aria-label={th ? 'ค้นหาบัญชี' : 'Search accounts'} placeholder={th ? 'อีเมล ชื่อ หรือบริษัท' : 'Email, name or company'} className="ui-field pl-9" />
      </div>
      <select value={role} onChange={event => { setRole(event.target.value); setPage(1); }} aria-label={th ? 'ประเภทบัญชี' : 'Account type'} className="ui-field w-auto">
        <option value="">{th ? 'ทุกประเภท' : 'All types'}</option>
        {Object.entries(ROLE_LABELS).map(([value, [thLabel, enLabel]]) => <option key={value} value={value}>{th ? thLabel : enLabel}</option>)}
      </select>
      <select value={status} onChange={event => { setStatus(event.target.value); setPage(1); }} aria-label={th ? 'สถานะบัญชี' : 'Account status'} className="ui-field w-auto">
        <option value="">{th ? 'ทุกสถานะ' : 'All statuses'}</option>
        <option value="Active">{th ? 'ใช้งานได้' : 'Active'}</option>
        <option value="Disabled">{th ? 'ถูกระงับ' : 'Disabled'}</option>
      </select>
    </form>
    <ListState state={state} lang={lang} empty={th ? 'ไม่พบบัญชี' : 'No accounts found.'} />
    {state.data && state.data.items.length > 0 && <ul className="divide-y divide-line rounded-card border border-line bg-surface" aria-busy={state.loading}>
      {state.data.items.map(account => {
        const self = account._id === me?._id;
        return <li key={account._id} className="flex flex-wrap items-center gap-x-4 gap-y-2 p-4">
          <div className="min-w-0 flex-1">
            <p className="break-all text-sm font-medium text-ink">{account.email}{self && <span className="ui-meta"> {th ? '(คุณ)' : '(you)'}</span>}</p>
            <p className="ui-meta">{[account.realName, account.companyName].filter(Boolean).join(' • ') || '—'} · {th ? 'สมัครเมื่อ' : 'Joined'} {formatDateTime(account.createdAt, lang)}</p>
          </div>
          <span className="ui-badge ui-badge-neutral">{ROLE_LABELS[account.role][th ? 0 : 1]}</span>
          <AccountBadge status={account.status} lang={lang} />
          {!self && account.role !== 'Admin' && (account.status === 'Active'
            ? <button type="button" onClick={() => { setDialogError(''); setPending({ user: account, next: 'Disabled' }); }} className="ui-btn ui-btn-danger-ghost ui-btn-sm">{th ? 'ระงับบัญชี' : 'Disable'}</button>
            : <button type="button" onClick={() => { setDialogError(''); setPending({ user: account, next: 'Active' }); }} className="ui-btn ui-btn-secondary ui-btn-sm">{th ? 'เปิดใช้งาน' : 'Re-enable'}</button>)}
        </li>;
      })}
    </ul>}
    {state.data && state.data.total > state.data.limit && <Pagination page={page} total={state.data.total} limit={state.data.limit} onChange={setPage}
      ariaLabel={th ? 'หน้าบัญชี' : 'Account pages'} previousLabel={th ? 'ก่อนหน้า' : 'Previous'} nextLabel={th ? 'ถัดไป' : 'Next'} />}
    {pending && <ConfirmDialog lang={lang} busy={busy} error={dialogError} danger={pending.next === 'Disabled'}
      title={pending.next === 'Disabled' ? (th ? 'ระงับบัญชีนี้?' : 'Disable this account?') : (th ? 'เปิดใช้งานบัญชีนี้อีกครั้ง?' : 'Re-enable this account?')}
      confirmLabel={pending.next === 'Disabled' ? (th ? 'ระงับบัญชี' : 'Disable account') : (th ? 'เปิดใช้งาน' : 'Re-enable')}
      onCancel={() => setPending(undefined)} onConfirm={apply}
      body={<>
        <p className="break-all font-medium text-ink">{pending.user.email}</p>
        <p>{pending.next === 'Disabled'
          ? (th ? 'ผู้ใช้จะถูกออกจากระบบทันทีและเข้าสู่ระบบไม่ได้จนกว่าจะเปิดใช้งานอีกครั้ง' : 'They are signed out immediately and cannot sign in until re-enabled.')
          : (th ? 'ผู้ใช้จะเข้าสู่ระบบได้อีกครั้ง ประกาศที่ถูกปิดหรือลบจะไม่ถูกเปิดคืนโดยอัตโนมัติ' : 'They can sign in again. Postings that were closed or removed are not restored automatically.')}</p>
      </>} />}
  </div>;
}
