'use client';

import Link from 'next/link';
import { RiArrowLeftLine, RiBuilding2Line, RiGovernmentLine } from '@remixicon/react';
import { TORFacts } from '@/component/TORFacts';

interface TORHeaderProps {
  id: string;
  sourcePortal: string;
  price: string;
  name: string;
  employer: string;
  backToDirectory: string;
  published: string;
  deadline: string;
  lang: 'th' | 'en';
  direct?: boolean;
}

export function TORHeader({
  id,
  sourcePortal,
  price,
  name,
  employer,
  backToDirectory,
  published,
  deadline,
  lang,
  direct = false,
}: TORHeaderProps) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-10 lg:px-8 space-y-5">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
          <Link href="/search-feed" className="ui-link group">
            <RiArrowLeftLine size={14} className="transition-transform duration-150 group-hover:-translate-x-0.5" /> {backToDirectory}
          </Link>
          <span aria-hidden className="text-ink-4">/</span>
          <span className="font-mono text-xs text-ink-3">{id}</span>
          <span aria-hidden className="text-ink-4">/</span>
          <span className="font-medium text-ink-2">{sourcePortal}</span>
        </nav>
        <h1 className="ui-title max-w-4xl">
          {name}
        </h1>
        <p className="flex items-center gap-2 text-[15px] text-ink-2">
          {direct ? <RiBuilding2Line size={17} className="shrink-0 text-ink-3" /> : <RiGovernmentLine size={17} className="shrink-0 text-ink-3" />} {employer}
        </p>
        <div className="ui-card mt-2 p-5 sm:px-6">
          <TORFacts budget={price} published={published} deadline={deadline} lang={lang} direct={direct} />
          <p className="ui-meta mt-4 border-t border-line pt-3">{lang === 'th' ? 'วันที่ตามเวลาไทย (GMT+7) • แสดงเวลาเมื่อมีข้อมูลระบุเท่านั้น' : 'Dates use Thailand time (GMT+7). Times appear only when provided.'}</p>
        </div>
      </div>
    </header>
  );
}
