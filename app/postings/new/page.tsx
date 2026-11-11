'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RiArrowLeftLine } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { ListerGate } from '@/component/postings/ListerGate';
import { PostingForm } from '@/component/postings/PostingForm';
import { PageHeader } from '@/component/PageHeader';
import { createPosting } from '@/lib/postings';

// UC4: publish a direct job request. Matching vendors are notified once it is saved.
export default function NewPostingPage() {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';
  const router = useRouter();

  return (
    <div className="ui-page max-w-4xl space-y-6">
      <div className="space-y-4">
        <Link href="/postings" className="ui-link group text-[13px]"><RiArrowLeftLine size={14} className="transition-transform duration-150 group-hover:-translate-x-0.5" />{th ? 'กลับไปหน้าจัดการประกาศ' : 'Back to postings'}</Link>
        <PageHeader className="pb-2" title={th ? 'สร้างประกาศงาน' : 'Create job listing'} description={th ? 'ช่องที่มี * จำเป็นต้องกรอก' : 'Fields marked * are required.'} />
      </div>
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
