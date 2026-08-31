'use client';

import { TORItem } from '@/types';
import { TORCard } from './TORCard';

interface TORListProps {
  items: TORItem[];
  t: {
    source: string;
    method: string;
    deadline: string;
    openSpec: string;
    noResults: string;
  };
}

export function TORList({ items, t }: TORListProps) {
  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-tormax-surfaceDark rounded-2xl border border-slate-200 dark:border-tormax-borderDark shadow-sm">
        {t.noResults}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <TORCard key={item.id} item={item} t={t} />
      ))}
    </div>
  );
}