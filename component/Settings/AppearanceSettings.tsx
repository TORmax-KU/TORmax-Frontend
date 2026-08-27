'use client';

import React from "react";
import { UserSettings } from "@/interface/settings";
import { RiPaletteLine, RiSunLine, RiMoonLine, RiComputerLine, RiLayoutGridLine, RiBardFill } from "@remixicon/react";
import { useApp } from "@/context/AppContext";

interface AppearanceSettingsProps {
  settings: UserSettings;
  onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

// Local Dictionary for Translation Support
const dictionary = {
  en: {
    title: 'Interface Theme',
    subtitle: 'Customize the visual layout, density, and rendering engine',
    baseTheme: 'Base Theme Mode',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    compactLayout: 'Compact Layout',
    compactDesc: 'Reduce structural margins',
    reducedMotion: 'Reduced Motion',
    motionDesc: 'Disable transitions',
  },
  th: {
    title: 'ธีมของอินเทอร์เฟซ',
    subtitle: 'ปรับแต่งเค้าโครง สายตา ความหนาแน่น และเอ็นจินการแสดงผล',
    baseTheme: 'โหมดธีมหลัก',
    light: 'โหมดสว่าง',
    dark: 'โหมดมืด',
    system: 'ตามระบบ',
    compactLayout: 'เค้าโครงแบบบีบอัด',
    compactDesc: 'ลดระยะห่างของโครงสร้าง',
    reducedMotion: 'ลดการเคลื่อนไหว',
    motionDesc: 'ปิดการใช้งานเอฟเฟกต์การเปลี่ยนหน้า',
  },
};

export default function AppearanceSettings({ settings, onUpdate }: AppearanceSettingsProps) {
  const { lang } = useApp();
  const activeLang = (lang?.toLowerCase() as 'en' | 'th') === 'th' ? 'th' : 'en';
  const t = dictionary[activeLang];

  return (
    <React.Fragment>
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl shadow-sm">
          <RiPaletteLine className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{t.title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Theme Selector */}
        <div>
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-3">
            {t.baseTheme}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'light', label: t.light, icon: RiSunLine },
              { id: 'dark', label: t.dark, icon: RiMoonLine },
              { id: 'system', label: t.system, icon: RiComputerLine },
            ].map(({ id, label, icon: Icon }) => {
              const active = settings.theme === id;
              return (
                <button
                  key={id}
                  onClick={() => onUpdate('theme', id as UserSettings['theme'])}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className={`h-6 w-6 ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span className="text-xs font-semibold">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-white/80 dark:hover:bg-slate-900/80 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-sm">
                <RiLayoutGridLine className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t.compactLayout}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.compactDesc}</p>
              </div>
            </div>
            <button
              onClick={() => onUpdate('compactMode', !settings.compactMode)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
                settings.compactMode ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                  settings.compactMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-white/80 dark:hover:bg-slate-900/80 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-sm">
                <RiBardFill className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t.reducedMotion}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.motionDesc}</p>
              </div>
            </div>
            <button
              onClick={() => onUpdate('reducedMotion', !settings.reducedMotion)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
                settings.reducedMotion ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                  settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}