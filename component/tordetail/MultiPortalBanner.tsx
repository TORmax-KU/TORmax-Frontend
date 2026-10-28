'use client';

import { RiExternalLinkLine, RiInformationLine } from '@remixicon/react';

interface MultiPortalBannerProps {
  sourcePortal: string;
  multiPortalNote: string;
  synchronizedFrom: string;
  submissionPortal: string;
  onSubmissionClick: () => void;
}

export function MultiPortalBanner({ 
  sourcePortal,
  multiPortalNote,
  synchronizedFrom,
  submissionPortal,
  onSubmissionClick
}: MultiPortalBannerProps) {
  return (
    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-700 dark:text-amber-300 font-semibold flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <RiInformationLine size={16} className="shrink-0" />
        <span><strong>{multiPortalNote}</strong> {synchronizedFrom}{' '}
        <strong>{sourcePortal}</strong>.</span>
      </div>
      <button
        onClick={onSubmissionClick}
        className="text-xs text-[#5B3E96] dark:text-tormax-lavender font-bold underline hover:opacity-80 transition-opacity cursor-pointer shrink-0 inline-flex items-center gap-1"
      >
        {submissionPortal}
        <RiExternalLinkLine size={12} />
      </button>
    </div>
  );
}