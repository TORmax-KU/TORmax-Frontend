'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { 
  RiHomeLine,
  RiUserLine,
  RiBriefcaseLine,
  RiFileListLine,
  RiNotificationLine,
  RiCloseLine,
  RiMenuLine,
  RiSettings4Line,
  RiMoonLine,
  RiSunLine,
  RiGlobalLine,
  RiLogoutBoxRLine,
  RiShieldCheckLine
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
  const { isDark, toggleTheme, lang, toggleLanguage } = useApp();

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const mainNavItems: NavItem[] = [
    { label: 'Daily Digest', labelTh: 'สรุปรายวัน', href: '/#daily-digest', icon: <RiHomeLine className="h-5 w-5" /> },
    { label: 'TOR Directory', labelTh: 'คลังเอกสาร TOR', href: '/search-feed', icon: <RiBriefcaseLine className="h-5 w-5" /> },
    { label: 'Tracked Projects', labelTh: 'โครงการที่ติดตาม', href: '/tracked', icon: <RiFileListLine className="h-5 w-5" /> },
    { label: 'Notifications', labelTh: 'การแจ้งเตือน', href: '/notifications', icon: <RiNotificationLine className="h-5 w-5" />, badge: unreadCount },
    { label: 'Profile Settings', labelTh: 'ตั้งค่าโปรไฟล์', href: '/profile', icon: <RiUserLine className="h-5 w-5" /> },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="drawer z-50">
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
          className="btn btn-ghost btn-circle drawer-button"
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
          className="drawer-overlay"
        />

        {/* Sidebar Container */}
        <div className="bg-white dark:bg-[#1C1A24] border-r border-slate-200 dark:border-[#2D2938] min-h-full w-80 p-0 flex flex-col shadow-2xl text-slate-800 dark:text-slate-100">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-[#2D2938]">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-[#5B3E96] text-white flex items-center justify-center font-bold text-lg shadow">
                T
              </div>
              <span className="text-xl font-black tracking-tight text-[#5B3E96] dark:text-white">
                TOR<span className="text-[#9B82C1]">max</span>
              </span>
            </Link>
            <label 
              htmlFor="main-drawer" 
              className="btn btn-ghost btn-sm btn-square text-slate-400 hover:text-slate-600 dark:hover:text-white"
              aria-label="Close menu"
            >
              <RiCloseLine className="h-5 w-5" />
            </label>
          </div>

          {/* User Profile Preview */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-[#2D2938] bg-slate-50/50 dark:bg-[#121118]/50">
            <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#3B2468] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#5B3E96]/40 shrink-0">
                TT
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-slate-900 dark:text-white truncate group-hover:text-[#5B3E96] dark:group-hover:text-[#9B82C1] transition-colors">
                  {companyName}
                </p>
                <p className="text-[10px] text-slate-400 truncate">Tax ID: {taxId}</p>
              </div>
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
            {mainNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold
                    transition-all duration-150
                    ${active 
                      ? 'bg-[#5B3E96]/10 text-[#5B3E96] dark:text-[#9B82C1] font-bold' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#2D2938]'
                    }
                  `}
                >
                  <span className={active ? 'text-[#5B3E96] dark:text-[#9B82C1]' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span className="flex-1">{lang === 'EN' ? item.label : item.labelTh}</span>
                  {!!item.badge && item.badge > 0 && (
                    <span className="badge badge-error badge-xs font-bold text-white p-1">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-2">
              <Link 
                href="/admin" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors"
              >
                <RiShieldCheckLine className="h-5 w-5" />
                <span>{lang === 'EN' ? 'Admin Portal' : 'ระบบจัดการ'}</span>
              </Link>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-4 py-3 border-t border-slate-100 dark:border-[#2D2938] bg-slate-50/50 dark:bg-[#121118]/50">
            <div className="flex items-center justify-between gap-1">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 dark:border-[#2D2938] text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2D2938] transition-colors"
              >
                <RiGlobalLine className="h-4 w-4" />
                <span>{lang}</span>
              </button>

              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 dark:border-[#2D2938] text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2D2938] transition-colors"
              >
                {isDark ? <RiSunLine className="h-4 w-4" /> : <RiMoonLine className="h-4 w-4" />}
                <span>{isDark ? 'Light' : 'Dark'}</span>
              </button>

              {/* Settings Link */}
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg border border-slate-200 dark:border-[#2D2938] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#2D2938] transition-colors"
                title="Settings"
              >
                <RiSettings4Line className="h-4 w-4" />
              </Link>
            </div>

            {/* Version & Logout */}
            <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-[#2D2938]/50 flex items-center justify-between text-[10px] text-slate-400">
              <span>TORmax v2.0.1</span>
              <button 
                onClick={() => console.log('Logged out')}
                className="flex items-center gap-1 text-rose-500 hover:underline font-semibold"
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