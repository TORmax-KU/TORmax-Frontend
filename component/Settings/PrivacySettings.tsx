'use client';

import React from "react";
import { UserSettings } from "@/interface/settings";
import { RiShieldLine, RiEyeLine, RiMailLine, RiPhoneLine, RiDeleteBin7Line } from "@remixicon/react";
import { useApp } from "@/context/AppContext";

interface PrivacySettingsProps {
  settings: UserSettings;
  onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

// Local Dictionary for Translation Support
const dictionary = {
  en: {
    title: 'Privacy & Visibility',
    subtitle: 'Control data exposure and manage public profile scope',
    visibilityLabel: 'Public Profile Visibility',
    visibilityDesc: 'Select who can view your profile metrics',
    optPublic: 'Public (Everyone)',
    optEmployers: 'Verified Employers Only',
    optPrivate: 'Strictly Private',
    exposeEmail: 'Expose Email Address',
    exposePhone: 'Expose Phone Number',
    purgeTitle: 'Purge Account Data',
    purgeDesc: 'Permanently erase profile settings and associated metadata.',
    deleteBtn: 'Delete Account',
  },
  th: {
    title: 'ความเป็นส่วนตัวและการมองเห็น',
    subtitle: 'ควบคุมการเปิดเผยข้อมูลและจัดการขอบเขตโปรไฟล์สาธารณะ',
    visibilityLabel: 'การมองเห็นโปรไฟล์สาธารณะ',
    visibilityDesc: 'เลือกผู้ที่สามารถดูข้อมูลโปรไฟล์ของคุณได้',
    optPublic: 'สาธารณะ (ทุกคน)',
    optEmployers: 'เฉพาะนายจ้างที่ผ่านการรับรอง',
    optPrivate: 'ส่วนตัวอย่างเคร่งครัด',
    exposeEmail: 'แสดงที่อยู่อีเมล',
    exposePhone: 'แสดงหมายเลขโทรศัพท์',
    purgeTitle: 'ลบข้อมูลบัญชีผู้ใช้',
    purgeDesc: 'ลบการตั้งค่าโปรไฟล์และข้อมูลเมตาที่เกี่ยวข้องอย่างถาวร',
    deleteBtn: 'ลบบัญชีผู้ใช้',
  },
};

export default function PrivacySettings({ settings, onUpdate }: PrivacySettingsProps) {
  const { lang } = useApp();
  const activeLang = (lang?.toLowerCase() as 'en' | 'th') === 'th' ? 'th' : 'en';
  const t = dictionary[activeLang];

  return (
    <React.Fragment>
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl shadow-sm">
          <RiShieldLine className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{t.title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Profile Visibility Dropdown Card */}
        <div className="p-5 bg-slate-50/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white/80 dark:hover:bg-slate-900/80 hover:shadow-md rounded-2xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-sm">
              <RiEyeLine className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t.visibilityLabel}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.visibilityDesc}</p>
            </div>
          </div>
          <select 
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-indigo-500 dark:border-indigo-400 text-slate-900 dark:text-slate-100 text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
            value={settings.profileVisibility}
            onChange={(e) => onUpdate('profileVisibility', e.target.value as UserSettings['profileVisibility'])}
          >
            <option value="public" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{t.optPublic}</option>
            <option value="employers" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{t.optEmployers}</option>
            <option value="private" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{t.optPrivate}</option>
          </select>
        </div>

        {/* Contact Field Toggles */}
        {[
          { key: 'showEmail' as const, label: t.exposeEmail, icon: RiMailLine },
          { key: 'showPhone' as const, label: t.exposePhone, icon: RiPhoneLine },
        ].map((item) => {
          const Icon = item.icon;
          const isEnabled = settings[item.key];
          return (
            <div 
              key={item.key} 
              className="p-4 bg-slate-50/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white/80 dark:hover:bg-slate-900/80 hover:shadow-md rounded-2xl transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-sm">
                  <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</p>
              </div>
              <button
                onClick={() => onUpdate(item.key, !isEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
                  isEnabled ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                  isEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          );
        })}

        {/* Danger Zone */}
        <div className="mt-8 border-t border-rose-200 dark:border-rose-900/40 pt-6">
          <div className="p-5 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-rose-700 dark:text-rose-400">{t.purgeTitle}</p>
              <p className="text-xs text-rose-600/80 dark:text-rose-400/80 mt-1">{t.purgeDesc}</p>
            </div>
            <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer">
              <RiDeleteBin7Line className="h-4 w-4" />
              {t.deleteBtn}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}