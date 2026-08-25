'use client';

import React from "react";
import { UserSettings } from "@/interface/settings";
import { RiPaletteLine, RiSunLine, RiMoonLine, RiComputerLine, RiLayoutGridLine, RiBardFill } from "@remixicon/react";

interface AppearanceSettingsProps {
    settings: UserSettings;
    onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

export default function AppearanceSettings({ settings, onUpdate }: AppearanceSettingsProps) {
    return (
        <React.Fragment>
            {/* Header Section with Subdued Grey Surface Separation */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl">
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
                    <RiPaletteLine className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Interface Theme</h2>
                    <p className="text-sm text-slate-500">Customize the visual layout, density, and rendering engine</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Theme Selector */}
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                        Base Theme Mode
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { id: 'light', label: 'Light', icon: RiSunLine },
                            { id: 'dark', label: 'Dark', icon: RiMoonLine },
                            { id: 'system', label: 'System', icon: RiComputerLine },
                        ].map(({ id, label, icon: Icon }) => {
                            const active = settings.theme === id;
                            return (
                                <button
                                    key={id}
                                    onClick={() => onUpdate('theme', id as UserSettings['theme'])}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200 ${
                                        active
                                            ? 'bg-indigo-50/80 border-indigo-500 text-indigo-600 shadow-sm'
                                            : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-white hover:text-slate-900'
                                    }`}
                                >
                                    <Icon className={`h-6 w-6 ${active ? 'text-indigo-600' : 'text-slate-500'}`} />
                                    <span className="text-xs font-semibold">{label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Dynamic Controls Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50/60 border border-slate-200 rounded-2xl hover:border-indigo-300 hover:bg-white transition-all duration-300">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <RiLayoutGridLine className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">Compact Layout</p>
                                <p className="text-xs text-slate-500">Reduce structural margins</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onUpdate('compactMode', !settings.compactMode)}
                            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                                settings.compactMode ? 'bg-indigo-600' : 'bg-slate-300'
                            }`}
                        >
                            <div
                                className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                                    settings.compactMode ? 'translate-x-6' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50/60 border border-slate-200 rounded-2xl hover:border-indigo-300 hover:bg-white transition-all duration-300">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <RiBardFill className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">Reduced Motion</p>
                                <p className="text-xs text-slate-500">Disable transitions</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onUpdate('reducedMotion', !settings.reducedMotion)}
                            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                                settings.reducedMotion ? 'bg-indigo-600' : 'bg-slate-300'
                            }`}
                        >
                            <div
                                className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                                    settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}