'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  RiNotificationLine,
  RiCheckDoubleLine,
} from '@remixicon/react';
import { MOCK_NOTIFICATIONS } from '@/public/mockData/MockNotification';
import { NotificationItem } from '@/interface/NotificationItem';
import { NotificationListItem } from '@/component/notification/NotificationListItem';

export default function NotificationsPage() {
  const { lang } = useApp();
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: !item.read } : item))
    );
  };

  const deleteNotif = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredList = notifications.filter((item) => {
    if (filter === 'unread') return !item.read;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121118] text-slate-900 dark:text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-[#2D2938] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#5B3E96] dark:text-[#9B82C1] uppercase tracking-wider">
              <RiNotificationLine className="h-4 w-4" />
              <span>{lang === 'EN' ? 'Activity Hub' : 'ศูนย์การแจ้งเตือน'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black mt-1">
              {lang === 'EN' ? 'Notifications' : 'การแจ้งเตือน'}
            </h1>
          </div>

          <button
            onClick={markAllAsRead}
            className="btn btn-sm btn-ghost gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2D2938] rounded-xl self-start sm:self-auto"
          >
            <RiCheckDoubleLine className="h-4 w-4 text-[#5B3E96] dark:text-[#9B82C1]" />
            <span>{lang === 'EN' ? 'Mark all as read' : 'ทำเครื่องหมายว่าอ่านแล้วทั้งหมด'}</span>
          </button>
        </div>

        {/* Filter Toggle Bar */}
        <div className="flex items-center justify-between bg-white dark:bg-[#1C1A24] p-1.5 rounded-2xl border border-slate-200 dark:border-[#2D2938]">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-[#5B3E96] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D2938]'
              }`}
            >
              {lang === 'EN' ? 'All Alerts' : 'ทั้งหมด'}
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'unread'
                  ? 'bg-[#5B3E96] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#2D2938]'
              }`}
            >
              {lang === 'EN' ? 'Unread Only' : 'ยังไม่ได้อ่าน'}
            </button>
          </div>

          <span className="text-xs font-semibold text-slate-400 px-3">
            {notifications.filter((n) => !n.read).length} {lang === 'EN' ? 'unread' : 'รายการใหม่'}
          </span>
        </div>

        {/* List */}
        {filteredList.length === 0 ? (
          <div className="bg-white dark:bg-[#1C1A24] rounded-2xl p-12 border border-slate-200 dark:border-[#2D2938] text-center space-y-3">
            <RiNotificationLine className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">
              {lang === 'EN' ? 'No notifications to display' : 'ไม่มีรายการแจ้งเตือน'}
            </h3>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredList.map((item) => (
              <NotificationListItem
                key={item.id}
                item={item}
                lang={lang}
                onToggleRead={toggleRead}
                onDelete={deleteNotif}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}