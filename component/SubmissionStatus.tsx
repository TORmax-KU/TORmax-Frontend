'use client';

import { useEffect, useState } from 'react';
import { RiTimeLine } from '@remixicon/react';
import { SubmissionInfo, submissionSummary } from '@/lib/submission';

export function SubmissionStatus({ project, lang }: { project: SubmissionInfo; lang: 'th' | 'en' }) {
  const [now, setNow] = useState<number>();
  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);
  return <p className="flex items-start gap-1.5 text-[13px] font-medium leading-snug text-ink-2">
    <RiTimeLine size={15} className="mt-px shrink-0 text-ink-3" aria-hidden />
    <span>{now === undefined ? (lang === 'th' ? 'กำลังตรวจสอบเวลาที่เหลือ…' : 'Checking time remaining…') : submissionSummary(project, lang, now)}</span>
  </p>;
}
