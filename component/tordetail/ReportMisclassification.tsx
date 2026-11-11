'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RiFlagLine } from '@remixicon/react';
import { useAuth } from '@/context/AuthContext';
import { panel, sectionTitle } from '@/component/ui';
import { reportMisclassification, ReportReason } from '@/lib/reports';
import { SignedOutError } from '@/lib/matches';

const REASONS: Array<[ReportReason, string, string]> = [
  ['not-it', 'ไม่ใช่งานซอฟต์แวร์/IT', 'Not a software/IT project'],
  ['wrong-category', 'หมวดหมู่หรือการเทียบงบประมาณไม่ถูกต้อง', 'Wrong category or budget comparison'],
  ['other', 'อื่น ๆ (โปรดระบุ)', 'Something else (please explain)'],
];

// Open Issue 2: AI classification can mislabel hybrid tenders; users flag them for admin review.
export function ReportMisclassification({ projectId, lang }: { projectId: string; lang: 'th' | 'en' }) {
  const th = lang === 'th';
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason>();
  const [note, setNote] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  if (state === 'sent') return <section className={panel} role="status">
    <p className="text-sm font-medium text-ink">{th ? 'ขอบคุณ ส่งรายงานถึงผู้ดูแลแล้ว' : 'Thanks — your report was sent to the admins.'}</p>
    <p className="ui-meta">{th ? 'หากส่งซ้ำ ระบบจะแทนที่รายงานเดิมของคุณ' : 'Reporting again replaces your earlier report.'}</p>
  </section>;

  if (!open) return <button type="button" onClick={() => setOpen(true)} className="ui-btn ui-btn-ghost ui-btn-sm w-full justify-center">
    <RiFlagLine className="h-4 w-4" aria-hidden />{th ? 'รายงานการจัดประเภทผิด' : 'Report misclassification'}
  </button>;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!reason) { setError(th ? 'เลือกเหตุผล' : 'Choose a reason'); return; }
    if (reason === 'other' && !note.trim()) { setError(th ? 'โปรดอธิบายปัญหา' : 'Please describe the problem'); return; }
    setState('sending');
    setError('');
    try {
      await reportMisclassification(projectId, reason, note.trim());
      setState('sent');
    } catch (err) {
      setState('idle');
      setError(err instanceof SignedOutError ? (th ? 'กรุณาเข้าสู่ระบบอีกครั้ง' : 'Please sign in again.') : err instanceof Error ? err.message : (th ? 'ส่งไม่สำเร็จ' : 'Could not send.'));
    }
  }

  return <section className={panel}>
    <h2 className={sectionTitle}>{th ? 'รายงานการจัดประเภทผิด' : 'Report misclassification'}</h2>
    {!user ? <>
      <p className="text-sm text-ink-2">{th ? 'เข้าสู่ระบบเพื่อรายงาน TOR ที่จัดประเภทผิด' : 'Sign in to report a misclassified TOR.'}</p>
      <Link href="/login" className="ui-link text-sm">{th ? 'เข้าสู่ระบบ' : 'Sign in'}</Link>
    </> : <form onSubmit={submit} className="space-y-3" noValidate>
      <fieldset className="space-y-2">
        <legend className="ui-label mb-1">{th ? 'ปัญหาคืออะไร' : 'What is wrong?'}</legend>
        {REASONS.map(([value, thLabel, enLabel]) => <label key={value} className="flex items-start gap-2 text-sm text-ink-2 cursor-pointer">
          <input type="radio" name="reason" value={value} checked={reason === value} onChange={() => { setReason(value); setError(''); }} className="mt-1" />
          <span>{th ? thLabel : enLabel}</span>
        </label>)}
      </fieldset>
      <label className="block space-y-1.5">
        <span className="ui-label">{th ? 'รายละเอียด' : 'Details'}{reason === 'other' ? ' *' : (th ? ' (ไม่บังคับ)' : ' (optional)')}</span>
        <textarea value={note} onChange={e => { setNote(e.target.value); setError(''); }} maxLength={500} rows={3}
          className="ui-field h-auto py-2 leading-6" placeholder={th ? 'เช่น เป็นการจัดซื้อเครื่องแบบ ไม่ใช่ระบบ' : 'e.g. this is a uniform purchase, not a system'} />
      </label>
      {error && <p role="alert" className="ui-error-text">{error}</p>}
      <div className="flex justify-end gap-2">
        <button type="button" onClick={() => { setOpen(false); setError(''); }} className="ui-btn ui-btn-secondary ui-btn-sm">{th ? 'ยกเลิก' : 'Cancel'}</button>
        <button type="submit" disabled={state === 'sending'} className="ui-btn ui-btn-primary ui-btn-sm">{state === 'sending' ? (th ? 'กำลังส่ง…' : 'Sending…') : (th ? 'ส่งรายงาน' : 'Send report')}</button>
      </div>
    </form>}
  </section>;
}
