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
        <nav className="flex lg:flex-col gap-2 p-2 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-lg border border-white/60 dark:border-white/10 shadow-sm sticky top-6 overflow-x-auto no-scrollbar">
            {sections.map((section) => {
                const Icon = sectionIcons[section.id];
                const isActive = activeSection === section.id;
                
                return (
                    <button
                        key={section.id}
                        onClick={() => onSectionChange(section.id)}
                        className={`
                            relative flex items-center gap-3 px-5 py-3.5 rounded-2xl font-medium text-sm whitespace-nowrap
                            transition-all duration-300 ease-out select-none
                            ${isActive 
                                ? 'bg-[#6a509a] text-white shadow-lg shadow-[#6a509a]/20 dark:bg-[#ad96cc] dark:text-[#352b33] dark:shadow-none font-semibold scale-[1.02]' 
                                : 'text-[#91868e] dark:text-[#d3d3df]/70 hover:text-[#352b33] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                            }
                        `}
                    >
                        <Icon className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                        <span>{section.label}</span>

                        {isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white dark:bg-[#352b33] animate-pulse" />
                        )}
                    </button>
                );
            })}
        </nav>
    );
}