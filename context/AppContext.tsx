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
    // Navigation & General
    dailyDigest: 'Daily Digest',
    torDirectory: 'TOR Directory',
    adminPortal: 'Admin Portal',
    login: 'Log in',
    quickSearch: 'Quick search TOR title, agency, or ID...',
    backToList: 'Back to list',
    backToDirectory: 'Back to Directory',
    notFound: 'TOR Document Not Found',
    notifications: 'Notifications',
    markAllRead: 'Mark all as read',
    
    // Page & Detail Headers
    matchConfidence: 'Match Confidence',
    estimatedBudget: 'Approved Budget',
    submissionWindow: 'Submission Window',
    sourceOrigin: 'Source Origin',
    requirementClearance: 'Requirement Clearance',
    projectScope: 'Project Scope & Summary',
    keyDeliverables: 'Key Scope & Deliverables',
    qualificationAudit: 'Qualification & Mandate Checklist',
    
    // Compliance & Auditing
    passed: 'PASSED',
    missing: 'MISSING',
    compliant: 'COMPLIANT',
    gapIdentified: 'GAP IDENTIFIED',
    verifiedRepo: 'Verified via corporate repository',
    verifiedProfile: 'Verified via Corporate Profile Credentials',
    updateProfileCredentials: 'Update Profile Credentials',
    updateCompanyCredentials: 'Update company credentials',
    autoVerification: 'Automated verification against',
    
    // Proposal Submission & Sidebar
    proposalSubmission: 'Proposal Submission',
    submitBidProposal: 'Submit Bid Proposal via',
    prepareSubmitBid: 'Prepare & Submit Bid',
    openSubmissionPortal: 'Open Submission Portal ↗',
    ingestedFrom: 'Ingested from',
    syncStatusActive: 'Sync Status: Active',
    procurementOfficerContact: 'Procurement Officer Contact',
    divisionProcurement: 'Division of Public e-Procurement',
    requiredSkillsTags: 'Required Domain Skills & Tags',
    
    // Feasibility Matrix
    feasibilityMatrix: 'Bidding Feasibility Matrix',
    capitalBudgetFit: 'Capital & Budget Fit',
    securityFit: 'Security & ISO Clearance',
    
    // Quick-Fill Modal
    submitProposalRef: 'Submit Proposal Reference',
    quickFillDesc: 'Use your registered corporate details below for quick copy-pasting into the official government portal form.',
    companyName: 'Company Name',
    taxId: 'Tax Identification ID',
    dunsNumber: 'DUNS Number',
    primaryContact: 'Primary Contact',
    contactEmail: 'Contact Email',
    bankAccountRef: 'Bank Account Ref',
    copy: 'Copy',
    copied: 'Copied ✓',
    proceedToPortal: 'Proceed to Official Portal',
    close: 'Close',
    
    // Settings Tabs
    account: 'Account',
    security: 'Security',
    settingsNotifications: 'Notifications',
    privacy: 'Privacy',
    appearance: 'Appearance',
  },
  TH: {
    // Navigation & General
    dailyDigest: 'สรุปรายวัน',
    torDirectory: 'คลังเอกสาร TOR',
    adminPortal: 'ระบบจัดการ',
    login: 'เข้าสู่ระบบ',
    quickSearch: 'ค้นหาเอกสาร TOR, หน่วยงาน หรือรหัส...',
    backToList: 'กลับไปหน้ากล่องรายการ',
    backToDirectory: 'กลับสู่คลังเอกสาร',
    notFound: 'ไม่พบเอกสาร TOR',
    notifications: 'การแจ้งเตือน',
    markAllRead: 'ทำเครื่องหมายว่าอ่านแล้ว',
    
    // Page & Detail Headers
    matchConfidence: 'ระดับความตรงกัน',
    estimatedBudget: 'งบประมาณที่ได้รับการอนุมัติ',
    submissionWindow: 'ระยะเวลายื่นซอง',
    sourceOrigin: 'แหล่งที่มาเอกสาร',
    requirementClearance: 'การผ่านเงื่อนไข',
    projectScope: 'สรุปขอบเขตงานและวัตถุประสงค์',
    keyDeliverables: 'ขอบเขตงานหลักและผลงานส่งมอบ',
    qualificationAudit: 'รายการตรวจสอบคุณสมบัติและเงื่อนไข',
    
    // Compliance & Auditing
    passed: 'ผ่านเงื่อนไข',
    missing: 'ขาดคุณสมบัติ',
    compliant: 'ตรงตามเงื่อนไข',
    gapIdentified: 'พบข้อจำกัดคุณสมบัติ',
    verifiedRepo: 'ตรวจสอบผ่านคลังข้อมูลองค์กรแล้ว',
    verifiedProfile: 'ตรวจสอบผ่านข้อมูลโปรไฟล์บริษัทแล้ว',
    updateProfileCredentials: 'อัปเดตข้อมูลเอกสารโปรไฟล์',
    updateCompanyCredentials: 'อัปเดตเอกสารรับรองของบริษัท',
    autoVerification: 'ระบบตรวจสอบอัตโนมัติเทียบกับข้อมูลของ',
    
    // Proposal Submission & Sidebar
    proposalSubmission: 'การยื่นข้อเสนอโครงการ',
    submitBidProposal: 'ยื่นข้อเสนอประกวดราคาผ่าน',
    prepareSubmitBid: 'เตรียมข้อมูลและยื่นข้อเสนอ',
    openSubmissionPortal: 'เปิดพอร์ทัลยื่นซอง ↗',
    ingestedFrom: 'ดึงข้อมูลจาก',
    syncStatusActive: 'สถานะการเชื่อมโยง: ปกติ',
    procurementOfficerContact: 'ข้อมูลติดต่อเจ้าหน้าที่พัสดุ',
    divisionProcurement: 'ฝ่ายจัดซื้อจัดจ้างภาครัฐ',
    requiredSkillsTags: 'ทักษะและความเชี่ยวชาญที่ต้องการ',
    
    // Feasibility Matrix
    feasibilityMatrix: 'การวิเคราะห์ความเป็นไปได้ในการเข้าประกวดราคา',
    capitalBudgetFit: 'ความเหมาะสมด้านเงินทุนและงบประมาณ',
    securityFit: 'ความเหมาะสมด้านความปลอดภัยและมาตรฐาน ISO',
    
    // Quick-Fill Modal
    submitProposalRef: 'อ้างอิงข้อมูลสำหรับยื่นข้อเสนอ',
    quickFillDesc: 'ใช้ข้อมูลนิติบุคคลที่ลงทะเบียนไว้ด้านล่างนี้ คัดลอกไปกรอกในระบบจัดซื้อจัดจ้างภาครัฐได้อย่างรวดเร็ว',
    companyName: 'ชื่อบริษัท / นิติบุคคล',
    taxId: 'เลขประจำตัวผู้เสียภาษี',
    dunsNumber: 'หมายเลข DUNS',
    primaryContact: 'ผู้ประสานงานหลัก',
    contactEmail: 'อีเมลติดต่อ',
    bankAccountRef: 'บัญชีธนาคารอ้างอิง',
    copy: 'คัดลอก',
    copied: 'คัดลอกแล้ว ✓',
    proceedToPortal: 'ไปยังพอร์ทัลหลักของภาครัฐ',
    close: 'ปิด',
    
    // Settings Tabs
    account: 'บัญชี',
    security: 'ความปลอดภัย',
    settingsNotifications: 'การแจ้งเตือน',
    privacy: 'ความเป็นส่วนตัว',
    appearance: 'การแสดงผล',
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [lang, setLang] = useState<Language>('EN');
  const [mounted, setMounted] = useState<boolean>(false);

  // Initialize state from local storage or media preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang) setLang(savedLang);

    setMounted(true);
  }, []);

  // Sync class on root document element whenever isDark changes
  useEffect(() => {
    if (!mounted) return;

    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const toggleLanguage = () => {
    setLang((prev) => {
      const next = prev === 'EN' ? 'TH' : 'EN';
      localStorage.setItem('lang', next);
      return next;
    });
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || key;
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