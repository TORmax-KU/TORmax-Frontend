'use client';

import { NotificationItem } from '@/interface/NotificationItem';
import {
    RiAlertLine,
    RiBookmarkLine,
    RiFileTextLine,
    RiInformationLine,
    RiDeleteBinLine,
    RiArrowRightLine,
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
                return <RiAlertLine className="h-[18px] w-[18px] text-warn" />;
            case 'match':
                return <RiBookmarkLine className="h-[18px] w-[18px] text-accent" />;
            case 'update':
                return <RiFileTextLine className="h-[18px] w-[18px] text-sky-600 dark:text-sky-400" />;
            case 'system':
            default:
                return <RiInformationLine className="h-[18px] w-[18px] text-ink-3" />;
        }
    };

    return (
        <div className={`group flex gap-3 sm:gap-4 items-start p-4 sm:px-5 transition-colors duration-150 hover:bg-surface-2/60 ${item.read ? '' : 'bg-brand-tint/40'}`}>
            {/* Icon Column */}
            <div className="h-9 w-9 rounded-[10px] bg-surface-2 flex items-center justify-center shrink-0">
                {getIcon(item.type)}
            </div>

            {/* Content Column */}
            <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-baseline justify-between gap-3">
                    <h3 className={`text-sm truncate ${item.read ? 'font-medium text-ink-2' : 'font-semibold text-ink'}`}>
                        {lang === 'EN' ? item.title : item.titleTh}
                    </h3>
                    <span className="text-[11px] text-ink-4 shrink-0 tabular-nums">
                        {item.timestamp}
                    </span>
                </div>

                <p className={`text-[13px] leading-relaxed ${item.read ? 'text-ink-3' : 'text-ink-2'}`}>
                    {lang === 'EN' ? item.message : item.messageTh}
                </p>

                {item.link && (
                    <div className="pt-1.5">
                        <a href={item.link} className="ui-link group/link text-[13px]">
                            <span>{lang === 'EN' ? 'View Target' : 'ดูรายละเอียด'}</span>
                            <RiArrowRightLine size={14} className="transition-transform duration-150 group-hover/link:translate-x-0.5" />
                        </a>
                    </div>
                )}
            </div>

            {/* Actions Column */}
            <div className="flex items-center gap-0.5 shrink-0 -mr-1.5 -mt-1">
                <button
                    onClick={() => onToggleRead(item.id)}
                    className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-surface-3 transition-colors cursor-pointer"
                    title={item.read ? 'Mark as unread' : 'Mark as read'}
                    aria-label={item.read ? 'Mark as unread' : 'Mark as read'}
                >
                    <span className={`w-2 h-2 rounded-full transition-colors ${!item.read ? 'bg-brand dark:bg-brand-soft' : 'bg-line-strong'}`} />
                </button>
                <button
                    onClick={() => onDelete(item.id)}
                    className="ui-icon-btn h-8 w-8 rounded-lg text-ink-4 hover:text-danger"
                    title="Delete"
                    aria-label="Delete"
                >
                    <RiDeleteBinLine className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
