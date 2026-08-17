'use client'

import { mockNotifications } from "@/public/mockData/mockNotifications";
import { RiAlertLine, RiArrowLeftLine, RiCheckDoubleLine, RiCheckLine, RiCloseLine, RiFileListLine, RiSettingsLine, RiTimeLine } from "@remixicon/react";
import Link from "next/link";
import { useState } from "react";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [selectedType, setSelectedType] = useState<'all' | 'info' | 'success' | 'warning' | 'error'>('all');

    const getTypeColor = (type: string) => {
        switch(type) {
            case 'success': return 'badge-success';
            case 'warning': return 'badge-warning';
            case 'error': return 'badge-error';
            default: return 'badge-info';
        }
    };

    const getTypeIcon = (type: string) => {
        switch(type) {
            case 'success': return <RiCheckLine className="h-5 w-5 text-success" />;
            case 'warning': return <RiAlertLine className="h-5 w-5 text-warning" />;
            case 'error': return <RiAlertLine className="h-5 w-5 text-error" />;
            default: return <RiFileListLine className="h-5 w-5 text-info" />;
        }
    };

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

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const getFilteredNotifications = () => {
        let filtered = notifications;

        // Filter by read status
        if (filter === 'unread') {
            filtered = filtered.filter(n => !n.read);
        } else if (filter === 'read') {
            filtered = filtered.filter(n => n.read);
        }

        // Filter by type
        if (selectedType !== 'all') {
            filtered = filtered.filter(n => n.type === selectedType);
        }

        return filtered;
    };

    const filteredNotifications = getFilteredNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <Link href="/" className="btn btn-ghost btn-sm btn-square">
                        <RiArrowLeftLine className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Notifications</h1>
                        <p className="text-sm text-base-content/60">
                            {unreadCount} unread notifications
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {unreadCount > 0 && (
                        <button 
                            className="btn btn-primary btn-sm gap-1"
                            onClick={markAllAsRead}
                        >
                            <RiCheckDoubleLine className="h-4 w-4" />
                            Mark all read
                        </button>
                    )}
                    <button className="btn btn-ghost btn-sm gap-1">
                        <RiSettingsLine className="h-4 w-4" />
                        Settings
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex gap-1 bg-base-200 rounded-box p-1">
                    <button
                        className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`btn btn-sm ${filter === 'unread' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setFilter('unread')}
                    >
                        Unread
                    </button>
                    <button
                        className={`btn btn-sm ${filter === 'read' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setFilter('read')}
                    >
                        Read
                    </button>
                </div>

                <div className="flex gap-1 bg-base-200 rounded-box p-1">
                    <button
                        className={`btn btn-sm ${selectedType === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setSelectedType('all')}
                    >
                        All Types
                    </button>
                    <button
                        className={`btn btn-sm ${selectedType === 'success' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setSelectedType('success')}
                    >
                        <RiCheckLine className="h-4 w-4" />
                    </button>
                    <button
                        className={`btn btn-sm ${selectedType === 'info' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setSelectedType('info')}
                    >
                        <RiFileListLine className="h-4 w-4" />
                    </button>
                    <button
                        className={`btn btn-sm ${selectedType === 'warning' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setSelectedType('warning')}
                    >
                        <RiAlertLine className="h-4 w-4" />
                    </button>
                    <button
                        className={`btn btn-sm ${selectedType === 'error' ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setSelectedType('error')}
                    >
                        <RiAlertLine className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-base-content/40 mb-4">
                Showing {filteredNotifications.length} of {notifications.length} notifications
            </div>

            {/* Notification List */}
            <div className="space-y-2">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                        <div 
                            key={notification.id}
                            className={`
                                bg-base-100 rounded-box shadow-sm hover:shadow-md transition-all duration-200
                                ${!notification.read ? 'border-l-4 border-primary bg-primary/5' : ''}
                            `}
                        >
                            <div className="flex items-start gap-4 p-4">
                                {/* Icon */}
                                <div className="flex-shrink-0 mt-1">
                                    <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center
                                        ${notification.type === 'success' ? 'bg-success/10' : ''}
                                        ${notification.type === 'warning' ? 'bg-warning/10' : ''}
                                        ${notification.type === 'error' ? 'bg-error/10' : ''}
                                        ${notification.type === 'info' ? 'bg-info/10' : ''}
                                    `}>
                                        {getTypeIcon(notification.type)}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="font-semibold text-base">
                                                    {notification.title}
                                                </h3>
                                                <span className={`badge ${getTypeColor(notification.type)} badge-sm`}>
                                                    {notification.type}
                                                </span>
                                                {!notification.read && (
                                                    <span className="badge badge-primary badge-sm">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-base-content/70 mt-1">
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-xs text-base-content/40 flex items-center gap-1">
                                                    <RiTimeLine className="h-3 w-3" />
                                                    {notification.timestamp}
                                                </span>
                                                {notification.link && (
                                                    <Link 
                                                        href={notification.link}
                                                        className="text-xs text-primary hover:underline"
                                                        onClick={() => markAsRead(notification.id)}
                                                    >
                                                        View Details →
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    {!notification.read && (
                                        <button
                                            className="btn btn-ghost btn-xs btn-square"
                                            onClick={() => markAsRead(notification.id)}
                                            title="Mark as read"
                                        >
                                            <RiCheckLine className="h-4 w-4" />
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-ghost btn-xs btn-square hover:text-error"
                                        onClick={() => deleteNotification(notification.id)}
                                        title="Delete notification"
                                    >
                                        <RiCloseLine className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 bg-base-100 rounded-box">
                        <RiFileListLine className="h-16 w-16 mx-auto text-base-content/20 mb-4" />
                        <h3 className="text-lg font-medium">No notifications</h3>
                        <p className="text-sm text-base-content/40">
                            {filter !== 'all' 
                                ? `No ${filter} notifications found` 
                                : 'You\'re all caught up!'}
                        </p>
                        {filter !== 'all' && (
                            <button 
                                className="btn btn-primary btn-sm mt-4"
                                onClick={() => setFilter('all')}
                            >
                                View all notifications
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Load More */}
            {filteredNotifications.length > 0 && filteredNotifications.length >= 10 && (
                <div className="text-center mt-8">
                    <button className="btn btn-ghost btn-sm text-base-content/40 hover:text-primary transition-colors">
                        Load more notifications
                    </button>
                </div>
            )}
        </div>
    );
}