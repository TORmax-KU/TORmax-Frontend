'use client';

import { useState, useRef, useEffect } from "react";
import { 
    RiNotification3Fill, 
    RiCloseLine,
    RiCheckLine,
    RiTimeLine,
    RiFileListLine,
    RiAlertLine
} from "@remixicon/react";
import { mockNotifications } from "@/public/mockData/mockNotifications";
import Link from "next/link";


export default function NotificationButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(n => ({ ...n, read: true }))
        );
    };

    const getNotificationIcon = (type: string) => {
        switch(type) {
            case 'success':
                return <RiCheckLine className="h-5 w-5 text-success" />;
            case 'warning':
                return <RiAlertLine className="h-5 w-5 text-warning" />;
            case 'error':
                return <RiAlertLine className="h-5 w-5 text-error" />;
            default:
                return <RiFileListLine className="h-5 w-5 text-info" />;
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Notification Button */}
            <button 
                className="btn btn-ghost btn-circle relative hover:bg-base-200 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Notifications"
            >
                <div className="indicator">
                    <RiNotification3Fill className="h-6 w-6" />
                    {unreadCount > 0 && (
                        <span className="indicator-item badge badge-primary badge-xs animate-pulse">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </div>
            </button>

            {/* Notification Popover */}
            {isOpen && (
                <div className="
                    absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] 
                    bg-base-100 rounded-box shadow-2xl border border-base-200 
                    z-50
                    animate-fade-in-up
                ">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-base-200">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-base">Notifications</h3>
                            {unreadCount > 0 && (
                                <span className="badge badge-primary badge-sm">
                                    {unreadCount} new
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            {unreadCount > 0 && (
                                <button 
                                    className="btn btn-ghost btn-xs text-xs hover:text-primary transition-colors"
                                    onClick={markAllAsRead}
                                >
                                    Mark all read
                                </button>
                            )}
                            <button 
                                className="btn btn-ghost btn-xs btn-square"
                                onClick={() => setIsOpen(false)}
                            >
                                <RiCloseLine className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Notification List - Scrollable */}
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                        {notifications.length > 0 ? (
                            <div className="divide-y divide-base-200/50">
                                {notifications.map((notification) => (
                                    <div 
                                        key={notification.id}
                                        className={`
                                            p-4 hover:bg-base-200/50 transition-colors cursor-pointer
                                            ${!notification.read ? 'bg-primary/5 border-l-4 border-primary' : ''}
                                        `}
                                        onClick={() => {
                                            markAsRead(notification.id);
                                            if (notification.link) {
                                                window.location.href = notification.link;
                                            }
                                        }}
                                    >
                                        <div className="flex gap-3">
                                            {/* Icon */}
                                            <div className="flex-shrink-0 mt-0.5">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <p className="text-sm font-medium">
                                                        {notification.title}
                                                        {!notification.read && (
                                                            <span className="ml-2 inline-block w-2 h-2 rounded-full bg-primary"></span>
                                                        )}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-base-content/60 mt-0.5 line-clamp-2">
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <span className="text-[10px] text-base-content/40 flex items-center gap-1">
                                                        <RiTimeLine className="h-3 w-3" />
                                                        {notification.timestamp}
                                                    </span>
                                                    {notification.link && (
                                                        <span className="text-[10px] text-primary hover:underline">
                                                            View
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <RiNotification3Fill className="h-12 w-12 mx-auto text-base-content/20 mb-3" />
                                <p className="text-sm text-base-content/40">No notifications</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-base-200 text-center">
                            <Link href="/notifications">
                            <button 
                                className="btn btn-ghost btn-xs text-xs text-base-content/40 hover:text-primary transition-colors w-full"
                                onClick={() => {
                                    // Handle view all notifications
                                    console.log('View all notifications');
                                    setIsOpen(false);
                                }}
                            >
                                View all notifications
                            </button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}