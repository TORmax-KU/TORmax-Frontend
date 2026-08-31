'use client';

interface SubmissionCardProps {
  sourcePortal: string;
  t: {
    proposalSubmission: string;
    submissionNotice: string;
    submitBidBtn: string;
  };
  onSubmitClick: () => void;
}

export function SubmissionCard({ sourcePortal, t, onSubmitClick }: SubmissionCardProps) {
  return (
    <div className="p-6 bg-tormax-purple/10 border border-tormax-purple/30 rounded-2xl space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-tormax-purple dark:text-tormax-lavender">
        {t.proposalSubmission}
      </h3>
      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
        {t.submissionNotice}{' '}
        <strong className="text-amber-500">{sourcePortal}</strong>.
      </p>
      <button
        onClick={onSubmitClick}
        className="w-full py-3 bg-tormax-purple hover:bg-tormax-purpleDeep text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
      >
        <span>
          {t.submitBidBtn} {sourcePortal}
        </span>
        <i className="ri-external-link-line text-sm leading-none" />
      </button>
    </div>
  );
}