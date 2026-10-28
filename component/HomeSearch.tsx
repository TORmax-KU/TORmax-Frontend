'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RiArrowDownLine, RiArrowRightLine } from '@remixicon/react';
import MediaBlock from "./MediaBlock";
import HeroSearchInput from './HeroSearchInput';
import { useApp } from '@/context/AppContext'; // Adjust path if necessary

// Dictionary for HomeSearch hero text
const i18n = {
  en: {
    activeTenders: 'Software, systems & IT procurement',
    heading1: 'What project are you',
    heading2: 'looking for?',
    subtitle1: 'Search saved TORs by',
    subtitle2: 'project title, agency, TOR ID, summary, or required skills',
    popular: 'Popular:',
    todaysDigest: "Today's Digest",
    browseAll: 'Browse All TORs',
    searchPlaceholder: 'Search project title, agency, TOR ID, summary, or skills...',
    searchLabel: 'Search',
    tags: [
      { label: 'Cloud Infrastructure', query: 'Cloud' },
      { label: 'Cybersecurity', query: 'Cybersecurity' },
      { label: 'Fiber Optics', query: 'Fiber' },
      { label: 'AI System', query: 'AI' },
    ],
  },
  th: {
    activeTenders: 'งานจัดซื้อจัดจ้างซอฟต์แวร์ ระบบ และเทคโนโลยี',
    heading1: 'คุณกำลังมองหา',
    heading2: 'โครงการใดที่ใช่?',
    subtitle1: 'ค้นหา TOR ในฐานข้อมูลด้วย',
    subtitle2: 'ชื่อโครงการ หน่วยงาน รหัส TOR สรุป หรือทักษะที่จำเป็น',
    popular: 'คำค้นยอดนิยม:',
    todaysDigest: 'สรุปประจำวัน',
    browseAll: 'ดูรายการ TOR ทั้งหมด',
    searchPlaceholder: 'ค้นหาชื่อโครงการ หน่วยงาน รหัส TOR สรุป หรือทักษะ...',
    searchLabel: 'ค้นหา',
    tags: [
      { label: 'ระบบคลาวด์', query: 'Cloud' },
      { label: 'ความปลอดภัยไซเบอร์', query: 'Cybersecurity' },
      { label: 'โครงข่ายไฟเบอร์', query: 'Fiber' },
      { label: 'ระบบปัญญาประดิษฐ์ (AI)', query: 'AI' },
    ],
  },
};

export default function HomeSearch() {
  const router = useRouter();
  const { lang: contextLang, isDark } = useApp();
  const lang = (contextLang?.toLowerCase() as 'en' | 'th') || 'en';
  const t = i18n[lang];

  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleScroll = () => {
      if (motionPreference.matches) {
        setScrollY(0);
        return;
      }
      setScrollY(window.scrollY);
    };

    handleScroll();
    motionPreference.addEventListener('change', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      motionPreference.removeEventListener('change', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      router.push(`/search-feed?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/search-feed');
    }
  };

  const jumpToDigestSection = () => {
    const el = document.getElementById('daily-digest');
    if (el) {
      el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[85vh] overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background Image with Gradient Overlay (Parallax on scroll, adapts to light/dark) */}
      <div
        className="absolute -top-[25%] left-0 right-0 h-[150%] z-0 will-change-transform pointer-events-none opacity-30 dark:opacity-100 transition-opacity duration-300"
        style={{
          transform: `translate3d(0, ${scrollY * 0.35}px, 0)`,
        }}
      >
        <MediaBlock url="/TORment Header.png" objectFit="cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/70 via-white/50 to-slate-100/90 dark:from-slate-950/80 dark:via-slate-950/60 dark:to-slate-950/90" />
      </div>

      {/* Subtle Glowing Background Accents */}
      <div
        className="absolute -top-[10%] left-0 right-0 h-[120%] z-1 pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * 0.2}px, 0)`,
        }}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/15 dark:bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Content */}
      <div
        className={`
          relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 py-20 text-center
          transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
        <div className="max-w-4xl mx-auto w-full space-y-8 flex flex-col items-center">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 backdrop-blur-md text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 motion-safe:animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-4" />
            <span>{t.activeTenders}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            {t.heading1}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-300 dark:via-purple-300 dark:to-cyan-300 mt-2">
              {t.heading2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed">
            {t.subtitle1} <strong className="text-slate-800 dark:text-white">{t.subtitle2}</strong>.
          </p>

          {/* Search Input Box */}
          <div className="w-full max-w-2xl pt-2">
            <Suspense fallback={<div className="h-16" />}><HeroSearchInput
              mode={isDark ? 'dark' : 'light'}
              altLook
              onSearch={handleSearchSubmit}
              placeholder={t.searchPlaceholder}
              searchLabel={t.searchLabel}
            /></Suspense>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-4 font-medium">
              <span className="text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider text-[11px]">{t.popular}</span>
              {t.tags.map((tag) => (
                <button
                  key={tag.query}
                  onClick={() => handleSearchSubmit(tag.query)}
                  className="px-3 py-1 text-xs text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/15 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 shadow-xs transition-all duration-200 cursor-pointer"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 text-sm font-semibold w-full justify-center max-w-md">
            <button
              onClick={jumpToDigestSection}
              className="w-full sm:w-1/2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.todaysDigest}</span>
              <RiArrowDownLine size={16} />
            </button>
            <button
              onClick={() => router.push('/search-feed')}
              className="w-full sm:w-1/2 px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm dark:bg-slate-900/90 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-700/80 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer font-semibold"
            >
              <span>{t.browseAll}</span>
              <RiArrowRightLine size={16} />
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}
