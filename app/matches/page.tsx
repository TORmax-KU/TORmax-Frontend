'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { RiSparkling2Line } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { searchfeedi18n } from '@/public/mockData/i18n/searchfeed';
import { TORList } from '@/component/searchfeed/TORList';
import { TORCardSkeleton } from '@/component/TORCardSkeleton';
import { PageHeader } from '@/component/PageHeader';
import { Pagination } from '@/component/Pagination';
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
  // True while the pending reload came from the auto-refresh timer, not the user (NFR-07).
  const autoRefresh = useRef(false);
  const [result, setResult] = useState<{ key: string; data?: MatchResults; error?: 'signedOut' | 'failed' }>();
  const key = `${userId}:${page}`;

  useEffect(() => {
    if (!userId) return;
    const controller = new AbortController();
    const background = autoRefresh.current;
    autoRefresh.current = false;
    async function load() {
      try {
        const data = await getMatches(page, controller.signal, background);
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
    const timer = setInterval(() => { autoRefresh.current = true; setRetry(value => value + 1); }, 60000);
    return () => clearInterval(timer);
  }, []);

  const loading = isLoading || (Boolean(user) && result?.key !== key);
  const data = !loading ? result?.data : undefined;
  const card = 'ui-empty py-14';
  const action = 'ui-btn ui-btn-primary ui-btn-sm mt-3';

  let body;
  if (loading) {
    body = <TORCardSkeleton count={3} label={th ? 'กำลังโหลด TOR ที่ตรงกับคุณ…' : 'Loading your matches…'} className="space-y-3" />;
  } else if (!user || result?.error === 'signedOut') {
    body = <div className={card}>
      <div className="ui-empty-icon"><RiSparkling2Line className="h-5 w-5" /></div>
      <p className="font-medium text-ink">{th ? 'เข้าสู่ระบบเพื่อดู TOR ที่ตรงกับทักษะของคุณ' : 'Sign in to see TORs that match your skills'}</p>
      <Link href="/login" className={action}>{th ? 'เข้าสู่ระบบ' : 'Sign in'}</Link>
    </div>;
  } else if (result?.error || !data) {
    body = <div role="alert" className={card}>
      <p className="text-sm text-ink-2">{th ? 'โหลด TOR ที่ตรงกับคุณไม่สำเร็จ' : 'Could not load your matches.'}</p>
      <button className="ui-btn ui-btn-secondary ui-btn-sm mt-2" onClick={() => setRetry(value => value + 1)}>{th ? 'ลองอีกครั้ง' : 'Retry'}</button>
    </div>;
  } else if (data.total === 0) {
    // UC1 E1: explain why the list is empty and how to widen it.
    const { profile } = data;
    body = !profile.isVendor ? <div className={card}>
      <p className="font-medium text-ink">{th ? 'การจับคู่ TOR ใช้ได้กับบัญชีผู้ให้บริการ (Vendor) เท่านั้น' : 'TOR matching is available for vendor accounts.'}</p>
      <Link href="/search-feed" className="ui-link mt-1 text-sm">{th ? 'ค้นหา TOR ทั้งหมด' : 'Browse all TORs'}</Link>
    </div> : !profile.hasSkills ? <div className={card}>
      <div className="ui-empty-icon"><RiSparkling2Line className="h-5 w-5" /></div>
      <p className="font-medium text-ink">{th ? 'เพิ่มทักษะในโปรไฟล์เพื่อเริ่มจับคู่ TOR' : 'Add your skills to start getting matches'}</p>
      <p className="text-sm text-ink-3 max-w-md mx-auto">{th ? 'เราเทียบทักษะที่ TOR กำหนดกับทักษะในโปรไฟล์ของคุณ และแจ้งเตือนเมื่อพบงานที่ตรงกัน' : 'We compare the skills each TOR requires with the skills on your profile, and alert you when one matches.'}</p>
      <Link href="/profile" className={action}>{th ? 'แก้ไขโปรไฟล์' : 'Edit profile'}</Link>
    </div> : <div className={card}>
      <p className="font-medium text-ink">{th ? 'ยังไม่มี TOR ที่เปิดรับซึ่งตรงกับโปรไฟล์ของคุณ' : 'No open TORs match your profile right now'}</p>
      <p className="text-sm text-ink-3 max-w-md mx-auto">{th
        ? `ตอนนี้คุณตั้งเกณฑ์ความตรงกันไว้ ${profile.matchThreshold}% และช่วงงบประมาณ ${formatBudgetRange(profile, activeLang)} ลดเกณฑ์หรือขยายช่วงงบประมาณเพื่อดูงานเพิ่มเติม`
        : `Your match threshold is ${profile.matchThreshold}% and your budget range is ${formatBudgetRange(profile, activeLang)}. Lower the threshold or widen the range to see more.`}</p>
      <p className="ui-meta">{th ? 'TOR ใหม่จะถูกจับคู่ทันทีที่ AI วิเคราะห์เอกสารเสร็จ' : 'New TORs are matched as soon as AI finishes analyzing them.'}</p>
      <Link href="/profile" className={action}>{th ? 'ปรับเกณฑ์การจับคู่' : 'Adjust match criteria'}</Link>
    </div>;
  } else {
    body = <>
      <p className="mb-4 border-b border-line pb-3 text-[13px] text-ink-3"><span className="font-medium tabular-nums text-ink">{data.total}</span>{t.itemsFoundSuffix} · {th ? `เกณฑ์ ${data.profile.matchThreshold}% · งบ ${formatBudgetRange(data.profile, activeLang)}` : `threshold ${data.profile.matchThreshold}% · budget ${formatBudgetRange(data.profile, activeLang)}`} · <Link href="/profile" className="ui-link">{th ? 'ปรับ' : 'Adjust'}</Link></p>
      <TORList items={data.projects.map(project => projectCard(project, activeLang, project.match.percentage))} t={t} />
      {data.total > data.limit && <Pagination page={data.page} total={data.total} limit={data.limit} onChange={setPage} ariaLabel={th ? 'หน้าผลลัพธ์' : 'Result pages'} previousLabel={th ? 'ก่อนหน้า' : 'Previous'} nextLabel={th ? 'ถัดไป' : 'Next'} />}
    </>;
  }

  return (
    <div className="ui-page space-y-6">
      <PageHeader
        className="pb-2"
        eyebrow={<><RiSparkling2Line className="h-3.5 w-3.5" /><span>{th ? 'จับคู่จากโปรไฟล์ของคุณ' : 'Matched to your profile'}</span></>}
        title={th ? 'TOR ที่ตรงกับคุณ' : 'Matched opportunities'}
        description={th ? 'งาน IT ที่เปิดรับซึ่งต้องการทักษะที่คุณมี และงบประมาณอยู่ในช่วงที่คุณตั้งไว้ เรียงจากตรงที่สุด' : 'Open IT TORs that need the skills you have, within your budget range. Best matches first.'}
      />
      <div aria-live="polite" aria-busy={loading}>{body}</div>
    </div>
  );
}
