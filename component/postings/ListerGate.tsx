'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { AuthUser } from '@/types';

const card = 'rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center space-y-3';
const action = 'inline-block rounded-xl bg-tormax-purple px-4 py-2 text-sm font-bold text-white hover:bg-tormax-purpleDeep';

// FR-13: only Job Lister accounts publish direct postings.
export function ListerGate({ lang, children }: { lang: 'th' | 'en'; children: (user: AuthUser) => React.ReactNode }) {
  const th = lang === 'th';
  const { user, isLoading } = useAuth();
  if (isLoading) return <p role="status" className="p-10 text-center text-sm text-slate-500">{th ? 'กำลังโหลด…' : 'Loading…'}</p>;
  if (!user) return <div className={card}>
    <p className="font-semibold">{th ? 'เข้าสู่ระบบด้วยบัญชีผู้ประกาศงานเพื่อจัดการประกาศ' : 'Sign in with a Job Lister account to manage postings'}</p>
    <Link href="/login" className={action}>{th ? 'เข้าสู่ระบบ' : 'Sign in'}</Link>
  </div>;
  if (user.role !== 'JobLister') return <div className={card}>
    <p className="font-semibold">{th ? 'การประกาศงานใช้ได้กับบัญชีผู้ประกาศงาน (Job Lister) เท่านั้น' : 'Posting jobs is available to Job Lister accounts.'}</p>
    <p className="text-sm text-slate-500">{th ? 'สมัครบัญชีใหม่และเลือกประเภท "ผู้ประกาศงาน"' : 'Register a new account and choose the Job Lister type.'}</p>
    <Link href="/search-feed" className="underline text-sm">{th ? 'ค้นหา TOR ทั้งหมด' : 'Browse all TORs'}</Link>
  </div>;
  return <>{children(user)}</>;
}
