'use client';

import { 
    RiUserSettingsLine,
    RiLockLine,
    RiNotificationLine,
    RiShieldLine,
    RiPaletteLine
} from "@remixicon/react";

interface SettingsSidebarProps {
    sections: { id: string; label: string }[];
    activeSection: string;
    onSectionChange: (id: string) => void;
}

const sectionIcons: Record<string, any> = {
    account: RiUserSettingsLine,
    security: RiLockLine,
    notifications: RiNotificationLine,
    privacy: RiShieldLine,
    appearance: RiPaletteLine,
};

export default function SettingsSidebar({ 
    sections, 
    activeSection, 
    onSectionChange 
}: SettingsSidebarProps) {
    return (
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200/50 p-2 sticky top-4">
            {sections.map((section) => {
                const Icon = sectionIcons[section.id];
                const isActive = activeSection === section.id;
                
                return (
                    <button
                        key={section.id}
                        className={`
                            w-full flex items-center gap-3 px-4 py-2.5 rounded-xl
                            transition-all duration-200 text-sm font-medium
                            ${isActive 
                                ? 'bg-primary/10 text-primary' 
                                : 'text-base-content/60 hover:bg-base-200 hover:text-base-content'
                            }
                        `}
                        onClick={() => onSectionChange(section.id)}
                    >
                        <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : ''}`} />
                        <span>{section.label}</span>
                        {isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}