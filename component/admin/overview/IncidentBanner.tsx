'use client';

interface IncidentBannerProps {
  t: {
    rootCauseTitle: string;
    rootCauseMsg: string;
  };
}

export function IncidentBanner({ t }: IncidentBannerProps) {
  return (
    <div className="alert alert-warning shadow-sm border border-warning/30 text-xs">
      <i className="ri-alert-fill text-lg"></i>
      <div>
        <span className="font-bold uppercase tracking-wider">{t.rootCauseTitle}</span>
        <span className="font-medium">{t.rootCauseMsg}</span>
      </div>
    </div>
  );
}