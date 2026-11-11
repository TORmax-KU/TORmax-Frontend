'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RiArrowRightLine, RiFileSearchLine } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { getProjects, projectCard, ProjectResults } from '@/lib/projects';
import { TORCard } from './searchfeed/TORCard';
import { TORCardSkeleton } from './TORCardSkeleton';

export function LiveOpportunities() {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';
  const [data, setData] = useState<ProjectResults>();
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try { const result = await getProjects(new URLSearchParams({ limit: '6', sort: 'deadline' }), controller.signal); if (!controller.signal.aborted) { setData(result); setError(false); } }
      catch { if (!controller.signal.aborted) setError(true); }
    };
    void load();
    const timer = setInterval(load, 60000);
    return () => { controller.abort(); clearInterval(timer); };
  }, [retry]);
  const t = { source: th ? 'ที่มา' : 'Source', method: th ? 'วิธี' : 'Method', deadline: th ? 'ปิดรับ' : 'Closes', openSpec: th ? 'ดูรายละเอียด' : 'View details' };
  return (
    <section id="daily-digest" className="scroll-mt-24 space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="ui-title">{th ? 'งานที่ใกล้ปิดรับข้อเสนอ' : 'Upcoming submission deadlines'}</h2>
          <p className="ui-lede">{th ? 'งานซอฟต์แวร์และเทคโนโลยีจากฐานข้อมูลจริง พร้อมวันปิดรับและเอกสาร TOR' : 'Software and technology listings with verified deadlines and TOR documents.'}</p>
        </div>
        <Link href="/search-feed" className="ui-link group text-sm">
          {th ? 'ค้นหางานทั้งหมด' : 'Search opportunities'}
          <RiArrowRightLine size={16} className="transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </div>
      {error ? (
        <div role="alert" className="ui-empty">
          <p className="text-sm font-medium text-ink">{th ? 'โหลดข้อมูลไม่สำเร็จ' : 'Could not load opportunities.'}</p>
          <button className="ui-btn ui-btn-secondary ui-btn-sm mt-2" onClick={() => setRetry(value => value + 1)}>{th ? 'ลองใหม่' : 'Retry'}</button>
        </div>
      ) : !data ? (
        <TORCardSkeleton count={3} label={th ? 'กำลังโหลด…' : 'Loading…'} className="space-y-3" />
      ) : data.projects.length ? (
        <div className="space-y-3">{data.projects.map(project => <TORCard key={project._id} item={projectCard(project, activeLang)} t={t} />)}</div>
      ) : (
        <div className="ui-empty">
          <div className="ui-empty-icon"><RiFileSearchLine size={20} /></div>
          <p className="font-medium text-ink">{th ? 'ยังไม่มีงานที่ยืนยันว่าเปิดรับอยู่' : 'No verified open opportunities yet.'}</p>
          <p className="max-w-md text-sm text-ink-3">{th ? 'งานจะแสดงเมื่อยืนยันวันปิดรับ สถานะ และเอกสารต้นฉบับได้แล้ว' : 'Listings appear once deadlines, status and original documents are verified.'}</p>
        </div>
      )}
    </section>
  );
}
