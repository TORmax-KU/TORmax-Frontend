'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { RiArrowLeftLine } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { ListerGate } from '@/component/postings/ListerGate';
import { PostingForm } from '@/component/postings/PostingForm';
import { DIRECT_SOURCE, Project } from '@/lib/projects';
import { getPosting, updatePosting } from '@/lib/postings';
import { AuthUser } from '@/types';

export default function EditPostingPage() {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10 w-full space-y-6">
      <header className="space-y-2">
        <Link href="/postings" className="text-xs font-bold text-tormax-purple dark:text-tormax-lavender inline-flex items-center gap-1"><RiArrowLeftLine size={14} />{th ? 'กลับไปหน้าจัดการประกาศ' : 'Back to postings'}</Link>
        <h1 className="text-2xl md:text-3xl font-black">{th ? 'แก้ไขประกาศงาน' : 'Edit posting'}</h1>
      </header>
      <ListerGate lang={activeLang}>{user => <EditForm id={id} user={user} lang={activeLang} />}</ListerGate>
    </div>
  );
}

function EditForm({ id, user, lang }: { id: string; user: AuthUser; lang: 'th' | 'en' }) {
  const th = lang === 'th';
  const router = useRouter();
  const [result, setResult] = useState<{ project?: Project; error?: 'missing' | 'failed' }>();

  useEffect(() => {
    const controller = new AbortController();
    getPosting(id, controller.signal)
      .then(project => { if (!controller.signal.aborted) setResult({ project }); })
      .catch(error => { if (!controller.signal.aborted) setResult({ error: error.message === 'not-found' ? 'missing' : 'failed' }); });
    return () => controller.abort();
  }, [id]);

  if (!result) return <p role="status" className="p-10 text-center text-sm text-slate-500">{th ? 'กำลังโหลดประกาศ…' : 'Loading posting…'}</p>;
  const project = result.project;
  const publisherId = typeof project?.publisherId === 'string' ? project.publisherId : project?.publisherId?._id;
  if (!project || project.source !== DIRECT_SOURCE || publisherId !== user._id) {
    return <div role="alert" className="py-8 text-center space-y-3">
      <p>{result.error === 'failed' ? (th ? 'โหลดประกาศไม่สำเร็จ' : 'Could not load this posting.') : (th ? 'ไม่พบประกาศนี้ในบัญชีของคุณ' : 'This posting is not in your account.')}</p>
      <Link href="/postings" className="underline text-sm">{th ? 'กลับไปหน้าจัดการประกาศ' : 'Back to postings'}</Link>
    </div>;
  }
  return <PostingForm lang={lang} project={project} submitLabel={th ? 'บันทึกการแก้ไข' : 'Save changes'}
    onSubmit={async input => {
      // An expired posting is still "open", so a new future deadline lists it again;
      // a manually closed posting stays closed until reopened from the list.
      await updatePosting(project._id, input);
      router.push('/postings');
    }} />;
}
