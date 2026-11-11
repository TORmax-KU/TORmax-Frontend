'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RiAddLine, RiBriefcase4Line, RiDeleteBinLine, RiEditLine, RiExternalLinkLine } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { ListerGate } from '@/component/postings/ListerGate';
import { TORCardSkeleton } from '@/component/TORCardSkeleton';
import { PageHeader } from '@/component/PageHeader';
import { Project, projectCard } from '@/lib/projects';
import { deletePosting, getMyPostings, updatePosting } from '@/lib/postings';

// FR-13 / US6 / UC4: a Job Lister's postings with create, edit, close/reopen and delete.
export default function ManagePostingsPage() {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';

  return (
    <div className="ui-page max-w-5xl space-y-6">
      <PageHeader
        className="pb-2"
        eyebrow={<><RiBriefcase4Line className="h-3.5 w-3.5" /><span>{th ? 'ประกาศงานตรงบน TORmax' : 'Direct postings'}</span></>}
        title={th ? 'จัดการประกาศงาน' : 'Manage postings'}
        description={th ? 'ประกาศงาน IT ถึงผู้ให้บริการที่มีทักษะตรง ผู้ให้บริการติดต่อคุณโดยตรงผ่านช่องทางที่ระบุ' : 'Reach vendors with matching skills. They contact you directly using the details you provide.'}
      />
      <ListerGate lang={activeLang}>{() => <PostingList lang={activeLang} />}</ListerGate>
    </div>
  );
}

function PostingList({ lang }: { lang: 'th' | 'en' }) {
  const th = lang === 'th';
  const [retry, setRetry] = useState(0);
  const [result, setResult] = useState<{ key: number; projects?: Project[]; error?: boolean }>();
  const [busy, setBusy] = useState<string>();
  const [actionError, setActionError] = useState('');
  const [confirming, setConfirming] = useState<Project>();

  useEffect(() => {
    const controller = new AbortController();
    getMyPostings(controller.signal)
      .then(projects => { if (!controller.signal.aborted) setResult({ key: retry, projects }); })
      .catch(() => { if (!controller.signal.aborted) setResult({ key: retry, error: true }); });
    return () => controller.abort();
  }, [retry]);

  async function run(id: string, action: () => Promise<unknown>) {
    setBusy(id);
    setActionError('');
    try { await action(); setRetry(value => value + 1); }
    catch (error) { setActionError(error instanceof Error ? error.message : (th ? 'ดำเนินการไม่สำเร็จ' : 'Action failed')); }
    finally { setBusy(undefined); }
  }

  const create = <Link href="/postings/new" className="ui-btn ui-btn-primary"><RiAddLine className="h-4 w-4" />{th ? 'สร้างประกาศงาน' : 'Create job listing'}</Link>;

  if (result?.key !== retry && !result?.projects) return <TORCardSkeleton count={2} label={th ? 'กำลังโหลดประกาศของคุณ…' : 'Loading your postings…'} className="space-y-3" />;
  if (result?.error || !result?.projects) return <div role="alert" className="ui-empty"><p className="text-sm text-ink-2">{th ? 'โหลดประกาศไม่สำเร็จ' : 'Could not load your postings.'}</p><button className="ui-btn ui-btn-secondary ui-btn-sm mt-2" onClick={() => setRetry(value => value + 1)}>{th ? 'ลองอีกครั้ง' : 'Retry'}</button></div>;

  const projects = result.projects;
  if (!projects.length) return <div className="ui-empty py-16">
    <div className="ui-empty-icon"><RiBriefcase4Line className="h-5 w-5" /></div>
    <p className="font-medium text-ink">{th ? 'คุณยังไม่มีประกาศงาน' : 'You have no postings yet'}</p>
    <p className="mb-3 text-sm text-ink-3 max-w-md mx-auto">{th ? 'ระบุขอบเขตงาน ทักษะที่ต้องใช้ งบประมาณ และวันปิดรับ ผู้ให้บริการที่ตรงจะได้รับแจ้งเตือนทันที' : 'Describe the scope, required skills, budget and deadline. Matching vendors are notified right away.'}</p>
    {create}
  </div>;

  return <div className="space-y-4">
    <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
      <p className="text-[13px] font-medium text-ink-3">{th ? `${projects.length} ประกาศ` : `${projects.length} posting${projects.length === 1 ? '' : 's'}`}</p>
      {create}
    </div>
    {actionError && <p role="alert" className="ui-alert ui-alert-danger">{actionError}</p>}
    <ul className="space-y-3">
      {projects.map(project => {
        const card = projectCard(project, lang);
        const open = card.availability === 'open';
        const manuallyClosed = project.procurementStatus === 'closed';
        const expired = !open && !manuallyClosed;
        return <li key={project._id} className="ui-card ui-card-interactive p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`ui-badge ui-badge-dot ${open ? 'ui-badge-ok' : 'ui-badge-neutral'}`}>
              {open ? (th ? 'เปิดรับอยู่' : 'Open') : manuallyClosed ? (th ? 'ปิดรับแล้ว' : 'Closed') : (th ? 'เลยวันปิดรับ' : 'Deadline passed')}
            </span>
            {card.priceFlag && card.priceFlag !== 'Normal' && <span title={card.priceComparison || undefined} className="ui-badge ui-badge-danger">{card.priceFlagLabel}</span>}
            <span className="ml-auto font-mono text-[11px] text-ink-3">{card.displayId}</span>
          </div>
          <h2 className="text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">{card.name}</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div><dt className="ui-meta mb-0.5">{th ? 'ช่วงงบประมาณ' : 'Budget range'}</dt><dd className="font-medium tabular-nums text-ink">{card.price}</dd></div>
            <div><dt className="ui-meta mb-0.5">{th ? 'ปิดรับสมัคร' : 'Application deadline'}</dt><dd className="font-medium tabular-nums text-ink">{card.deadline}</dd></div>
            <div><dt className="ui-meta mb-0.5">{th ? 'เทียบงบกับ TOR ภาครัฐ' : 'Budget vs. government TORs'}</dt><dd className="font-medium text-ink">{card.priceComparison || (th ? 'ยังมีข้อมูลเปรียบเทียบไม่พอ' : 'Not enough comparable budgets yet')}</dd></div>
          </dl>
          {card.tags.length > 0 && <div className="flex flex-wrap gap-1.5">{card.tags.map(tag => <span key={tag} className="ui-chip">{tag}</span>)}</div>}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-line">
            <Link href={`/tor-page/${project._id}`} className="ui-btn ui-btn-secondary ui-btn-sm"><RiExternalLinkLine className="h-4 w-4" />{th ? 'ดูหน้าประกาศ' : 'View'}</Link>
            <Link href={`/postings/${project._id}/edit`} className="ui-btn ui-btn-secondary ui-btn-sm"><RiEditLine className="h-4 w-4" />{th ? 'แก้ไข' : 'Edit'}</Link>
            {open && <button type="button" disabled={busy === project._id} onClick={() => run(project._id, () => updatePosting(project._id, { procurementStatus: 'closed' }))} className="ui-btn ui-btn-secondary ui-btn-sm">{th ? 'ปิดรับสมัคร' : 'Close posting'}</button>}
            {manuallyClosed && <button type="button" disabled={busy === project._id} onClick={() => run(project._id, () => updatePosting(project._id, { procurementStatus: 'open' }))} className="ui-btn ui-btn-secondary ui-btn-sm">{th ? 'เปิดรับอีกครั้ง' : 'Reopen'}</button>}
            {expired && <Link href={`/postings/${project._id}/edit`} className="text-[13px] text-ink-3 underline underline-offset-4 hover:text-ink">{th ? 'ขยายวันปิดรับเพื่อเปิดอีกครั้ง' : 'Extend the deadline to reopen'}</Link>}
            <button type="button" disabled={busy === project._id} onClick={() => setConfirming(project)} className="ui-btn ui-btn-danger-ghost ui-btn-sm ml-auto"><RiDeleteBinLine className="h-4 w-4" />{th ? 'ลบ' : 'Delete'}</button>
          </div>
        </li>;
      })}
    </ul>
    {confirming && <div role="dialog" aria-modal="true" aria-labelledby="confirm-delete" className="ui-backdrop">
      <div className="ui-dialog">
        <h2 id="confirm-delete" className="ui-section-title text-lg">{th ? 'ลบประกาศนี้?' : 'Delete this posting?'}</h2>
        <p className="text-sm leading-relaxed text-ink-2">{th ? `"${confirming.title}" จะถูกลบถาวรและหายจากหน้าค้นหาและรายการจับคู่ของผู้ให้บริการ หากต้องการเก็บไว้ ให้ใช้ "ปิดรับสมัคร" แทน` : `"${confirming.title}" will be permanently removed from search and vendor matches. To keep it, close the posting instead.`}</p>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" autoFocus onClick={() => setConfirming(undefined)} className="ui-btn ui-btn-secondary">{th ? 'ยกเลิก' : 'Cancel'}</button>
          <button type="button" onClick={() => { const id = confirming._id; setConfirming(undefined); void run(id, () => deletePosting(id)); }} className="ui-btn ui-btn-danger">{th ? 'ลบประกาศ' : 'Delete posting'}</button>
        </div>
      </div>
    </div>}
  </div>;
}
