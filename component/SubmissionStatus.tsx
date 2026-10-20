'use client';

import { useEffect, useState } from 'react';
import { SubmissionInfo, submissionSummary } from '@/lib/submission';

export function SubmissionStatus({ project, lang }: { project: SubmissionInfo; lang: 'th' | 'en' }) {
  const [now, setNow] = useState<number>();
  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);
  return <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
    {now === undefined ? (lang === 'th' ? 'กำลังตรวจสอบเวลาที่เหลือ…' : 'Checking time remaining…') : submissionSummary(project, lang, now)}
  </p>;
}
