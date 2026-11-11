'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  RiNotificationLine,
  RiCheckDoubleLine,
} from '@remixicon/react';
import { NotificationListItem } from '@/component/Notification/NotificationListItem';
import { PageHeader } from '@/component/PageHeader';
import { toNotificationItem, useNotifications } from '@/lib/notifications';

export default function NotificationsPage() {
  const { lang } = useApp();
  const { items, unreadCount, status, signedOut, toggleRead, remove, markAllRead, retry } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const notifications = items.map((item) => toNotificationItem(item, lang === 'TH'));
  const filteredList = notifications.filter((item) => {
    if (filter === 'unread') return !item.read;
    return true;
  });

  return (
    <div className="ui-page max-w-4xl">
      <div className="space-y-6">

        {/* Header */}
        <PageHeader
          className="pb-2"
          eyebrow={<><RiNotificationLine className="h-3.5 w-3.5" /><span>{lang === 'EN' ? 'Activity Hub' : 'ศูนย์การแจ้งเตือน'}</span></>}
          title={lang === 'EN' ? 'Notifications' : 'การแจ้งเตือน'}
          actions={
            <button
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="ui-btn ui-btn-ghost ui-btn-sm"
            >
              <RiCheckDoubleLine className="h-4 w-4 text-accent" />
              <span>{lang === 'EN' ? 'Mark all as read' : 'ทำเครื่องหมายว่าอ่านแล้วทั้งหมด'}</span>
            </button>
          }
        />

        {/* Filter Toggle Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="ui-segmented">
            <button aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
              {lang === 'EN' ? 'All Alerts' : 'ทั้งหมด'}
            </button>
            <button aria-pressed={filter === 'unread'} onClick={() => setFilter('unread')}>
              {lang === 'EN' ? 'Unread Only' : 'ยังไม่ได้อ่าน'}
            </button>
          </div>

          <span className="text-[13px] text-ink-3">
            <span className="font-medium tabular-nums text-ink">{unreadCount}</span> {lang === 'EN' ? 'unread' : 'รายการใหม่'}
          </span>
        </div>

        {/* List */}
        {signedOut ? (
          <div className="ui-empty py-16">
            <div className="ui-empty-icon"><RiNotificationLine className="h-5 w-5" /></div>
            <h3 className="font-medium text-ink">
              {lang === 'EN' ? 'Sign in to receive match alerts' : 'เข้าสู่ระบบเพื่อรับการแจ้งเตือน TOR ที่ตรงกับคุณ'}
            </h3>
            <Link href="/login" className="ui-btn ui-btn-primary ui-btn-sm mt-3">
              {lang === 'EN' ? 'Sign in' : 'เข้าสู่ระบบ'}
            </Link>
          </div>
        ) : status === 'loading' ? (
          <div role="status" className="ui-card divide-y divide-line overflow-hidden">
            <span className="sr-only">{lang === 'EN' ? 'Loading notifications…' : 'กำลังโหลดการแจ้งเตือน…'}</span>
            {[0, 1, 2].map(i => (
              <div key={i} aria-hidden className="flex gap-4 p-4 sm:px-5">
                <div className="ui-skeleton h-9 w-9 shrink-0 rounded-[10px]" />
                <div className="flex-1 space-y-2.5 pt-1"><div className="ui-skeleton h-3.5 w-1/3" /><div className="ui-skeleton h-3 w-3/4" /></div>
              </div>
            ))}
          </div>
        ) : status === 'error' ? (
          <div className="ui-empty py-16">
            <h3 className="font-medium text-ink">
              {lang === 'EN' ? 'Notifications could not be loaded' : 'โหลดการแจ้งเตือนไม่สำเร็จ'}
            </h3>
            <button onClick={retry} className="ui-btn ui-btn-secondary ui-btn-sm mt-3">
              {lang === 'EN' ? 'Try again' : 'ลองอีกครั้ง'}
            </button>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="ui-empty py-16">
            <div className="ui-empty-icon"><RiNotificationLine className="h-5 w-5" /></div>
            <h3 className="font-medium text-ink">
              {lang === 'EN' ? 'No notifications to display' : 'ไม่มีรายการแจ้งเตือน'}
            </h3>
            {filter === 'all' && (
              <p className="text-sm text-ink-3 max-w-sm mx-auto">
                {lang === 'EN'
                  ? 'Add your skills and budget range to your profile, and we will alert you when a TOR matches.'
                  : 'เพิ่มทักษะและช่วงงบประมาณในโปรไฟล์ แล้วเราจะแจ้งเตือนเมื่อมี TOR ที่ตรงกับคุณ'}
              </p>
            )}
          </div>
        ) : (
          <div className="ui-card divide-y divide-line overflow-hidden">
            {filteredList.map((item) => (
              <NotificationListItem
                key={item.id}
                item={item}
                lang={lang}
                onToggleRead={toggleRead}
                onDelete={remove}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
