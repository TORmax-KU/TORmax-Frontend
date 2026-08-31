'use client';

interface FeasibilityMatrixProps {
  budgetFit: number;
  securityFit: number;
  t: {
    feasibilityMatrix: string;
    capitalFit: string;
    securityFit: string;
  };
}

export function FeasibilityMatrix({ budgetFit, securityFit, t }: FeasibilityMatrixProps) {
  return (
    <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-6 rounded-2xl space-y-4 shadow-sm">
      <h3 className="text-xs font-bold uppercase tracking-wider text-tormax-purple dark:text-tormax-lavender">
        {t.feasibilityMatrix}
      </h3>
      <div className="space-y-4 text-xs font-semibold">
        <div>
          <div className="flex justify-between text-[11px] mb-1 text-slate-700 dark:text-slate-300">
            <span>{t.capitalFit}</span>
            <span className="font-bold">{budgetFit}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-tormax-purple h-full transition-all duration-500"
              style={{ width: `${budgetFit}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-1 text-slate-700 dark:text-slate-300">
            <span>{t.securityFit}</span>
            <span className="font-bold">{securityFit}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-tormax-purple h-full transition-all duration-500"
              style={{ width: `${securityFit}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}