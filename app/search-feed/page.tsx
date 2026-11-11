'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { RiFileSearchLine } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { searchfeedi18n } from '@/public/mockData/i18n/searchfeed';
import { SearchHeader } from '@/component/searchfeed/SearchHeader';
import { SearchInput } from '@/component/searchfeed/SearchInput';
import { TORList } from '@/component/searchfeed/TORList';
import { TORCardSkeleton } from '@/component/TORCardSkeleton';
import { Pagination } from '@/component/Pagination';
import { availabilityLabel, getProjects, priceFlagLabel, projectCard, ProjectResults } from '@/lib/projects';

function SearchFeedContent() {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';
  // Suggest the signed-in vendor's own skills in the stack filter.
  const { user } = useAuth();
  const mySkills = (user?.proficiency || []).flatMap(skill => typeof skill === 'string' ? [] : [skill.name]);
  const t = searchfeedi18n[activeLang];
  const params = useSearchParams();
  const query = params.get('q') || '';
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [retry, setRetry] = useState(0);
  const [result, setResult] = useState<{ key: string; data?: ProjectResults; error?: boolean }>();
  const apiParams = new URLSearchParams({ search: query.trim(), limit: '20', availability: params.get('availability') || 'open' });
  for (const key of ['agency', 'minBudget', 'maxBudget', 'page', 'deadlineYear', 'deadlineFrom', 'deadlineTo', 'method', 'sort', 'priceFlag', 'origin', 'skill']) {
    const value = params.get(key);
    if (value) apiParams.set(key, value);
  }
  const requestKey = apiParams.toString();
  const loading = result?.key !== requestKey;

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const data = await getProjects(new URLSearchParams(requestKey), controller.signal);
        if (!controller.signal.aborted) setResult({ key: requestKey, data });
      } catch {
        if (!controller.signal.aborted) setResult({ key: requestKey, error: true });
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
    window.history.replaceState(null, '', `/search-feed${next.size ? `?${next}` : ''}`);
  };
  const data = !loading ? result?.data : undefined;
  const drafts = params.get('availability') === 'draft';
  useEffect(() => {
    if (!data || data.page <= 1 || data.projects.length > 0) return;
    const next = new URLSearchParams(window.location.search);
    next.delete('page');
    window.history.replaceState(null, '', `/search-feed?${next}`);
  }, [data]);
  const fieldClass = 'ui-field';
  const fieldLabel = 'space-y-1.5';
  const resetFilters = () => window.history.replaceState(null, '', '/search-feed');

  return (
    <div className="ui-page space-y-6">
      <SearchHeader title={th ? 'TOR และประกาศงาน IT' : 'IT TORs & job postings'} subtitle={th ? 'ตรวจสอบวันปิดรับ เอกสารต้นฉบับ และรายละเอียดก่อนยื่นข้อเสนอ' : 'Review closing deadlines, original documents and requirements before applying.'} onFilterClick={() => setFiltersOpen(!filtersOpen)} filterBtnText={th ? 'ตัวกรอง' : 'Filters'} filtersOpen={filtersOpen} />
      <div className="space-y-3">
        <SearchInput value={query} onChange={value => update('q', value)} placeholder={th ? 'ค้นหาชื่อโครงการ หน่วยงาน รหัส TOR สรุป หรือทักษะ...' : 'Search title, agency, TOR ID, summary, or skills...'} />
        <p className="ui-hint max-w-3xl">{th ? 'แสดงงาน IT แบบ e-bidding ตามสถานะที่เลือก (เปิดรับหรือร่างประกาศ) พร้อมชื่อ งบประมาณ วันประกาศ วันปิดรับ และสรุป TOR จาก AI รวมถึงประกาศงานที่ผู้ประกาศลงบน TORmax โดยตรง' : 'Shows IT e-bidding TORs in the selected status (open or draft) with a title, budget, publication date, deadline, and AI summary, plus jobs posted directly on TORmax.'}</p>
      </div>
      {filtersOpen && <div className="ui-card ui-reveal grid gap-x-5 gap-y-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
        {/* NFR-09: stack, agency and budget come first; each applies as you type, no Apply button. */}
        <label className={fieldLabel}><span className="ui-label">{th ? 'ทักษะ / เทคโนโลยี' : 'Tech stack'}</span><input className={fieldClass} list="stack-suggestions" placeholder={th ? 'เช่น React, Java' : 'e.g. React, Java'} value={params.get('skill') || ''} onChange={e => update('skill', e.target.value)} /><datalist id="stack-suggestions">{mySkills.map(name => <option key={name} value={name} />)}</datalist></label>
        <label className={fieldLabel}><span className="ui-label">{th ? 'หน่วยงาน' : 'Agency'}</span><input className={fieldClass} value={params.get('agency') || ''} onChange={e => update('agency', e.target.value)} /></label>
        <label className={fieldLabel}><span className="ui-label">{th ? 'งบประมาณขั้นต่ำ (บาท)' : 'Minimum budget (THB)'}</span><input className={fieldClass} type="number" min="0" value={params.get('minBudget') || ''} onChange={e => update('minBudget', e.target.value)} /></label>
        <label className={fieldLabel}><span className="ui-label">{th ? 'งบประมาณสูงสุด (บาท)' : 'Maximum budget (THB)'}</span><input className={fieldClass} type="number" min="0" value={params.get('maxBudget') || ''} onChange={e => update('maxBudget', e.target.value)} /></label>
        <label className={fieldLabel}><span className="ui-label">{th ? 'สถานะ' : 'Status'}</span><select className={fieldClass} value={params.get('availability') || 'open'} onChange={e => update('availability', e.target.value === 'open' ? '' : e.target.value)}>{['open', 'draft'].map(value => <option key={value} value={value}>{availabilityLabel(value, activeLang)}</option>)}</select></label>
        <label className={fieldLabel}><span className="ui-label">{th ? 'ปีที่ปิดรับ (พ.ศ.)' : 'Closing year (B.E.)'}</span><input className={fieldClass} type="number" min="2543" max="2743" placeholder={String(new Date().getFullYear() + 543)} value={params.get('deadlineYear') || ''} onChange={e => update('deadlineYear', e.target.value)} /></label>
        <label className={fieldLabel}><span className="ui-label">{th ? 'ปิดรับตั้งแต่วันที่' : 'Closing from'}</span><input className={fieldClass} type="date" value={params.get('deadlineFrom') || ''} onChange={e => update('deadlineFrom', e.target.value)} /></label>
        <label className={fieldLabel}><span className="ui-label">{th ? 'ปิดรับถึงวันที่' : 'Closing through'}</span><input className={fieldClass} type="date" value={params.get('deadlineTo') || ''} onChange={e => update('deadlineTo', e.target.value)} /></label>
        <label className={fieldLabel}><span className="ui-label">{th ? 'วิธีจัดซื้อจัดจ้าง' : 'Procurement method'}</span><input className={fieldClass} placeholder="e-bidding" value={params.get('method') || ''} onChange={e => update('method', e.target.value)} /></label>
        <label className={fieldLabel}><span className="ui-label">{th ? 'เรียงตาม' : 'Sort by'}</span><select className={fieldClass} value={params.get('sort') || 'deadline'} onChange={e => update('sort', e.target.value)}><option value="deadline">{th ? 'ใกล้ปิดรับก่อน' : 'Closing soonest'}</option><option value="newest">{th ? 'ประกาศล่าสุด' : 'Recently announced'}</option><option value="budget">{th ? 'งบประมาณสูงสุด' : 'Highest budget'}</option></select></label>
        <label className={fieldLabel}><span className="ui-label">{th ? 'ตรวจสอบงบประมาณ' : 'Budget check'}</span><select className={fieldClass} value={params.get('priceFlag') || ''} onChange={e => update('priceFlag', e.target.value)}><option value="">{th ? 'ทั้งหมด' : 'Any'}</option>{(['Overpriced', 'Underpriced', 'ScopeMismatch', 'Normal'] as const).map(flag => <option key={flag} value={flag}>{priceFlagLabel(flag, activeLang)}</option>)}</select></label>
        <label className={fieldLabel}><span className="ui-label">{th ? 'แหล่งที่มา' : 'Source'}</span><select className={fieldClass} value={params.get('origin') || ''} onChange={e => update('origin', e.target.value)}><option value="">{th ? 'ทั้งหมด' : 'All'}</option><option value="government">{th ? 'TOR ภาครัฐ' : 'Government TORs'}</option><option value="direct">{th ? 'ประกาศตรงบน TORmax' : 'Direct postings'}</option></select></label>
      </div>}
      <div aria-live="polite" aria-busy={loading} className="space-y-4">
        {(data || params.size > 0) && <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
          <p className="text-[13px] font-medium text-ink-3">{data && <><span className="tabular-nums text-ink">{data.total}</span>{t.itemsFoundSuffix}</>}</p>
          {params.size > 0 && <button className="ui-link text-[13px]" onClick={resetFilters}>{th ? 'ล้างการค้นหาและตัวกรอง' : 'Clear search and filters'}</button>}
        </div>}
        {loading ? <TORCardSkeleton count={4} label={t.loading} className="space-y-3" /> : result?.error ? <div role="alert" className="ui-empty"><p className="max-w-md text-sm text-ink-2">{th ? 'โหลด TOR ไม่สำเร็จ ตรวจสอบการเชื่อมต่อและช่วงงบประมาณ แล้วลองใหม่' : 'Could not load TORs. Check your connection and budget range, then try again.'}</p><button className="ui-btn ui-btn-secondary ui-btn-sm mt-2" onClick={() => setRetry(value => value + 1)}>{th ? 'ลองอีกครั้ง' : 'Retry'}</button></div> : data && <>
          {data.total === 0 ? <div className="ui-empty"><div className="ui-empty-icon"><RiFileSearchLine size={20} /></div><p className="font-medium text-ink">{drafts ? (th ? 'ยังไม่มีร่าง TOR ที่ตรงกับเงื่อนไขนี้' : 'No draft TORs match these filters.') : (th ? 'ยังไม่มีงานที่ผ่านเงื่อนไขนี้' : 'No open, fully analyzed TORs match these filters.')}</p><p className="max-w-lg text-sm text-ink-3">{drafts ? (th ? 'ร่าง TOR จะแสดงเมื่อพบในประกาศต้นทางภายใน 24 ชั่วโมงที่ผ่านมา ร่างส่วนใหญ่ยังไม่ระบุวันปิดรับ ตัวกรองวันปิดรับจึงอาจซ่อนร่างไว้' : 'Drafts appear while the source portal still lists them (checked within the last 24 hours). Most drafts have no closing date yet, so closing-date filters hide them.') : (th ? 'งานจะแสดงเมื่อ AI วิเคราะห์ข้อมูลครบและยืนยันเอกสารต้นทางแล้ว' : 'Listings appear after AI extracts all required fields and source documents are verified.')}</p>{params.size > 0 && <button className="ui-btn ui-btn-primary ui-btn-sm mt-3" onClick={resetFilters}>{th ? 'รีเซ็ตตัวกรอง' : 'Reset Filters'}</button>}</div> : <TORList items={data.projects.map(project => projectCard(project, activeLang))} t={t} />}
          {data.total > data.limit && <Pagination page={data.page} total={data.total} limit={data.limit} onChange={page => update('page', String(page))} ariaLabel={th ? 'หน้าผลการค้นหา' : 'Search result pages'} previousLabel={th ? 'ก่อนหน้า' : 'Previous'} nextLabel={th ? 'ถัดไป' : 'Next'} />}
        </>}
      </div>
    </div>
  );
}

export default function SearchFeedPage() {
  return <Suspense fallback={<div className="p-10 text-center text-sm text-ink-3">Loading...</div>}><SearchFeedContent /></Suspense>;
}
