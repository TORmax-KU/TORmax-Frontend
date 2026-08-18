'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    RiHomeLine,
    RiUserLine,
    RiBriefcaseLine,
    RiFileListLine,
    RiNotificationLine,
    RiCloseLine,
    RiMenuLine,
    RiQuestionLine,
    RiSettings4Line,
    RiMoonLine,
    RiSunLine,
    RiComputerLine,
    RiShieldCheckLine,
    RiLogoutBoxRLine
} from "@remixicon/react";

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}

export default function DrawerMenu() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

    // Close drawer when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Apply theme
    useEffect(() => {
        const html = document.querySelector('html');
        if (!html) return;

        if (theme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            html.setAttribute('data-theme', theme);
        }
    }, [theme]);

    const mainNavItems: NavItem[] = [
        { label: 'Dashboard', href: '/', icon: <RiHomeLine className="h-5 w-5" /> },
        { label: 'Profile', href: '/profile', icon: <RiUserLine className="h-5 w-5" /> },
        { label: 'Projects', href: '/tor-list', icon: <RiBriefcaseLine className="h-5 w-5" /> },
        { label: 'Tracked Projects', href: '/tracked', icon: <RiFileListLine className="h-5 w-5" /> },
        { label: 'Notifications', href: '/notifications', icon: <RiNotificationLine className="h-5 w-5" />, badge: 3 },
    ];

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const getThemeIcon = () => {
        if (theme === 'light') return <RiSunLine className="h-5 w-5" />;
        if (theme === 'dark') return <RiMoonLine className="h-5 w-5" />;
        return <RiComputerLine className="h-5 w-5" />;
    };

    const cycleTheme = () => {
        const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    return (
        <div className="drawer z-50">
            {/* Drawer Toggle */}
            <input 
                id="main-drawer" 
                type="checkbox" 
                className="drawer-toggle" 
                checked={isOpen}
                onChange={() => setIsOpen(!isOpen)}
            />

            {/* Drawer Content */}
            <div className="drawer-content">
                {/* Hamburger Button */}
                <label 
                    htmlFor="main-drawer" 
                    className="btn btn-ghost btn-circle drawer-button"
                    aria-label="Open menu"
                >
                    <RiMenuLine className="h-5 w-5" />
                </label>
            </div>

            {/* Drawer Side */}
            <div className="drawer-side z-[60]">
                {/* Overlay */}
                <label 
                    htmlFor="main-drawer" 
                    aria-label="close sidebar" 
                    className="drawer-overlay"
                    onClick={() => setIsOpen(false)}
                />

                {/* Sidebar Content */}
                <div className="menu bg-base-100 min-h-full w-80 p-0 flex flex-col shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-4 border-b border-base-200">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <RiShieldCheckLine className="h-5 w-5 text-primary" />
                            </div>
                            <span className="font-bold text-lg">TOR Hub</span>
                        </div>
                        <button 
                            className="btn btn-ghost btn-sm btn-square"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close menu"
                        >
                            <RiCloseLine className="h-5 w-5" />
                        </button>
                    </div>

                    {/* User Profile Preview */}
                    <div className="px-4 py-4 border-b border-base-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                JD
                            </div>
                            <div>
                                <p className="font-medium text-sm">John Doe</p>
                                <p className="text-xs text-base-content/50">john@example.com</p>
                            </div>
                            <div className="ml-auto">
                                <span className="badge badge-primary badge-sm">Pro</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Navigation */}
                    <div className="flex-1 px-3 py-4 overflow-y-auto">
                        <ul className="space-y-1">
                            {mainNavItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`
                                            flex items-center gap-3 px-3 py-2.5 rounded-xl
                                            transition-all duration-200 text-sm font-medium
                                            ${isActive(item.href)
                                                ? 'bg-primary/10 text-primary' 
                                                : 'text-base-content/60 hover:bg-base-200 hover:text-base-content'
                                            }
                                        `}
                                    >
                                        {item.icon}
                                        <span className="flex-1">{item.label}</span>
                                        {item.badge && (
                                            <span className="badge badge-primary badge-sm">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Footer: Settings, Theme, Help */}
                    <div className="px-3 py-4 border-t border-base-200">
                        <div className="flex items-center justify-around">
                            {/* Settings */}
                            <Link
                                href="/settings"
                                className="btn btn-ghost btn-sm btn-square tooltip"
                                data-tip="Settings"
                                onClick={() => setIsOpen(false)}
                            >
                                <RiSettings4Line className="h-5 w-5" />
                            </Link>

                            {/* Theme Switcher */}
                            <button
                                className="btn btn-ghost btn-sm btn-square tooltip"
                                data-tip={`Theme: ${theme}`}
                                onClick={cycleTheme}
                            >
                                {getThemeIcon()}
                            </button>

                            {/* Help */}
                            <Link
                                href="/help"
                                className="btn btn-ghost btn-sm btn-square tooltip"
                                data-tip="Help"
                                onClick={() => setIsOpen(false)}
                            >
                                <RiQuestionLine className="h-5 w-5" />
                            </Link>

                            {/* Logout */}
                            <button
                                className="btn btn-ghost btn-sm btn-square tooltip text-error hover:text-error"
                                data-tip="Logout"
                                onClick={() => {
                                    // Handle logout
                                    console.log('Logout clicked');
                                }}
                            >
                                <RiLogoutBoxRLine className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Theme indicator */}
                        <div className="text-center mt-3">
                            <span className="text-[10px] text-base-content/30">
                                Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
                            </span>
                        </div>
                    </div>

                    {/* Version */}
                    <div className="px-4 py-2 border-t border-base-200 text-center">
                        <p className="text-[10px] text-base-content/30">Version 2.0.1</p>
                    </div>
                </div>
            </div>
        </div>
    );
}