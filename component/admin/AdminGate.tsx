'use client';

import Link from 'next/link';
import { RiShieldUserLine } from '@remixicon/react';
import { useAuth } from '@/context/AuthContext';

const card = 'ui-empty py-14';

// US9 / UC5: the admin console is for Administrator accounts only. The API enforces this too;
// the gate just avoids showing controls that would all fail.
export function AdminGate({ lang, children }: { lang: 'th' | 'en'; children: React.ReactNode }) {
  const th = lang === 'th';
  const { user, isLoading } = useAuth();
  if (isLoading) return <p role="status" className="flex items-center justify-center gap-2.5 p-12 text-sm text-ink-3"><span className="ui-spinner text-brand-soft" aria-hidden />{th ? 'กำลังโหลด…' : 'Loading…'}</p>;
  if (!user) return <div className={card}>
    <div className="ui-empty-icon"><RiShieldUserLine className="h-5 w-5" /></div>
    <p className="font-medium text-ink">{th ? 'เข้าสู่ระบบด้วยบัญชีผู้ดูแลระบบ' : 'Sign in with an administrator account'}</p>
    <Link href="/login" className="ui-btn ui-btn-primary ui-btn-sm mt-3">{th ? 'เข้าสู่ระบบ' : 'Sign in'}</Link>
  </div>;
  if (user.role !== 'Admin') return <div className={card}>
    <div className="ui-empty-icon"><RiShieldUserLine className="h-5 w-5" /></div>
    <p className="font-medium text-ink">{th ? 'หน้านี้สำหรับผู้ดูแลระบบเท่านั้น' : 'This page is for administrators only.'}</p>
    <Link href="/search-feed" className="ui-link mt-2 text-sm">{th ? 'ค้นหา TOR ทั้งหมด' : 'Browse all TORs'}</Link>
  </div>;
  return <>{children}</>;
}
