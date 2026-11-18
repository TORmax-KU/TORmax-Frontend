'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RiDeleteBinLine, RiExternalLinkLine, RiFlagLine, RiSearchLine } from '@remixicon/react';
import { getAdminPosts } from '@/lib/admin';
import { formatMoney } from '@/lib/projects';
import { Pagination } from '@/component/Pagination';
import { AccountBadge, formatDateTime, Lang, ListState, Segmented, usePaged } from './shared';
import { RemovalTarget, RemovePostDialog, removalSummary } from './RemovePostDialog';

// UC5: every direct posting, open or closed, so admins can find and remove violations proactively.
export function PostsTab({ lang, onChanged }: { lang: Lang; onChanged?: () => void }) {
  const th = lang === 'th';
  const [status, setStatus] = useState<'open' | 'closed' | 'all'>('all');
  const [draft, setDraft] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const state = usePaged(`${status}:${search}:${page}`, signal => getAdminPosts(status, search, page, signal));
  const [removing, setRemoving] = useState<RemovalTarget>();
  const [notice, setNotice] = useState('');

  const budget = (min?: number | null, max?: number) => !max ? '—' : min ? `${formatMoney(min, lang)} – ${formatMoney(max, lang)}` : formatMoney(max, lang);

  return <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Segmented label={th ? 'สถานะประกาศ' : 'Posting status'} value={status} onChange={value => { setStatus(value); setPage(1); }}
        options={[['all', th ? 'ทั้งหมด' : 'All'], ['open', th ? 'เปิดรับ' : 'Open'], ['closed', th ? 'ปิดแล้ว' : 'Closed']]} />
      <form role="search" className="relative flex w-full items-center sm:w-72" onSubmit={event => { event.preventDefault(); setSearch(draft.trim()); setPage(1); }}>
        <RiSearchLine size={15} className="pointer-events-none absolute left-3 text-ink-3" aria-hidden />
        <input type="search" value={draft} onChange={event => setDraft(event.target.value)} maxLength={200}
          aria-label={th ? 'ค้นหาประกาศ' : 'Search postings'} placeholder={th ? 'ชื่อ หน่วยงาน รหัส หรืออีเมลติดต่อ' : 'Title, organization, ID or contact email'} className="ui-field pl-9" />
      </form>
    </div>
    {notice && <p role="status" className="ui-alert ui-alert-ok">{notice}</p>}
    <ListState state={state} lang={lang} empty={th ? 'ไม่พบประกาศ' : 'No postings found.'} />
    {state.data && state.data.items.length > 0 && <ul className="space-y-3" aria-busy={state.loading}>
      {state.data.items.map(post => {
        const publisher = post.publisherId || null;
        return <li key={post._id} className="ui-card p-5 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`ui-badge ui-badge-dot ${post.open ? 'ui-badge-ok' : 'ui-badge-neutral'}`}>{post.open ? (th ? 'เปิดรับ' : 'Open') : (th ? 'ปิดแล้ว' : 'Closed')}</span>
            {post.openReports > 0 && <span className="ui-badge ui-badge-danger"><RiFlagLine className="h-3.5 w-3.5" aria-hidden />{th ? `${post.openReports} รายงาน` : `${post.openReports} open report${post.openReports === 1 ? '' : 's'}`}</span>}
            {post.externalId && <span className="ml-auto font-mono text-[11px] text-ink-3">{post.externalId}</span>}
          </div>
          <h3 className="text-[16px] font-semibold leading-snug text-ink">{post.title}</h3>
          <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <div><dt className="ui-meta mb-0.5">{th ? 'ผู้ประกาศ' : 'Publisher'}</dt><dd className="flex flex-wrap items-center gap-2 break-all text-ink">{publisher?.email || '—'}<AccountBadge status={publisher?.status} lang={lang} /></dd></div>
            <div><dt className="ui-meta mb-0.5">{th ? 'งบประมาณ' : 'Budget'}</dt><dd className="tabular-nums text-ink">{budget(post.budgetMin, post.budget)}</dd></div>
            <div><dt className="ui-meta mb-0.5">{th ? 'ปิดรับ / ประกาศเมื่อ' : 'Deadline / posted'}</dt><dd className="text-ink">{formatDateTime(post.deadline, lang)}<span className="block ui-meta">{formatDateTime(post.createdAt, lang)}</span></dd></div>
          </dl>
          <div className="flex flex-wrap items-center gap-2 border-t border-line pt-3">
            <Link href={`/tor-page/${post._id}`} target="_blank" className="ui-btn ui-btn-secondary ui-btn-sm"><RiExternalLinkLine className="h-4 w-4" />{th ? 'ดูประกาศ' : 'View posting'}</Link>
            <button type="button" onClick={() => { setNotice(''); setRemoving({ id: post._id, title: post.title, publisherEmail: publisher?.email, publisherIsAdmin: publisher?.role === 'Admin' }); }}
              className="ui-btn ui-btn-danger-ghost ui-btn-sm ml-auto"><RiDeleteBinLine className="h-4 w-4" />{th ? 'ลบประกาศ…' : 'Remove Post…'}</button>
          </div>
        </li>;
      })}
    </ul>}
    {state.data && state.data.total > state.data.limit && <Pagination page={page} total={state.data.total} limit={state.data.limit} onChange={setPage}
      ariaLabel={th ? 'หน้าประกาศ' : 'Posting pages'} previousLabel={th ? 'ก่อนหน้า' : 'Previous'} nextLabel={th ? 'ถัดไป' : 'Next'} />}
    {removing && <RemovePostDialog target={removing} lang={lang} onClose={() => setRemoving(undefined)}
      onRemoved={result => { setRemoving(undefined); setNotice(removalSummary(result, lang)); state.refresh(); onChanged?.(); }} />}
  </div>;
}
