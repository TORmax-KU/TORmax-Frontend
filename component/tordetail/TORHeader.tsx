'use client';

import Link from 'next/link';
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
}: TORHeaderProps) {
  return (
    <header className="bg-slate-900 text-white min-h-[260px] px-6 sm:px-8 py-10 flex flex-col justify-center border-b border-slate-800">
      <div className="max-w-5xl mx-auto w-full space-y-3">
        <div className="flex items-center space-x-3 text-xs font-mono">
          <Link
            href="/search-feed"
            className="text-tormax-lavender hover:underline transition-colors"
          >
            ← {backToDirectory}
          </Link>
          <span>/</span>
          <span className="text-slate-400">{id}</span>
          <span>/</span>
          <span className="text-amber-400 font-bold">{sourcePortal}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
          {name}
        </h1>
        <p className="text-sm font-semibold text-slate-300">🏛️ {employer}</p>
        <div className="border-t border-slate-700 pt-5 mt-5">
          <TORFacts budget={price} published={published} deadline={deadline} lang={lang} inverse />
          <p className="text-xs text-slate-400 mt-3">{lang === 'th' ? 'วันที่ตามเวลาไทย (GMT+7) • แสดงเวลาเมื่อมีข้อมูลระบุเท่านั้น' : 'Dates use Thailand time (GMT+7). Times appear only when provided.'}</p>
        </div>
      </div>
    </header>
  );
}
