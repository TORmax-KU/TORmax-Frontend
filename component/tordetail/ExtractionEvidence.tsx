import { Project, safeSourceUrl } from '@/lib/projects';

export function ExtractionEvidence({ project, lang }: { project: Project; lang: 'th' | 'en' }) {
  const th = lang === 'th';
  const labels = { budget: th ? 'งบประมาณ' : 'Budget', announcedAt: th ? 'วันที่เผยแพร่ประกาศ' : 'Announcement publication date', deadline: th ? 'กำหนดปิดรับข้อเสนอ' : 'Bid submission deadline' };
  const states: Record<string, string> = th
    ? { pending: 'รอ AI สกัดข้อมูล', processing: 'AI กำลังวิเคราะห์เอกสาร', completed: 'วิเคราะห์เอกสารแล้ว', failed: 'วิเคราะห์ไม่สำเร็จ — ต้องลองใหม่', awaiting_documents: 'ต้องการเอกสาร TOR เพิ่มเติม', needs_review: 'ข้อมูลบางส่วนต้องตรวจสอบ', retry_pending: 'รอลองวิเคราะห์ใหม่อัตโนมัติ' }
    : { pending: 'Pending AI extraction', processing: 'AI is analyzing documents', completed: 'Documents analyzed', failed: 'Analysis failed — retry needed', awaiting_documents: 'Additional TOR documents needed', needs_review: 'Some fields need review', retry_pending: 'Automatic retry pending' };
  return <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3">
    <h2 className="font-bold">{th ? 'สถานะการวิเคราะห์' : 'Extraction status'}</h2>
    <p role="status" className="text-sm">{states[project.analysisStatus || 'pending'] || states.pending}</p>
    {project.aiAnalysis?.fieldResults && <details>
      <summary className="text-sm cursor-pointer">{th ? 'หลักฐานงบประมาณและวันที่' : 'Budget and date evidence'}</summary>
      <dl className="space-y-4 mt-4 text-sm">{(Object.keys(labels) as Array<keyof typeof labels>).map(key => {
        const field = project.aiAnalysis?.fieldResults?.[key];
        if (!field) return null;
        const evidence = field.evidence;
        const url = evidence && safeSourceUrl(project.aiAnalysis?.documentUrls?.[evidence.documentIndex - 1]);
        return <div key={key}><dt className="font-semibold">{labels[key]}</dt><dd className="space-y-1 mt-1">
          {field.reason && <p>{field.reason}</p>}
          {evidence && <><blockquote className="border-l-2 border-violet-300 pl-3 whitespace-pre-line">{evidence.quote}</blockquote><p className="text-xs text-slate-500">{th ? 'เอกสาร' : 'Document'} {evidence.documentIndex} · {th ? 'หน้า' : 'Page'} {evidence.page}{url && <> · <a className="underline" href={`${url.split('#')[0]}#page=${evidence.page}`} target="_blank" rel="noopener noreferrer">{th ? 'เปิดต้นฉบับ' : 'Open original'}</a></>}</p></>}
        </dd></div>;
      })}</dl>
    </details>}
  </section>;
}
