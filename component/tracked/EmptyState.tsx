'use client';

import { RiBookmark3Fill } from '@remixicon/react';

interface EmptyStateProps {
  lang: string;
}

export function EmptyState({ lang }: EmptyStateProps) {
  return (
    <div className="bg-white dark:bg-[#1C1A24] rounded-2xl p-12 border border-slate-200 dark:border-[#2D2938] text-center space-y-3">
      <RiBookmark3Fill className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto" />
      <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">
        {lang === 'EN' ? 'No tracked projects found' : 'ไม่พบโครงการที่ติดตาม'}
      </h3>
      <p className="text-xs text-slate-400 max-w-sm mx-auto">
        {lang === 'EN'
          ? 'Try adjusting your search filter or bookmark projects from the TOR Directory.'
          : 'ลองปรับเปลี่ยนคำค้นหา หรือกดบุ๊กมาร์กโครงการจากคลังเอกสาร TOR'}
      </p>
    </div>
  );
}