'use client';

import React from "react";
import { UserSettings } from "@/interface/settings";
import { RiNotificationLine, RiMailLine, RiSmartphoneLine, RiMegaphoneLine, RiMessage3Line } from "@remixicon/react";
import { useApp } from "@/context/AppContext";

interface NotificationSettingsProps {
  settings: UserSettings;
  onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

// Local Dictionary for Translation Support
const dictionary = {
  en: {
    title: 'Alert Preferences',
    subtitle: 'Configure how and when you receive real-time notifications',
    emailAlerts: 'Email Alerts',
    emailDesc: 'Direct emails for essential updates',
    pushChannels: 'Push Channels',
    pushDesc: 'Instant browser/mobile push alerts',
    projectSignals: 'Project Signals',
    projectDesc: 'Milestones and tracking updates',
    directMessages: 'Direct Messages',
    messagesDesc: 'Chat alerts and direct mentions',
    productNews: 'Product News',
    newsDesc: 'Feature updates and newsletters',
  },
  th: {
    title: 'ตั้งค่าการแจ้งเตือน',
    subtitle: 'กำหนดวิธีการและเวลาที่คุณจะได้รับ การแจ้งเตือนแบบเรียลไทม์',
    emailAlerts: 'การแจ้งเตือนทางอีเมล',
    emailDesc: 'ส่งอีเมลโดยตรงสำหรับการอัปเดตที่สำคัญ',
    pushChannels: 'ช่องทาง Push Notification',
    pushDesc: 'การแจ้งเตือนทันทีบนเบราว์เซอร์และมือถือ',
    projectSignals: 'สัญญาณโปรเจกต์',
    projectDesc: 'อัปเดตความคืบหน้าและไมล์สโตน',
    directMessages: 'ข้อความส่วนตัว',
    messagesDesc: 'การแจ้งเตือนแชตและการกล่าวถึงโดยตรง',
    productNews: 'ข่าวสารผลิตภัณฑ์',
    newsDesc: 'อัปเดตฟีเจอร์ใหม่และจดหมายข่าว',
  },
};

export default function NotificationSettings({ settings, onUpdate }: NotificationSettingsProps) {
  const { lang } = useApp();
  const activeLang = (lang?.toLowerCase() as 'en' | 'th') === 'th' ? 'th' : 'en';
  const t = dictionary[activeLang];

  const notificationOptions = [
    { key: 'emailNotifications' as const, label: t.emailAlerts, icon: RiMailLine, description: t.emailDesc },
    { key: 'pushNotifications' as const, label: t.pushChannels, icon: RiSmartphoneLine, description: t.pushDesc },
    { key: 'projectUpdates' as const, label: t.projectSignals, icon: RiNotificationLine, description: t.projectDesc },
    { key: 'messages' as const, label: t.directMessages, icon: RiMessage3Line, description: t.messagesDesc },
    { key: 'marketingEmails' as const, label: t.productNews, icon: RiMegaphoneLine, description: t.newsDesc },
  ];

  return (
    <React.Fragment>
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl shadow-sm">
          <RiNotificationLine className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{t.title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</p>
        </div>
      </div>

      <div className="space-y-3">
        {notificationOptions.map((option) => {
          const Icon = option.icon;
          const isEnabled = Boolean(settings[option.key]);

          return (
            <div
              key={option.key}
              className="flex items-center justify-between p-4 bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white/80 dark:hover:bg-slate-900/80 hover:shadow-md rounded-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl border shadow-sm transition-colors ${
                  isEnabled 
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/80 text-slate-400 dark:text-slate-500'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{option.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{option.description}</p>
                </div>
              </div>

              <button
                onClick={() => onUpdate(option.key, !isEnabled)}
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
      </div>
    </React.Fragment>
  );
}