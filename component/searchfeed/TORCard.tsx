'use client';

import Link from 'next/link';
import { RiArrowRightLine, RiGovernmentLine } from '@remixicon/react';
import { ProjectCard } from '@/lib/projects';
import { SubmissionStatus } from '@/component/SubmissionStatus';
import { TORFacts } from '@/component/TORFacts';
import { BookmarkButton } from '@/component/BookmarkButton';

interface TORCardProps {
  item: ProjectCard;
  t: {
    source: string;
    method: string;
    deadline: string;
    openSpec: string;
  };
}

export function TORCard({ item, t }: TORCardProps) {
  return (
    <div className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-3 hover:border-tormax-purple dark:hover:border-tormax-lavender/50 transition-all shadow-sm hover:shadow-md group">
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {t.source} {item.sourcePortal}
          </span>
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded">
            {item.displayId}
          </span>
        </div>
        <BookmarkButton id={item.id} lang={item.lang} />
      </div>

      <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-tormax-purple dark:group-hover:text-tormax-lavender transition-colors">
        {item.name}
      </h2>

      <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400 font-semibold">
        <span className="inline-flex items-center gap-1"><RiGovernmentLine size={14} /> {item.employer}</span>
        <span>•</span>
        <span className="text-tormax-purple dark:text-tormax-lavender font-bold">
          {t.method} {item.method}
        </span>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{item.desc}</p>
      <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-3">
        <TORFacts budget={item.price} published={item.published} deadline={item.deadline} lang={item.lang} />
        {item.submission.deadlinePrecision === 'datetime' && <p className="text-xs text-slate-500 mt-2">{item.lang === 'th' ? 'เวลาไทย (GMT+7)' : 'Thailand time (GMT+7)'}</p>}
      </div>
      <SubmissionStatus project={item.submission} lang={item.lang} />
      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${item.availability === 'open' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' : item.availability === 'draft' ? 'bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200' : 'bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200'}`}>{item.availabilityLabel}</span>
      {item.priceFlag && item.priceFlag !== 'Normal' && <span title={item.priceComparison || undefined} className="ml-2 inline-block rounded-full px-3 py-1 text-xs font-semibold bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-200">{item.priceFlagLabel}</span>}
      <div className="flex flex-wrap gap-2">{item.tags.map(tag => <span key={tag} className="text-xs rounded bg-slate-100 dark:bg-slate-800 px-2 py-1">{tag}</span>)}</div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-tormax-borderDark text-xs">
        <Link
          href={`/tor-page/${item.id}`}
          className="inline-flex items-center gap-1 px-4 py-2 bg-tormax-purple hover:bg-tormax-purpleDeep text-white font-bold rounded-xl transition-all shadow-sm active:scale-95"
        >
          {t.openSpec}
          <RiArrowRightLine size={14} />
        </Link>
      </div>
    </div>
  );
}
