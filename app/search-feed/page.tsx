'use client';

import React, { Suspense } from 'react';
import { useApp } from '@/context/AppContext';
import { initialTORs } from '@/utils/mockData';
import { Language } from '@/public/mockData/Language';
import { searchfeedi18n } from '@/public/mockData/i18n/searchfeed';
import { FilterModal } from '@/component/searchbar/FilterModal';
import { SearchHeader } from '@/component/searchfeed/SearchHeader';
import { SearchInput } from '@/component/searchfeed/SearchInput';
import { SearchBadge } from '@/component/searchfeed/SearchBadge';
import { TORList } from '@/component/searchfeed/TORList';
import { useSearchFilters } from '@/component/searchfeed/useSearchFilters';

function SearchFeedContent() {
  const { lang: contextLang } = useApp();
  
  const activeLang: Language = (contextLang?.toLowerCase() as Language) === 'th' ? 'th' : 'en';
  const t = searchfeedi18n[activeLang];

  const currentTORs = initialTORs[activeLang] || initialTORs.en;

  const {
    filters,
    isModalOpen,
    setIsModalOpen,
    agencies,
    methods,
    filteredTORs,
    handleReset,
    updateQuery,
    applyFilters,
  } = useSearchFilters(currentTORs, activeLang);

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 w-full space-y-6">
      <SearchHeader
        title={t.title}
        subtitle={t.subtitle}
        onFilterClick={() => setIsModalOpen(true)}
        filterBtnText={t.filterBtn}
      />

      <div className="flex gap-3">
        <SearchInput
          value={filters.query}
          onChange={updateQuery}
          placeholder={t.searchPlaceholder}
        />
      </div>

      <SearchBadge
        query={filters.query}
        resultCount={filteredTORs.length}
        showingResultsPrefix={t.showingResultsPrefix}
        itemsFoundSuffix={t.itemsFoundSuffix}
      />

      <TORList items={filteredTORs} t={t} />

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        filters={filters}
        onApply={applyFilters}
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
  const t = searchfeedi18n[activeLang];

  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto p-10 text-center text-xs text-slate-400">{t.loading}</div>}>
      <SearchFeedContent />
    </Suspense>
  );
}