'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { searchfeedi18n } from '@/public/mockData/i18n/searchfeed';
import { SearchHeader } from '@/component/searchfeed/SearchHeader';
import { SearchInput } from '@/component/searchfeed/SearchInput';
import { TORList } from '@/component/searchfeed/TORList';
import { getProjects, projectCard, ProjectResults } from '@/lib/projects';

function SearchFeedContent() {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';
  const t = searchfeedi18n[activeLang];
  const params = useSearchParams();
  const query = params.get('q') || '';
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [retry, setRetry] = useState(0);
  const [result, setResult] = useState<{ key: string; data?: ProjectResults; error?: boolean }>();
  const apiParams = new URLSearchParams({ search: query.trim(), limit: '20' });
  for (const key of ['agency', 'minBudget', 'maxBudget', 'page']) {
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

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(window.location.search);
    if (value) next.set(key, value); else next.delete(key);
    if (key !== 'page') next.delete('page');
    window.history.replaceState(null, '', `/search-feed${next.size ? `?${next}` : ''}`);
  };
  const data = !loading ? result?.data : undefined;
  const fieldClass = 'w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm';

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 w-full space-y-6">
      <SearchHeader title={t.title} subtitle={th ? 'ค้นหา TOR ที่บันทึกไว้ในฐานข้อมูล' : 'Search TORs saved in the database'} onFilterClick={() => setFiltersOpen(!filtersOpen)} filterBtnText={th ? 'ตัวกรอง' : 'Filters'} />
      <SearchInput value={query} onChange={value => update('q', value)} placeholder={th ? 'ค้นหาชื่อโครงการ หน่วยงาน รหัส TOR สรุป หรือทักษะ...' : 'Search title, agency, TOR ID, summary, or skills...'} />
      {filtersOpen && <div className="grid sm:grid-cols-3 gap-4">
        <label className="text-sm space-y-2"><span>{th ? 'หน่วยงาน' : 'Agency'}</span><input className={fieldClass} value={params.get('agency') || ''} onChange={e => update('agency', e.target.value)} /></label>
        <label className="text-sm space-y-2"><span>{th ? 'งบประมาณขั้นต่ำ (บาท)' : 'Minimum budget (THB)'}</span><input className={fieldClass} type="number" min="0" value={params.get('minBudget') || ''} onChange={e => update('minBudget', e.target.value)} /></label>
        <label className="text-sm space-y-2"><span>{th ? 'งบประมาณสูงสุด (บาท)' : 'Maximum budget (THB)'}</span><input className={fieldClass} type="number" min="0" value={params.get('maxBudget') || ''} onChange={e => update('maxBudget', e.target.value)} /></label>
      </div>}
      {params.size > 0 && <button className="text-sm text-tormax-purple dark:text-tormax-lavender underline" onClick={() => window.history.replaceState(null, '', '/search-feed')}>{th ? 'ล้างการค้นหาและตัวกรอง' : 'Clear search and filters'}</button>}
      <div aria-live="polite" aria-busy={loading}>
        {loading ? <p className="py-8 text-center">{t.loading}</p> : result?.error ? <div role="alert" className="py-8 text-center space-y-3"><p>{th ? 'โหลด TOR ไม่สำเร็จ ตรวจสอบการเชื่อมต่อและช่วงงบประมาณ แล้วลองใหม่' : 'Could not load TORs. Check your connection and budget range, then try again.'}</p><button className="underline" onClick={() => setRetry(value => value + 1)}>{th ? 'ลองอีกครั้ง' : 'Retry'}</button></div> : data && <>
          <p className="text-sm text-slate-500 mb-4">{data.total}{t.itemsFoundSuffix}</p>
          <TORList items={data.projects.map(project => projectCard(project, activeLang))} t={t} />
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
