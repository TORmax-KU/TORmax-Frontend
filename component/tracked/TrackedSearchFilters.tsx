'use client';

import { RiSearchLine, RiFilter3Line } from '@remixicon/react';

interface TrackedSearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterStatus: 'all' | 'active' | 'upcoming' | 'closed';
  onFilterChange: (value: 'all' | 'active' | 'upcoming' | 'closed') => void;
  lang: string;
  searchPlaceholder: string;
}

export function TrackedSearchFilters({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  lang,
  searchPlaceholder,
}: TrackedSearchFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
      <div className="relative md:col-span-8">
        <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#2D2938] bg-white dark:bg-[#1C1A24] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#5B3E96]"
        />
      </div>

      <div className="md:col-span-4 flex items-center gap-2">
        <RiFilter3Line className="h-4 w-4 text-slate-400 shrink-0" />
        <select
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value as any)}
          className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-[#2D2938] bg-white dark:bg-[#1C1A24] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#5B3E96]"
        >
          <option value="all">{lang === 'EN' ? 'All Statuses' : 'ทุกสถานะ'}</option>
          <option value="active">{lang === 'EN' ? 'Active Bidding' : 'เปิดรับข้อเสนอ'}</option>
          <option value="upcoming">{lang === 'EN' ? 'Closing Soon' : 'ใกล้ครบกำหนด'}</option>
          <option value="closed">{lang === 'EN' ? 'Closed' : 'ปิดรับแล้ว'}</option>
        </select>
      </div>
    </div>
  );
}