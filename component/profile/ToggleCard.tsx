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
    <label className="p-4 rounded-2xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between cursor-pointer bg-slate-50 dark:bg-[#090D16] hover:border-tormax-purple transition-colors">
      <div>
        <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">{icon}{title}</div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400">{description}</div>
      </div>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-tormax-purple cursor-pointer"
      />
    </label>
  );
}
