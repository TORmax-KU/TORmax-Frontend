'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { AppNotification } from '@/types';
import { RiArrowDownSLine, RiLogoutBoxRLine, RiMoonLine, RiNotification3Line, RiSunLine } from '@remixicon/react';
import DrawerMenu from './DrawerMenu';
import LogoSignature from './LogoSignature';

export interface NavbarProps {
    companyName?: string;
    taxId?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ companyName }) => {
    const { isDark, setTheme, lang, toggleLanguage, t } = useApp();
    const { user, logout } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<AppNotification[]>([]);

    // Notification Handling
    const unreadCount = notifications.filter((n) => !n.read).length;
    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    return (
        <nav className="sticky top-0 z-40 bg-white/90 dark:bg-[#1C1A24]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#2D2938] px-3 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-4">
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

                {/* Global Theme Selector Dropdown */}
                <div className="relative hidden sm:inline-flex items-center">
                    <select
                        value={isDark ? 'dark' : 'light'}
                        onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
                        aria-label="Select theme"
                        className="h-8 pl-7 pr-6 text-xs font-semibold rounded-lg border border-slate-200 dark:border-[#2D2938] bg-white dark:bg-[#1C1A24] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#2D2938] transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#5B3E96] appearance-none"
                    >
                        <option value="light">{lang === 'TH' ? 'ธีมสว่าง' : 'Light'}</option>
                        <option value="dark">{lang === 'TH' ? 'ธีมมืด' : 'Dark'}</option>
                    </select>
                    {isDark
                        ? <RiMoonLine size={14} className="pointer-events-none absolute left-2 text-slate-400" />
                        : <RiSunLine size={14} className="pointer-events-none absolute left-2 text-slate-400" />}
                    <RiArrowDownSLine size={14} className="pointer-events-none absolute right-1.5 text-slate-400" />
                </div>

                {/* Notification Link */}
                <Link
                    href="/notifications"
                    className="w-8 h-8 rounded-lg border border-slate-200 dark:border-[#2D2938] flex items-center justify-center text-xs relative hover:bg-slate-100 dark:hover:bg-[#2D2938] transition-colors"
                    title="Notifications"
                >
                    <RiNotification3Line size={16} />
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
                            type="button"
                            onClick={logout}
                            title="Sign out"
                            aria-label="Sign out"
                            className="h-8 px-2.5 rounded-lg border border-slate-200 dark:border-[#3A3547] flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-300 bg-white dark:bg-[#24212D] hover:text-rose-600 dark:hover:text-rose-300 hover:border-rose-200 dark:hover:border-rose-400/30 hover:bg-rose-50 dark:hover:bg-rose-400/10 active:scale-[0.97] transition-all duration-150"
                        >
                            <RiLogoutBoxRLine className="h-4 w-4" aria-hidden="true" />
                            <span className="hidden xl:inline">Sign out</span>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};
