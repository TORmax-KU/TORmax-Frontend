'use client';

import Link from 'next/link';

interface Requirement {
  text: string;
  pass: boolean;
}

interface QualificationChecklistProps {
  requirements: Requirement[];
  companyName: string;
  passCount: number;
  totalReqs: number;
  passPct: number;
  t: {
    qualificationChecklist: string;
    evalSubtext: string;
    evalProfileSuffix: string;
    updateProfile: string;
    passed: string;
    verifiedProfile: string;
    gapIdentified: string;
    updateCredentialsLink: string;
    compliant: string;
    gapIdentifiedTag: string;
  };
}

export function QualificationChecklist({ 
  requirements, 
  companyName,
  passCount,
  totalReqs,
  passPct,
  t 
}: QualificationChecklistProps) {
  return (
    <section className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-6 rounded-2xl space-y-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-tormax-borderDark pb-3 flex-wrap gap-2">
        <div>
          <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
            {t.qualificationChecklist}
          </h2>
          <p className="text-xs text-slate-500">
            {t.evalSubtext} {companyName} {t.evalProfileSuffix}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/settings/profile"
            className="text-xs font-bold text-[#5B3E96] dark:text-tormax-lavender underline hover:opacity-80 transition-opacity flex items-center gap-1"
          >
            <span>{t.updateProfile}</span>
            <span>→</span>
          </Link>
          <span
            className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${
              passPct >= 75
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
            }`}
          >
            {passCount}/{totalReqs} {t.passed} ({passPct}%)
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {requirements?.map((req, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border flex items-start justify-between gap-4 text-xs ${
              req.pass
                ? 'border-emerald-500/30 bg-emerald-500/5'
                : 'border-amber-500/30 bg-amber-500/5'
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`text-base font-bold ${
                  req.pass
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {req.pass ? '✓' : '⚠️'}
              </span>
              <div className="space-y-1">
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {req.text}
                </p>
                <div>
                  {req.pass ? (
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {t.verifiedProfile}
                    </span>
                  ) : (
                    <div className="flex items-center gap-1 text-[10px]">
                      <span className="text-amber-700 dark:text-amber-400 font-semibold">
                        {t.gapIdentified}
                      </span>
                      <Link
                        href="/settings/profile"
                        className="font-bold text-amber-800 dark:text-amber-300 underline hover:text-[#5B3E96] dark:hover:text-tormax-lavender transition-colors flex items-center gap-0.5"
                      >
                        <span>{t.updateCredentialsLink}</span>
                        <span className="text-xs">→</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <span
              className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                req.pass
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
              }`}
            >
              {req.pass ? t.compliant : t.gapIdentifiedTag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}