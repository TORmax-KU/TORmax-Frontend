'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RiDeleteBinLine, RiExternalLinkLine } from '@remixicon/react';
import { getPostReports, PostReportItem, reviewPostReport, ReportStatus } from '@/lib/admin';
import { Pagination } from '@/component/Pagination';
import { POST_REPORT_REASONS } from '@/component/tordetail/ReportPosting';
import { AccountBadge, errorMessage, formatDateTime, Lang, ListState, Segmented, usePaged } from './shared';
import { RemovalTarget, RemovePostDialog, removalSummary } from './RemovePostDialog';

const reasonLabel = (reason: string, lang: Lang) => {
  const entry = POST_REPORT_REASONS.find(([value]) => value === reason);
  return entry ? entry[lang === 'th' ? 1 : 2] : reason;
};

// UC5 step 1: the administrator reviews reported job postings, then removes or dismisses them.
export function ReportsTab({ lang, onChanged }: { lang: Lang; onChanged?: () => void }) {
  const th = lang === 'th';
  const [status, setStatus] = useState<ReportStatus | 'all'>('open');
  const [page, setPage] = useState(1);
  const state = usePaged(`${status}:${page}`, signal => getPostReports(status, page, signal));
  const [removing, setRemoving] = useState<RemovalTarget>();
  const [notice, setNotice] = useState('');
  const [actionError, setActionError] = useState('');
  const [busy, setBusy] = useState<string>();

  async function review(report: PostReportItem, next: ReportStatus) {
    setBusy(report._id);
    setActionError('');
    setNotice('');
    try { await reviewPostReport(report._id, next); state.refresh(); onChanged?.(); }
    catch (error) { setActionError(errorMessage(error, lang)); }
    finally { setBusy(undefined); }
  }

  const statusLabel: Record<ReportStatus, string> = { open: th ? 'รอตรวจสอบ' : 'Open', resolved: th ? 'ดำเนินการแล้ว' : 'Resolved', dismissed: th ? 'ยกเลิกรายงาน' : 'Dismissed' };

  return <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Segmented label={th ? 'สถานะรายงาน' : 'Report status'} value={status} onChange={value => { setStatus(value); setPage(1); }}
        options={[['open', statusLabel.open], ['resolved', statusLabel.resolved], ['dismissed', statusLabel.dismissed], ['all', th ? 'ทั้งหมด' : 'All']]} />
      {state.data && <p className="text-[13px] font-medium text-ink-3">{th ? `${state.data.total} รายงาน` : `${state.data.total} report${state.data.total === 1 ? '' : 's'}`}</p>}
    </div>
    {notice && <p role="status" className="ui-alert ui-alert-ok">{notice}</p>}
    {actionError && <p role="alert" className="ui-alert ui-alert-danger">{actionError}</p>}
    <ListState state={state} lang={lang} empty={status === 'open' ? (th ? 'ไม่มีรายงานที่รอตรวจสอบ' : 'No reports waiting for review.') : (th ? 'ไม่มีรายงาน' : 'No reports.')} />
    {state.data && state.data.items.length > 0 && <ul className="space-y-3" aria-busy={state.loading}>
      {state.data.items.map(report => {
        const project = report.projectId;
        const publisher = project?.publisherId || null;
        return <li key={report._id} className="ui-card p-5 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`ui-badge ui-badge-dot ${report.status === 'open' ? 'ui-badge-warn' : 'ui-badge-neutral'}`}>{statusLabel[report.status]}</span>
            <span className="ui-badge ui-badge-danger">{reasonLabel(report.reason, lang)}</span>
            {(report.outcome === 'removed' || !project) && <span className="ui-badge ui-badge-neutral">{th ? 'ประกาศถูกลบแล้ว' : 'Posting removed'}</span>}
            <span className="ml-auto ui-meta">{formatDateTime(report.updatedAt, lang)}</span>
          </div>
          <h3 className="text-[16px] font-semibold leading-snug text-ink">{project?.title || report.projectTitle || (th ? '(ไม่มีชื่อ)' : '(untitled)')}</h3>
          {report.note && <p className="whitespace-pre-line rounded-control bg-surface-2 p-3 text-sm text-ink-2">{report.note}</p>}
          <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div><dt className="ui-meta mb-0.5">{th ? 'ผู้รายงาน' : 'Reported by'}</dt><dd className="break-all text-ink">{report.userId?.email || '—'}</dd></div>
            <div><dt className="ui-meta mb-0.5">{th ? 'ผู้ประกาศ' : 'Publisher'}</dt><dd className="flex flex-wrap items-center gap-2 break-all text-ink">{publisher?.email || project?.contact?.email || '—'}<AccountBadge status={publisher?.status} lang={lang} /></dd></div>
          </dl>
          {project && <div className="flex flex-wrap items-center gap-2 border-t border-line pt-3">
            <Link href={`/tor-page/${project._id}`} target="_blank" className="ui-btn ui-btn-secondary ui-btn-sm"><RiExternalLinkLine className="h-4 w-4" />{th ? 'ดูประกาศ' : 'View posting'}</Link>
            {report.status === 'open' && <button type="button" disabled={busy === report._id} onClick={() => review(report, 'dismissed')} className="ui-btn ui-btn-secondary ui-btn-sm">{th ? 'ยกเลิกรายงาน (ไม่ผิดนโยบาย)' : 'Dismiss (no violation)'}</button>}
            {report.status !== 'open' && report.outcome !== 'removed' && <button type="button" disabled={busy === report._id} onClick={() => review(report, 'open')} className="ui-btn ui-btn-ghost ui-btn-sm">{th ? 'เปิดรายงานอีกครั้ง' : 'Reopen'}</button>}
            <button type="button" onClick={() => { setNotice(''); setRemoving({ id: project._id, title: project.title, publisherEmail: publisher?.email, publisherIsAdmin: publisher?.role === 'Admin' }); }}
              className="ui-btn ui-btn-danger-ghost ui-btn-sm ml-auto"><RiDeleteBinLine className="h-4 w-4" />{th ? 'ลบประกาศ…' : 'Remove Post…'}</button>
          </div>}
        </li>;
      })}
    </ul>}
    {state.data && state.data.total > state.data.limit && <Pagination page={page} total={state.data.total} limit={state.data.limit} onChange={setPage}
      ariaLabel={th ? 'หน้ารายงาน' : 'Report pages'} previousLabel={th ? 'ก่อนหน้า' : 'Previous'} nextLabel={th ? 'ถัดไป' : 'Next'} />}
    {removing && <RemovePostDialog target={removing} lang={lang} onClose={() => setRemoving(undefined)}
      onRemoved={result => { setRemoving(undefined); setNotice(removalSummary(result, lang)); state.refresh(); onChanged?.(); }} />}
  </div>;
}
