'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
  return <section id="daily-digest" className="space-y-6"><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-2xl font-bold">{th ? 'งานที่ใกล้ปิดรับข้อเสนอ' : 'Upcoming submission deadlines'}</h2><p className="mt-2 text-sm text-slate-500">{th ? 'งานซอฟต์แวร์และเทคโนโลยีจากฐานข้อมูลจริง พร้อมวันปิดรับและเอกสาร TOR' : 'Software and technology listings with verified deadlines and TOR documents.'}</p></div><Link href="/search-feed" className="text-sm font-bold text-tormax-purple dark:text-tormax-lavender">{th ? 'ค้นหางานทั้งหมด →' : 'Search opportunities →'}</Link></div>{error ? <div role="alert" className="text-sm"><p>{th ? 'โหลดข้อมูลไม่สำเร็จ' : 'Could not load opportunities.'}</p><button className="underline mt-2" onClick={() => setRetry(value => value + 1)}>{th ? 'ลองใหม่' : 'Retry'}</button></div> : !data ? <TORCardSkeleton count={4} label={th ? 'กำลังโหลด…' : 'Loading…'} className="grid md:grid-cols-2 gap-5" /> : data.projects.length ? <div className="grid md:grid-cols-2 gap-5">{data.projects.map(project => <TORCard key={project._id} item={projectCard(project, activeLang)} t={t} />)}</div> : <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center"><p className="font-semibold">{th ? 'ยังไม่มีงานที่ยืนยันว่าเปิดรับอยู่' : 'No verified open opportunities yet.'}</p><p className="mt-2 text-sm text-slate-500">{th ? 'งานจะแสดงเมื่อยืนยันวันปิดรับ สถานะ และเอกสารต้นฉบับได้แล้ว' : 'Listings appear once deadlines, status and original documents are verified.'}</p></div>}</section>;
}
