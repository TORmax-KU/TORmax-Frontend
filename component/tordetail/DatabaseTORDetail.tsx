'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { API_BASE_URL } from '@/lib/auth';
import { Project, projectCard, formatProcurementDate, safeSourceUrl, pendingExtraction } from '@/lib/projects';
import { torpagei18n } from '@/public/mockData/i18n/torpage';
import { TORHeader } from './TORHeader';
import { SubmissionStatus } from '@/component/SubmissionStatus';
import { ExtractionEvidence } from './ExtractionEvidence';

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
  if (result?.key !== key) return <p role="status" className="p-10 text-center">{th ? 'กำลังโหลด TOR...' : 'Loading TOR...'}</p>;
  if (!result.project) return <div role="alert" className="p-10 text-center space-y-4"><p>{result.error === 404 ? t.notFound : th ? 'โหลด TOR ไม่สำเร็จ' : 'Could not load TOR.'}</p><button className="underline mr-4" onClick={() => setRetry(value => value + 1)}>{th ? 'ลองอีกครั้ง' : 'Retry'}</button><Link className="underline" href="/search-feed">{t.backToDirectory}</Link></div>;
  const project = result.project;
  const tor = projectCard(project, activeLang);
  const sourceUrl = safeSourceUrl(project.sourceUrl);
  const documents = (project.documents || []).filter(document => safeSourceUrl(document.url));
  const unknown = th ? 'ไม่ระบุในข้อมูลต้นทาง' : 'Not provided by source';
  const pending = pendingExtraction(activeLang);
  const panel = 'rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4';
  const sectionTitle = 'text-lg font-bold text-slate-900 dark:text-white';
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
  const list = (items: string[] | undefined) => items?.length ? <ul className="list-disc pl-5 space-y-2 text-sm leading-7">{items.map((item, index) => <li key={index}>{item}</li>)}</ul> : <p className="text-sm text-slate-500">{unknown}</p>;
  return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
    <TORHeader {...tor} id={tor.displayId} backToDirectory={t.backToDirectory} />
    <main className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 space-y-6">
        <ExtractionEvidence project={project} lang={activeLang} />
        <section className={panel}><h2 className={sectionTitle}>{th ? 'ข้อมูลการจัดซื้อจัดจ้าง' : 'Procurement details'}</h2><dl className="grid sm:grid-cols-2 gap-5">{fields.map(([label, value]) => <div key={label}><dt className="text-xs text-slate-500 mb-1">{label}</dt><dd className="text-sm font-semibold break-words">{value}</dd></div>)}</dl></section>
        <section className={panel}>
          <h2 className={sectionTitle}>{th ? 'สรุป TOR' : 'TOR summary'}</h2>
          <p className="whitespace-pre-line text-sm leading-7">{project.descriptions || (project.analyzedAt ? (th ? 'เอกสารที่มีไม่เพียงพอสำหรับสรุปขอบเขต TOR' : 'Available documents do not contain enough TOR scope to summarize.') : pending)}</p>
          {project.descriptions && <p className="text-xs text-slate-500">{th ? 'สรุปโดย AI — ตรวจสอบกับ TOR ต้นฉบับ' : 'AI-generated summary — verify against the original TOR'}</p>}
        </section>
        <section className={panel}><h2 className={sectionTitle}>{th ? 'ขอบเขตและรายละเอียดงาน' : 'Scope of work'}</h2><p className="whitespace-pre-line text-sm leading-7">{project.description || unknown}</p></section>
        <section className={panel}><h2 className={sectionTitle}>{th ? 'กำหนดการจัดซื้อจัดจ้าง' : 'Procurement timeline'}</h2><p className="text-xs text-slate-500">{th ? 'เวลาไทย (GMT+7) • วันที่แต่ละประเภทมีความหมายต่างกัน' : 'Thailand time (GMT+7) • Each deadline applies to a different step'}</p><dl className="space-y-4">{milestones.map(([label, value]) => <div key={label} className="border-l-2 border-slate-200 dark:border-slate-700 pl-4"><dt className="text-xs text-slate-500">{label}</dt><dd className="text-sm font-semibold mt-1">{value}</dd></div>)}</dl><div className="rounded-xl bg-violet-50 dark:bg-violet-950/30 p-4"><p className="text-sm font-bold">{th ? 'ปิดรับข้อเสนอ / สิ้นสุดการยื่น' : 'Final submission deadline'}</p><p className="text-lg font-bold mt-1">{tor.deadline}</p></div></section>
        <section className={panel}><h2 className={sectionTitle}>{th ? 'คุณสมบัติผู้ยื่นข้อเสนอ' : 'Bidder qualifications'}</h2>{list(project.qualifications)}</section>
        <section className={panel}><h2 className={sectionTitle}>{th ? 'งานที่ต้องส่งมอบ' : 'Required deliverables'}</h2>{list(project.deliverables)}</section>
        <section className={panel}><h2 className={sectionTitle}>{th ? 'ทักษะและเทคโนโลยีที่ต้องใช้' : 'Required skills & technology'}</h2>{tor.tags.length ? <div className="flex flex-wrap gap-2">{tor.tags.map(tag => <span key={tag} className="rounded-lg bg-violet-50 text-violet-900 dark:bg-violet-950 dark:text-violet-200 px-3 py-2 text-sm">{tag}</span>)}</div> : <p className="text-sm text-slate-500">{project.aiAnalysis?.noMandatorySkillsReason || pending}</p>}{!!project.aiAnalysis?.skillEvidence?.length && <details><summary className="text-sm cursor-pointer">{th ? 'หลักฐานที่ AI อ่านได้จาก TOR — ควรตรวจสอบต้นฉบับ' : 'AI-extracted TOR evidence — check the original'}</summary><ul className="space-y-3 mt-3">{project.aiAnalysis.skillEvidence.map((evidence, index) => <li key={index} className="text-sm border-l-2 border-violet-300 pl-3"><p className="font-semibold">{evidence.name} {evidence.page ? `(${th ? 'หน้า' : 'page'} ${evidence.page})` : ''}</p><p className="text-slate-500">{evidence.quote}</p></li>)}</ul></details>}</section>
      </div>
      <aside className="space-y-6 lg:sticky lg:top-6">
        <section className={`${panel} border-t-4 ${tor.availability === 'open' ? 'border-t-emerald-500' : 'border-t-amber-500'}`}><p className={`text-sm font-bold ${tor.availability === 'open' ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>{tor.availabilityLabel}</p><h2 className={sectionTitle}>{th ? 'วันปิดรับข้อเสนอ' : 'Submission deadline'}</h2><p className="text-xl font-bold">{tor.deadline}</p><SubmissionStatus project={project} lang={activeLang} />{project.deadlinePrecision === 'datetime' && <p className="text-xs text-slate-500">{th ? 'เวลาไทย (GMT+7)' : 'Thailand time (GMT+7)'}</p>}{!project.deadline && <p className="text-sm text-amber-700 dark:text-amber-300">{th ? 'ยังยืนยันไม่ได้ว่ายื่นได้ กรุณาติดต่อหน่วยงาน ไม่ควรถือว่าเปิดรับไม่จำกัดเวลา' : 'Submission availability is unconfirmed. Contact the agency; this is not an unlimited submission period.'}</p>}{tor.availability !== 'open' && project.deadline && <p className="text-sm">{th ? 'รายการนี้ไม่อยู่ในงานที่ยืนยันวันเปิดรับล่าสุดแล้ว กรุณาตรวจสอบประกาศต้นทาง' : 'This listing is not currently verified as open. Check the source announcement.'}</p>}</section>
        <section className={panel}><h2 className={sectionTitle}>{th ? 'เอกสารต้นฉบับ' : 'Original documents'}</h2>{documents.length ? <ul className="space-y-3">{documents.map((document, index) => <li key={index}><a href={document.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-violet-200 dark:border-violet-800 p-3 text-sm font-semibold text-tormax-purple dark:text-tormax-lavender hover:bg-violet-50 dark:hover:bg-violet-950">{document.kind === 'tor' ? 'TOR · ' : ''}{document.title || (th ? 'เปิดเอกสาร' : 'Open document')} ↗</a><p className="text-xs text-slate-500 mt-1">{th ? 'ตรวจลิงก์ล่าสุด: ' : 'Link last checked: '}{date(document.verifiedAt)}</p></li>)}</ul> : <p className="text-sm text-slate-500">{th ? 'ยังไม่มีลิงก์เอกสาร TOR ที่ตรวจสอบแล้ว' : 'No verified TOR document link is available.'}</p>}{sourceUrl && <a className="block text-center px-4 py-3 bg-tormax-purple text-white rounded-xl text-sm font-bold" href={sourceUrl} target="_blank" rel="noopener noreferrer">{th ? 'เปิดประกาศบนเว็บไซต์ต้นทาง ↗' : 'Open source announcement ↗'}</a>}<p className="text-xs text-slate-500">{th ? 'การยื่นข้อเสนอทำผ่านช่องทางที่หน่วยงานกำหนด' : 'Submit using the channel specified by the procuring agency.'}</p></section>
        <section className={panel}><h2 className={sectionTitle}>{th ? 'ติดต่อและการยื่นข้อเสนอ' : 'Contact & submission'}</h2><dl className="space-y-3 text-sm">{[[th ? 'ผู้ติดต่อ' : 'Contact', project.contact?.name], [th ? 'โทรศัพท์' : 'Phone', project.contact?.phone], [th ? 'อีเมล' : 'Email', project.contact?.email], [th ? 'ที่อยู่หน่วยงาน' : 'Address', project.contact?.address], [th ? 'ช่องทาง / สถานที่ยื่น' : 'Submission channel / location', project.submissionLocation]].map(([label, value]) => <div key={label}><dt className="text-xs text-slate-500 mb-1">{label}</dt><dd className="break-words">{value || unknown}</dd></div>)}</dl></section>
        <p className="text-xs text-slate-500 px-2">{th ? 'ตรวจข้อมูลต้นทางล่าสุด: ' : 'Source last verified: '}{date(project.sourceVerifiedAt)}</p>
      </aside>
    </main>
  </div>;
}
