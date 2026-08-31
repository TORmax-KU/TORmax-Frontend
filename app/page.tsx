'use client';

import React from 'react';
import HomeSearch from "@/component/HomeSearch";
import { initialTORs } from "@/utils/mockData";
import DailyDigestSection from "@/component/DailyDigestSection";
import { useApp } from "@/context/AppContext";
import { Language } from '@/public/mockData/Language';
import { homei18n } from '@/public/mockData/i18n/home';

export default function Home() {
  const { lang: contextLang } = useApp();
  
  // Resolve active language key ('en' | 'th')
  const activeLang: Language = (contextLang?.toLowerCase() as Language) === 'th' ? 'th' : 'en';
  const t = homei18n[activeLang];

  // Extract array using the active language key from the initialTORs dictionary
  const rawTORList = initialTORs[activeLang] || initialTORs.en || [];

  // Safely sort the retrieved list by match score
  const topMatches = Array.isArray(rawTORList)
    ? [...rawTORList].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    : [];

  return (
    <div className="w-full">
      {/* Search Header Hero Container */}
      <div className="dark:bg-base-300 bg-base-100 min-h-[80%]">
        <HomeSearch />
      </div>

      {/* Main Content Body */}
      <main className="max-w-6xl mx-auto px-6 sm:px-8 py-10 w-full space-y-10">
        <section id="daily-digest">
          <DailyDigestSection 
            topMatches={topMatches} 
            userProfile={{ companyName: t.companyName }}
          />
        </section>
      </main>
    </div>
  );
}