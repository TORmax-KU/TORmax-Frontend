'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterState, TORItem } from '@/types';
import { Language } from '@/public/mockData/Language';

const INITIAL_FILTERS: FilterState = {
  query: '',
  method: 'ALL',
  agency: 'ALL',
  minBudget: '',
  maxBudget: '',
  requireIso: false,
  requireCapital: false,
};

export function useSearchFilters(
  currentTORs: TORItem[],
  activeLang: Language
) {
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

  // Dynamically extract unique agencies and methods
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

  // Reactive filtering
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

  const updateQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, query }));
  };

  const applyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    setIsModalOpen(false);
  };

  return {
    filters,
    setFilters,
    isModalOpen,
    setIsModalOpen,
    agencies,
    methods,
    filteredTORs,
    handleReset,
    updateQuery,
    applyFilters,
  };
}