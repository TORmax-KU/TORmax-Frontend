'use client';

export function TORCardSkeleton({ count, label, className }: { count: number; label: string; className: string }) {
  return (
    <div role="status" className={className}>
      <span className="sr-only">{label}</span>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} aria-hidden className="ui-card p-5 sm:p-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_15.5rem] lg:gap-8">
          <div className="space-y-3.5">
            <div className="ui-skeleton h-3 w-40" />
            <div className="ui-skeleton h-5 w-3/4" />
            <div className="ui-skeleton h-3 w-1/3" />
            <div className="space-y-2 pt-1">
              <div className="ui-skeleton h-3 w-full" />
              <div className="ui-skeleton h-3 w-5/6" />
            </div>
            <div className="flex gap-1.5 pt-1"><div className="ui-skeleton h-6 w-16" /><div className="ui-skeleton h-6 w-20" /><div className="ui-skeleton h-6 w-14" /></div>
          </div>
          <div className="space-y-4 border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="ui-skeleton h-6 w-32 rounded-full" />
            <div className="space-y-2"><div className="ui-skeleton h-3 w-16" /><div className="ui-skeleton h-4 w-28" /></div>
            <div className="space-y-2"><div className="ui-skeleton h-3 w-20" /><div className="ui-skeleton h-4 w-24" /></div>
          </div>
        </div>
      ))}
    </div>
  );
}
