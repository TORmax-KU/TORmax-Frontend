'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { searchfeedi18n } from '@/public/mockData/i18n/searchfeed';
import { SearchHeader } from '@/component/searchfeed/SearchHeader';
import { SearchInput } from '@/component/searchfeed/SearchInput';
import { TORList } from '@/component/searchfeed/TORList';
import { getProjects, projectCard, ProjectResults } from '@/lib/projects';
import { IngestionNotice } from '@/component/searchfeed/IngestionNotice';

function SearchFeedContent() {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';
  const t = searchfeedi18n[activeLang];
  const params = useSearchParams();
  const query = params.get('q') || '';
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [retry, setRetry] = useState(0);
  const [result, setResult] = useState<{ key: string; data?: ProjectResults; error?: boolean }>();
  const apiParams = new URLSearchParams({ search: query.trim(), limit: '20' });
  for (const key of ['agency', 'minBudget', 'maxBudget', 'page', 'deadlineYear', 'deadlineFrom', 'deadlineTo', 'availability', 'method', 'sort']) {
    const value = params.get(key);
    if (value) apiParams.set(key, value);
  }
  const requestKey = apiParams.toString();
  const loading = result?.key !== `${requestKey}:${retry}`;

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const data = await getProjects(new URLSearchParams(requestKey), controller.signal);
        if (!controller.signal.aborted) setResult({ key: `${requestKey}:${retry}`, data });
      } catch {
        if (!controller.signal.aborted) setResult({ key: `${requestKey}:${retry}`, error: true });
      }
    }, 300);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [requestKey, retry]);

  useEffect(() => {
    const timer = setInterval(() => setRetry(value => value + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(window.location.search);
    if (value) next.set(key, value); else next.delete(key);
    if (key !== 'page') next.delete('page');
    if (key === 'availability' && value === 'unknown') for (const dateKey of ['deadlineYear', 'deadlineFrom', 'deadlineTo']) next.delete(dateKey);
    window.history.replaceState(null, '', `/search-feed${next.size ? `?${next}` : ''}`);
  };
  const data = !loading ? result?.data : undefined;
  const fieldClass = 'w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm';

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 w-full space-y-6">
      <SearchHeader title={th ? 'งานซอฟต์แวร์และเทคโนโลยี' : 'Software & technology opportunities'} subtitle={th ? 'ตรวจสอบวันปิดรับ เอกสารต้นฉบับ และรายละเอียดก่อนยื่นข้อเสนอ' : 'Review closing deadlines, original documents and requirements before applying.'} onFilterClick={() => setFiltersOpen(!filtersOpen)} filterBtnText={th ? 'ตัวกรอง' : 'Filters'} />
      <SearchInput value={query} onChange={value => update('q', value)} placeholder={th ? 'ค้นหาชื่อโครงการ หน่วยงาน รหัส TOR สรุป หรือทักษะ...' : 'Search title, agency, TOR ID, summary, or skills...'} />
      <IngestionNotice status={result?.data?.ingestion} lang={activeLang} />
      <div className="flex gap-2 flex-wrap" aria-label={th ? 'สถานะการเปิดรับ' : 'Availability'}>
        {[['open', th ? 'ยังไม่ถึงวันปิดรับ' : 'Before closing deadline'], ['unknown', th ? 'ไม่พบกำหนดปิดรับ' : 'Deadline unknown']].map(([value, label]) => <button key={value} aria-pressed={(params.get('availability') || 'open') === value} onClick={() => update('availability', value)} className={`rounded-full px-4 py-2 text-sm border ${(params.get('availability') || 'open') === value ? 'bg-tormax-purple text-white border-tormax-purple' : 'border-slate-300 dark:border-slate-700'}`}>{label}</button>)}
      </div>
      {params.get('availability') === 'unknown' && <p className="text-sm text-amber-700 dark:text-amber-300">{th ? 'ไม่พบวันปิดรับไม่ได้หมายความว่าส่งได้เรื่อย ๆ กรุณายืนยันกับหน่วยงานก่อนเตรียมยื่นข้อเสนอ' : 'A missing deadline does not mean submissions remain open. Confirm with the agency before preparing a bid.'}</p>}
      {filtersOpen && <div className="grid sm:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <label className="text-sm space-y-2"><span>{th ? 'ปีที่ปิดรับ (พ.ศ.)' : 'Closing year (B.E.)'}</span><input className={fieldClass} type="number" min="2543" max="2743" placeholder={String(new Date().getFullYear() + 543)} disabled={params.get('availability') === 'unknown'} value={params.get('deadlineYear') || ''} onChange={e => update('deadlineYear', e.target.value)} /></label>
        <label className="text-sm space-y-2"><span>{th ? 'ปิดรับตั้งแต่วันที่' : 'Closing from'}</span><input className={fieldClass} type="date" disabled={params.get('availability') === 'unknown'} value={params.get('deadlineFrom') || ''} onChange={e => update('deadlineFrom', e.target.value)} /></label>
        <label className="text-sm space-y-2"><span>{th ? 'ปิดรับถึงวันที่' : 'Closing through'}</span><input className={fieldClass} type="date" disabled={params.get('availability') === 'unknown'} value={params.get('deadlineTo') || ''} onChange={e => update('deadlineTo', e.target.value)} /></label>
        <label className="text-sm space-y-2"><span>{th ? 'หน่วยงาน' : 'Agency'}</span><input className={fieldClass} value={params.get('agency') || ''} onChange={e => update('agency', e.target.value)} /></label>
        <label className="text-sm space-y-2"><span>{th ? 'งบประมาณขั้นต่ำ (บาท)' : 'Minimum budget (THB)'}</span><input className={fieldClass} type="number" min="0" value={params.get('minBudget') || ''} onChange={e => update('minBudget', e.target.value)} /></label>
        <label className="text-sm space-y-2"><span>{th ? 'งบประมาณสูงสุด (บาท)' : 'Maximum budget (THB)'}</span><input className={fieldClass} type="number" min="0" value={params.get('maxBudget') || ''} onChange={e => update('maxBudget', e.target.value)} /></label>
        <label className="text-sm space-y-2"><span>{th ? 'วิธีจัดซื้อจัดจ้าง' : 'Procurement method'}</span><input className={fieldClass} placeholder="e-bidding" value={params.get('method') || ''} onChange={e => update('method', e.target.value)} /></label>
        <label className="text-sm space-y-2"><span>{th ? 'เรียงตาม' : 'Sort by'}</span><select className={fieldClass} value={params.get('sort') || 'deadline'} onChange={e => update('sort', e.target.value)}><option value="deadline">{th ? 'ใกล้ปิดรับก่อน' : 'Closing soonest'}</option><option value="newest">{th ? 'ประกาศล่าสุด' : 'Recently announced'}</option><option value="budget">{th ? 'งบประมาณสูงสุด' : 'Highest budget'}</option></select></label>
      </div>}
      {params.size > 0 && <button className="text-sm text-tormax-purple dark:text-tormax-lavender underline" onClick={() => window.history.replaceState(null, '', '/search-feed')}>{th ? 'ล้างการค้นหาและตัวกรอง' : 'Clear search and filters'}</button>}
      <div aria-live="polite" aria-busy={loading}>
        {loading ? <p className="py-8 text-center">{t.loading}</p> : result?.error ? <div role="alert" className="py-8 text-center space-y-3"><p>{th ? 'โหลด TOR ไม่สำเร็จ ตรวจสอบการเชื่อมต่อและช่วงงบประมาณ แล้วลองใหม่' : 'Could not load TORs. Check your connection and budget range, then try again.'}</p><button className="underline" onClick={() => setRetry(value => value + 1)}>{th ? 'ลองอีกครั้ง' : 'Retry'}</button></div> : data && <>
          <p className="text-sm text-slate-500 mb-4">{data.total}{t.itemsFoundSuffix}</p>
          {data.total === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center space-y-2"><p className="font-semibold">{th ? 'ยังไม่มีงานที่ผ่านเงื่อนไขนี้' : 'No verified opportunities match these filters.'}</p><p className="text-sm text-slate-500">{th ? 'จะแสดงงานเมื่อยืนยันข้อมูลต้นทางและเอกสาร TOR ได้แล้ว งานหมดอายุ ประกาศผล หรือยกเลิกจะไม่ปรากฏในรายการ' : 'Listings appear after source and TOR verification. Expired, awarded and cancelled work is excluded.'}</p></div> : <TORList items={data.projects.map(project => projectCard(project, activeLang))} t={t} />}
          {data.total > data.limit && <nav aria-label={th ? 'หน้าผลการค้นหา' : 'Search result pages'} className="flex justify-center items-center gap-4 pt-6">
            <button className="px-4 py-2 rounded-xl border disabled:opacity-40" disabled={data.page <= 1} onClick={() => update('page', String(data.page - 1))}>{th ? 'ก่อนหน้า' : 'Previous'}</button>
            <span>{data.page} / {Math.ceil(data.total / data.limit)}</span>
            <button className="px-4 py-2 rounded-xl border disabled:opacity-40" disabled={data.page * data.limit >= data.total} onClick={() => update('page', String(data.page + 1))}>{th ? 'ถัดไป' : 'Next'}</button>
          </nav>}
        </>}
      </div>
    </div>
  );
}

export default function SearchFeedPage() {
  return <Suspense fallback={<div className="p-10 text-center">Loading...</div>}><SearchFeedContent /></Suspense>;
}
