'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MediaBlock from "./MediaBlock";
import FilterModal from './Searchbar/FilterModal';
import SearchInput from './Searchbar/SearchInput';

// Mock data structure to support the Daily Digest map
const mockTORs = [
  {
    id: "TOR-2026-001",
    matchScore: 98,
    price: "฿12,500,000",
    sourcePortal: "CGD e-GP",
    name: "Enterprise Cloud Infrastructure & Disaster Recovery System",
    employer: "Ministry of Digital Economy and Society",
    deadline: "12 Days Left"
  },
  {
    id: "TOR-2026-002",
    matchScore: 94,
    price: "฿8,200,000",
    sourcePortal: "State Enterprise Portal",
    name: "National Cybersecurity Monitoring & Threat Detection Platform",
    employer: "National Cyber Security Agency (NCSA)",
    deadline: "5 Days Left"
  },
  {
    id: "TOR-2026-003",
    matchScore: 89,
    price: "฿45,000,000",
    sourcePortal: "Direct Ministry Board",
    name: "Provincial High-Speed Fiber Optic Expansion Project",
    employer: "National Telecom (NT)",
    deadline: "18 Days Left"
  }
];

export default function HomeSearch() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      router.push(`/search-feed?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/search-feed');
    }
  };

  const jumpToDigestSection = () => {
    const el = document.getElementById('daily-digest-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[85vh] overflow-hidden bg-slate-950">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <MediaBlock url="/TORment Header.png" objectFit="cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />
      </div>

      {/* Subtle Glowing Background Accents */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Content */}
      <div
        className={`
          relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 py-20 text-center
          transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
        <div className="max-w-4xl mx-auto w-full space-y-8 flex flex-col items-center">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-slate-300 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
            <span>6,420+ Active Tenders Consolidated</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15]">
            What project are you
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 mt-2">
              looking for?
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed">
            Instant AI vector matching across <strong>CGD e-GP, state enterprise portals, and direct ministry tender boards</strong>.
          </p>

          {/* Search Input Box */}
          <div className="w-full max-w-2xl pt-2">
            <SearchInput
              mode="dark"
              altLook
              onSearch={handleSearchSubmit}
            />

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 mt-4 font-medium">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px]">Popular:</span>
              {[
                { label: 'Cloud Infrastructure', query: 'Cloud' },
                { label: 'Cybersecurity', query: 'Cybersecurity' },
                { label: 'Fiber Optics', query: 'Fiber' },
                { label: 'AI System', query: 'AI' }
              ].map((tag) => (
                <button
                  key={tag.query}
                  onClick={() => handleSearchSubmit(tag.query)}
                  className="px-3 py-1 text-xs text-slate-300 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/15 hover:text-white hover:border-white/20 transition-all duration-200 cursor-pointer"
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
              <span>Today's Digest</span>
              <span>↓</span>
            </button>
            <button
              onClick={() => router.push('/search-feed')}
              className="w-full sm:w-1/2 px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Browse All TORs</span>
              <span>→</span>
            </button>
          </div>

          {/* Statistics Grid */}
          <div className="pt-10 grid grid-cols-3 gap-6 border-t border-white/10 w-full max-w-2xl text-center">
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">6,420+</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Multi-Site Tenders</div>
            </div>
            <div className="p-2 border-x border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">฿14.2B</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Tracked Pipeline</div>
            </div>
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">96%</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Match Accuracy</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}