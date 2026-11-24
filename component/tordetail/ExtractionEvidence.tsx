import { RiArrowRightSLine } from '@remixicon/react';
import { Project, safeSourceUrl, documentHref } from '@/lib/projects';
import { panel, sectionTitle } from '@/component/ui';

const statusTone: Record<string, string> = {
  completed: 'ui-badge-ok',
  failed: 'ui-badge-danger',
  needs_review: 'ui-badge-warn',
  awaiting_documents: 'ui-badge-warn',
  processing: 'ui-badge-brand',
};

export function ExtractionEvidence({ project, lang }: { project: Project; lang: 'th' | 'en' }) {
  const th = lang === 'th';
  const labels = { budget: th ? 'งบประมาณ' : 'Budget', referencePrice: th ? 'ราคากลาง' : 'Reference price', announcedAt: th ? 'วันที่เผยแพร่ประกาศ' : 'Announcement publication date', deadline: th ? 'กำหนดปิดรับข้อเสนอ' : 'Bid submission deadline' };
  const states: Record<string, string> = th
    ? { pending: 'รอ AI สกัดข้อมูล', processing: 'AI กำลังวิเคราะห์เอกสาร', completed: 'วิเคราะห์เอกสารแล้ว', failed: 'วิเคราะห์ไม่สำเร็จ — ต้องลองใหม่', awaiting_documents: 'ต้องการเอกสาร TOR เพิ่มเติม', needs_review: 'ข้อมูลบางส่วนต้องตรวจสอบ', retry_pending: 'รอลองวิเคราะห์ใหม่อัตโนมัติ' }
    : { pending: 'Pending AI extraction', processing: 'AI is analyzing documents', completed: 'Documents analyzed', failed: 'Analysis failed — retry needed', awaiting_documents: 'Additional TOR documents needed', needs_review: 'Some fields need review', retry_pending: 'Automatic retry pending' };
  const status = project.analysisStatus || 'pending';
  // FR-05: drafts wait for the official invitation; that is expected, not a failure.
  const draft = project.availability === 'draft';
  const label = draft ? (th ? 'รอประกาศเชิญชวนก่อนวิเคราะห์' : 'Analysed once officially announced')
    : status === 'skipped' ? (th ? 'ข้ามการวิเคราะห์อัตโนมัติ' : 'Automatic analysis skipped') : states[status] || states.pending;
  return <section className={panel}>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className={sectionTitle}>{th ? 'สถานะการวิเคราะห์' : 'Extraction status'}</h2>
      <p role="status" className={`ui-badge ui-badge-dot ${draft ? 'ui-badge-brand' : statusTone[status] || 'ui-badge-neutral'}`}>{label}</p>
    </div>
    {project.aiAnalysis?.fieldResults && <details className="ui-disclosure border-t border-line pt-4">
      <summary><RiArrowRightSLine size={16} className="ui-chevron text-ink-3" />{th ? 'หลักฐานงบประมาณ ราคากลาง และวันที่' : 'Budget, reference price and date evidence'}</summary>
      <dl className="ui-reveal mt-4 space-y-5 text-sm">{(Object.keys(labels) as Array<keyof typeof labels>).map(key => {
        const field = project.aiAnalysis?.fieldResults?.[key];
        if (!field) return null;
        const evidence = field.evidence;
        const cited = evidence && safeSourceUrl(project.aiAnalysis?.documentUrls?.[evidence.documentIndex - 1]);
        // Open the cited PDF itself (not the whole ZIP) when it is one of the stored documents.
        const stored = cited ? (project.documents || []).findIndex(document => safeSourceUrl(document.url) === cited) : -1;
        const url = cited && (stored >= 0 ? documentHref(project, stored) : cited.split('#')[0]);
        return <div key={key}><dt className="font-medium text-ink">{labels[key]}</dt><dd className="mt-1 space-y-1.5 text-ink-2">
          {field.reason && <p>{field.reason}</p>}
          {evidence && <><blockquote className="whitespace-pre-line border-l-2 border-brand-soft/50 pl-3.5 text-ink-3">{evidence.quote}</blockquote><p className="ui-meta">{th ? 'เอกสาร' : 'Document'} {evidence.documentIndex} · {th ? 'หน้า' : 'Page'} {evidence.page}{url && <> · <a className="ui-link" href={`${url}#page=${evidence.page}`} target="_blank" rel="noopener noreferrer">{th ? 'เปิดต้นฉบับ' : 'Open original'}</a></>}</p></>}
        </dd></div>;
      })}</dl>
    </details>}
  </section>;
}
