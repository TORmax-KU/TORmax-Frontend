'use client';

import Link from 'next/link';
import { RiArrowRightLine, RiTranslate2 } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const { lang, isDark, setTheme, toggleLanguage } = useApp();
  const { user, isLoading } = useAuth();
  const th = lang === 'TH';
  const panel = 'rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-4';
  return <main className="max-w-3xl mx-auto px-6 py-10 space-y-6">
    <h1 className="text-3xl font-bold">{th ? 'การตั้งค่า' : 'Settings'}</h1>
    <section className={panel}>
      <h2 className="text-xl font-semibold">{th ? 'บัญชี' : 'Account'}</h2>
      {isLoading ? <p role="status">{th ? 'กำลังโหลด…' : 'Loading…'}</p> : user ? <>
        <p>{user.email}</p>
        <Link href="/profile" className="inline-block underline">{th ? 'แก้ไขโปรไฟล์และข้อมูลติดต่อ' : 'Edit profile and contact details'}</Link>
        <p className="text-sm text-slate-500">{th ? 'บัญชีนี้เข้าสู่ระบบผ่าน Google จัดการรหัสผ่านและการยืนยันสองขั้นตอนในบัญชี Google ของคุณ' : 'You sign in with Google. Manage your password and two-step verification in your Google account.'}</p>
      </> : <Link href="/login" className="underline">{th ? 'เข้าสู่ระบบเพื่อจัดการบัญชี' : 'Sign in to manage your account'}</Link>}
    </section>
    <section className={panel}>
      <h2 className="text-xl font-semibold">{th ? 'การแสดงผล' : 'Appearance'}</h2>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 border rounded-xl px-4 py-3 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-sm">
          <span className="text-slate-600 dark:text-slate-300">{th ? 'ธีม:' : 'Theme:'}</span>
          <select
            value={isDark ? 'dark' : 'light'}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            className="bg-transparent font-medium cursor-pointer outline-none text-slate-900 dark:text-white"
          >
            <option value="light" className="text-slate-900 bg-white">{th ? 'สว่าง (Light)' : 'Light'}</option>
            <option value="dark" className="text-white bg-slate-900">{th ? 'มืด (Dark)' : 'Dark'}</option>
          </select>
        </label>
        <button type="button" onClick={toggleLanguage} className="border rounded-xl px-4 py-3 inline-flex items-center gap-2"><RiTranslate2 size={16} />{th ? 'ภาษา: ไทย' : 'Language: English'}<RiArrowRightLine size={14} />{th ? 'English' : 'ไทย'}</button>
      </div>
    </section>
  </main>;
}
