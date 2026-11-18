'use client';

import { useState } from 'react';
import { RemovalResult, removePost } from '@/lib/admin';
import { ConfirmDialog, errorMessage, Lang } from './shared';

export interface RemovalTarget { id: string; title: string; publisherEmail?: string; publisherIsAdmin?: boolean }

// FR-14 / UC5: the admin confirms, gives a reason, and the backend removes the posting and
// disables the publisher. The confirmation text is the one Use Case 5 specifies.
export function RemovePostDialog({ target, lang, onClose, onRemoved }: { target: RemovalTarget; lang: Lang; onClose: () => void; onRemoved: (result: RemovalResult) => void }) {
  const th = lang === 'th';
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function confirm() {
    if (!reason.trim()) { setError(th ? 'ระบุเหตุผลในการลบประกาศ' : 'Give a reason for removing this posting.'); return; }
    setBusy(true);
    setError('');
    try {
      onRemoved(await removePost(target.id, reason.trim()));
    } catch (err) {
      setBusy(false);
      setError(errorMessage(err, lang));
    }
  }

  return <ConfirmDialog
    lang={lang}
    title={th ? 'ลบประกาศนี้?' : 'Remove this posting?'}
    confirmLabel={th ? 'ลบประกาศ' : 'Remove Post'}
    danger busy={busy} error={error}
    onCancel={onClose} onConfirm={confirm}
    body={<>
      <p className="font-medium text-ink">“{target.title}”</p>
      {target.publisherIsAdmin
        ? <p>{th ? 'ผู้ประกาศเป็นผู้ดูแลระบบ บัญชีจะไม่ถูกระงับ ประกาศจะถูกลบเท่านั้น' : 'The publisher is an administrator, so only the posting is removed; the account is not disabled.'}</p>
        : <p className="text-danger">{th ? 'การลบประกาศนี้จะระงับบัญชีของผู้ประกาศโดยอัตโนมัติ ดำเนินการต่อหรือไม่?' : "Removing this post will automatically disable the publisher's account. Proceed?"}</p>}
      {target.publisherEmail && <p className="ui-meta">{th ? 'ผู้ประกาศ' : 'Publisher'}: {target.publisherEmail}</p>}
      {!target.publisherIsAdmin && <p className="ui-meta">{th ? 'ประกาศอื่นที่ยังเปิดรับของผู้ประกาศรายนี้จะถูกปิดรับด้วย และผู้ประกาศจะถูกออกจากระบบทันที' : "The publisher's other open postings are closed too, and they are signed out immediately."}</p>}
    </>}
  >
    <label className="block space-y-1.5">
      <span className="ui-label">{th ? 'เหตุผล (บันทึกในประวัติการดูแล) *' : 'Reason (saved to the moderation log) *'}</span>
      <textarea autoFocus value={reason} onChange={event => { setReason(event.target.value); setError(''); }} maxLength={500} rows={3}
        className="ui-field h-auto py-2 leading-6" placeholder={th ? 'เช่น หลอกลวง ขอเงินมัดจำจากผู้ให้บริการ' : 'e.g. scam: asks vendors for a deposit'} />
    </label>
  </ConfirmDialog>;
}

export function removalSummary(result: RemovalResult, lang: Lang) {
  const th = lang === 'th';
  const parts = [result.accountDisabled ? (th ? 'ลบประกาศและระงับบัญชีผู้ประกาศแล้ว' : 'Posting removed and publisher account disabled.') : (th ? 'ลบประกาศแล้ว' : 'Posting removed.')];
  if (result.otherPostingsClosed) parts.push(th ? `ปิดรับประกาศอื่นของผู้ประกาศ ${result.otherPostingsClosed} รายการ` : `${result.otherPostingsClosed} other open posting(s) closed.`);
  if (result.reportsResolved) parts.push(th ? `ปิดรายงานที่เกี่ยวข้อง ${result.reportsResolved} รายการ` : `${result.reportsResolved} related report(s) resolved.`);
  return parts.join(' ');
}
