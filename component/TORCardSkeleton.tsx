'use client';

export function TORCardSkeleton({ count, label, className }: { count: number; label: string; className: string }) {
  return (
    <div role="status" className={className}>
      <span className="sr-only">{label}</span>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} aria-hidden className="animate-pulse rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <div className="flex justify-between gap-4"><div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" /><div className="h-5 w-24 rounded-full bg-slate-200 dark:bg-slate-800" /></div>
          <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="flex gap-2"><div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-800" /><div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-800" /></div>
        </div>
      ))}
    </div>
  );
}
