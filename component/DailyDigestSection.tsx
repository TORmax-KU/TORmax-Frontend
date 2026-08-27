'use client';

import React from 'react';
import Link from 'next/link';
import { TORItem } from '@/types';
import { TORCard } from './TORCard';
import { useApp } from '@/context/AppContext';
import { Language } from '@/public/mockData/Language';

interface DailyDigestSectionProps {
  topMatches?: TORItem[];
  userProfile?: {
    companyName?: string;
  };
}

// Localized dictionary for DailyDigestSection
const i18n = {
  en: {
    title: "Daily Digest — Today's Curated Bids",
    subtitlePrefix: 'High confidence matches tailored to ',
    subtitleSuffix: ' capabilities.',
    defaultCompany: 'Your Company',
    updatedAgo: 'Updated 2 Hours Ago',
    viewDirectory: 'View Directory →',
  },
  th: {
    title: 'สรุปประจำวัน — งานประกวดราคาคัดสรรวันนี้',
    subtitlePrefix: 'รายการคัดสรรความเหมาะสมสูงเฉพาะสำหรับศักยภาพของ ',
    subtitleSuffix: '',
    defaultCompany: 'บริษัทของคุณ',
    updatedAgo: 'อัปเดตเมื่อ 2 ชั่วโมงที่แล้ว',
    viewDirectory: 'ดูสารบัญทั้งหมด →',
  },
};

export default function DailyDigestSection({
  topMatches = [],
  userProfile = {},
}: DailyDigestSectionProps) {
  const { lang: contextLang } = useApp();

  // Resolve active language code ('en' | 'th')
  const activeLang: Language = (contextLang?.toLowerCase() as Language) === 'th' ? 'th' : 'en';
  const t = i18n[activeLang];

  const companyName = userProfile.companyName || t.defaultCompany;

  return (
    <div className="space-y-6 scroll-mt-24">
      {/* Header Bar */}
      <div className="border-b border-slate-200 dark:border-tormax-borderDark pb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {t.subtitlePrefix}
            <strong className="text-slate-700 dark:text-slate-200">
              {companyName}
            </strong>
            {t.subtitleSuffix}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/20 shadow-xs">
            {t.updatedAgo}
          </span>
          <Link
            href="/search-feed"
            className="hidden sm:inline-flex text-xs font-bold text-[#5B3E96] dark:text-tormax-lavender hover:underline"
          >
            {t.viewDirectory}
          </Link>
        </div>
      </div>

      {/* 3-Column Grid using TORCard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topMatches.slice(0, 3).map((tor) => (
          <TORCard key={tor.id} tor={tor} />
        ))}
      </div>
    </div>
  );
}