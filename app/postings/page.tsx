'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RiAddLine, RiBriefcase4Line, RiDeleteBinLine, RiEditLine, RiExternalLinkLine } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { ListerGate } from '@/component/postings/ListerGate';
import { TORCardSkeleton } from '@/component/TORCardSkeleton';
import { Project, projectCard } from '@/lib/projects';
import { deletePosting, getMyPostings, updatePosting } from '@/lib/postings';

// FR-13 / US6 / UC4: a Job Lister's postings with create, edit, close/reopen and delete.
export default function ManagePostingsPage() {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8 py-10 w-full space-y-6">
      <header className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-tormax-purple dark:text-tormax-lavender uppercase tracking-wider">
            <RiBriefcase4Line className="h-4 w-4" />
            <span>{th ? 'ประกาศงานตรงบน TORmax' : 'Direct postings'}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black mt-1">{th ? 'จัดการประกาศงาน' : 'Manage postings'}</h1>
          <p className="text-sm text-slate-500 mt-2">{th ? 'ประกาศงาน IT ถึงผู้ให้บริการที่มีทักษะตรง ผู้ให้บริการติดต่อคุณโดยตรงผ่านช่องทางที่ระบุ' : 'Reach vendors with matching skills. They contact you directly using the details you provide.'}</p>
        </div>
      </header>
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

  const create = <Link href="/postings/new" className="inline-flex items-center gap-1.5 rounded-xl bg-tormax-purple px-4 py-2.5 text-sm font-bold text-white hover:bg-tormax-purpleDeep"><RiAddLine className="h-4 w-4" />{th ? 'สร้างประกาศงาน' : 'Create job listing'}</Link>;

  if (result?.key !== retry && !result?.projects) return <TORCardSkeleton count={2} label={th ? 'กำลังโหลดประกาศของคุณ…' : 'Loading your postings…'} className="space-y-4" />;
  if (result?.error || !result?.projects) return <div role="alert" className="py-8 text-center space-y-3"><p>{th ? 'โหลดประกาศไม่สำเร็จ' : 'Could not load your postings.'}</p><button className="underline" onClick={() => setRetry(value => value + 1)}>{th ? 'ลองอีกครั้ง' : 'Retry'}</button></div>;

  const projects = result.projects;
  if (!projects.length) return <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center space-y-3">
    <p className="font-semibold">{th ? 'คุณยังไม่มีประกาศงาน' : 'You have no postings yet'}</p>
    <p className="text-sm text-slate-500 max-w-md mx-auto">{th ? 'ระบุขอบเขตงาน ทักษะที่ต้องใช้ งบประมาณ และวันปิดรับ ผู้ให้บริการที่ตรงจะได้รับแจ้งเตือนทันที' : 'Describe the scope, required skills, budget and deadline. Matching vendors are notified right away.'}</p>
    {create}
  </div>;

  return <div className="space-y-4">
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm text-slate-500">{th ? `${projects.length} ประกาศ` : `${projects.length} posting${projects.length === 1 ? '' : 's'}`}</p>
      {create}
    </div>
    {actionError && <p role="alert" className="text-sm font-semibold text-red-600 dark:text-red-400">{actionError}</p>}
    <ul className="space-y-4">
      {projects.map(project => {
        const card = projectCard(project, lang);
        const open = card.availability === 'open';
        const manuallyClosed = project.procurementStatus === 'closed';
        const expired = !open && !manuallyClosed;
        return <li key={project._id} className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-3 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${open ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
              {open ? (th ? 'เปิดรับอยู่' : 'Open') : manuallyClosed ? (th ? 'ปิดรับแล้ว' : 'Closed') : (th ? 'เลยวันปิดรับ' : 'Deadline passed')}
            </span>
            {card.priceFlag && card.priceFlag !== 'Normal' && <span title={card.priceComparison || undefined} className="rounded-full px-3 py-1 text-xs font-semibold bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-200">{card.priceFlagLabel}</span>}
            <span className="text-xs font-mono text-slate-500">{card.displayId}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{card.name}</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div><dt className="text-xs text-slate-500">{th ? 'ช่วงงบประมาณ' : 'Budget range'}</dt><dd className="font-semibold">{card.price}</dd></div>
            <div><dt className="text-xs text-slate-500">{th ? 'ปิดรับสมัคร' : 'Application deadline'}</dt><dd className="font-semibold">{card.deadline}</dd></div>
            <div><dt className="text-xs text-slate-500">{th ? 'เทียบงบกับ TOR ภาครัฐ' : 'Budget vs. government TORs'}</dt><dd className="font-semibold">{card.priceComparison || (th ? 'ยังมีข้อมูลเปรียบเทียบไม่พอ' : 'Not enough comparable budgets yet')}</dd></div>
          </dl>
          {card.tags.length > 0 && <div className="flex flex-wrap gap-2">{card.tags.map(tag => <span key={tag} className="text-xs rounded bg-slate-100 dark:bg-slate-800 px-2 py-1">{tag}</span>)}</div>}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 dark:border-tormax-borderDark text-xs font-bold">
            <Link href={`/tor-page/${project._id}`} className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-tormax-borderDark"><RiExternalLinkLine className="h-4 w-4" />{th ? 'ดูหน้าประกาศ' : 'View'}</Link>
            <Link href={`/postings/${project._id}/edit`} className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-tormax-borderDark"><RiEditLine className="h-4 w-4" />{th ? 'แก้ไข' : 'Edit'}</Link>
            {open && <button type="button" disabled={busy === project._id} onClick={() => run(project._id, () => updatePosting(project._id, { procurementStatus: 'closed' }))} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-tormax-borderDark disabled:opacity-50">{th ? 'ปิดรับสมัคร' : 'Close posting'}</button>}
            {manuallyClosed && <button type="button" disabled={busy === project._id} onClick={() => run(project._id, () => updatePosting(project._id, { procurementStatus: 'open' }))} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-tormax-borderDark disabled:opacity-50">{th ? 'เปิดรับอีกครั้ง' : 'Reopen'}</button>}
            {expired && <Link href={`/postings/${project._id}/edit`} className="text-slate-500 underline font-semibold">{th ? 'ขยายวันปิดรับเพื่อเปิดอีกครั้ง' : 'Extend the deadline to reopen'}</Link>}
            <button type="button" disabled={busy === project._id} onClick={() => setConfirming(project)} className="ml-auto inline-flex items-center gap-1 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-400/10 disabled:opacity-50"><RiDeleteBinLine className="h-4 w-4" />{th ? 'ลบ' : 'Delete'}</button>
          </div>
        </li>;
      })}
    </ul>
    {confirming && <div role="dialog" aria-modal="true" aria-labelledby="confirm-delete" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-6 space-y-4">
        <h2 id="confirm-delete" className="text-lg font-bold">{th ? 'ลบประกาศนี้?' : 'Delete this posting?'}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">{th ? `"${confirming.title}" จะถูกลบถาวรและหายจากหน้าค้นหาและรายการจับคู่ของผู้ให้บริการ หากต้องการเก็บไว้ ให้ใช้ "ปิดรับสมัคร" แทน` : `"${confirming.title}" will be permanently removed from search and vendor matches. To keep it, close the posting instead.`}</p>
        <div className="flex justify-end gap-3 text-sm font-bold">
          <button type="button" autoFocus onClick={() => setConfirming(undefined)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-tormax-borderDark">{th ? 'ยกเลิก' : 'Cancel'}</button>
          <button type="button" onClick={() => { const id = confirming._id; setConfirming(undefined); void run(id, () => deletePosting(id)); }} className="px-4 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700">{th ? 'ลบประกาศ' : 'Delete posting'}</button>
        </div>
      </div>
    </div>}
  </div>;
}
