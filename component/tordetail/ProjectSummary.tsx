'use client';

interface ProjectSummaryProps {
  desc: string;
  method: string;
  deadline: string;
  t: {
    projectSummary: string;
    biddingMethod: string;
    submissionDeadline: string;
  };
}

export function ProjectSummary({ desc, method, deadline, t }: ProjectSummaryProps) {
  return (
    <section className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-6 rounded-2xl space-y-3 shadow-sm">
      <h2 className="text-sm font-bold font-display uppercase tracking-wider text-tormax-purple dark:text-tormax-lavender">
        {t.projectSummary}
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
        {desc}
      </p>
      <div className="grid grid-cols-2 gap-4 pt-3 text-xs border-t border-slate-100 dark:border-tormax-borderDark">
        <div>
          <span className="text-slate-400 block">{t.biddingMethod}</span>
          <strong className="font-bold text-slate-800 dark:text-slate-200">
            {method || 'e-Bidding'}
          </strong>
        </div>
        <div>
          <span className="text-slate-400 block">{t.submissionDeadline}</span>
          <strong className="font-bold text-emerald-600 dark:text-emerald-400">
            {deadline}
          </strong>
        </div>
      </div>
    </section>
  );
}