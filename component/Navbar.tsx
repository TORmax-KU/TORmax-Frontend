'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/lib/notifications';
import { RiLogoutBoxRLine, RiMoonLine, RiNotification3Line, RiSunLine } from '@remixicon/react';
import DrawerMenu from './DrawerMenu';
import LogoSignature from './LogoSignature';

export interface NavbarProps {
    companyName?: string;
    taxId?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ companyName }) => {
    const { isDark, setTheme, lang, toggleLanguage, t } = useApp();
    const { user, logout } = useAuth();
    const pathname = usePathname();
    // Polls while signed in so new match alerts appear without a page reload (SRS 3.1.3).
    const { unreadCount } = useNotifications({ poll: true });

    const current = (href: string) => (pathname.startsWith(href) ? 'page' : undefined);

    return (
        <nav className="sticky top-0 z-40 h-16 bg-canvas/80 backdrop-blur-xl backdrop-saturate-150 border-b border-line px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
            {/* Brand & Links */}
            <div className="flex items-center gap-6 min-w-0">
                <div className="flex items-center gap-1">
                    <DrawerMenu />
                    <Link href="/" className="rounded-lg">
                        <LogoSignature />
                    </Link>
                </div>

                <div className="hidden lg:flex items-center gap-0.5">
                    {!user && (
                        <Link href="/login" aria-current={current('/login')} className="ui-nav-link">
                            {t('login')}
                        </Link>
                    )}
                    <Link href="/#daily-digest" className="ui-nav-link">
                        {t('dailyDigest')}
                    </Link>
                    <Link href="/search-feed" aria-current={current('/search-feed')} className="ui-nav-link">
                        {t('torDirectory')}
                    </Link>
                    {user?.role === 'JobLister' && (
                        <Link href="/postings" aria-current={current('/postings')} className="ui-nav-link">
                            {lang === 'TH' ? 'จัดการประกาศงาน' : 'Manage Postings'}
                        </Link>
                    )}
                    {user && (
                        <Link href="/matches" aria-current={current('/matches')} className="ui-nav-link">
                            {lang === 'TH' ? 'TOR ที่ตรงกับคุณ' : 'Matched for You'}
                        </Link>
                    )}
                </div>
            </div>

            {/* Utility Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
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
                        className="ui-field h-9 w-auto pl-8 text-[13px] font-medium bg-transparent shadow-none border-transparent hover:bg-surface-2"
                    >
                        <option value="light">{lang === 'TH' ? 'ธีมสว่าง' : 'Light'}</option>
                        <option value="dark">{lang === 'TH' ? 'ธีมมืด' : 'Dark'}</option>
                    </select>
                    {isDark
                        ? <RiMoonLine size={15} className="pointer-events-none absolute left-2.5 text-ink-3" />
                        : <RiSunLine size={15} className="pointer-events-none absolute left-2.5 text-ink-3" />}
                </div>

                {/* Notification Link */}
                <Link
                    href="/notifications"
                    className="ui-icon-btn relative"
                    title="Notifications"
                    aria-label={unreadCount > 0 ? `Notifications (${unreadCount} unread)` : 'Notifications'}
                >
                    <RiNotification3Line size={18} />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-brand text-on-brand text-[10px] font-semibold leading-none flex items-center justify-center ring-2 ring-canvas">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </Link>

                {/* User Profile Direct Link */}
                {user && (
                    <div className="flex items-center gap-1.5 pl-2 ml-1 border-l border-line">
                        <Link href="/profile" className="flex items-center gap-2.5 rounded-control p-1 pr-2 hover:bg-surface-2 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-brand-deep text-white flex items-center justify-center font-semibold text-[11px] tracking-wide">
                                {(user.realName || user.email).slice(0, 2).toUpperCase()}
                            </div>
                            <div className="hidden xl:block leading-tight">
                                <div className="text-[13px] font-medium text-ink truncate max-w-40">
                                    <span>{user.realName || companyName}</span>
                                </div>
                                <div className="text-[11px] text-ink-3 truncate max-w-40">{user.email}</div>
                            </div>
                        </Link>
                        <button
                            type="button"
                            onClick={logout}
                            title="Sign out"
                            aria-label="Sign out"
                            className="ui-btn ui-btn-ghost ui-btn-sm px-2 text-ink-3 hover:text-danger hover:bg-danger-tint"
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
