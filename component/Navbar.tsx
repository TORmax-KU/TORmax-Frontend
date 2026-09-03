'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { AppNotification } from '@/types';
import DrawerMenu from './DrawerMenu';
import LogoSignature from './LogoSignature';

export interface NavbarProps {
    companyName: string;
    taxId: string;
}

const mockNotifications: AppNotification[] = [
    { id: '1', title: 'New TOR match: MDES Data Exchange (96%)', time: '10m ago', read: false },
    { id: '2', title: 'Daily Digest dispatched to your email', time: '2h ago', read: false },
    { id: '3', title: 'Ingestion system completed e-GP sync', time: '5h ago', read: true }
];

export const Navbar: React.FC<NavbarProps> = ({ companyName }) => {
    const { isDark, toggleTheme, lang, toggleLanguage, t } = useApp();
    const { user, logout } = useAuth();
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
                <div style={{
                    display: 'flex'
                }}>
                    <DrawerMenu />
                    <Link href="/">
                    <LogoSignature/>
                        
                    </Link>
                </div>


                <div className="hidden lg:flex items-center space-x-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {!user && (
                        <Link href="/login" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#2D2938] transition-colors">
                            {t('login')}
                        </Link>
                    )}
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
                {/* <button
                    onClick={toggleLanguage}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-[#2D2938] text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2D2938] transition-colors"
                >
                    🌐 {lang}
                </button> */}

                {/* Global Theme Switcher */}
                <button
                    onClick={toggleTheme}
                    className="w-8 h-8 rounded-lg border border-slate-200 dark:border-[#2D2938] text-xs hover:bg-slate-100 dark:hover:bg-[#2D2938] transition-colors flex items-center justify-center"
                >
                    {isDark ? '🌙' : '☀️'}
                </button>

                {/* Notification Link */}
                <Link
                    href="/notifications"
                    className="w-8 h-8 rounded-lg border border-slate-200 dark:border-[#2D2938] flex items-center justify-center text-xs relative hover:bg-slate-100 dark:hover:bg-[#2D2938] transition-colors"
                    title="Notifications"
                >
                    🔔
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                            {unreadCount}
                        </span>
                    )}
                </Link>

                {/* User Profile Direct Link */}
                {user && (
                    <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-[#2D2938] group">
                        <Link href="/profile" className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg bg-[#3B2468] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#5B3E96]/50">
                                {(user.realName || user.email).slice(0, 2).toUpperCase()}
                            </div>
                            <div className="hidden xl:block text-xs">
                                <div className="font-bold flex items-center gap-1 text-[11px] text-slate-900 dark:text-white">
                                    <span>{user.realName || companyName}</span>
                                </div>
                                <div className="text-slate-400 text-[9px]">{user.email}</div>
                            </div>
                        </Link>
                        <button
                            onClick={logout}
                            title="Log out"
                            className="w-8 h-8 rounded-lg border border-slate-200 dark:border-[#2D2938] flex items-center justify-center text-xs hover:bg-slate-100 dark:hover:bg-[#2D2938] transition-colors"
                        >
                            ↪️
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};