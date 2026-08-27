'use client';

import React, { useState } from "react";
import { UserSettings } from "@/interface/settings";
import { RiLockLine, RiShieldKeyholeLine, RiHistoryLine, RiEyeLine, RiEyeOffLine, RiArrowRightSLine } from "@remixicon/react";
import { useApp } from "@/context/AppContext";

interface SecuritySettingsProps {
  settings: UserSettings;
  onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

// Local Dictionary for Translation Support
const dictionary = {
  en: {
    title: 'Security & Auth',
    subtitle: 'Configure multi-factor authentication and session security',
    twoFactorLabel: 'Two-Factor Authentication (2FA)',
    twoFactorDesc: 'Enforce secondary authorization app prompt',
    timeoutLabel: 'Inactivity Timeout',
    timeoutDesc: 'Automatic session termination window',
    updatePassword: 'Update Security Password',
    currentPassPlaceholder: 'Current Password',
    newPassPlaceholder: 'New Password',
    applyPassBtn: 'Apply New Password',
  },
  th: {
    title: 'ความปลอดภัยและการยืนยันตัวตน',
    subtitle: 'กำหนดค่าการยืนยันตัวตนหลายปัจจัยและความปลอดภัยของเซสชัน',
    twoFactorLabel: 'การยืนยันตัวตนสองปัจจัย (2FA)',
    twoFactorDesc: 'บังคับใช้การอนุมัติผ่านแอปพลิเคชันเพิ่มเติม',
    timeoutLabel: 'หมดเวลาเมื่อไม่มีการใช้งาน',
    timeoutDesc: 'ระยะเวลาปิดเซสชันอัตโนมัติ',
    updatePassword: 'อัปเดตรหัสผ่านความปลอดภัย',
    currentPassPlaceholder: 'รหัสผ่านปัจจุบัน',
    newPassPlaceholder: 'รหัสผ่านใหม่',
    applyPassBtn: 'ปรับใช้รหัสผ่านใหม่',
  },
};

export default function SecuritySettings({ settings, onUpdate }: SecuritySettingsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const { lang } = useApp();
  const activeLang = (lang?.toLowerCase() as 'en' | 'th') === 'th' ? 'th' : 'en';
  const t = dictionary[activeLang];

  return (
    <React.Fragment>
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl shadow-sm">
          <RiLockLine className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{t.title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* 2FA Toggle */}
        <div className="flex items-center justify-between p-4 bg-slate-50/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white/80 dark:hover:bg-slate-900/80 hover:shadow-md rounded-2xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-sm">
              <RiShieldKeyholeLine className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t.twoFactorLabel}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.twoFactorDesc}</p>
            </div>
          </div>
          <button
            onClick={() => onUpdate('twoFactorAuth', !settings.twoFactorAuth)}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
              settings.twoFactorAuth ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
              settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Session Timeout */}
        <div className="flex items-center justify-between p-4 bg-slate-50/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white/80 dark:hover:bg-slate-900/80 hover:shadow-md rounded-2xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-sm">
              <RiHistoryLine className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t.timeoutLabel}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.timeoutDesc}</p>
            </div>
          </div>
          <select
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-indigo-500 dark:border-indigo-400 text-slate-900 dark:text-slate-100 text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
            value={settings.sessionTimeout}
            onChange={(e) => onUpdate('sessionTimeout', e.target.value)}
          >
            {['15 minutes', '30 minutes', '1 hour', '2 hours', '8 hours'].map((time) => (
              <option key={time} value={time} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{time}</option>
            ))}
          </select>
        </div>

        {/* Password Reset Panel */}
        <div className="p-4 bg-slate-50/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white/80 dark:hover:bg-slate-900/80 hover:shadow-md rounded-2xl transition-all duration-300">
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="w-full flex items-center justify-between text-left text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <span>{t.updatePassword}</span>
            <RiArrowRightSLine className={`h-5 w-5 text-slate-500 dark:text-slate-400 transition-transform ${showChangePassword ? 'rotate-90' : ''}`} />
          </button>

          {showChangePassword && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <input
                type={showPassword ? 'text' : 'password'}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm rounded-xl px-4 py-2.5 w-full focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
                placeholder={t.currentPassPlaceholder}
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm rounded-xl px-4 py-2.5 w-full focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 shadow-sm pr-10"
                  placeholder={t.newPassPlaceholder}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <RiEyeOffLine className="h-4 w-4" /> : <RiEyeLine className="h-4 w-4" />}
                </button>
              </div>
              <button
                type="button"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                {t.applyPassBtn}
              </button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}