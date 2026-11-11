'use client';

import type { ReactNode } from 'react';

interface ToggleCardProps {
  id: string;
  title: string;
  icon?: ReactNode;
  description: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ToggleCard({
  id,
  title,
  icon,
  description,
  checked,
  onChange
}: ToggleCardProps) {
  return (
    <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-card border p-4 transition-colors duration-150 ${checked ? 'border-brand-soft/60 bg-brand-tint/50' : 'border-line hover:border-line-strong hover:bg-surface-2/50'}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-sm font-medium text-ink">{icon && <span className="text-ink-3">{icon}</span>}{title}</div>
        <div className="mt-0.5 text-xs leading-relaxed text-ink-3">{description}</div>
      </div>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="ui-switch"
      />
    </label>
  );
}
