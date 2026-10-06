import { formatProcurementDate, IngestionStatus } from '@/lib/projects';

export function IngestionNotice({ status, lang }: { status?: IngestionStatus; lang: 'th' | 'en' }) {
  const th = lang === 'th';
  if (!status) return null;
  const blocked = status.status === 'failed';
  const message = blocked
    ? status.code === 'SOURCE_ACCESS_REQUIRED'
      ? (th ? 'ยังดึงข้อมูลใหม่ไม่ได้: e-GP ต้องตรวจสอบสิทธิ์การเข้าถึง ระบบจะลองอีกทุก 5 นาที' : 'New data is unavailable: e-GP requires access verification. Retrying every 5 minutes.')
      : status.code === 'SOURCE_DETAILS_REQUIRED'
        ? (th ? 'กำลังรอตรวจสอบรายละเอียด วันปิดรับ และเอกสาร TOR จากต้นทาง จึงยังไม่เผยแพร่งานใหม่' : 'New listings await verification of source details, deadlines and TOR documents.')
        : (th ? 'เชื่อมต่อ e-GP ไม่สำเร็จ ระบบจะลองใหม่ทุก 5 นาที' : 'Could not connect to e-GP. Retrying every 5 minutes.')
    : status.status === 'disabled'
      ? (th ? 'ปิดการอัปเดตข้อมูลอัตโนมัติอยู่' : 'Automatic updates are disabled.')
      : status.status === 'running'
        ? (th ? 'กำลังตรวจสอบข้อมูลจาก e-GP…' : 'Checking e-GP for updates…')
        : (th ? 'ตรวจสอบข้อมูลจาก e-GP ทุก 5 นาทีขณะที่ระบบทำงาน' : 'Checking e-GP every 5 minutes while the server runs.');
  return <div role="status" className={`rounded-2xl border p-4 text-sm space-y-1 ${blocked ? 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-200' : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300'}`}>
    <p>{message}</p>
    {status.lastAttemptAt && <p className="text-xs">{th ? 'ตรวจสอบครั้งล่าสุด: ' : 'Last attempt: '}{formatProcurementDate(status.lastAttemptAt, lang)} (GMT+7)</p>}
  </div>;
}
