'use client';

import { UserSettings } from "@/interface/settings";
import { RiNotificationLine, RiMailLine, RiSmartphoneLine, RiCheckLine, RiCloseLine } from "@remixicon/react";

interface NotificationSettingsProps {
    settings: UserSettings;
    onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

export default function NotificationSettings({ settings, onUpdate }: NotificationSettingsProps) {
    const notificationOptions = [
        { 
            key: 'emailNotifications', 
            label: 'Email Notifications', 
            icon: RiMailLine,
            description: 'Receive notifications via email'
        },
        { 
            key: 'pushNotifications', 
            label: 'Push Notifications', 
            icon: RiSmartphoneLine,
            description: 'Receive push notifications on your devices'
        },
        { 
            key: 'projectUpdates', 
            label: 'Project Updates', 
            icon: RiNotificationLine,
            description: 'Get updates on projects you\'re tracking'
        },
        { 
            key: 'messages', 
            label: 'Messages', 
            icon: RiMailLine,
            description: 'Get notified when you receive messages'
        },
        { 
            key: 'marketingEmails', 
            label: 'Marketing Emails', 
            icon: RiNotificationLine,
            description: 'Receive promotional emails and updates'
        },
    ];

    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-xl">
                    <RiNotificationLine className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <p className="text-sm text-base-content/50">Manage your notification preferences</p>
                </div>
            </div>

            <div className="space-y-3">
                {notificationOptions.map((option) => {
                    const Icon = option.icon;
                    const isEnabled = settings[option.key as keyof UserSettings] as boolean;

                    return (
                        <div 
                            key={option.key}
                            className="flex items-center justify-between p-4 bg-base-200/30 rounded-xl hover:bg-base-200/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${isEnabled ? 'bg-primary/10' : 'bg-base-300/30'}`}>
                                    <Icon className={`h-4 w-4 ${isEnabled ? 'text-primary' : 'text-base-content/30'}`} />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{option.label}</p>
                                    <p className="text-xs text-base-content/50">{option.description}</p>
                                </div>
                            </div>
                            <button
                                className={`btn btn-sm btn-square ${isEnabled ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => onUpdate(option.key as keyof UserSettings, !isEnabled)}
                            >
                                {isEnabled ? (
                                    <RiCheckLine className="h-4 w-4" />
                                ) : (
                                    <RiCloseLine className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}