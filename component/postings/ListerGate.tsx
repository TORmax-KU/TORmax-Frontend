'use client';

import Link from 'next/link';
import { RiBriefcase4Line } from '@remixicon/react';
import { useAuth } from '@/context/AuthContext';
import { AuthUser } from '@/types';

const card = 'ui-empty py-14';
const action = 'ui-btn ui-btn-primary ui-btn-sm mt-3';

// FR-13: only Job Lister accounts publish direct postings.
export function ListerGate({ lang, children }: { lang: 'th' | 'en'; children: (user: AuthUser) => React.ReactNode }) {
  const th = lang === 'th';
  const { user, isLoading } = useAuth();
  if (isLoading) return <p role="status" className="flex items-center justify-center gap-2.5 p-12 text-sm text-ink-3"><span className="ui-spinner text-brand-soft" aria-hidden />{th ? 'กำลังโหลด…' : 'Loading…'}</p>;
  if (!user) return <div className={card}>
    <div className="ui-empty-icon"><RiBriefcase4Line className="h-5 w-5" /></div>
    <p className="font-medium text-ink">{th ? 'เข้าสู่ระบบด้วยบัญชีผู้ประกาศงานเพื่อจัดการประกาศ' : 'Sign in with a Job Lister account to manage postings'}</p>
    <Link href="/login" className={action}>{th ? 'เข้าสู่ระบบ' : 'Sign in'}</Link>
  </div>;
  if (user.role !== 'JobLister') return <div className={card}>
    <p className="font-medium text-ink">{th ? 'การประกาศงานใช้ได้กับบัญชีผู้ประกาศงาน (Job Lister) เท่านั้น' : 'Posting jobs is available to Job Lister accounts.'}</p>
    <p className="text-sm text-ink-3">{th ? 'สมัครบัญชีใหม่และเลือกประเภท "ผู้ประกาศงาน"' : 'Register a new account and choose the Job Lister type.'}</p>
    <Link href="/search-feed" className="ui-link mt-2 text-sm">{th ? 'ค้นหา TOR ทั้งหมด' : 'Browse all TORs'}</Link>
  </div>;
  return <>{children(user)}</>;
}
