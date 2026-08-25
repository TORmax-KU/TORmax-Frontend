'use client';

import React from "react";
import { UserSettings } from "@/interface/settings";
import { RiNotificationLine, RiMailLine, RiSmartphoneLine, RiMegaphoneLine, RiMessage3Line } from "@remixicon/react";

interface NotificationSettingsProps {
    settings: UserSettings;
    onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

export default function NotificationSettings({ settings, onUpdate }: NotificationSettingsProps) {
    const notificationOptions = [
        { key: 'emailNotifications' as const, label: 'Email Alerts', icon: RiMailLine, description: 'Direct emails for essential updates' },
        { key: 'pushNotifications' as const, label: 'Push Channels', icon: RiSmartphoneLine, description: 'Instant browser/mobile push alerts' },
        { key: 'projectUpdates' as const, label: 'Project Signals', icon: RiNotificationLine, description: 'Milestones and tracking updates' },
        { key: 'messages' as const, label: 'Direct Messages', icon: RiMessage3Line, description: 'Chat alerts and direct mentions' },
        { key: 'marketingEmails' as const, label: 'Product News', icon: RiMegaphoneLine, description: 'Feature updates and newsletters' },
    ];

    return (
        <React.Fragment>
            {/* Header Section with Subdued Grey Surface Separation */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl">
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
                    <RiNotificationLine className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Alert Preferences</h2>
                    <p className="text-sm text-slate-500">Configure how and when you receive real-time notifications</p>
                </div>
            </div>

            <div className="space-y-3">
                {notificationOptions.map((option) => {
                    const Icon = option.icon;
                    const isEnabled = Boolean(settings[option.key]);

                    return (
                        <div
                            key={option.key}
                            className="flex items-center justify-between p-4 bg-slate-50/60 border border-slate-200 hover:border-indigo-400 hover:bg-white hover:shadow-md rounded-2xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2.5 rounded-xl border shadow-sm transition-colors ${isEnabled ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-white border-slate-200 text-slate-400'
                                    }`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">{option.label}</p>
                                    <p className="text-xs text-slate-500">{option.description}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => onUpdate(option.key, !isEnabled)}
                                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${isEnabled ? 'bg-indigo-600' : 'bg-slate-300'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-0'
                                    }`} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
}