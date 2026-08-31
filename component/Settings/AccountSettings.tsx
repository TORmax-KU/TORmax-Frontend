'use client';

import React, { useState } from "react";
import {
  RiMailLine,
  RiPhoneLine,
  RiTranslate2,
  RiTimeLine,
  RiEditLine,
  RiCheckLine,
  RiUserSettingsLine
} from "@remixicon/react";
import { UserSettings } from "@/interface/settings";
import { useApp } from "@/context/AppContext";

interface AccountSettingsProps {
  settings: UserSettings;
  onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
  lang?: 'en' | 'th';
}

// Local Dictionary for Translation Support
const dictionary = {
  en: {
    title: 'Account Information',
    subtitle: 'Manage your credentials and primary identity parameters',
    email: 'Email Address',
    phone: 'Phone Number',
    language: 'Language Preference',
    timezone: 'Current Timezone',
    edit: 'Edit',
  },
  th: {
    title: 'ข้อมูลบัญชีผู้ใช้',
    subtitle: 'จัดการข้อมูลประจำตัวและพารามิเตอร์อัตลักษณ์หลักของคุณ',
    email: 'อีเมล',
    phone: 'หมายเลขโทรศัพท์',
    language: 'ภาษาที่ต้องการ',
    timezone: 'เขตเวลาปัจจุบัน',
    edit: 'แก้ไข',
  },
};

export default function AccountSettings({ settings, onUpdate }: AccountSettingsProps) {
  // 1. Re-added missing state definitions
  const [editing, setEditing] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  // 2. Automatically sync language from App Context
  const { lang } = useApp();
  const activeLang = (lang?.toLowerCase() as 'en' | 'th') === 'th' ? 'th' : 'en';
  const t = dictionary[activeLang];

  const fields = [
    { key: 'email' as const, label: t.email, icon: RiMailLine, type: 'email', value: settings.email },
    { key: 'phone' as const, label: t.phone, icon: RiPhoneLine, type: 'tel', value: settings.phone },
    { key: 'language' as const, label: t.language, icon: RiTranslate2, type: 'select', value: settings.language, options: ['English', 'Thai', 'Chinese', 'Japanese', 'Korean'] },
    { key: 'timezone' as const, label: t.timezone, icon: RiTimeLine, type: 'select', value: settings.timezone, options: ['Asia/Bangkok (GMT+7)', 'Asia/Tokyo (GMT+9)', 'America/New_York (GMT-5)', 'Europe/London (GMT+0)'] },
  ];

  const handleStartEdit = (key: string, currentValue: string) => {
    setEditing(key);
    setTempValue(currentValue);
  };

  const handleSave = (key: keyof UserSettings) => {
    onUpdate(key, tempValue as UserSettings[typeof key]);
    setEditing(null);
  };

  return (
    <React.Fragment>
      {/* Header Section with Glassmorphism */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl shadow-sm">
          <RiUserSettingsLine className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{t.title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</p>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => {
          const Icon = field.icon;
          const isEditing = editing === field.key;

          return (
            <div
              key={field.key}
              className="group relative bg-slate-50/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white/80 dark:hover:bg-slate-900/80 hover:shadow-lg hover:shadow-indigo-500/5 rounded-2xl p-4 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-sm">
                    <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      {field.label}
                    </span>
                    {!isEditing && (
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5 truncate max-w-[180px]">
                        {field.value}
                      </p>
                    )}
                  </div>
                </div>

                {!isEditing && (
                  <button
                    onClick={() => handleStartEdit(field.key, field.value)}
                    className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                    aria-label={`${t.edit} ${field.label}`}
                  >
                    <RiEditLine className="h-4 w-4" />
                  </button>
                )}
              </div>

              {isEditing && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                  {field.type === 'select' ? (
                    <select
                      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-indigo-500 dark:border-indigo-400 text-slate-900 dark:text-slate-100 text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-full shadow-sm"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      autoFocus
                    >
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-indigo-500 dark:border-indigo-400 text-slate-900 dark:text-slate-100 text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-full shadow-sm"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      autoFocus
                    />
                  )}
                  <button
                    onClick={() => handleSave(field.key)}
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl transition-colors shrink-0 shadow-sm cursor-pointer"
                  >
                    <RiCheckLine className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}