'use client';

import { NotificationItem } from '@/interface/NotificationItem';
import {
  RiAlertLine,
  RiBookmarkLine,
  RiFileTextLine,
  RiInformationLine,
  RiDeleteBinLine,
} from '@remixicon/react';

interface NotificationListItemProps {
  item: NotificationItem;
  lang: string;
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationListItem({ 
  item, 
  lang, 
  onToggleRead, 
  onDelete 
}: NotificationListItemProps) {
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
    <div
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
          onClick={() => onToggleRead(item.id)}
          className={`w-2 h-2 rounded-full transition-colors ${
            !item.read ? 'bg-[#5B3E96] dark:bg-[#9B82C1]' : 'bg-slate-300 dark:bg-slate-600'
          }`}
          title={item.read ? 'Mark as unread' : 'Mark as read'}
        />
        <button
          onClick={() => onDelete(item.id)}
          className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
          title="Delete"
        >
          <RiDeleteBinLine className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}