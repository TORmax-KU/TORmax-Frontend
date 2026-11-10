'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RiArrowLeftLine } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { ListerGate } from '@/component/postings/ListerGate';
import { PostingForm } from '@/component/postings/PostingForm';
import { createPosting } from '@/lib/postings';

// UC4: publish a direct job request. Matching vendors are notified once it is saved.
export default function NewPostingPage() {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10 w-full space-y-6">
      <header className="space-y-2">
        <Link href="/postings" className="text-xs font-bold text-tormax-purple dark:text-tormax-lavender inline-flex items-center gap-1"><RiArrowLeftLine size={14} />{th ? 'กลับไปหน้าจัดการประกาศ' : 'Back to postings'}</Link>
        <h1 className="text-2xl md:text-3xl font-black">{th ? 'สร้างประกาศงาน' : 'Create job listing'}</h1>
        <p className="text-sm text-slate-500">{th ? 'ช่องที่มี * จำเป็นต้องกรอก' : 'Fields marked * are required.'}</p>
      </header>
      <ListerGate lang={activeLang}>{user => (
        <PostingForm lang={activeLang} submitLabel={th ? 'เผยแพร่ประกาศ' : 'Publish posting'}
          defaults={{ agency: user.companyName, contactName: user.realName, contactEmail: user.email, contactPhone: user.contactPhone }}
          onSubmit={async input => {
            const project = await createPosting(input);
            router.push(`/tor-page/${project._id}?published=1`);
          }} />
      )}</ListerGate>
    </div>
  );
}
