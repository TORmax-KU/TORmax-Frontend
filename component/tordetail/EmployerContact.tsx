'use client';

interface EmployerContactProps {
  employer: string;
  t: {
    employerContact: string;
    contactDivision: string;
  };
}

export function EmployerContact({ employer, t }: EmployerContactProps) {
  return (
    <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-6 rounded-2xl space-y-3 shadow-sm">
      <h3 className="text-xs font-bold uppercase tracking-wider text-tormax-purple dark:text-tormax-lavender">
        {t.employerContact}
      </h3>
      <div className="text-xs space-y-2 text-slate-700 dark:text-slate-300 font-medium">
        <div className="font-bold text-slate-900 dark:text-white text-sm">
          {employer}
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span>👤</span>
          <span>{t.contactDivision}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span>📧</span>
          <a
            href="mailto:procurement@gov.th"
            className="hover:underline text-tormax-purple dark:text-tormax-lavender font-mono"
          >
            procurement@gov.th
          </a>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span>📞</span>
          <span className="font-mono">+66 2 123 4567 ext 89</span>
        </div>
      </div>
    </div>
  );
}