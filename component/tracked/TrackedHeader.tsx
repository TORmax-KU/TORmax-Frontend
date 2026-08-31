'use client';

import Link from 'next/link';
import { RiBriefcaseLine, RiBookmark3Fill } from '@remixicon/react';

interface TrackedHeaderProps {
  lang: string;
  browseText: string;
}

export function TrackedHeader({ lang, browseText }: TrackedHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-[#2D2938] pb-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#5B3E96] dark:text-[#9B82C1] uppercase tracking-wider">
          <RiBookmark3Fill className="h-4 w-4" />
          <span>{lang === 'EN' ? 'Saved Workspace' : 'พื้นที่จัดเก็บส่วนตัว'}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black mt-1">
          {lang === 'EN' ? 'Tracked Projects' : 'โครงการที่ติดตาม'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {lang === 'EN'
            ? 'Monitor bidding timelines, status updates, and deadlines for saved TOR documents.'
            : 'ติดตามกำหนดการ สถานะการประกวดราคา และเอกสาร TOR ที่คุณบันทึกไว้'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/search-feed"
          className="btn btn-sm bg-[#5B3E96] hover:bg-[#4A327B] text-white border-none font-semibold rounded-xl px-4"
        >
          <RiBriefcaseLine className="h-4 w-4" />
          <span>{browseText}</span>
        </Link>
      </div>
    </div>
  );
}