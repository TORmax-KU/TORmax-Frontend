'use client';

import Link from 'next/link';
import { TORItem } from '@/types';

interface TORCardProps {
  item: TORItem;
  t: {
    source: string;
    method: string;
    deadline: string;
    openSpec: string;
  };
}

export function TORCard({ item, t }: TORCardProps) {
  return (
    <div className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-3 hover:border-tormax-purple dark:hover:border-tormax-lavender/50 transition-all shadow-sm hover:shadow-md group">
      <div className="flex justify-between items-baseline flex-wrap gap-2">
        <div className="text-2xl font-black font-display text-tormax-purple dark:text-tormax-lavender tracking-tight">
          {item.price}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {t.source} {item.sourcePortal}
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
          {t.method} {item.method}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-tormax-borderDark text-xs">
        <span className="text-slate-400 font-medium">{t.deadline} {item.deadline}</span>
        <Link
          href={`/tor-page/${item.id}`}
          className="px-4 py-2 bg-tormax-purple hover:bg-tormax-purpleDeep text-white font-bold rounded-xl transition-all shadow-sm active:scale-95"
        >
          {t.openSpec}
        </Link>
      </div>
    </div>
  );
}