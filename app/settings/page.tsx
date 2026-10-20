'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const { lang, isDark, toggleTheme, toggleLanguage } = useApp();
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
        <button type="button" onClick={toggleTheme} aria-pressed={isDark} className="border rounded-xl px-4 py-3">{th ? `โหมดมืด: ${isDark ? 'เปิด' : 'ปิด'}` : `Dark mode: ${isDark ? 'On' : 'Off'}`}</button>
        <button type="button" onClick={toggleLanguage} className="border rounded-xl px-4 py-3">{th ? 'ภาษา: ไทย → English' : 'Language: English → ไทย'}</button>
      </div>
    </section>
  </main>;
}
