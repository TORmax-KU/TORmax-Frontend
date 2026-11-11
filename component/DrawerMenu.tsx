'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import LogoSignature from "./LogoSignature";
import {
  RiHomeLine,
  RiUserLine,
  RiBriefcaseLine,
  RiFileListLine,
  RiBookmarkLine,
  RiNotificationLine,
  RiCloseLine,
  RiMenuLine,
  RiSettings4Line,
  RiLogoutBoxRLine,
  RiSunLine,
  RiMoonLine,
  RiSparkling2Line
} from "@remixicon/react";

interface DrawerMenuProps {
  companyName?: string;
  taxId?: string;
  unreadCount?: number;
}

interface NavItem {
  label: string;
  labelTh: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

export default function DrawerMenu({
  companyName = "Tech Solutions Co., Ltd.",
  taxId = "0105563012345",
  unreadCount = 3
}: DrawerMenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Hook directly into your global AppContext
  const { isDark, setTheme, lang } = useApp();
  const { user } = useAuth();

  // Close drawer on route change
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setIsOpen(false);
    });
    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  const mainNavItems: NavItem[] = [
    { label: 'Daily Digest', labelTh: 'สรุปรายวัน', href: '/#daily-digest', icon: <RiHomeLine className="h-[18px] w-[18px]" /> },
    { label: 'TOR Directory', labelTh: 'คลังเอกสาร TOR', href: '/search-feed', icon: <RiBriefcaseLine className="h-[18px] w-[18px]" /> },
    { label: 'Matched for You', labelTh: 'TOR ที่ตรงกับคุณ', href: '/matches', icon: <RiSparkling2Line className="h-[18px] w-[18px]" /> },
    { label: 'Bookmarks', labelTh: 'โครงการที่ติดตามอยู่', href: '/bookmarks', icon: <RiBookmarkLine className="h-[18px] w-[18px]" /> },
    ...(user?.role === 'JobLister' ? [{ label: 'Manage Postings', labelTh: 'จัดการประกาศงาน', href: '/postings', icon: <RiFileListLine className="h-[18px] w-[18px]" /> }] : []),
    { label: 'Notifications', labelTh: 'การแจ้งเตือน', href: '/notifications', icon: <RiNotificationLine className="h-[18px] w-[18px]" />, badge: unreadCount },
    { label: 'Profile Settings', labelTh: 'ตั้งค่าโปรไฟล์', href: '/profile', icon: <RiUserLine className="h-[18px] w-[18px]" /> },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="drawer w-auto shrink-0 z-50">
      {/* Native DaisyUI Drawer Toggle */}
      <input
        id="main-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />

      {/* DaisyUI Drawer Content Trigger */}
      <div className="drawer-content">
        <label
          htmlFor="main-drawer"
          className="ui-icon-btn drawer-button"
          aria-label="Open menu"
        >
          <RiMenuLine className="h-5 w-5" />
        </label>
      </div>

      {/* DaisyUI Drawer Side Layout */}
      <div className="drawer-side z-[60]">
        <label
          htmlFor="main-drawer"
          aria-label="close sidebar"
          className="drawer-overlay !bg-black/30 backdrop-blur-[2px]"
        />

        {/* Sidebar Container */}
        <div className="bg-surface border-r border-line min-h-full w-[19rem] max-w-[85vw] flex flex-col shadow-float text-ink">

          {/* Header */}
          <div className="flex items-center justify-between px-5 h-16">
            <Link href="/" className="rounded-lg">
              <LogoSignature />
            </Link>
            <label
              htmlFor="main-drawer"
              className="ui-icon-btn"
              aria-label="Close menu"
            >
              <RiCloseLine className="h-5 w-5" />
            </label>
          </div>

          {/* User Profile Preview */}
          <div className="px-3 pb-3">
            <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-control p-2.5 bg-surface-2 hover:bg-surface-3 transition-colors group">
              <div className="w-9 h-9 rounded-full bg-brand-deep text-white flex items-center justify-center font-semibold text-[11px] tracking-wide shrink-0">
                TT
              </div>
              <div className="flex-1 min-w-0 leading-tight">
                <p className="font-medium text-[13px] text-ink truncate">
                  {companyName}
                </p>
                <p className="text-[11px] text-ink-3 truncate mt-0.5">Tax ID: {taxId}</p>
              </div>
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 px-3 py-2 overflow-y-auto space-y-0.5">
            {mainNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`
                    flex items-center gap-3 h-10 px-3 rounded-control text-sm font-medium
                    transition-colors duration-150
                    ${active
                      ? 'bg-brand-tint text-accent'
                      : 'text-ink-2 hover:bg-surface-2 hover:text-ink'
                    }
                  `}
                >
                  <span className={active ? 'text-accent' : 'text-ink-3'}>
                    {item.icon}
                  </span>
                  <span className="flex-1">{lang === 'EN' ? item.label : item.labelTh}</span>
                  {!!item.badge && item.badge > 0 && (
                    <span className="min-w-5 h-5 px-1.5 rounded-full bg-brand text-on-brand text-[11px] font-semibold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="px-4 py-4 border-t border-line">
            <div className="flex items-center justify-between gap-2">
              {/* Theme Selector Dropdown */}
              <div className="flex-1 relative flex items-center">
                <select
                  value={isDark ? 'dark' : 'light'}
                  onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
                  aria-label="Select theme"
                  className="ui-field h-9 pl-9 text-[13px] font-medium"
                >
                  <option value="light">{lang === 'TH' ? 'ธีมสว่าง' : 'Light'}</option>
                  <option value="dark">{lang === 'TH' ? 'ธีมมืด' : 'Dark'}</option>
                </select>
                {isDark
                  ? <RiMoonLine size={15} className="pointer-events-none absolute left-3 text-ink-3" />
                  : <RiSunLine size={15} className="pointer-events-none absolute left-3 text-ink-3" />}
              </div>

              {/* Settings Link */}
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="ui-btn ui-btn-secondary h-9 w-9 px-0"
                title="Settings"
              >
                <RiSettings4Line className="h-4 w-4" />
              </Link>
            </div>

            {/* Version & Logout */}
            <div className="mt-4 flex items-center justify-between text-xs text-ink-4">
              <span>TORmax v2.0.1</span>
              <button
                onClick={() => console.log('Logged out')}
                className="inline-flex items-center gap-1 text-danger font-medium hover:underline underline-offset-4"
              >
                <RiLogoutBoxRLine className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
