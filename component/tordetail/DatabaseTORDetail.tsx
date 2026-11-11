'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RiArrowRightSLine, RiExternalLinkLine, RiFileTextLine } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { API_BASE_URL } from '@/lib/auth';
import { DIRECT_SOURCE, Project, projectCard, formatProcurementDate, safeSourceUrl, pendingExtraction } from '@/lib/projects';
import { torpagei18n } from '@/public/mockData/i18n/torpage';
import { TORHeader } from './TORHeader';
import { SubmissionStatus } from '@/component/SubmissionStatus';
import { ExtractionEvidence } from './ExtractionEvidence';
import { MatchPanel } from './MatchPanel';
import { ReportMisclassification } from './ReportMisclassification';
import { PriceComparison } from './PriceComparison';
import { DirectPostingDetail } from './DirectPostingDetail';
import { availabilityTone, detailLayout, panel, sectionTitle } from '@/component/ui';

export function DatabaseTORDetail({ id }: { id: string }) {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';
  const t = torpagei18n[activeLang];
  const [retry, setRetry] = useState(0);
  const [result, setResult] = useState<{ key: string; project?: Project; error?: number }>();
  const key = id;
  useEffect(() => {
    const timer = setInterval(() => setRetry(value => value + 1), 60000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects/${encodeURIComponent(id)}`, { signal: controller.signal });
        if (!response.ok) { if (!controller.signal.aborted) setResult({ key, error: response.status }); return; }
        const project: Project = await response.json();
        if (!controller.signal.aborted) setResult({ key, project });
      } catch { if (!controller.signal.aborted) setResult({ key, error: 500 }); }
    }
    void load();
    return () => controller.abort();
  }, [id, key, retry]);
  if (result?.key !== key) return <p role="status" className="flex items-center justify-center gap-2.5 p-16 text-sm text-ink-3"><span className="ui-spinner text-brand-soft" aria-hidden />{th ? 'กำลังโหลด TOR...' : 'Loading TOR...'}</p>;
  if (!result.project) return <div className="ui-page"><div role="alert" className="ui-empty"><p className="font-medium text-ink">{result.error === 404 ? t.notFound : th ? 'โหลด TOR ไม่สำเร็จ' : 'Could not load TOR.'}</p><div className="mt-2 flex flex-wrap justify-center gap-2"><button className="ui-btn ui-btn-secondary ui-btn-sm" onClick={() => setRetry(value => value + 1)}>{th ? 'ลองอีกครั้ง' : 'Retry'}</button><Link className="ui-btn ui-btn-ghost ui-btn-sm" href="/search-feed">{t.backToDirectory}</Link></div></div></div>;
  const project = result.project;
  if (project.source === DIRECT_SOURCE) return <DirectPostingDetail project={project} lang={activeLang} backToDirectory={t.backToDirectory} />;
  const tor = projectCard(project, activeLang);
  const sourceUrl = safeSourceUrl(project.sourceUrl);
  const documents = (project.documents || []).filter(document => safeSourceUrl(document.url));
  const unknown = th ? 'ไม่ระบุในข้อมูลต้นทาง' : 'Not provided by source';
  const pending = pendingExtraction(activeLang);
  const money = (value?: number) => value == null ? unknown : new Intl.NumberFormat(th ? 'th-TH' : 'en-US', { style: 'currency', currency: 'THB' }).format(value);
  const date = (value?: string) => formatProcurementDate(value, activeLang);
  const fields = [
    [th ? 'เลขที่โครงการ' : 'Project number', project.externalId || unknown],
    [th ? 'หน่วยงานผู้จัดซื้อ' : 'Procuring agency', project.agency || unknown],
    [th ? 'วิธีจัดซื้อจัดจ้าง' : 'Procurement method', project.procurementMethod || unknown],
    [th ? 'งบประมาณ' : 'Budget', tor.price],
    [th ? 'ราคากลาง' : 'Reference price', money(project.referencePrice)],
    [th ? 'สถานะตามต้นทาง' : 'Source status', project.sourceStatus || unknown],
  ];
  const milestones = [
    [th ? 'วันที่เผยแพร่ประกาศ' : 'Announcement publication date', tor.published],
    [th ? 'วันที่เริ่มจัดจ้าง' : 'Procurement start', date(project.procurementStartAt)],
    [th ? 'เริ่มยื่นข้อเสนอ' : 'Submission opens', date(project.submissionStartAt)],
    [th ? 'สิ้นสุดซื้อ/รับเอกสาร' : 'Document purchase / collection closes', date(project.documentSaleEndAt)],
  ];
  const list = (items: string[] | undefined) => items?.length ? <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-ink-2 marker:text-brand-soft">{items.map((item, index) => <li key={index} className="pl-1">{item}</li>)}</ul> : <p className="text-sm text-ink-3">{unknown}</p>;
  return <div className="min-h-screen pb-16">
    <TORHeader {...tor} id={tor.displayId} backToDirectory={t.backToDirectory} />
    <main className={detailLayout}>
      <div className="min-w-0 space-y-5">
        <ExtractionEvidence project={project} lang={activeLang} />
        <section className={panel}><h2 className={sectionTitle}>{th ? 'ข้อมูลการจัดซื้อจัดจ้าง' : 'Procurement details'}</h2><dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">{fields.map(([label, value]) => <div key={label} className="min-w-0"><dt className="ui-meta mb-0.5">{label}</dt><dd className="text-sm font-medium break-words text-ink">{value}</dd></div>)}</dl></section>
        <PriceComparison analysis={project.priceAnalysis} budget={project.budget} flag={project.priceFlag} lang={activeLang} />
        <section className={panel}>
          <h2 className={sectionTitle}>{th ? 'สรุป TOR' : 'TOR summary'}</h2>
          <p className="whitespace-pre-line text-[15px] leading-7 text-ink-2">{project.descriptions || (project.analyzedAt ? (th ? 'เอกสารที่มีไม่เพียงพอสำหรับสรุปขอบเขต TOR' : 'Available documents do not contain enough TOR scope to summarize.') : pending)}</p>
          {project.descriptions && <p className="ui-meta">{th ? 'สรุปโดย AI — ตรวจสอบกับ TOR ต้นฉบับ' : 'AI-generated summary — verify against the original TOR'}</p>}
        </section>
        <section className={panel}><h2 className={sectionTitle}>{th ? 'ขอบเขตและรายละเอียดงาน' : 'Scope of work'}</h2><p className="whitespace-pre-line text-sm leading-7 text-ink-2">{project.description || unknown}</p></section>
        <section className={panel}>
          <h2 className={sectionTitle}>{th ? 'กำหนดการจัดซื้อจัดจ้าง' : 'Procurement timeline'}</h2>
          <p className="ui-meta">{th ? 'เวลาไทย (GMT+7) • วันที่แต่ละประเภทมีความหมายต่างกัน' : 'Thailand time (GMT+7) • Each deadline applies to a different step'}</p>
          <dl className="relative space-y-5 pl-6 before:absolute before:bottom-2 before:left-[3px] before:top-2 before:w-px before:bg-line-strong">{milestones.map(([label, value]) => <div key={label} className="relative"><span aria-hidden className="absolute -left-6 top-1.5 h-[7px] w-[7px] rounded-full border border-line-strong bg-surface" /><dt className="ui-meta">{label}</dt><dd className="mt-0.5 text-sm font-medium text-ink">{value}</dd></div>)}</dl>
          <div className="rounded-control bg-brand-tint p-4"><p className="text-[13px] font-medium text-accent">{th ? 'ปิดรับข้อเสนอ / สิ้นสุดการยื่น' : 'Final submission deadline'}</p><p className="mt-1 text-lg font-semibold tabular-nums text-ink">{tor.deadline}</p></div>
        </section>
        <section className={panel}><h2 className={sectionTitle}>{th ? 'คุณสมบัติผู้ยื่นข้อเสนอ' : 'Bidder qualifications'}</h2>{list(project.qualifications)}</section>
        <section className={panel}><h2 className={sectionTitle}>{th ? 'งานที่ต้องส่งมอบ' : 'Required deliverables'}</h2>{list(project.deliverables)}</section>
        <section className={panel}><h2 className={sectionTitle}>{th ? 'ทักษะและเทคโนโลยีที่ต้องใช้' : 'Required skills & technology'}</h2>{tor.tags.length ? <div className="flex flex-wrap gap-1.5">{tor.tags.map(tag => <span key={tag} className="ui-chip ui-chip-brand h-7 px-2.5 text-[13px]">{tag}</span>)}</div> : <p className="text-sm text-ink-3">{project.aiAnalysis?.noMandatorySkillsReason || pending}</p>}{!!project.aiAnalysis?.skillEvidence?.length && <details className="ui-disclosure border-t border-line pt-4"><summary><RiArrowRightSLine size={16} className="ui-chevron text-ink-3" />{th ? 'หลักฐานที่ AI อ่านได้จาก TOR — ควรตรวจสอบต้นฉบับ' : 'AI-extracted TOR evidence — check the original'}</summary><ul className="ui-reveal mt-4 space-y-4">{project.aiAnalysis.skillEvidence.map((evidence, index) => <li key={index} className="border-l-2 border-brand-soft/50 pl-3.5 text-sm"><p className="font-medium text-ink">{evidence.name} {evidence.page ? <span className="font-normal text-ink-3">({th ? 'หน้า' : 'page'} {evidence.page})</span> : ''}</p><p className="mt-0.5 text-ink-3">{evidence.quote}</p></li>)}</ul></details>}</section>
      </div>
      <aside className="space-y-5 lg:sticky lg:top-24">
        <MatchPanel projectId={project._id} lang={activeLang} />
        <section className={panel}><p className={`ui-badge ui-badge-dot ${availabilityTone(tor.availability)}`}>{tor.availabilityLabel}</p><div className="space-y-1"><h2 className="ui-meta font-medium">{th ? 'วันปิดรับข้อเสนอ' : 'Submission deadline'}</h2><p className="text-xl font-semibold tracking-tight tabular-nums text-ink">{tor.deadline}</p></div><SubmissionStatus project={project} lang={activeLang} />{project.deadlinePrecision === 'datetime' && <p className="ui-meta">{th ? 'เวลาไทย (GMT+7)' : 'Thailand time (GMT+7)'}</p>}{tor.availability === 'draft' && <p className="text-sm text-accent">{th ? 'ร่าง TOR นี้เผยแพร่เพื่อรับฟังความคิดเห็น ยังไม่เปิดให้ยื่นข้อเสนอ ส่งความเห็นได้ตามช่องทางที่หน่วยงานกำหนด' : 'This draft TOR is published for public comment. Bidding is not open yet; send comments through the channel the agency specifies.'}</p>}{!project.deadline && tor.availability !== 'draft' && <p className="text-sm text-warn">{th ? 'ยังยืนยันไม่ได้ว่ายื่นได้ กรุณาติดต่อหน่วยงาน ไม่ควรถือว่าเปิดรับไม่จำกัดเวลา' : 'Submission availability is unconfirmed. Contact the agency; this is not an unlimited submission period.'}</p>}{!['open', 'draft'].includes(tor.availability) && project.deadline && <p className="text-sm text-ink-2">{th ? 'รายการนี้ไม่อยู่ในงานที่ยืนยันวันเปิดรับล่าสุดแล้ว กรุณาตรวจสอบประกาศต้นทาง' : 'This listing is not currently verified as open. Check the source announcement.'}</p>}</section>
        <section className={panel}><h2 className={sectionTitle}>{th ? 'เอกสารต้นฉบับ' : 'Original documents'}</h2>{documents.length ? <ul className="space-y-2">{documents.map((document, index) => <li key={index}><a href={document.url} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 rounded-control border border-line p-3 transition-colors duration-150 hover:border-line-strong hover:bg-surface-2"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-accent"><RiFileTextLine size={16} /></span><span className="min-w-0 flex-1"><span className="block text-[13px] font-medium leading-snug text-ink group-hover:text-accent">{document.kind === 'tor' ? 'TOR · ' : ''}{document.title || (th ? 'เปิดเอกสาร' : 'Open document')}</span><span className="ui-meta mt-1 block">{th ? 'ตรวจลิงก์ล่าสุด: ' : 'Link last checked: '}{date(document.verifiedAt)}</span></span><RiExternalLinkLine size={14} className="mt-0.5 shrink-0 text-ink-4 group-hover:text-accent" /></a></li>)}</ul> : <p className="text-sm text-ink-3">{th ? 'ยังไม่มีลิงก์เอกสาร TOR ที่ตรวจสอบแล้ว' : 'No verified TOR document link is available.'}</p>}{sourceUrl && <a className="ui-btn ui-btn-primary w-full" href={sourceUrl} target="_blank" rel="noopener noreferrer">{th ? 'เปิดประกาศบนเว็บไซต์ต้นทาง' : 'Open source announcement'}<RiExternalLinkLine size={16} /></a>}<p className="ui-meta">{th ? 'การยื่นข้อเสนอทำผ่านช่องทางที่หน่วยงานกำหนด' : 'Submit using the channel specified by the procuring agency.'}</p></section>
        <section className={panel}><h2 className={sectionTitle}>{th ? 'ติดต่อและการยื่นข้อเสนอ' : 'Contact & submission'}</h2><dl className="space-y-3.5 text-sm">{[[th ? 'ผู้ติดต่อ' : 'Contact', project.contact?.name], [th ? 'โทรศัพท์' : 'Phone', project.contact?.phone], [th ? 'อีเมล' : 'Email', project.contact?.email], [th ? 'ที่อยู่หน่วยงาน' : 'Address', project.contact?.address], [th ? 'ช่องทาง / สถานที่ยื่น' : 'Submission channel / location', project.submissionLocation]].map(([label, value]) => <div key={label}><dt className="ui-meta mb-0.5">{label}</dt><dd className={`break-words ${value ? 'text-ink' : 'text-ink-3'}`}>{value || unknown}</dd></div>)}</dl></section>
        <p className="ui-meta px-1">{th ? 'ตรวจข้อมูลต้นทางล่าสุด: ' : 'Source last verified: '}{date(project.sourceVerifiedAt)}</p>
        <ReportMisclassification projectId={project._id} lang={activeLang} />
      </aside>
    </main>
  </div>;
}
