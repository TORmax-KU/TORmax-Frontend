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
  const { lang: contextLang } = useApp();
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
    <div className="relative min-h-[80vh] overflow-hidden bg-canvas border-b border-line">
      {/* Background image, softly blended into the page (parallax on scroll, adapts to light/dark) */}
      <div
        className="absolute -top-[25%] left-0 right-0 h-[150%] z-0 will-change-transform pointer-events-none opacity-[0.16] dark:opacity-40 grayscale-[35%] transition-opacity duration-300"
        style={{
          transform: `translate3d(0, ${scrollY * 0.35}px, 0)`,
        }}
      >
        <MediaBlock url="/TORment Header.png" objectFit="cover" />
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-canvas/40 via-canvas/70 to-canvas" />

      {/* Hero Content */}
      <div
        className={`
          relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 py-24 text-center
          transition-all duration-700 ease-soft motion-reduce:transition-none motion-reduce:transform-none
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center">

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 h-8 px-3.5 rounded-full bg-surface/80 border border-line backdrop-blur-sm text-[13px] font-medium text-ink-2 shadow-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-ok opacity-60 motion-safe:animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-ok" />
            </span>
            <span>{t.activeTenders}</span>
          </div>

          {/* Main Heading */}
          <h1 className="ui-display mt-8 text-[2.5rem] sm:text-6xl lg:text-[4.5rem]">
            {t.heading1}
            <span className="block text-accent">
              {t.heading2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-ink-3 text-base sm:text-lg max-w-2xl leading-relaxed">
            {t.subtitle1} <span className="text-ink font-medium">{t.subtitle2}</span>.
          </p>

          {/* Search Input Box */}
          <div className="w-full max-w-2xl mt-10">
            <Suspense fallback={<div className="h-14" />}><HeroSearchInput
              onSearch={handleSearchSubmit}
              placeholder={t.searchPlaceholder}
              searchLabel={t.searchLabel}
            /></Suspense>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              <span className="text-ink-4 font-medium uppercase tracking-[0.08em] text-[11px] mr-1">{t.popular}</span>
              {t.tags.map((tag) => (
                <button
                  key={tag.query}
                  onClick={() => handleSearchSubmit(tag.query)}
                  className="h-7 px-3 text-[13px] text-ink-2 bg-surface/70 backdrop-blur-sm rounded-full border border-line hover:bg-surface hover:text-ink hover:border-line-strong transition-colors duration-150 cursor-pointer"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 w-full justify-center max-w-md">
            <button onClick={jumpToDigestSection} className="ui-btn ui-btn-primary ui-btn-lg w-full sm:w-1/2">
              <span>{t.todaysDigest}</span>
              <RiArrowDownLine size={16} />
            </button>
            <button onClick={() => router.push('/search-feed')} className="ui-btn ui-btn-secondary ui-btn-lg w-full sm:w-1/2">
              <span>{t.browseAll}</span>
              <RiArrowRightLine size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
