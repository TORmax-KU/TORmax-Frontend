'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RiExternalLinkLine } from '@remixicon/react';
import { ClassificationReportItem, getClassificationReports, ReportStatus, reviewClassificationReport } from '@/lib/admin';
import { Pagination } from '@/component/Pagination';
import { errorMessage, formatDateTime, Lang, ListState, Segmented, usePaged } from './shared';

const REASONS: Record<ClassificationReportItem['reason'], [string, string]> = {
  'not-it': ['ไม่ใช่งานซอฟต์แวร์/IT', 'Not a software/IT project'],
  'wrong-category': ['หมวดหมู่หรือการเทียบงบไม่ถูกต้อง', 'Wrong category or budget comparison'],
  other: ['อื่น ๆ', 'Other'],
};

// Open Issue 2: government TORs users flagged as misclassified. "Not IT" removes the TOR from the feed.
export function ClassificationTab({ lang, onChanged }: { lang: Lang; onChanged?: () => void }) {
  const th = lang === 'th';
  const [status, setStatus] = useState<ReportStatus | 'all'>('open');
  const [page, setPage] = useState(1);
  const state = usePaged(`${status}:${page}`, signal => getClassificationReports(status, page, signal));
  const [busy, setBusy] = useState<string>();
  const [actionError, setActionError] = useState('');

  async function review(report: ClassificationReportItem, next: ReportStatus, markNonSoftware = false) {
    setBusy(report._id);
    setActionError('');
    try { await reviewClassificationReport(report._id, next, markNonSoftware); state.refresh(); onChanged?.(); }
    catch (error) { setActionError(errorMessage(error, lang)); }
    finally { setBusy(undefined); }
  }

  const statusLabel: Record<ReportStatus, string> = { open: th ? 'รอตรวจสอบ' : 'Open', resolved: th ? 'ดำเนินการแล้ว' : 'Resolved', dismissed: th ? 'ยกเลิกรายงาน' : 'Dismissed' };

  return <div className="space-y-4">
    <Segmented label={th ? 'สถานะรายงาน' : 'Report status'} value={status} onChange={value => { setStatus(value); setPage(1); }}
      options={[['open', statusLabel.open], ['resolved', statusLabel.resolved], ['dismissed', statusLabel.dismissed], ['all', th ? 'ทั้งหมด' : 'All']]} />
    {actionError && <p role="alert" className="ui-alert ui-alert-danger">{actionError}</p>}
    <ListState state={state} lang={lang} empty={status === 'open' ? (th ? 'ไม่มีรายงานที่รอตรวจสอบ' : 'No reports waiting for review.') : (th ? 'ไม่มีรายงาน' : 'No reports.')} />
    {state.data && state.data.items.length > 0 && <ul className="space-y-3" aria-busy={state.loading}>
      {state.data.items.map(report => {
        const project = report.projectId;
        return <li key={report._id} className="ui-card p-5 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`ui-badge ui-badge-dot ${report.status === 'open' ? 'ui-badge-warn' : 'ui-badge-neutral'}`}>{statusLabel[report.status]}</span>
            <span className="ui-badge ui-badge-brand">{REASONS[report.reason]?.[th ? 0 : 1] || report.reason}</span>
            {project?.classification === 'non-software' && <span className="ui-badge ui-badge-neutral">{th ? 'นำออกจากหมวด IT แล้ว' : 'Removed from IT feed'}</span>}
            <span className="ml-auto ui-meta">{formatDateTime(report.updatedAt, lang)}</span>
          </div>
          <h3 className="text-[16px] font-semibold leading-snug text-ink">{project?.title || (th ? '(TOR ถูกลบแล้ว)' : '(TOR no longer exists)')}</h3>
          <p className="ui-meta">{[project?.agency, project?.source, project?.externalId].filter(Boolean).join(' • ')}</p>
          {report.note && <p className="whitespace-pre-line rounded-control bg-surface-2 p-3 text-sm text-ink-2">{report.note}</p>}
          <p className="text-sm text-ink-2">{th ? 'ผู้รายงาน' : 'Reported by'}: <span className="break-all text-ink">{report.userId?.email || '—'}</span></p>
          <div className="flex flex-wrap items-center gap-2 border-t border-line pt-3">
            {project && <Link href={`/tor-page/${project._id}`} target="_blank" className="ui-btn ui-btn-secondary ui-btn-sm"><RiExternalLinkLine className="h-4 w-4" />{th ? 'ดู TOR' : 'View TOR'}</Link>}
            {report.status === 'open' ? <>
              <button type="button" disabled={busy === report._id} onClick={() => review(report, 'dismissed')} className="ui-btn ui-btn-secondary ui-btn-sm">{th ? 'ยกเลิกรายงาน' : 'Dismiss'}</button>
              <button type="button" disabled={busy === report._id} onClick={() => review(report, 'resolved')} className="ui-btn ui-btn-secondary ui-btn-sm">{th ? 'ดำเนินการแล้ว' : 'Mark resolved'}</button>
              {project && project.classification !== 'non-software' && <button type="button" disabled={busy === report._id} onClick={() => review(report, 'resolved', true)} className="ui-btn ui-btn-danger-ghost ui-btn-sm ml-auto">{th ? 'ไม่ใช่งาน IT — นำออกจากหน้าค้นหา' : 'Not IT — remove from feed'}</button>}
            </> : <button type="button" disabled={busy === report._id} onClick={() => review(report, 'open')} className="ui-btn ui-btn-ghost ui-btn-sm">{th ? 'เปิดรายงานอีกครั้ง' : 'Reopen'}</button>}
          </div>
        </li>;
      })}
    </ul>}
    {state.data && state.data.total > state.data.limit && <Pagination page={page} total={state.data.total} limit={state.data.limit} onChange={setPage}
      ariaLabel={th ? 'หน้ารายงาน' : 'Report pages'} previousLabel={th ? 'ก่อนหน้า' : 'Previous'} nextLabel={th ? 'ถัดไป' : 'Next'} />}
  </div>;
}
