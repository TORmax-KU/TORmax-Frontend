'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { RiEditLine, RiExternalLinkLine, RiMailLine, RiPhoneLine } from '@remixicon/react';
import { useAuth } from '@/context/AuthContext';
import { Project, projectCard, publisherName, safeSourceUrl } from '@/lib/projects';
import { SubmissionStatus } from '@/component/SubmissionStatus';
import { TORHeader } from './TORHeader';
import { MatchPanel } from './MatchPanel';
import { PriceComparison } from './PriceComparison';

const panel = 'rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4';
const sectionTitle = 'text-lg font-bold text-slate-900 dark:text-white';

// FR-13 / US4 / US8: a job posting published directly on TORmax. Vendors contact the publisher
// themselves; TORmax never submits an application on anyone's behalf (FR-15).
export function DirectPostingDetail({ project, lang, backToDirectory }: { project: Project; lang: 'th' | 'en'; backToDirectory: string }) {
  const th = lang === 'th';
  const { user } = useAuth();
  const justPublished = useSearchParams().get('published') === '1';
  const tor = projectCard(project, lang);
  const publisherId = typeof project.publisherId === 'string' ? project.publisherId : project.publisherId?._id;
  const isOwner = Boolean(user && publisherId === user._id);
  const open = tor.availability === 'open';
  const link = safeSourceUrl(project.sourceUrl);
  const contact = project.contact || {};
  const subject = encodeURIComponent(`${th ? 'สอบถามงาน' : 'Question about'}: ${project.title}`);
  const publisher = publisherName(project);

  return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
    <TORHeader {...tor} id={tor.displayId} backToDirectory={backToDirectory} direct />
    <main className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-6 items-start">
      {isOwner && justPublished && <p role="status" className="lg:col-span-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 p-4 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
        {th ? 'เผยแพร่ประกาศแล้ว ผู้ให้บริการที่มีทักษะตรงกำลังได้รับแจ้งเตือน' : 'Your posting is live. Vendors with matching skills are being notified.'}
      </p>}
      <div className="lg:col-span-2 space-y-6">
        <section className={panel}>
          <h2 className={sectionTitle}>{th ? 'ขอบเขตงาน' : 'Scope of work'}</h2>
          <p className="whitespace-pre-line text-sm leading-7">{project.description}</p>
          <p className="text-xs text-slate-500">{th ? `ประกาศโดย${publisher ? ` ${publisher}` : 'ผู้ประกาศงานบน TORmax'} • ข้อมูลจากผู้ประกาศ ไม่ใช่ประกาศจัดซื้อจัดจ้างภาครัฐ` : `Posted by ${publisher || 'a TORmax job lister'} • Publisher-provided, not a government procurement notice`}</p>
        </section>
        <section className={panel}>
          <h2 className={sectionTitle}>{th ? 'ทักษะและเทคโนโลยีที่ต้องใช้' : 'Required skills & technology'}</h2>
          <div className="flex flex-wrap gap-2">{tor.tags.map(tag => <span key={tag} className="rounded-lg bg-violet-50 text-violet-900 dark:bg-violet-950 dark:text-violet-200 px-3 py-2 text-sm">{tag}</span>)}</div>
        </section>
        <PriceComparison analysis={project.priceAnalysis} budget={project.budget} flag={project.priceFlag} lang={lang} />
      </div>
      <aside className="space-y-6 lg:sticky lg:top-6">
        {isOwner && <Link href={`/postings/${project._id}/edit`} className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold"><RiEditLine size={16} />{th ? 'แก้ไขประกาศนี้' : 'Edit this posting'}</Link>}
        <MatchPanel projectId={project._id} lang={lang} />
        <section className={`${panel} border-t-4 ${open ? 'border-t-emerald-500' : 'border-t-amber-500'}`}>
          <p className={`text-sm font-bold ${open ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>{open ? (th ? 'เปิดรับสมัคร' : 'Accepting applications') : (th ? 'ปิดรับสมัครแล้ว' : 'No longer accepting applications')}</p>
          <h2 className={sectionTitle}>{th ? 'ปิดรับสมัคร' : 'Application deadline'}</h2>
          <p className="text-xl font-bold">{tor.deadline}</p>
          <SubmissionStatus project={project} lang={lang} />
          <p className="text-xs text-slate-500">{th ? 'เวลาไทย (GMT+7)' : 'Thailand time (GMT+7)'}</p>
        </section>
        <section className={panel}>
          <h2 className={sectionTitle}>{th ? 'ติดต่อผู้ประกาศ' : 'Contact the publisher'}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">{th ? 'สอบถามรายละเอียดหรือส่งใบเสนอราคากับผู้ประกาศโดยตรง' : 'Ask questions or send your proposal directly to the publisher.'}</p>
          {contact.name && <p className="text-sm font-semibold">{contact.name}</p>}
          <div className="space-y-2">
            {contact.email && <a href={`mailto:${contact.email}?subject=${subject}`} className="flex items-center justify-center gap-1.5 px-4 py-3 bg-tormax-purple hover:bg-tormax-purpleDeep text-white rounded-xl text-sm font-bold break-all"><RiMailLine size={16} />{contact.email}</a>}
            {contact.phone && <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-violet-200 dark:border-violet-800 text-sm font-bold text-tormax-purple dark:text-tormax-lavender"><RiPhoneLine size={16} />{contact.phone}</a>}
            {link && <a href={link} target="_blank" rel="noopener noreferrer nofollow" className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold">{th ? 'รายละเอียดเพิ่มเติม' : 'More details'}<RiExternalLinkLine size={14} /></a>}
          </div>
          <p className="text-xs text-slate-500">{th ? 'TORmax ไม่ได้ส่งใบสมัครหรือข้อเสนอแทนคุณ' : 'TORmax does not send applications or proposals on your behalf.'}</p>
        </section>
      </aside>
    </main>
  </div>;
}
