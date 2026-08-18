'use client';

import { useState } from "react";
import { RiMailLine, RiPhoneLine, RiTranslate2, RiTimeLine, RiEditLine, RiCloseLine, RiUserSettingsLine } from "@remixicon/react";
import { UserSettings } from "@/interface/settings";

interface AccountSettingsProps {
    settings: UserSettings;
    onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

export default function AccountSettings({ settings, onUpdate }: AccountSettingsProps) {
    const [editing, setEditing] = useState<string | null>(null);

    const fields = [
        { key: 'email', label: 'Email', icon: RiMailLine, type: 'email', value: settings.email },
        { key: 'phone', label: 'Phone Number', icon: RiPhoneLine, type: 'tel', value: settings.phone },
        { key: 'language', label: 'Language', icon: RiTranslate2, type: 'select', value: settings.language, options: ['English', 'Thai', 'Chinese', 'Japanese', 'Korean'] },
        { key: 'timezone', label: 'Timezone', icon: RiTimeLine, type: 'select', value: settings.timezone, options: ['Asia/Bangkok (GMT+7)', 'Asia/Tokyo (GMT+9)', 'America/New_York (GMT-5)', 'Europe/London (GMT+0)'] },
    ];

    const handleSave = (key: string, value: any) => {
        onUpdate(key as keyof UserSettings, value);
        setEditing(null);
    };

    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-xl">
                    <RiUserSettingsLine className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Account</h2>
                    <p className="text-sm text-base-content/50">Manage your account information</p>
                </div>
            </div>

            <div className="space-y-6">
                {fields.map((field) => {
                    const Icon = field.icon;
                    const isEditing = editing === field.key;

                    return (
                        <div key={field.key} className="group">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <Icon className="h-5 w-5 text-base-content/40 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-base-content/40 uppercase tracking-wider">
                                            {field.label}
                                        </p>
                                        {isEditing ? (
                                            field.type === 'select' ? (
                                                <select 
                                                    className="select select-bordered select-sm w-full max-w-xs mt-1"
                                                    value={field.value}
                                                    onChange={(e) => handleSave(field.key, e.target.value)}
                                                    autoFocus
                                                >
                                                    {field.options?.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input 
                                                    type={field.type}
                                                    className="input input-bordered input-sm w-full max-w-xs mt-1"
                                                    value={field.value}
                                                    onChange={(e) => handleSave(field.key, e.target.value)}
                                                    autoFocus
                                                />
                                            )
                                        ) : (
                                            <p className="text-sm truncate">{field.value}</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    className="btn btn-ghost btn-sm btn-square opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => setEditing(isEditing ? null : field.key)}
                                    aria-label={isEditing ? 'Cancel editing' : 'Edit'}
                                >
                                    {isEditing ? (
                                        <RiCloseLine className="h-4 w-4" />
                                    ) : (
                                        <RiEditLine className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {!isEditing && <div className="border-b border-base-200/50 mt-3" />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}