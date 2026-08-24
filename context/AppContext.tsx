'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'TH';

interface AppContextType {
    isDark: boolean;
    toggleTheme: () => void;
    lang: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    EN: {
        dailyDigest: 'Daily Digest',
        torDirectory: 'TOR Directory',
        adminPortal: 'Admin Portal',
        quickSearch: 'Quick search TOR title, agency, or ID...',
        backToList: '← Back to list',
        matchConfidence: 'Match Confidence',
        estimatedBudget: 'Estimated Budget',
        submissionWindow: 'Submission Window',
        sourceOrigin: 'Source Origin',
        requirementClearance: 'Requirement Clearance',
        projectScope: 'Project Brief & Scope of Work',
        requirementsAudit: 'Qualification Requirements Audit',
        passed: 'PASSED',
        missing: 'MISSING',
        reviewTOR: 'Review TOR',
        notFound: 'TOR Document Not Found',
        backToDirectory: 'Back to Directory',
        notifications: 'Notifications',
        markAllRead: 'Mark all as read',
    },
    TH: {
        dailyDigest: 'สรุปรายวัน',
        torDirectory: 'คลังเอกสาร TOR',
        adminPortal: 'ระบบจัดการ',
        quickSearch: 'ค้นหาเอกสาร TOR, หน่วยงาน หรือรหัส...',
        backToList: '← กลับไปหน้ากล่องรายการ',
        matchConfidence: 'ระดับความตรงกัน',
        estimatedBudget: 'งบประมาณโดยประมาณ',
        submissionWindow: 'ระยะเวลายื่นซอง',
        sourceOrigin: 'แหล่งที่มาเอกสาร',
        requirementClearance: 'การผ่านเงื่อนไข',
        projectScope: 'สรุปขอบเขตงาน (Scope of Work)',
        requirementsAudit: 'ตรวจสอบคุณสมบัติผู้ยื่นข้อเสนอ',
        passed: 'ผ่านเงื่อนไข',
        missing: 'ขาดคุณสมบัติ',
        reviewTOR: 'ตรวจสอบ TOR',
        notFound: 'ไม่พบเอกสาร TOR',
        backToDirectory: 'กลับสู่คลังเอกสาร',
        notifications: 'การแจ้งเตือน',
        markAllRead: 'ทำเครื่องหมายว่าอ่านแล้ว',
    },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDark, setIsDark] = useState(false);
    const [lang, setLang] = useState<Language>('EN');

    // Load initial settings on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        setIsDark(shouldBeDark);
        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        const savedLang = localStorage.getItem('lang') as Language;
        if (savedLang) setLang(savedLang);
    }, []);

    const toggleTheme = () => {
        setIsDark((prev) => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return next;
        });
    };

    const toggleLanguage = () => {
        setLang((prev) => {
            const next = prev === 'EN' ? 'TH' : 'EN';
            localStorage.setItem('lang', next);
            return next;
        });
    };

    const t = (key: string): string => {
        return translations[lang][key] || key;
    };

    return (
        <AppContext.Provider value={{ isDark, toggleTheme, lang, toggleLanguage, t }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within an AppProvider');
    return context;
};