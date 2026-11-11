'use client';

import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
  ariaLabel: string;
  previousLabel: string;
  nextLabel: string;
}

export function Pagination({ page, total, limit, onChange, ariaLabel, previousLabel, nextLabel }: PaginationProps) {
  return (
    <nav aria-label={ariaLabel} className="flex items-center justify-center gap-3 pt-8">
      <button className="ui-btn ui-btn-secondary ui-btn-sm pl-2" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <RiArrowLeftSLine size={16} />{previousLabel}
      </button>
      <span className="min-w-16 text-center text-[13px] font-medium tabular-nums text-ink-3">
        <span className="text-ink">{page}</span> / {Math.ceil(total / limit)}
      </span>
      <button className="ui-btn ui-btn-secondary ui-btn-sm pr-2" disabled={page * limit >= total} onClick={() => onChange(page + 1)}>
        {nextLabel}<RiArrowRightSLine size={16} />
      </button>
    </nav>
  );
}
