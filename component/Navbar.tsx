'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface NavbarProps {
    companyName: string;
    taxId: string;
}

export const Navbar: React.FC<NavbarProps> = ({ companyName, taxId }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [lang, setLang] = useState('EN');
    const [isDark, setIsDark] = useState(false);
    const router = useRouter();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            router.push(`/search-feed?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <nav className="sticky top-0 z-40 bg-white/90 dark:bg-[#1C1A24]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#2D2938] px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
                <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-[#5B3E96] text-white flex items-center justify-center font-bold text-lg shadow">T</div>
                    <span className="text-xl font-black tracking-tight text-[#5B3E96] dark:text-white">TOR<span className="text-[#9B82C1]">max</span></span>
                </Link>

                <div className="hidden lg:flex items-center space-x-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <Link href="/#daily-digest" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1C1A24]">Daily Digest</Link>
                    <Link href="/search-feed" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1C1A24]">TOR Directory</Link>
                    <Link href="/admin" className="px-3 py-1.5 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 font-bold">⚙️ Admin Portal</Link>
                </div>
            </div>

            <div className="flex-1 max-w-md hidden sm:block relative">
                <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-slate-400 text-xs">🔍</span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Quick search TOR title, agency, or ID..."
                        className="w-full pl-9 pr-12 py-2 text-xs font-medium bg-slate-100 dark:bg-[#1C1A24] border border-transparent dark:border-[#2D2938] focus:border-[#5B3E96] rounded-xl focus:outline-none transition-all text-slate-900 dark:text-slate-100 placeholder-slate-400"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
                <button onClick={toggleTheme} className="w-8 h-8 rounded-lg border border-slate-200 dark:border-[#2D2938] flex items-center justify-center text-xs">
                    {isDark ? '☀️' : '🌙'}
                </button>

                <Link href="/profile" className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-[#2D2938] group">
                    <div className="w-8 h-8 rounded-lg bg-[#3B2468] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#5B3E96]/50">TT</div>
                    <div className="hidden xl:block text-xs">
                        <div className="font-bold flex items-center gap-1 text-[11px]">
                            <span>{companyName}</span>
                            <span className="text-emerald-500">⚙️</span>
                        </div>
                        <div className="text-slate-400 text-[9px]">Tax ID: {taxId}</div>
                    </div>
                </Link>
            </div>
        </nav>
    );
};