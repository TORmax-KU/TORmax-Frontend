'use client';

import { useState, useEffect } from 'react';
import MediaBlock from "../MediaBlock";
import FilterModal from '../Searchbar/FilterModal';
import SearchInput from '../Searchbar/SearchInput';

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
    const [isVisible, setIsVisible] = useState(false);
    const companyName = "Your Company"; // Replace with dynamic profile state if needed

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const jumpToDigestSection = () => {
        const el = document.getElementById('daily-digest-section');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="relative min-h-[85vh] overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <MediaBlock url="/TORment Header.png" objectFit="cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
                </div>

                {/* Animated Decorative Elements */}
                <div className="absolute inset-0 z-1 pointer-events-none">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />
                </div>

                {/* Hero Content */}
                <div className={`
          relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 py-20 text-center
          transition-all duration-1000 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
                    <div className="max-w-4xl mx-auto w-full space-y-8 flex flex-col items-center">

                        {/* Main Heading with high-contrast gradient text */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md">
                            What project are you
                            <span className="pb-2 block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-300 mt-2 font-extrabold">
                                looking for?
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-slate-300 text-base md:text-lg max-w-2xl font-medium leading-relaxed">
                            Consolidating Terms of Reference (TOR) listings across <strong>multiple official procurement sites, state enterprise portals & direct ministry tender boards</strong>.
                        </p>

                        {/* Search Input Section */}
                        <div className="w-full max-w-2xl pt-2">
                            <SearchInput mode='dark' altLook />

                            {/* Quick Search Tags */}
                            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 mt-3 font-medium">
                                <span className="text-slate-400 font-semibold">Popular:</span>
                                {[
                                    { label: 'Cloud Infrastructure', query: 'Cloud' },
                                    { label: 'Cybersecurity', query: 'Cybersecurity' },
                                    { label: 'Fiber Optics', query: 'Fiber' }
                                ].map((tag) => (
                                    <button
                                        key={tag.query}
                                        onClick={() => {
                                            window.location.hash = `search-feed?q=${tag.query}`;
                                        }}
                                        className="px-3 py-1 text-xs text-white/80 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/20 hover:text-white hover:border-white/20 transition-all duration-300 underline underline-offset-2"
                                    >
                                        {tag.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* CTA Action Buttons */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 text-sm font-semibold w-full justify-center">
                            <button
                                onClick={jumpToDigestSection}
                                className="w-full sm:w-auto px-8 py-3.5 bg-tormax-purple hover:bg-tormax-purpleDeep text-white rounded-2xl font-bold transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                            >
                                <span>👇 Today's Curated Digest</span>
                            </button>
                            <a
                                href="#search-feed"
                                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                            >
                                Multi-Source Directory →
                            </a>
                        </div>

                        {/* Statistics Counter */}
                        <div className="pt-8 grid grid-cols-3 gap-8 border-t border-white/10 w-full max-w-2xl text-center">
                            <div>
                                <div className="text-2xl md:text-3xl font-extrabold text-white">6,420+</div>
                                <div className="text-xs text-slate-400 font-medium mt-1">Multi-Site Tenders</div>
                            </div>
                            <div>
                                {/* High-contrast amber/gold text */}
                                <div className="text-2xl md:text-3xl font-extrabold text-amber-300 drop-shadow-sm">฿14.2B</div>
                                <div className="text-xs text-slate-400 font-medium mt-1">Tracked Pipeline</div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-extrabold text-emerald-400">96%</div>
                                <div className="text-xs text-slate-400 font-medium mt-1">Match Accuracy</div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
                        <div className="w-1 h-2 bg-white/50 rounded-full animate-scroll-down" />
                    </div>
                </div>
            </div>
        </>
    );
}