export interface SubmissionInfo {
  availability?: string;
  deadline?: string;
  deadlinePrecision?: 'datetime' | 'date' | 'unknown';
  submissionStartAt?: string;
}

export function formatSubmissionDeadline(project: SubmissionInfo, lang: 'th' | 'en') {
  if (!project.deadline || !Number.isFinite(Date.parse(project.deadline))) {
    return lang === 'th' ? 'ไม่พบกำหนดปิดรับ — กรุณาตรวจสอบกับหน่วยงาน' : 'Unknown — confirm with the agency';
  }
  return new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', {
    timeZone: 'Asia/Bangkok',
    dateStyle: 'medium',
    ...(project.deadlinePrecision === 'datetime' ? { timeStyle: 'short' as const } : {}),
  }).format(new Date(project.deadline));
}

export function submissionSummary(project: SubmissionInfo, lang: 'th' | 'en', now = Date.now()) {
  const th = lang === 'th';
  const deadline = project.deadline ? Date.parse(project.deadline) : NaN;
  const start = project.submissionStartAt ? Date.parse(project.submissionStartAt) : NaN;
  const terminal = ['closed', 'awarded', 'cancelled', 'draft'].includes(project.availability || '');
  const bangkokDay = (value: number) => Math.floor((value + 7 * 3600000) / 86400000);
  if (terminal) return th ? 'ไม่อยู่ในช่วงเปิดรับข้อเสนอ' : 'Not accepting submissions';
  if (Number.isFinite(deadline) && (project.deadlinePrecision === 'datetime' ? deadline <= now : bangkokDay(deadline) < bangkokDay(now))) return th ? 'หมดเวลายื่นข้อเสนอแล้ว' : 'Submission deadline has passed';
  if (!Number.isFinite(deadline)) return th ? 'ยังคำนวณเวลาที่เหลือไม่ได้ — ต้นทางไม่ระบุวันปิดรับ' : 'Time remaining unknown — no closing deadline provided';
  if (project.availability !== 'open') return th ? 'ยังยืนยันการเปิดรับไม่ได้ — ตรวจสอบประกาศต้นทาง' : 'Availability unconfirmed — check the source announcement';
  const futureStart = Number.isFinite(start) && start > now;
  if (project.deadlinePrecision !== 'datetime' && !futureStart) {
    const days = Math.max(0, bangkokDay(deadline) - bangkokDay(now));
    return th
      ? `${days === 0 ? 'ปิดรับวันนี้' : `อีก ${days} วันถึงวันปิดรับ`}`
      : `${days === 0 ? 'Closes today' : `${days} calendar ${days === 1 ? 'day' : 'days'} until closing date`}`;
  }
  const minutes = Math.ceil(((futureStart ? start : deadline) - now) / 60000);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const remaining = minutes % 60;
  const duration = th ? `${days} วัน ${hours} ชม. ${remaining} นาที` : `${days}d ${hours}h ${remaining}m`;
  if (futureStart) return th ? `ยังไม่เปิดรับ — เริ่มใน ${duration}` : `Not open yet — submissions start in ${duration}`;
  return th ? `เหลือ ${duration} ถึงกำหนดปิดรับ` : `${duration} until submission deadline`;
}
