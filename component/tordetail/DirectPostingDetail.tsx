'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { RiCheckboxCircleLine, RiEditLine, RiExternalLinkLine, RiMailLine, RiPhoneLine } from '@remixicon/react';
import { useAuth } from '@/context/AuthContext';
import { Project, projectCard, publisherName, safeSourceUrl } from '@/lib/projects';
import { SubmissionStatus } from '@/component/SubmissionStatus';
import { detailLayout, panel, sectionTitle } from '@/component/ui';
import { TORHeader } from './TORHeader';
import { MatchPanel } from './MatchPanel';
import { PriceComparison } from './PriceComparison';

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

  return <div className="min-h-screen pb-16">
    <TORHeader {...tor} id={tor.displayId} backToDirectory={backToDirectory} direct />
    <main className={detailLayout}>
      {isOwner && justPublished && <p role="status" className="ui-alert ui-alert-ok ui-reveal font-medium lg:col-span-2">
        <RiCheckboxCircleLine size={18} className="mt-px shrink-0" />
        {th ? 'เผยแพร่ประกาศแล้ว ผู้ให้บริการที่มีทักษะตรงกำลังได้รับแจ้งเตือน' : 'Your posting is live. Vendors with matching skills are being notified.'}
      </p>}
      <div className="min-w-0 space-y-5">
        <section className={panel}>
          <h2 className={sectionTitle}>{th ? 'ขอบเขตงาน' : 'Scope of work'}</h2>
          <p className="whitespace-pre-line text-[15px] leading-7 text-ink-2">{project.description}</p>
          <p className="ui-meta border-t border-line pt-3">{th ? `ประกาศโดย${publisher ? ` ${publisher}` : 'ผู้ประกาศงานบน TORmax'} • ข้อมูลจากผู้ประกาศ ไม่ใช่ประกาศจัดซื้อจัดจ้างภาครัฐ` : `Posted by ${publisher || 'a TORmax job lister'} • Publisher-provided, not a government procurement notice`}</p>
        </section>
        <section className={panel}>
          <h2 className={sectionTitle}>{th ? 'ทักษะและเทคโนโลยีที่ต้องใช้' : 'Required skills & technology'}</h2>
          <div className="flex flex-wrap gap-1.5">{tor.tags.map(tag => <span key={tag} className="ui-chip ui-chip-brand h-7 px-2.5 text-[13px]">{tag}</span>)}</div>
        </section>
        <PriceComparison analysis={project.priceAnalysis} budget={project.budget} flag={project.priceFlag} lang={lang} />
      </div>
      <aside className="space-y-5 lg:sticky lg:top-24">
        {isOwner && <Link href={`/postings/${project._id}/edit`} className="ui-btn ui-btn-secondary w-full"><RiEditLine size={16} />{th ? 'แก้ไขประกาศนี้' : 'Edit this posting'}</Link>}
        <MatchPanel projectId={project._id} lang={lang} />
        <section className={panel}>
          <p className={`ui-badge ui-badge-dot ${open ? 'ui-badge-ok' : 'ui-badge-warn'}`}>{open ? (th ? 'เปิดรับสมัคร' : 'Accepting applications') : (th ? 'ปิดรับสมัครแล้ว' : 'No longer accepting applications')}</p>
          <div className="space-y-1">
            <h2 className="ui-meta font-medium">{th ? 'ปิดรับสมัคร' : 'Application deadline'}</h2>
            <p className="text-xl font-semibold tracking-tight tabular-nums text-ink">{tor.deadline}</p>
          </div>
          <SubmissionStatus project={project} lang={lang} />
          <p className="ui-meta">{th ? 'เวลาไทย (GMT+7)' : 'Thailand time (GMT+7)'}</p>
        </section>
        <section className={panel}>
          <h2 className={sectionTitle}>{th ? 'ติดต่อผู้ประกาศ' : 'Contact the publisher'}</h2>
          <p className="text-sm text-ink-3">{th ? 'สอบถามรายละเอียดหรือส่งใบเสนอราคากับผู้ประกาศโดยตรง' : 'Ask questions or send your proposal directly to the publisher.'}</p>
          {contact.name && <p className="text-sm font-medium text-ink">{contact.name}</p>}
          <div className="space-y-2">
            {contact.email && <a href={`mailto:${contact.email}?subject=${subject}`} className="ui-btn ui-btn-primary h-auto min-h-10 w-full whitespace-normal break-all py-2"><RiMailLine size={16} className="shrink-0" />{contact.email}</a>}
            {contact.phone && <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className="ui-btn ui-btn-secondary w-full"><RiPhoneLine size={16} />{contact.phone}</a>}
            {link && <a href={link} target="_blank" rel="noopener noreferrer nofollow" className="ui-btn ui-btn-ghost w-full">{th ? 'รายละเอียดเพิ่มเติม' : 'More details'}<RiExternalLinkLine size={14} /></a>}
          </div>
          <p className="ui-meta">{th ? 'TORmax ไม่ได้ส่งใบสมัครหรือข้อเสนอแทนคุณ' : 'TORmax does not send applications or proposals on your behalf.'}</p>
        </section>
      </aside>
    </main>
  </div>;
}
