'use client';

import React, { useState } from "react";
import { UserSettings } from "@/interface/settings";
import { RiLockLine, RiShieldKeyholeLine, RiHistoryLine, RiEyeLine, RiEyeOffLine, RiArrowRightSLine } from "@remixicon/react";

interface SecuritySettingsProps {
    settings: UserSettings;
    onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

export default function SecuritySettings({ settings, onUpdate }: SecuritySettingsProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    return (
        <React.Fragment>
            {/* Header Section with Subdued Grey Surface Separation */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl">
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
                    <RiLockLine className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Security & Auth</h2>
                    <p className="text-sm text-slate-500">Configure multi-factor authentication and session security</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* 2FA Toggle */}
                <div className="flex items-center justify-between p-4 bg-slate-50/60 border border-slate-200 hover:border-indigo-400 hover:bg-white hover:shadow-md rounded-2xl transition-all duration-300">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <RiShieldKeyholeLine className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">Two-Factor Authentication (2FA)</p>
                            <p className="text-xs text-slate-500">Enforce secondary authorization app prompt</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onUpdate('twoFactorAuth', !settings.twoFactorAuth)}
                        className={`w-12 h-6 rounded-full transition-colors relative p-1 ${settings.twoFactorAuth ? 'bg-indigo-600' : 'bg-slate-300'
                            }`}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0'
                            }`} />
                    </button>
                </div>

                {/* Session Timeout */}
                <div className="flex items-center justify-between p-4 bg-slate-50/60 border border-slate-200 hover:border-indigo-400 hover:bg-white hover:shadow-md rounded-2xl transition-all duration-300">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <RiHistoryLine className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">Inactivity Timeout</p>
                            <p className="text-xs text-slate-500">Automatic session termination window</p>
                        </div>
                    </div>
                    <select
                        className="bg-white border border-indigo-500 text-slate-900 text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
                        value={settings.sessionTimeout}
                        onChange={(e) => onUpdate('sessionTimeout', e.target.value)}
                    >
                        {['15 minutes', '30 minutes', '1 hour', '2 hours', '8 hours'].map((time) => (
                            <option key={time} value={time} className="bg-white text-slate-900">{time}</option>
                        ))}
                    </select>
                </div>

                {/* Password Reset Panel */}
                <div className="p-4 bg-slate-50/60 border border-slate-200 hover:border-indigo-400 hover:bg-white hover:shadow-md rounded-2xl transition-all duration-300">
                    <button
                        onClick={() => setShowChangePassword(!showChangePassword)}
                        className="w-full flex items-center justify-between text-left text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors"
                    >
                        <span>Update Security Password</span>
                        <RiArrowRightSLine className={`h-5 w-5 text-slate-500 transition-transform ${showChangePassword ? 'rotate-90' : ''}`} />
                    </button>

                    {showChangePassword && (
                        <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm rounded-xl px-4 py-2.5 w-full focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
                                placeholder="Current Password"
                            />
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm rounded-xl px-4 py-2.5 w-full focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm pr-10"
                                    placeholder="New Password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <RiEyeOffLine className="h-4 w-4" /> : <RiEyeLine className="h-4 w-4" />}
                                </button>
                            </div>
                            <button
                                type="button"
                                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
                            >
                                Apply New Password
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}