'use client';

import React from 'react';
import Link from 'next/link';
import { TORItem } from '@/types';
import { calculatePassRate, Language } from '@/utils/mockData';
import { useApp } from '@/context/AppContext';

export interface TORCardProps {
  tor: TORItem;
}

// Localized dictionary for TORCard labels
const i18n = {
  en: {
    matchSuffix: '% Match',
    sourcePrefix: '🌐 Source:',
    eligiblePrefix: 'Eligible:',
    reviewSpec: 'Review Spec →',
  },
  th: {
    matchSuffix: '% ตรงสเปก',
    sourcePrefix: '🌐 แหล่งที่มา:',
    eligiblePrefix: 'ผ่านคุณสมบัติ:',
    reviewSpec: 'ดูข้อกำหนด →',
  },
};

export const TORCard: React.FC<TORCardProps> = ({ tor }) => {
  const { lang: contextLang } = useApp();

  // Resolve active language code ('en' | 'th')
  const activeLang: Language = (contextLang?.toLowerCase() as Language) === 'th' ? 'th' : 'en';
  const t = i18n[activeLang];

  // Optional eligibility calculations if requirements exist on the item
  const passRate = tor.requirements ? calculatePassRate(tor.requirements) : null;

  return (
    <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark hover:border-tormax-purple dark:hover:border-tormax-lavender/50 p-6 rounded-2xl flex flex-col justify-between space-y-5 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 group">
      <div className="space-y-3">
        {/* ID & AI Match Score Badge */}
        <div className="flex justify-between items-start gap-2">
          <span className="text-xs font-mono font-bold text-tormax-purple dark:text-tormax-lavender">
            {tor.id}
          </span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full shadow-2xs">
            {tor.matchScore}{t.matchSuffix}
          </span>
        </div>

        {/* Pricing Display */}
        <div className="text-2xl font-black font-display text-tormax-purple dark:text-tormax-lavender tracking-tight">
          {tor.price}
        </div>

        {/* Source Tag */}
        <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          {t.sourcePrefix} {tor.sourcePortal}
        </span>

        {/* Title & Employer */}
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-tormax-purple dark:group-hover:text-tormax-lavender transition-colors">
            {tor.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 truncate">
            {tor.employer}
          </p>
        </div>

        {/* Optional Description */}
        {tor.desc && (
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {tor.desc}
          </p>
        )}

        {/* Topic Tags */}
        {tor.tags && tor.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {tor.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-tormax-purple/10 text-tormax-purple dark:text-tormax-lavender"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Deadline, Eligibility & Action */}
      <div className="pt-4 border-t border-slate-100 dark:border-tormax-borderDark flex items-center justify-between gap-2">
        <div>
          <div className="text-[11px] font-medium text-slate-400">
            ⏳ {tor.deadline}
          </div>
          {passRate && tor.requirements && (
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300 mt-0.5">
              {t.eligiblePrefix} {passRate.count}/{tor.requirements.length} ({passRate.percentage}%)
            </div>
          )}
        </div>

        <Link 
          href={`/tor-page/${tor.id}`}
          className="px-4 py-2 bg-tormax-purple hover:bg-tormax-purpleDeep text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 shrink-0"
        >
          {t.reviewSpec}
        </Link>
      </div>
    </div>
  );
};