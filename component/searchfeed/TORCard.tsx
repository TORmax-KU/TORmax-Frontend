'use client';

import Link from 'next/link';
import { RiArrowRightLine, RiBuilding2Line, RiGovernmentLine } from '@remixicon/react';
import { ProjectCard } from '@/lib/projects';
import { SubmissionStatus } from '@/component/SubmissionStatus';
import { TORFacts } from '@/component/TORFacts';
import { BookmarkButton } from '@/component/BookmarkButton';
import { availabilityTone } from '@/component/ui';

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
    <article className="ui-card ui-card-interactive p-5 sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_15.5rem] lg:gap-8">
        {/* Document */}
        <div className="min-w-0 space-y-3">
          <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-1.5 text-xs text-ink-3">
            {item.isDirect ? (
              <span className="ui-badge ui-badge-brand h-5 px-2 text-[11px]">{item.sourcePortal}</span>
            ) : (
              <span className="font-medium text-ink-2">{t.source} {item.sourcePortal}</span>
            )}
            <span aria-hidden className="text-ink-4">·</span>
            <span className="font-mono text-[11px] tracking-tight">{item.displayId}</span>
          </div>
          <div className="-mr-1.5 -mt-1.5"><BookmarkButton id={item.id} lang={item.lang} /></div>
          </div>

          <h2 className="text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">
            <Link href={`/tor-page/${item.id}`} className="rounded-sm transition-colors duration-150 hover:text-accent">
              {item.name}
            </Link>
          </h2>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-ink-3">
            <span className="inline-flex min-w-0 items-center gap-1.5">
              {item.isDirect ? <RiBuilding2Line size={14} className="shrink-0" /> : <RiGovernmentLine size={14} className="shrink-0" />}
              <span className="truncate">{item.employer}</span>
            </span>
            <span aria-hidden className="text-ink-4">·</span>
            <span className="text-ink-2">{item.isDirect ? item.method : `${t.method} ${item.method}`}</span>
          </div>

          <p className="line-clamp-3 text-sm leading-relaxed text-ink-2">{item.desc}</p>

          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.map(tag => <span key={tag} className="ui-chip">{tag}</span>)}
            </div>
          )}
        </div>

        {/* Key facts */}
        <div className="flex flex-col gap-4 border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="flex flex-wrap gap-1.5">
            {item.match != null && (
              <span className="ui-badge ui-badge-ok">
                {item.lang === 'th' ? `ตรงกับโปรไฟล์ ${Math.round(item.match)}%` : `${Math.round(item.match)}% match`}
              </span>
            )}
            <span className={`ui-badge ui-badge-dot ${availabilityTone(item.availability)}`}>{item.availabilityLabel}</span>
            {item.priceFlag && item.priceFlag !== 'Normal' && (
              <span title={item.priceComparison || undefined} className="ui-badge ui-badge-danger">{item.priceFlagLabel}</span>
            )}
          </div>

          <div>
            <TORFacts budget={item.price} published={item.published} deadline={item.deadline} lang={item.lang} direct={item.isDirect} variant="card" />
            {item.submission.deadlinePrecision === 'datetime' && <p className="ui-meta mt-2">{item.lang === 'th' ? 'เวลาไทย (GMT+7)' : 'Thailand time (GMT+7)'}</p>}
          </div>

          <SubmissionStatus project={item.submission} lang={item.lang} />

          <Link href={`/tor-page/${item.id}`} className="ui-btn ui-btn-secondary ui-btn-sm group mt-auto self-start">
            {t.openSpec}
            <RiArrowRightLine size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
