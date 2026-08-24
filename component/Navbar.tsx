'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { AppNotification } from '@/types';

export interface NavbarProps {
    companyName: string;
    taxId: string;
}

const mockNotifications: AppNotification[] = [
    { id: '1', title: 'New TOR match: MDES Data Exchange (96%)', time: '10m ago', read: false },
    { id: '2', title: 'Daily Digest dispatched to your email', time: '2h ago', read: false },
    { id: '3', title: 'Ingestion system completed e-GP sync', time: '5h ago', read: true }
];

export const Navbar: React.FC<NavbarProps> = ({ companyName, taxId }) => {
    const { isDark, toggleTheme, lang, toggleLanguage, t } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);

    const router = useRouter();

    // Handle Search Execution
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            router.push(`/search-feed?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    // Notification Handling
    const unreadCount = notifications.filter((n) => !n.read).length;
    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    return (
        <nav className="sticky top-0 z-40 bg-white/90 dark:bg-[#1C1A24]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#2D2938] px-6 py-3 flex items-center justify-between gap-4">
            {/* Brand & Links */}
            <div className="flex items-center space-x-6">
                <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-[#5B3E96] text-white flex items-center justify-center font-bold text-lg shadow">
                        T
                    </div>
                    <span className="text-xl font-black tracking-tight text-[#5B3E96] dark:text-white">
                        TOR<span className="text-[#9B82C1]">max</span>
                    </span>
                </Link>

                <div className="hidden lg:flex items-center space-x-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <Link href="/#daily-digest" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#2D2938] transition-colors">
                        {t('dailyDigest')}
                    </Link>
                    <Link href="/search-feed" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#2D2938] transition-colors">
                        {t('torDirectory')}
                    </Link>
                    <Link href="/admin" className="px-3 py-1.5 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 font-bold transition-colors">
                        ⚙️ {t('adminPortal')}
                    </Link>
                </div>
            </div>

            {/* Quick Search */}
            <div className="flex-1 max-w-md hidden sm:block relative">
                <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-slate-400 text-xs">🔍</span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={t('quickSearch')}
                        className="w-full pl-9 pr-12 py-2 text-xs font-medium bg-slate-100 dark:bg-[#121118] border border-transparent dark:border-[#2D2938] focus:border-[#5B3E96] rounded-xl focus:outline-none transition-all text-slate-900 dark:text-slate-100 placeholder-slate-400"
                    />
                </div>
            </div>

            {/* Utility Actions */}
            <div className="flex items-center space-x-2 shrink-0">
                {/* Global Language Switcher */}
                <button
                    onClick={toggleLanguage}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-[#2D2938] text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2D2938] transition-colors"
                >
                    🌐 {lang}
                </button>

                {/* Global Theme Switcher */}
                <button
                    onClick={toggleTheme}
                    className="w-8 h-8 rounded-lg border border-slate-200 dark:border-[#2D2938] text-xs hover:bg-slate-100 dark:hover:bg-[#2D2938] transition-colors flex items-center justify-center"
                >
                    {isDark ? '☀️' : '🌙'}
                </button>

                {/* Notification Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="w-8 h-8 rounded-lg border border-slate-200 dark:border-[#2D2938] flex items-center justify-center text-xs relative hover:bg-slate-100 dark:hover:bg-[#2D2938] transition-colors"
                        title="Notifications"
                    >
                        🔔
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1C1A24] border border-slate-200 dark:border-[#2D2938] rounded-2xl shadow-xl p-4 space-y-3 z-50">
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#2D2938] pb-2">
                                <span className="font-bold text-xs text-slate-900 dark:text-white">
                                    {t('notifications')}
                                </span>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-[10px] text-[#5B3E96] dark:text-[#9B82C1] font-bold hover:underline"
                                    >
                                        {t('markAllRead')}
                                    </button>
                                )}
                            </div>

                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {notifications.map((n) => (
                                    <div
                                        key={n.id}
                                        className={`p-2.5 rounded-xl text-xs space-y-1 transition-colors ${n.read
                                                ? 'bg-transparent opacity-60'
                                                : 'bg-slate-50 dark:bg-[#121118] border border-slate-100 dark:border-[#2D2938]'
                                            }`}
                                    >
                                        <div className="font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                                            {n.title}
                                        </div>
                                        <div className="text-[10px] text-slate-400 font-medium">{n.time}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* User Profile Direct Link */}
                <Link href="/profile" className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-[#2D2938] group">
                    <div className="w-8 h-8 rounded-lg bg-[#3B2468] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#5B3E96]/50">
                        TT
                    </div>
                    <div className="hidden xl:block text-xs">
                        <div className="font-bold flex items-center gap-1 text-[11px] text-slate-900 dark:text-white">
                            <span>{companyName}</span>
                            <span className="text-emerald-500 text-[10px]">⚙️</span>
                        </div>
                        <div className="text-slate-400 text-[9px]">Tax ID: {taxId}</div>
                    </div>
                </Link>
            </div>
        </nav>
    );
};