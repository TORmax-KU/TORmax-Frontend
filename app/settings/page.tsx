'use client';

import AccountSettings from "@/component/Settings/AccountSettings";
import SecuritySettings from "@/component/Settings/SecuritySettings";
import SettingsHeader from "@/component/Settings/SettingsHeader";
import SettingsSidebar from "@/component/Settings/SettingsSidebar";
import NotificationSettings from "@/component/Settings/NotificationSettings";
import PrivacySettings from "@/component/Settings/PrivacySettings";
import AppearanceSettings from "@/component/Settings/AppearanceSettings";

import { UserSettings, defaultSettings } from "@/interface/settings";
import { useState } from "react";


export default function SettingsPage() {
    const [settings, setSettings] = useState<UserSettings>(defaultSettings);
    const [activeSection, setActiveSection] = useState('account');

    const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const sections = [
        { id: 'account', label: 'Account' },
        { id: 'security', label: 'Security' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'privacy', label: 'Privacy' },
        { id: 'appearance', label: 'Appearance' },
    ];

    const renderSection = () => {
        switch(activeSection) {
            case 'account':
                return <AccountSettings settings={settings} onUpdate={updateSetting} />;
            case 'security':
                return <SecuritySettings settings={settings} onUpdate={updateSetting} />;
            case 'notifications':
                return <NotificationSettings settings={settings} onUpdate={updateSetting} />;
            case 'privacy':
                return <PrivacySettings settings={settings} onUpdate={updateSetting} />;
            case 'appearance':
                return <AppearanceSettings settings={settings} onUpdate={updateSetting} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-base-200/50">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <SettingsHeader />
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <SettingsSidebar 
                            sections={sections}
                            activeSection={activeSection}
                            onSectionChange={setActiveSection}
                        />
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200/50 overflow-hidden">
                            {renderSection()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}