'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { initialTORs } from '@/utils/mockData';
import { FilterState, TORItem } from '@/types';
import { FilterModal } from '@/component/FilterModal';
import { TORCard } from '@/component/TORCard';

export default function SearchFeedPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    query: initialQuery,
    method: 'ALL',
    agency: 'ALL',
    minBudget: 0,
    maxBudget: 100000000,
    requireIso: false,
    requireCapital: false,
  });

  const filteredTORs = initialTORs.filter(tor => {
    const q = filters.query.toLowerCase();
    const matchesQuery = !q || tor.name.toLowerCase().includes(q) || tor.employer.toLowerCase().includes(q) || tor.id.toLowerCase().includes(q);
    const matchesMethod = filters.method === 'ALL' || tor.method === filters.method;
    const matchesAgency = filters.agency === 'ALL' || tor.employer === filters.agency;
    return matchesQuery && matchesMethod && matchesAgency;
  });

  return (
    <div className="max-w-6xl mx-auto px-8 py-10 w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-[#2D2938] pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">TOR Directory Search</h1>
          <p className="text-xs text-slate-500">Filtered procurement specs ({filteredTORs.length} matches found)</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 border border-slate-200 dark:border-[#2D2938] bg-white dark:bg-[#1C1A24] rounded-xl text-xs font-bold hover:border-[#5B3E96]"
          >
            ⚙️ Advanced Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTORs.map(tor => (
          <TORCard key={tor.id} item={tor} />
        ))}
      </div>

      <FilterModal 
        isOpen={isModalOpen}
        filters={filters}
        onClose={() => setIsModalOpen(false)}
        onApply={(updated) => {
          setFilters(updated);
          setIsModalOpen(false);
        }}
        onReset={() => {
          setFilters({ query: '', method: 'ALL', agency: 'ALL', minBudget: 0, maxBudget: 100000000, requireIso: false, requireCapital: false });
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}