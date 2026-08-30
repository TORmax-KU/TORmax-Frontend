'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  RiNotificationLine,
  RiCheckDoubleLine,
  RiBookmarkLine,
  RiAlertLine,
  RiFileTextLine,
  RiInformationLine,
  RiDeleteBinLine,
} from '@remixicon/react';
import { MOCK_NOTIFICATIONS } from '@/public/mockData/MockNotification';
import { NotificationItem } from '@/interface/NotificationItem';

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

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'deadline':
        return <RiAlertLine className="h-5 w-5 text-amber-500" />;
      case 'match':
        return <RiBookmarkLine className="h-5 w-5 text-[#5B3E96] dark:text-[#9B82C1]" />;
      case 'update':
        return <RiFileTextLine className="h-5 w-5 text-blue-500" />;
      case 'system':
      default:
        return <RiInformationLine className="h-5 w-5 text-slate-400" />;
    }
  };

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
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex gap-3 sm:gap-4 items-start ${
                  !item.read
                    ? 'bg-white dark:bg-[#1C1A24] border-[#5B3E96]/30 shadow-sm'
                    : 'bg-slate-50/70 dark:bg-[#121118]/60 border-slate-200 dark:border-[#2D2938] opacity-80'
                }`}
              >
                {/* Icon Column */}
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#2D2938] shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>

                {/* Content Column */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {lang === 'EN' ? item.title : item.titleTh}
                    </h3>
                    <span className="text-[10px] font-medium text-slate-400 shrink-0 font-mono">
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {lang === 'EN' ? item.message : item.messageTh}
                  </p>

                  {item.link && (
                    <div className="pt-2">
                      <a
                        href={item.link}
                        className="text-xs font-bold text-[#5B3E96] dark:text-[#9B82C1] hover:underline inline-flex items-center gap-1"
                      >
                        <span>{lang === 'EN' ? 'View Target' : 'ดูรายละเอียด'}</span>
                        <span>→</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Actions Column */}
                <div className="flex items-center gap-1 shrink-0 pt-0.5">
                  <button
                    onClick={() => toggleRead(item.id)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      !item.read ? 'bg-[#5B3E96] dark:bg-[#9B82C1]' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                    title={item.read ? 'Mark as unread' : 'Mark as read'}
                  />
                  <button
                    onClick={() => deleteNotif(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Delete"
                  >
                    <RiDeleteBinLine className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}