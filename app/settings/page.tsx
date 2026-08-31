'use client';

import { useState } from "react";

import { defaultSettings, UserSettings } from "@/interface/settings";
import { useApp } from "@/context/AppContext";
import AccountSettings from "@/component/settings/AccountSettings";
import AppearanceSettings from "@/component/settings/AppearanceSettings";
import NotificationSettings from "@/component/settings/NotificationSettings";
import PrivacySettings from "@/component/settings/PrivacySettings";
import SecuritySettings from "@/component/settings/SecuritySettings";
import SettingsHeader from "@/component/settings/SettingsHeader";
import SettingsSidebar from "@/component/settings/SettingsSidebar";

type SectionKey = 'account' | 'security' | 'notifications' | 'privacy' | 'appearance';

export default function SettingsPage() {
    const { t } = useApp();
    const [settings, setSettings] = useState<UserSettings>(defaultSettings);
    const [activeSection, setActiveSection] = useState<SectionKey>('account');

    const updateSetting = <K extends keyof UserSettings>(
        key: K, 
        value: UserSettings[K] | ((prev: UserSettings[K]) => UserSettings[K])
    ) => {
        setSettings(prev => ({
            ...prev,
            [key]: typeof value === 'function' 
                ? (value as (prev: UserSettings[K]) => UserSettings[K])(prev[key]) 
                : value
        }));
    };

    const sections: { id: SectionKey; label: string }[] = [
        { id: 'account', label: t('account') },
        { id: 'security', label: t('security') },
        { id: 'notifications', label: t('settingsNotifications') },
        { id: 'privacy', label: t('privacy') },
        { id: 'appearance', label: t('appearance') },
    ];

    const sectionComponents: Record<SectionKey, React.ReactNode> = {
        account: <AccountSettings settings={settings} onUpdate={updateSetting} />,
        security: <SecuritySettings settings={settings} onUpdate={updateSetting} />,
        notifications: <NotificationSettings settings={settings} onUpdate={updateSetting} />,
        privacy: <PrivacySettings settings={settings} onUpdate={updateSetting} />,
        appearance: <AppearanceSettings settings={settings} onUpdate={updateSetting} />,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e6e6e6] via-[#d3d3df]/40 to-[#e6e6e6] dark:from-[#352b33] dark:via-[#2b2229] dark:to-[#352b33] text-[#352b33] dark:text-[#e6e6e6] transition-colors duration-500">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#ad96cc]/15 blur-[120px]" />
                <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full bg-[#6a509a]/10 blur-[100px]" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-10 max-w-6xl">
                <SettingsHeader />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
                    {/* Glass Navigation Column */}
                    <div className="lg:col-span-3">
                        <SettingsSidebar 
                            sections={sections}
                            activeSection={activeSection}
                            onSectionChange={(section) => setActiveSection(section as SectionKey)}
                        />
                    </div>

                    {/* Content Panel */}
                    <div className="lg:col-span-9">
                        <div className="relative rounded-3xl bg-white/60 dark:bg-[#352b33]/60 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-[0_20px_50px_rgba(53,43,51,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 sm:p-10 transition-all duration-300">
                            {sectionComponents[activeSection] ?? sectionComponents.account}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}