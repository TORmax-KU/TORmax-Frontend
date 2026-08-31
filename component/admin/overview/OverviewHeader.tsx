'use client';

import Link from 'next/link';

interface OverviewHeaderProps {
  t: {
    backToAdmin: string;
    title: string;
    subtitle: string;
    nodeDegraded: string;
    pingAlert: string;
    runPing: string;
  };
  onPingClick: () => void;
}

export function OverviewHeader({ t, onPingClick }: OverviewHeaderProps) {
  return (
    <div className="border-b border-base-300 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center space-x-3">
          <Link href="/admin" className="btn btn-outline btn-sm gap-2 font-bold text-base-content">
            <i className="ri-arrow-left-line text-base"></i>
            {t.backToAdmin}
          </Link>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2 text-base-content">
            <i className="ri-pulse-fill text-warning"></i>
            {t.title}
          </h1>
        </div>
        <p className="text-xs text-base-content/70 mt-1 pl-1">
          {t.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="badge badge-warning badge-sm gap-1 font-mono font-bold">
          <i className="ri-alert-line"></i> {t.nodeDegraded}
        </span>
        <button
          onClick={onPingClick}
          className="btn btn-primary btn-sm gap-2"
        >
          <i className="ri-radar-line"></i> {t.runPing}
        </button>
      </div>
    </div>
  );
}