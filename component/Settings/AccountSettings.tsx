'use client';

import React, { useState } from "react";
import {
    RiMailLine,
    RiPhoneLine,
    RiTranslate2,
    RiTimeLine,
    RiEditLine,
    RiCheckLine,
    RiUserSettingsLine
} from "@remixicon/react";
import { UserSettings } from "@/interface/settings";

interface AccountSettingsProps {
    settings: UserSettings;
    onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

export default function AccountSettings({ settings, onUpdate }: AccountSettingsProps) {
    const [editing, setEditing] = useState<string | null>(null);
    const [tempValue, setTempValue] = useState<string>('');

    const fields = [
        { key: 'email' as const, label: 'Email Address', icon: RiMailLine, type: 'email', value: settings.email },
        { key: 'phone' as const, label: 'Phone Number', icon: RiPhoneLine, type: 'tel', value: settings.phone },
        { key: 'language' as const, label: 'Language Preference', icon: RiTranslate2, type: 'select', value: settings.language, options: ['English', 'Thai', 'Chinese', 'Japanese', 'Korean'] },
        { key: 'timezone' as const, label: 'Current Timezone', icon: RiTimeLine, type: 'select', value: settings.timezone, options: ['Asia/Bangkok (GMT+7)', 'Asia/Tokyo (GMT+9)', 'America/New_York (GMT-5)', 'Europe/London (GMT+0)'] },
    ];

    const handleStartEdit = (key: string, currentValue: string) => {
        setEditing(key);
        setTempValue(currentValue);
    };

    const handleSave = (key: keyof UserSettings) => {
        onUpdate(key, tempValue as UserSettings[typeof key]);
        setEditing(null);
    };

    return (
        /* High-Contrast Light Mode Container Card with Crisp White Surface and Layered Soft Shadow */
        <React.Fragment>
            {/* Header Section with Subdued Grey Surface Separation */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl">
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
                    <RiUserSettingsLine className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Account Information</h2>
                    <p className="text-sm text-slate-500">Manage your credentials and primary identity parameters</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => {
                    const Icon = field.icon;
                    const isEditing = editing === field.key;

                    return (
                        <div
                            key={field.key}
                            className="group relative bg-slate-50/60 border border-slate-200 hover:border-indigo-400 hover:bg-white hover:shadow-md rounded-2xl p-4 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                                        <Icon className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                                            {field.label}
                                        </span>
                                        {!isEditing && (
                                            <p className="text-sm font-semibold text-slate-800 mt-0.5 truncate max-w-[180px]">
                                                {field.value}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {!isEditing && (
                                    <button
                                        onClick={() => handleStartEdit(field.key, field.value)}
                                        className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                                        aria-label={`Edit ${field.label}`}
                                    >
                                        <RiEditLine className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            {isEditing && (
                                <div className="mt-3 pt-3 border-t border-slate-200 flex gap-2">
                                    {field.type === 'select' ? (
                                        <select
                                            className="bg-white border border-indigo-500 text-slate-900 text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-full shadow-sm"
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                            autoFocus
                                        >
                                            {field.options?.map((opt) => (
                                                <option key={opt} value={opt} className="bg-white text-slate-900">{opt}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            className="bg-white border border-indigo-500 text-slate-900 text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-full shadow-sm"
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                            autoFocus
                                        />
                                    )}
                                    <button
                                        onClick={() => handleSave(field.key)}
                                        className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shrink-0 shadow-sm"
                                    >
                                        <RiCheckLine className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
}