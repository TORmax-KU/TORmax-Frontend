'use client';

import { ProjectCard } from '@/lib/projects';
import { TORCard } from './TORCard';

interface TORListProps {
  items: ProjectCard[];
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
      <div className="ui-empty">
        <p className="text-sm text-ink-3">{t.noResults}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <TORCard key={item.id} item={item} t={t} />
      ))}
    </div>
  );
}
