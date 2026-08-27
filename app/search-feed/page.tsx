'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { initialTORs, Language } from '@/utils/mockData';
import { FilterState, TORItem } from '@/types';
import { FilterModal } from '@/component/FilterModal';
import { useApp } from '@/context/AppContext';

const INITIAL_FILTERS: FilterState = {
  query: '',
  method: 'ALL',
  agency: 'ALL',
  minBudget: '',
  maxBudget: '',
  requireIso: false,
  requireCapital: false,
};

// Localized dictionary for SearchFeed page
const i18n = {
  en: {
    title: 'Multi-Source TOR Directory',
    subtitle: 'Aggregated tenders across multiple public procurement platforms',
    filterBtn: '🎛️ Advanced Filters & Source Portals',
    searchPlaceholder: 'Filter directory by title, agency, or TOR ID...',
    showingResultsPrefix: 'Showing results for ',
    itemsFoundSuffix: ' items found',
    noResults: 'No TOR listings match your filter criteria. Try broadening parameters in the Advanced Filter Popover.',
    source: 'Source:',
    method: 'Method:',
    deadline: 'Deadline:',
    openSpec: 'Open TOR Spec →',
    loading: 'Loading feed...',
  },
  th: {
    title: 'สารบัญเอกสาร TOR จากทุกแหล่ง',
    subtitle: 'รวบรวมประกาศจัดซื้อจัดจ้างจากพอร์ทัลภาครัฐหลากหลายช่องทาง',
    filterBtn: '🎛️ ตัวกรองขั้นสูง & แหล่งข้อมูล',
    searchPlaceholder: 'กรองรายการตามชื่อโครงการ, หน่วยงาน หรือรหัส TOR...',
    showingResultsPrefix: 'แสดงผลลัพธ์สำหรับ ',
    itemsFoundSuffix: ' รายการ',
    noResults: 'ไม่พบรายการ TOR ที่ตรงกับเงื่อนไข ลองขยายขอบเขตการค้นหาในหน้าต่างตัวกรองขั้นสูง',
    source: 'แหล่งที่มา:',
    method: 'วิธีการจัดซื้อ:',
    deadline: 'กำหนดยื่น:',
    openSpec: 'ดูรายละเอียด TOR →',
    loading: 'กำลังโหลดข้อมูล...',
  },
};

function SearchFeedContent() {
  const searchParams = useSearchParams();
  const { lang: contextLang } = useApp();
  
  // Resolve active language code ('en' | 'th')
  const activeLang: Language = (contextLang?.toLowerCase() as Language) === 'th' ? 'th' : 'en';
  const t = i18n[activeLang];

  // Retrieve mock dataset for active locale
  const currentTORs = initialTORs[activeLang] || initialTORs.en;

  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Sync state when URL query parameter 'q' changes
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery !== null) {
      setFilters((prev) => ({ ...prev, query: urlQuery }));
    }
  }, [searchParams]);

  // Dynamically extract unique agencies and methods from the active language dataset
  const { agencies, methods } = useMemo(() => {
    const agencySet = new Set<string>();
    const methodSet = new Set<string>();
    currentTORs.forEach((item) => {
      if (item.employer) agencySet.add(item.employer);
      if (item.method) methodSet.add(item.method);
    });
    return {
      agencies: Array.from(agencySet),
      methods: Array.from(methodSet),
    };
  }, [currentTORs]);

  // Reactive filtering bound to active locale TOR list and active filters
  const filteredTORs = useMemo(() => {
    return currentTORs.filter((item: TORItem) => {
      const q = filters.query.toLowerCase();
      const matchesQ =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.employer.toLowerCase().includes(q);

      const matchesMethod = filters.method === 'ALL' || item.method === filters.method;
      const matchesAgency = filters.agency === 'ALL' || item.employer === filters.agency;

      const minB = filters.minBudget === '' ? 0 : Number(filters.minBudget);
      const maxB = filters.maxBudget === '' ? Infinity : Number(filters.maxBudget);
      const matchesBudget = (item.rawPrice ?? 0) >= minB && (item.rawPrice ?? 0) <= maxB;

      let matchesIso = true;
      if (filters.requireIso) {
        matchesIso = Boolean(item.requirements?.some((r) => r.text.includes('ISO')));
      }

      return matchesQ && matchesMethod && matchesAgency && matchesBudget && matchesIso;
    });
  }, [currentTORs, filters]);

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 w-full space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-200 dark:border-tormax-borderDark pb-4 flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {t.subtitle}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-tormax-purple text-white text-xs font-bold rounded-xl hover:bg-tormax-purpleDeep flex items-center space-x-2 shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <span>{t.filterBtn}</span>
        </button>
      </div>

      {/* Quick Search Input */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={filters.query}
            onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
            placeholder={t.searchPlaceholder}
            className="w-full p-3 pr-10 rounded-xl bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-tormax-purple shadow-2xs"
          />
          {filters.query && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, query: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Active Search Badge Info */}
      {filters.query && (
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {t.showingResultsPrefix}
          <span className="font-bold text-tormax-purple dark:text-tormax-lavender">"{filters.query}"</span>
          <span> ({filteredTORs.length}{t.itemsFoundSuffix})</span>
        </div>
      )}

      {/* Directory Cards Feed */}
      <div className="space-y-4">
        {filteredTORs.length === 0 ? (
          <div className="p-8 text-center text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-tormax-surfaceDark rounded-2xl border border-slate-200 dark:border-tormax-borderDark shadow-sm">
            {t.noResults}
          </div>
        ) : (
          filteredTORs.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-3 hover:border-tormax-purple dark:hover:border-tormax-lavender/50 transition-all shadow-sm hover:shadow-md group"
            >
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <div className="text-2xl font-black font-display text-tormax-purple dark:text-tormax-lavender tracking-tight">
                  {item.price}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {t.source} {item.sourcePortal}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded">
                    {item.id}
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-tormax-purple dark:group-hover:text-tormax-lavender transition-colors">
                {item.name}
              </h2>

              <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <span>🏛️ {item.employer}</span>
                <span>•</span>
                <span className="text-tormax-purple dark:text-tormax-lavender font-bold">
                  {t.method} {item.method}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-tormax-borderDark text-xs">
                <span className="text-slate-400 font-medium">{t.deadline} {item.deadline}</span>
                <Link
                  href={`/tor-page/${item.id}`}
                  className="px-4 py-2 bg-tormax-purple hover:bg-tormax-purpleDeep text-white font-bold rounded-xl transition-all shadow-sm active:scale-95"
                >
                  {t.openSpec}
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Filter Modal Instance */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        filters={filters}
        onApply={setFilters}
        onReset={handleReset}
        agencies={agencies}
        methods={methods}
      />
    </div>
  );
}

export default function SearchFeedPage() {
  const { lang: contextLang } = useApp();
  const activeLang: Language = (contextLang?.toLowerCase() as Language) === 'th' ? 'th' : 'en';
  const t = i18n[activeLang];

  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto p-10 text-center text-xs text-slate-400">{t.loading}</div>}>
      <SearchFeedContent />
    </Suspense>
  );
}