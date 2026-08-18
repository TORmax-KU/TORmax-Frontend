'use client';

import { UserSettings } from "@/interface/settings";
import { RiPaletteLine, RiSunLine, RiMoonLine, RiComputerLine, RiLayoutGridLine, RiEyeCloseFill,  } from "@remixicon/react";

interface AppearanceSettingsProps {
    settings: UserSettings;
    onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
}

export default function AppearanceSettings({ settings, onUpdate }: AppearanceSettingsProps) {
    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-xl">
                    <RiPaletteLine className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Appearance</h2>
                    <p className="text-sm text-base-content/50">Customize your experience</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Theme */}
                <div className="p-4 bg-base-200/30 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <RiPaletteLine className="h-5 w-5 text-primary" />
                        <div>
                            <p className="font-medium">Theme</p>
                            <p className="text-sm text-base-content/50">Choose your preferred theme</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            className={`btn flex-1 gap-2 ${settings.theme === 'light' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => onUpdate('theme', 'light')}
                        >
                            <RiSunLine className="h-4 w-4" />
                            Light
                        </button>
                        <button 
                            className={`btn flex-1 gap-2 ${settings.theme === 'dark' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => onUpdate('theme', 'dark')}
                        >
                            <RiMoonLine className="h-4 w-4" />
                            Dark
                        </button>
                        <button 
                            className={`btn flex-1 gap-2 ${settings.theme === 'system' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => onUpdate('theme', 'system')}
                        >
                            <RiComputerLine className="h-4 w-4" />
                            System
                        </button>
                    </div>
                </div>

                {/* Compact Mode */}
                <div className="flex items-center justify-between p-4 bg-base-200/30 rounded-xl">
                    <div className="flex items-center gap-3">
                        <RiLayoutGridLine className="h-5 w-5 text-secondary" />
                        <div>
                            <p className="font-medium">Compact Mode</p>
                            <p className="text-sm text-base-content/50">Reduce spacing and font sizes</p>
                        </div>
                    </div>
                    <input 
                        type="checkbox" 
                        className="toggle toggle-secondary"
                        checked={settings.compactMode}
                        onChange={(e) => onUpdate('compactMode', e.target.checked)}
                    />
                </div>

                {/* Reduced Motion */}
                <div className="flex items-center justify-between p-4 bg-base-200/30 rounded-xl">
                    <div className="flex items-center gap-3">
                        <RiEyeCloseFill className="h-5 w-5 text-accent" />
                        <div>
                            <p className="font-medium">Reduced Motion</p>
                            <p className="text-sm text-base-content/50">Minimize animations and transitions</p>
                        </div>
                    </div>
                    <input 
                        type="checkbox" 
                        className="toggle toggle-accent"
                        checked={settings.reducedMotion}
                        onChange={(e) => onUpdate('reducedMotion', e.target.checked)}
                    />
                </div>
            </div>
        </div>
    );
}