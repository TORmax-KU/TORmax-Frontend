'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

// Local Dictionary for Profile Page Localization
const i18n = {
  en: {
    title: 'Vendor Qualifications & Preferences',
    subtitle: 'Manage company details, qualification credentials, vector matching criteria, and alert subscriptions.',
    sec1Title: '1. Corporate Identity Credentials',
    sec1Desc: 'Official DBD registration data used for eligibility verification.',
    companyName: 'Registered Company Name',
    taxId: 'Commercial Tax ID Number',
    registeredCapital: 'Paid-up Capital (THB ฿)',
    yearsInBusiness: 'Years in Active Operation',
    sec2Title: '2. Certifications & Statutory Licenses',
    sec2Desc: 'Select active qualifications held by your enterprise to auto-clear TOR mandatory checklists.',
    iso27001Title: 'ISO/IEC 27001 Information Security',
    iso27001Desc: 'Required for most MDES & IT infrastructure TORs',
    iso9001Title: 'ISO 9001 Quality Management',
    iso9001Desc: 'Standard for hardware supply & state enterprise bids',
    iso20000Title: 'ISO 20000 Service Management',
    iso20000Desc: 'Managed IT services & data center operations',
    nbtcTitle: 'NBTC Telecom License Class 1/2/3',
    nbtcDesc: 'Mandatory for fiber optic & telecom cabling tender eligibility',
    sec3Title: '3. Vector Match Tuning & Daily Digest Subscriptions',
    sec3Desc: 'Set matching sensitivity and delivery channels across multi-portal listings.',
    trackedKeywords: 'Tracked Capability Keywords (Comma Separated)',
    keywordsHint: 'Incoming TORs containing these keywords will be prioritized in your Daily Digest.',
    matchThreshold: 'Minimum Digest Match Confidence Threshold',
    dailyEmail: '✉️ Daily Email Digest',
    dailyEmailDesc: 'Receive morning briefing at 07:30 AM',
    smsAlerts: '📲 SMS Instant High-Value Alerts',
    smsAlertsDesc: 'Urgent notifications for bids over ฿20M',
    sec4Title: '4. Designated Procurement Officer',
    sec4Desc: 'Primary point of contact for proposal submissions and system updates.',
    contactName: 'Representative Name',
    contactEmail: 'Direct Business Email',
    contactPhone: 'Mobile Phone Number',
    cancel: 'Cancel',
    save: 'Save Vendor Credentials',
    savedAlert: 'Vendor qualification credentials and alert preferences saved successfully!',
  },
  th: {
    title: 'คุณสมบัติและสิทธิ์การตั้งค่าของผู้ขาย',
    subtitle: 'จัดการข้อมูลบริษัท ใบรับรองคุณสมบัติ เกณฑ์การจับคู่เวกเตอร์ และการสมัครรับการแจ้งเตือน',
    sec1Title: '1. ข้อมูลอัตลักษณ์องค์กร',
    sec1Desc: 'ข้อมูลการจดทะเบียนกรมพัฒนาธุรกิจการค้า (DBD) ที่ใช้ในการตรวจสอบคุณสมบัติ',
    companyName: 'ชื่อบริษัทที่จดทะเบียน',
    taxId: 'เลขประจำตัวผู้เสียภาษีอากร',
    registeredCapital: 'ทุนจดทะเบียนชำระแล้ว (บาท ฿)',
    yearsInBusiness: 'ระยะเวลาดำเนินกิจการ (ปี)',
    sec2Title: '2. ใบรับรองและใบอนุญาตตามกฎหมาย',
    sec2Desc: 'เลือกคุณสมบัติที่บริษัทถือครองเพื่อผ่านเกณฑ์การตรวจสอบ TOR โดยอัตโนมัติ',
    iso27001Title: 'ISO/IEC 27001 ระบบบริหารจัดการความมั่นคงปลอดภัยสารสนเทศ',
    iso27001Desc: 'จำเป็นสำหรับ TOR ด้านโครงสร้างพื้นฐานไอทีและกระทรวงดิจิทัลฯ',
    iso9001Title: 'ISO 9001 ระบบบริหารงานคุณภาพ',
    iso9001Desc: 'มาตรฐานสำหรับการจัดหาฮาร์ดแวร์และการประมูลรัฐวิสาหกิจ',
    iso20000Title: 'ISO 20000 การบริหารจัดการการบริการไอที',
    iso20000Desc: 'บริการการจัดการไอทีและการดำเนินงานศูนย์ข้อมูล (Data Center)',
    isonbtcTitle: 'ใบอนุญาตประกอบกิจการโทรคมนาคม กสทช. แบบที่ 1/2/3',
    nbtcTitle: 'ใบอนุญาตประกอบกิจการโทรคมนาคม กสทช. แบบที่ 1/2/3',
    nbtcDesc: 'จำเป็นสำหรับคุณสมบัติการประมูลงานสายใยแก้วนำแสงและโทรคมนาคม',
    sec3Title: '3. การปรับแต่งการจับคู่เวกเตอร์และการรับข่าวสาร',
    sec3Desc: 'ตั้งค่าความไวในการจับคู่และช่องทางการส่งข้อมูลประกาศการจัดซื้อจัดจ้าง',
    trackedKeywords: 'คำสำคัญขีดความสามารถที่ติดตาม (คั่นด้วยเครื่องหมายจุลภาค)',
    keywordsHint: 'TOR ใหม่ที่มีคำสำคัญเหล่านี้จะได้รับการจัดลำดับความสำคัญในสรุปประจำวันของคุณ',
    matchThreshold: 'เกณฑ์ความเชื่อมั่นขั้นต่ำในการจับคู่สรุปข่าวสาร',
    dailyEmail: '✉️ อีเมลสรุปรายวัน',
    dailyEmailDesc: 'รับสรุปข่าวสารจัดซื้อจัดจ้างทุกเช้า เวลา 07:30 น.',
    smsAlerts: '📲 แจ้งเตือน SMS ด่วนสำหรับโครงการมูลค่าสูง',
    smsAlertsDesc: 'แจ้งเตือนเร่งด่วนสำหรับโครงการประมูลที่มีมูลค่าเกิน 20 ล้านบาท',
    sec4Title: '4. เจ้าหน้าที่ผู้รับผิดชอบการจัดซื้อจัดจ้าง',
    sec4Desc: 'ผู้ติดต่อหลักสำหรับการยื่นข้อเสนอและการอัปเดตระบบ',
    contactName: 'ชื่อผู้แทนองค์กร',
    contactEmail: 'อีเมลติดต่อทางธุรกิจ',
    contactPhone: 'หมายเลขโทรศัพท์มือถือ',
    cancel: 'ยกเลิก',
    save: 'บันทึกข้อมูลคุณสมบัติผู้ขาย',
    savedAlert: 'บันทึกข้อมูลคุณสมบัติผู้ขายและการตั้งค่าการแจ้งเตือนเรียบร้อยแล้ว!',
  },
};

export default function ProfilePage() {
  const router = useRouter();
  const { userProfile, updateUserProfile, lang } = useApp();

  // Active localization target
  const activeLang = (lang?.toLowerCase() as 'en' | 'th') === 'th' ? 'th' : 'en';
  const t = i18n[activeLang];

  // Local form state initialized from context profile
  const [formData, setFormData] = useState({
    companyName: userProfile?.companyName || 'Acme Innovations Ltd.',
    taxId: userProfile?.taxId || '0105562098711',
    registeredCapital: userProfile?.registeredCapital || '฿ 10,000,000 THB',
    yearsInBusiness: userProfile?.yearsInBusiness || 8,
    iso27001: userProfile?.iso27001 ?? true,
    iso9001: userProfile?.iso9001 ?? true,
    iso20000: userProfile?.iso20000 ?? false,
    nbtcLicense: userProfile?.nbtcLicense ?? false,
    trackedKeywords:
      userProfile?.trackedKeywords ||
      'Cloud, Data Center, Fiber Optic, Cybersecurity, AI',
    matchThreshold: userProfile?.matchThreshold || 75,
    dailyDigestEmail: userProfile?.dailyDigestEmail ?? true,
    smsAlerts: userProfile?.smsAlerts ?? false,
    contactName: userProfile?.contactName || 'Somchai Prasert',
    contactEmail: userProfile?.contactEmail || 'somchai@acme.co.th',
    contactPhone: userProfile?.contactPhone || '+66 81 928 3746',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateUserProfile) {
      updateUserProfile(formData);
    }
    alert(t.savedAlert);
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Immersive Header */}
      <header className="bg-slate-900 text-white min-h-[220px] px-6 sm:px-8 py-10 flex flex-col justify-center border-b border-slate-800">
        <div className="max-w-5xl mx-auto w-full space-y-2">
          <h1 className="text-3xl font-black font-display text-white tracking-tight">
            {t.title}
          </h1>
          <p className="text-slate-300 text-xs font-medium">
            {t.subtitle}
          </p>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-10 w-full space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: CORPORATE IDENTITY */}
          <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-8 rounded-3xl space-y-6 shadow-sm">
            <div className="border-b border-slate-100 dark:border-tormax-borderDark pb-3">
              <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
                {t.sec1Title}
              </h2>
              <p className="text-xs text-slate-500">
                {t.sec1Desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <label htmlFor="companyName" className="font-bold block text-slate-700 dark:text-slate-300">
                  {t.companyName}
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="taxId" className="font-bold block text-slate-700 dark:text-slate-300">
                  {t.taxId}
                </label>
                <input
                  type="text"
                  id="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-mono font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="registeredCapital" className="font-bold block text-slate-700 dark:text-slate-300">
                  {t.registeredCapital}
                </label>
                <input
                  type="text"
                  id="registeredCapital"
                  value={formData.registeredCapital}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="yearsInBusiness" className="font-bold block text-slate-700 dark:text-slate-300">
                  {t.yearsInBusiness}
                </label>
                <input
                  type="number"
                  id="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: CERTIFICATIONS & LICENSES */}
          <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-8 rounded-3xl space-y-6 shadow-sm">
            <div className="border-b border-slate-100 dark:border-tormax-borderDark pb-3">
              <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
                {t.sec2Title}
              </h2>
              <p className="text-xs text-slate-500">
                {t.sec2Desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <label className="p-4 rounded-2xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between cursor-pointer bg-slate-50 dark:bg-tormax-canvasDark hover:border-tormax-purple transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">{t.iso27001Title}</div>
                  <div className="text-[11px] text-slate-500">{t.iso27001Desc}</div>
                </div>
                <input
                  type="checkbox"
                  id="iso27001"
                  checked={formData.iso27001}
                  onChange={handleChange}
                  className="w-5 h-5 accent-tormax-purple cursor-pointer"
                />
              </label>

              <label className="p-4 rounded-2xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between cursor-pointer bg-slate-50 dark:bg-tormax-canvasDark hover:border-tormax-purple transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">{t.iso9001Title}</div>
                  <div className="text-[11px] text-slate-500">{t.iso9001Desc}</div>
                </div>
                <input
                  type="checkbox"
                  id="iso9001"
                  checked={formData.iso9001}
                  onChange={handleChange}
                  className="w-5 h-5 accent-tormax-purple cursor-pointer"
                />
              </label>

              <label className="p-4 rounded-2xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between cursor-pointer bg-slate-50 dark:bg-tormax-canvasDark hover:border-tormax-purple transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">{t.iso20000Title}</div>
                  <div className="text-[11px] text-slate-500">{t.iso20000Desc}</div>
                </div>
                <input
                  type="checkbox"
                  id="iso20000"
                  checked={formData.iso20000}
                  onChange={handleChange}
                  className="w-5 h-5 accent-tormax-purple cursor-pointer"
                />
              </label>

              <label className="p-4 rounded-2xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between cursor-pointer bg-slate-50 dark:bg-tormax-canvasDark hover:border-tormax-purple transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">{t.nbtcTitle}</div>
                  <div className="text-[11px] text-slate-500">{t.nbtcDesc}</div>
                </div>
                <input
                  type="checkbox"
                  id="nbtcLicense"
                  checked={formData.nbtcLicense}
                  onChange={handleChange}
                  className="w-5 h-5 accent-tormax-purple cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* SECTION 3: KEYWORD VECTOR MATCHER & NOTIFICATION PREFERENCES */}
          <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-8 rounded-3xl space-y-6 shadow-sm">
            <div className="border-b border-slate-100 dark:border-tormax-borderDark pb-3">
              <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
                {t.sec3Title}
              </h2>
              <p className="text-xs text-slate-500">
                {t.sec3Desc}
              </p>
            </div>

            <div className="space-y-6 text-xs">
              <div className="space-y-2">
                <label htmlFor="trackedKeywords" className="font-bold block text-slate-700 dark:text-slate-300">
                  {t.trackedKeywords}
                </label>
                <input
                  type="text"
                  id="trackedKeywords"
                  value={formData.trackedKeywords}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
                <p className="text-[11px] text-slate-400">
                  {t.keywordsHint}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="matchThreshold" className="font-bold text-slate-700 dark:text-slate-300">
                    {t.matchThreshold}
                  </label>
                  <span className="font-bold text-tormax-purple dark:text-tormax-lavender text-sm">
                    {formData.matchThreshold}%
                  </span>
                </div>
                <input
                  type="range"
                  id="matchThreshold"
                  min="50"
                  max="95"
                  value={formData.matchThreshold}
                  onChange={handleChange}
                  className="w-full accent-tormax-purple cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <label className="p-4 rounded-2xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between cursor-pointer bg-slate-50 dark:bg-tormax-canvasDark hover:border-tormax-purple transition-colors">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">{t.dailyEmail}</div>
                    <div className="text-[11px] text-slate-500">{t.dailyEmailDesc}</div>
                  </div>
                  <input
                    type="checkbox"
                    id="dailyDigestEmail"
                    checked={formData.dailyDigestEmail}
                    onChange={handleChange}
                    className="w-5 h-5 accent-tormax-purple cursor-pointer"
                  />
                </label>

                <label className="p-4 rounded-2xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between cursor-pointer bg-slate-50 dark:bg-tormax-canvasDark hover:border-tormax-purple transition-colors">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">{t.smsAlerts}</div>
                    <div className="text-[11px] text-slate-500">{t.smsAlertsDesc}</div>
                  </div>
                  <input
                    type="checkbox"
                    id="smsAlerts"
                    checked={formData.smsAlerts}
                    onChange={handleChange}
                    className="w-5 h-5 accent-tormax-purple cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* SECTION 4: PRIMARY CONTACT REPRESENTATIVE */}
          <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-8 rounded-3xl space-y-6 shadow-sm">
            <div className="border-b border-slate-100 dark:border-tormax-borderDark pb-3">
              <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
                {t.sec4Title}
              </h2>
              <p className="text-xs text-slate-500">
                {t.sec4Desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="space-y-2">
                <label htmlFor="contactName" className="font-bold block text-slate-700 dark:text-slate-300">
                  {t.contactName}
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contactEmail" className="font-bold block text-slate-700 dark:text-slate-300">
                  {t.contactEmail}
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contactPhone" className="font-bold block text-slate-700 dark:text-slate-300">
                  {t.contactPhone}
                </label>
                <input
                  type="text"
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-mono font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push('/home')}
              className="px-6 py-3 border border-slate-300 dark:border-tormax-borderDark font-bold text-xs text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-tormax-purple hover:bg-tormax-purpleDeep text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              {t.save}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}