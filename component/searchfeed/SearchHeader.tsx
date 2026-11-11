'use client';

import { RiEqualizerLine } from '@remixicon/react';
import { PageHeader } from '@/component/PageHeader';

interface SearchHeaderProps {
  title: string;
  subtitle: string;
  onFilterClick: () => void;
  filterBtnText: string;
  filtersOpen?: boolean;
}

export function SearchHeader({
  title,
  subtitle,
  onFilterClick,
  filterBtnText,
  filtersOpen,
}: SearchHeaderProps) {
  return (
    <PageHeader
      className="pb-2"
      title={title}
      description={subtitle}
      actions={
        <button
          onClick={onFilterClick}
          aria-expanded={filtersOpen}
          className={`ui-btn ui-btn-secondary ${filtersOpen ? 'bg-surface-2' : ''}`}
        >
          <RiEqualizerLine size={16} className="text-ink-3" />
          <span>{filterBtnText}</span>
        </button>
      }
    />
  );
}
