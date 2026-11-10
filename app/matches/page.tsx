'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RiSparkling2Line } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { searchfeedi18n } from '@/public/mockData/i18n/searchfeed';
import { TORList } from '@/component/searchfeed/TORList';
import { TORCardSkeleton } from '@/component/TORCardSkeleton';
import { projectCard } from '@/lib/projects';
import { formatBudgetRange, getMatches, MatchResults, SignedOutError } from '@/lib/matches';

// UC1 / FR-11: open software TORs matched to the signed-in vendor's profile, best match first.
export default function MatchesPage() {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';
  const t = searchfeedi18n[activeLang];
  const { user, isLoading } = useAuth();
  const userId = user?._id;
  const [page, setPage] = useState(1);
  const [retry, setRetry] = useState(0);
  const [result, setResult] = useState<{ key: string; data?: MatchResults; error?: 'signedOut' | 'failed' }>();
  const key = `${userId}:${page}`;

  useEffect(() => {
    if (!userId) return;
    const controller = new AbortController();
    async function load() {
      try {
        const data = await getMatches(page, controller.signal);
        if (!controller.signal.aborted) setResult({ key: `${userId}:${page}`, data });
      } catch (error) {
        if (!controller.signal.aborted) setResult({ key: `${userId}:${page}`, error: error instanceof SignedOutError ? 'signedOut' : 'failed' });
      }
    }
    void load();
    return () => controller.abort();
  }, [userId, page, retry]);

  // Matches refresh in the background as new TORs finish analysis; pick them up without a reload.
  useEffect(() => {
    const timer = setInterval(() => setRetry(value => value + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  const loading = isLoading || (Boolean(user) && result?.key !== key);
  const data = !loading ? result?.data : undefined;
  const card = 'rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center space-y-3';
  const action = 'inline-block rounded-xl bg-tormax-purple px-4 py-2 text-sm font-bold text-white hover:bg-tormax-purpleDeep';

  let body;
  if (loading) {
    body = <TORCardSkeleton count={3} label={th ? 'กำลังโหลด TOR ที่ตรงกับคุณ…' : 'Loading your matches…'} className="space-y-4" />;
  } else if (!user || result?.error === 'signedOut') {
    body = <div className={card}>
      <p className="font-semibold">{th ? 'เข้าสู่ระบบเพื่อดู TOR ที่ตรงกับทักษะของคุณ' : 'Sign in to see TORs that match your skills'}</p>
      <Link href="/login" className={action}>{th ? 'เข้าสู่ระบบ' : 'Sign in'}</Link>
    </div>;
  } else if (result?.error || !data) {
    body = <div role="alert" className={card}>
      <p>{th ? 'โหลด TOR ที่ตรงกับคุณไม่สำเร็จ' : 'Could not load your matches.'}</p>
      <button className="underline" onClick={() => setRetry(value => value + 1)}>{th ? 'ลองอีกครั้ง' : 'Retry'}</button>
    </div>;
  } else if (data.total === 0) {
    // UC1 E1: explain why the list is empty and how to widen it.
    const { profile } = data;
    body = !profile.isVendor ? <div className={card}>
      <p className="font-semibold">{th ? 'การจับคู่ TOR ใช้ได้กับบัญชีผู้ให้บริการ (Vendor) เท่านั้น' : 'TOR matching is available for vendor accounts.'}</p>
      <Link href="/search-feed" className="underline text-sm">{th ? 'ค้นหา TOR ทั้งหมด' : 'Browse all TORs'}</Link>
    </div> : !profile.hasSkills ? <div className={card}>
      <p className="font-semibold">{th ? 'เพิ่มทักษะในโปรไฟล์เพื่อเริ่มจับคู่ TOR' : 'Add your skills to start getting matches'}</p>
      <p className="text-sm text-slate-500 max-w-md mx-auto">{th ? 'เราเทียบทักษะที่ TOR กำหนดกับทักษะในโปรไฟล์ของคุณ และแจ้งเตือนเมื่อพบงานที่ตรงกัน' : 'We compare the skills each TOR requires with the skills on your profile, and alert you when one matches.'}</p>
      <Link href="/profile" className={action}>{th ? 'แก้ไขโปรไฟล์' : 'Edit profile'}</Link>
    </div> : <div className={card}>
      <p className="font-semibold">{th ? 'ยังไม่มี TOR ที่เปิดรับซึ่งตรงกับโปรไฟล์ของคุณ' : 'No open TORs match your profile right now'}</p>
      <p className="text-sm text-slate-500 max-w-md mx-auto">{th
        ? `ตอนนี้คุณตั้งเกณฑ์ความตรงกันไว้ ${profile.matchThreshold}% และช่วงงบประมาณ ${formatBudgetRange(profile, activeLang)} ลดเกณฑ์หรือขยายช่วงงบประมาณเพื่อดูงานเพิ่มเติม`
        : `Your match threshold is ${profile.matchThreshold}% and your budget range is ${formatBudgetRange(profile, activeLang)}. Lower the threshold or widen the range to see more.`}</p>
      <p className="text-xs text-slate-500">{th ? 'TOR ใหม่จะถูกจับคู่ทันทีที่ AI วิเคราะห์เอกสารเสร็จ' : 'New TORs are matched as soon as AI finishes analyzing them.'}</p>
      <Link href="/profile" className={action}>{th ? 'ปรับเกณฑ์การจับคู่' : 'Adjust match criteria'}</Link>
    </div>;
  } else {
    body = <>
      <p className="text-sm text-slate-500 mb-4">{data.total}{t.itemsFoundSuffix} · {th ? `เกณฑ์ ${data.profile.matchThreshold}% · งบ ${formatBudgetRange(data.profile, activeLang)}` : `threshold ${data.profile.matchThreshold}% · budget ${formatBudgetRange(data.profile, activeLang)}`} · <Link href="/profile" className="underline">{th ? 'ปรับ' : 'Adjust'}</Link></p>
      <TORList items={data.projects.map(project => projectCard(project, activeLang, project.match.percentage))} t={t} />
      {data.total > data.limit && <nav aria-label={th ? 'หน้าผลลัพธ์' : 'Result pages'} className="flex justify-center items-center gap-4 pt-6">
        <button className="px-4 py-2 rounded-xl border disabled:opacity-40" disabled={data.page <= 1} onClick={() => setPage(data.page - 1)}>{th ? 'ก่อนหน้า' : 'Previous'}</button>
        <span>{data.page} / {Math.ceil(data.total / data.limit)}</span>
        <button className="px-4 py-2 rounded-xl border disabled:opacity-40" disabled={data.page * data.limit >= data.total} onClick={() => setPage(data.page + 1)}>{th ? 'ถัดไป' : 'Next'}</button>
      </nav>}
    </>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 w-full space-y-6">
      <header className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-tormax-purple dark:text-tormax-lavender uppercase tracking-wider">
          <RiSparkling2Line className="h-4 w-4" />
          <span>{th ? 'จับคู่จากโปรไฟล์ของคุณ' : 'Matched to your profile'}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black mt-1">{th ? 'TOR ที่ตรงกับคุณ' : 'Matched opportunities'}</h1>
        <p className="text-sm text-slate-500 mt-2">{th ? 'งาน IT ที่เปิดรับซึ่งต้องการทักษะที่คุณมี และงบประมาณอยู่ในช่วงที่คุณตั้งไว้ เรียงจากตรงที่สุด' : 'Open IT TORs that need the skills you have, within your budget range. Best matches first.'}</p>
      </header>
      <div aria-live="polite" aria-busy={loading}>{body}</div>
    </div>
  );
}
