'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { initialTORs } from '@/utils/mockData';
import { FilterState, TORItem } from '@/types';
import { FilterModal } from '@/component/FilterModal';

const INITIAL_FILTERS: FilterState = {
  query: '',
  method: 'ALL',
  agency: 'ALL',
  minBudget: '',
  maxBudget: '',
  requireIso: false,
  requireCapital: false,
};

function SearchFeedContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Sync state when URL query parameter 'q' changes
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery !== null) {
      setFilters((prev) => ({ ...prev, query: urlQuery }));
    }
  }, [searchParams]);

  // Dynamically extract unique agencies and methods for dropdown options
  const { agencies, methods } = useMemo(() => {
    const agencySet = new Set<string>();
    const methodSet = new Set<string>();
    initialTORs.forEach((item) => {
      if (item.employer) agencySet.add(item.employer);
      if (item.method) methodSet.add(item.method);
    });
    return {
      agencies: Array.from(agencySet),
      methods: Array.from(methodSet),
    };
  }, []);

  // Reactive filtering using useMemo
  const filteredTORs = useMemo(() => {
    return initialTORs.filter((item: TORItem) => {
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
        matchesIso = Boolean(item.requirements?.some((r) => r.text.includes('ISO 27001')));
      }

      return matchesQ && matchesMethod && matchesAgency && matchesBudget && matchesIso;
    });
  }, [filters]);

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
            Multi-Source TOR Directory
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Aggregated tenders across multiple public procurement platforms
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-tormax-purple text-white text-xs font-bold rounded-xl hover:bg-tormax-purpleDeep flex items-center space-x-2 shadow-sm active:scale-95 transition-all"
        >
          <span>🎛️ Advanced Filters & Source Portals</span>
        </button>
      </div>

      {/* Quick Search Input */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={filters.query}
            onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
            placeholder="Filter directory by title, agency, or TOR ID..."
            className="w-full p-3 pr-10 rounded-xl bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-tormax-purple shadow-2xs"
          />
          {filters.query && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, query: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Active Search Badge Info */}
      {filters.query && (
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Showing results for <span className="font-bold text-tormax-purple dark:text-tormax-lavender">"{filters.query}"</span> ({filteredTORs.length} items found)
        </div>
      )}

      {/* Directory Cards Feed */}
      <div className="space-y-4">
        {filteredTORs.length === 0 ? (
          <div className="p-8 text-center text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-tormax-surfaceDark rounded-2xl border border-slate-200 dark:border-tormax-borderDark shadow-sm">
            No TOR listings match your filter criteria. Try broadening parameters in the Advanced Filter Popover.
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
                    Source: {item.sourcePortal}
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
                  Method: {item.method}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-tormax-borderDark text-xs">
                <span className="text-slate-400 font-medium">Deadline: {item.deadline}</span>
                <Link
                  href={`/tor-page/${item.id}`}
                  className="px-4 py-2 bg-tormax-purple hover:bg-tormax-purpleDeep text-white font-bold rounded-xl transition-all shadow-sm active:scale-95"
                >
                  Open TOR Spec →
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
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto p-10 text-center text-xs text-slate-400">Loading feed...</div>}>
      <SearchFeedContent />
    </Suspense>
  );
}