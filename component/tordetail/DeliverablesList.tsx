'use client';

interface DeliverablesListProps {
  deliverables: string[];
  t: {
    keyDeliverables: string;
  };
}

export function DeliverablesList({ deliverables, t }: DeliverablesListProps) {
  return (
    <section className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-6 rounded-2xl space-y-4 shadow-sm">
      <h2 className="text-sm font-bold font-display uppercase tracking-wider text-tormax-purple dark:text-tormax-lavender flex items-center gap-2">
        <span>🎯</span> {t.keyDeliverables}
      </h2>
      <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
        {deliverables.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="text-tormax-purple dark:text-tormax-lavender font-bold text-xs">
              {idx + 1}.
            </span>
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}