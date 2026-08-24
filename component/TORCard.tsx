'use client';

import React from 'react';
import Link from 'next/link';
import { TORItem } from '@/types';
import { calculatePassRate } from '@/utils/mockData';

export interface TORCardProps {
  item: TORItem;
}

export const TORCard: React.FC<TORCardProps> = ({ item }) => {
  const { count, percentage } = calculatePassRate(item.requirements);

  return (
    <div className="bg-white dark:bg-[#1C1A24] border border-slate-200 dark:border-[#2D2938] rounded-3xl p-6 flex flex-col justify-between gap-6 shadow-sm hover:border-[#5B3E96] transition-all group">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-wider uppercase bg-slate-100 dark:bg-[#2D2938] text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md">
              {item.sourcePortal}
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#5B3E96] dark:group-hover:text-[#9B82C1] transition-colors leading-snug">
              {item.name}
            </h3>
            <p className="text-xs font-semibold text-slate-500">{item.employer}</p>
          </div>
          
          <div className="flex flex-col items-end shrink-0">
            <span className="text-xl font-black text-[#5B3E96] dark:text-[#9B82C1]">
              {item.matchScore}%
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Match Vector</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {item.desc}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {item.tags.map(tag => (
            <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5B3E96]/10 text-[#5B3E96] dark:text-[#9B82C1]">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-[#2D2938] flex items-center justify-between text-xs">
        <div>
          <div className="font-black text-slate-900 dark:text-white">{item.price}</div>
          <div className="text-[10px] font-medium text-emerald-500">{item.deadline}</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="block text-[10px] font-bold text-slate-400">Eligibility</span>
            <span className="font-bold text-slate-700 dark:text-slate-200">{count}/{item.requirements.length} ({percentage}%)</span>
          </div>
          <Link 
            href={`/tor-detail/${item.id}`}
            className="px-4 py-2 bg-slate-900 dark:bg-[#2D2938] hover:bg-[#5B3E96] dark:hover:bg-[#5B3E96] text-white rounded-xl text-xs font-bold transition-colors"
          >
            Review TOR
          </Link>
        </div>
      </div>
    </div>
  );
};