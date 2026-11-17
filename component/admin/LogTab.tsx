'use client';

import { useState } from 'react';
import { getModerationLogs } from '@/lib/admin';
import { Pagination } from '@/component/Pagination';
import { formatDateTime, Lang, ListState, usePaged } from './shared';

// FR-14 audit trail: who removed which posting, why, and what happened to the publisher.
export function LogTab({ lang }: { lang: Lang }) {
  const th = lang === 'th';
  const [page, setPage] = useState(1);
  const state = usePaged(`${page}`, signal => getModerationLogs(page, signal));

  return <div className="space-y-4">
    <ListState state={state} lang={lang} empty={th ? 'ยังไม่มีการลบประกาศ' : 'No postings have been removed yet.'} />
    {state.data && state.data.items.length > 0 && <ul className="divide-y divide-line rounded-card border border-line bg-surface" aria-busy={state.loading}>
      {state.data.items.map(log => <li key={log._id} className="space-y-1.5 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-ink">{log.projectTitle || (th ? '(ประกาศที่ถูกลบ)' : '(removed posting)')}</p>
          {log.accountDisabled && <span className="ui-badge ui-badge-danger">{th ? 'ระงับบัญชีผู้ประกาศ' : 'Publisher disabled'}</span>}
          {!!log.otherPostingsClosed && <span className="ui-badge ui-badge-neutral">{th ? `ปิดประกาศอื่น ${log.otherPostingsClosed}` : `${log.otherPostingsClosed} other closed`}</span>}
          <span className="ml-auto ui-meta">{formatDateTime(log.createdAt, lang)}</span>
        </div>
        <p className="text-sm text-ink-2">{log.reason || '—'}</p>
        <p className="ui-meta break-all">{th ? 'ผู้ประกาศ' : 'Publisher'}: {log.publisherEmail || log.targetUserId?.email || '—'} · {th ? 'โดย' : 'By'} {log.adminId?.email || log.adminId?.username || '—'}</p>
      </li>)}
    </ul>}
    {state.data && state.data.total > state.data.limit && <Pagination page={page} total={state.data.total} limit={state.data.limit} onChange={setPage}
      ariaLabel={th ? 'หน้าประวัติ' : 'Log pages'} previousLabel={th ? 'ก่อนหน้า' : 'Previous'} nextLabel={th ? 'ถัดไป' : 'Next'} />}
  </div>;
}
