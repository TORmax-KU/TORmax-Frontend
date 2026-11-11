'use client';

import Link from 'next/link';
import { RiArrowRightLine, RiTranslate2 } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { PageHeader } from '@/component/PageHeader';

export default function SettingsPage() {
  const { lang, isDark, setTheme, toggleLanguage } = useApp();
  const { user, isLoading } = useAuth();
  const th = lang === 'TH';
  const panel = 'ui-section space-y-4';
  return <main className="ui-page max-w-3xl space-y-5">
    <PageHeader className="pb-3" title={th ? 'การตั้งค่า' : 'Settings'} />
    <section className={panel}>
      <h2 className="ui-section-title">{th ? 'บัญชี' : 'Account'}</h2>
      {isLoading ? <p role="status" className="text-sm text-ink-3">{th ? 'กำลังโหลด…' : 'Loading…'}</p> : user ? <>
        <p className="text-[15px] font-medium text-ink">{user.email}</p>
        <Link href="/profile" className="ui-link group text-sm">{th ? 'แก้ไขโปรไฟล์และข้อมูลติดต่อ' : 'Edit profile and contact details'}<RiArrowRightLine size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" /></Link>
        <p className="ui-hint border-t border-line pt-4 text-[13px]">{th ? 'บัญชีนี้เข้าสู่ระบบผ่าน Google จัดการรหัสผ่านและการยืนยันสองขั้นตอนในบัญชี Google ของคุณ' : 'You sign in with Google. Manage your password and two-step verification in your Google account.'}</p>
      </> : <Link href="/login" className="ui-btn ui-btn-primary ui-btn-sm">{th ? 'เข้าสู่ระบบเพื่อจัดการบัญชี' : 'Sign in to manage your account'}</Link>}
    </section>
    <section className={panel}>
      <h2 className="ui-section-title">{th ? 'การแสดงผล' : 'Appearance'}</h2>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-3 text-sm">
          <span className="ui-label">{th ? 'ธีม:' : 'Theme:'}</span>
          <select
            value={isDark ? 'dark' : 'light'}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            className="ui-field w-auto min-w-40"
          >
            <option value="light">{th ? 'สว่าง (Light)' : 'Light'}</option>
            <option value="dark">{th ? 'มืด (Dark)' : 'Dark'}</option>
          </select>
        </label>
        <button type="button" onClick={toggleLanguage} className="ui-btn ui-btn-secondary"><RiTranslate2 size={16} className="text-ink-3" />{th ? 'ภาษา: ไทย' : 'Language: English'}<RiArrowRightLine size={14} className="text-ink-4" />{th ? 'English' : 'ไทย'}</button>
      </div>
    </section>
  </main>;
}
