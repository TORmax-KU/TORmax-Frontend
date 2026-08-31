'use client';

import Link from 'next/link';

interface AdminHeaderProps {
  t: {
    title: string;
    subtitle: string;
    liveCluster: string;
    telemetryMetrics: string;
    executeSync: string;
    targets: string;
  };
  onSyncClick: () => void;
}

export function AdminHeader({ t, onSyncClick }: AdminHeaderProps) {
  return (
    <div className="border-b border-base-300 pb-6 flex flex-col lg:flex-row justify-between lg:items-center gap-4">
      <div>
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2 text-base-content">
            <i className="ri-shield-flash-line text-primary"></i>
            {t.title}
          </h1>
          <span className="badge badge-success badge-sm gap-1 font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {t.liveCluster}
          </span>
        </div>
        <p className="text-xs text-base-content/80 mt-1 font-medium">
          {t.subtitle}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link href="/admin/overview" className="btn btn-outline btn-sm gap-2 text-base-content">
          <i className="ri-bar-chart-box-line text-lg"></i>
          {t.telemetryMetrics}
        </Link>
        <button onClick={onSyncClick} className="btn btn-primary btn-sm gap-2">
          <i className="ri-refresh-line"></i>
          {t.executeSync}
          <span className="badge badge-ghost badge-xs font-mono">6 {t.targets}</span>
        </button>
      </div>
    </div>
  );
}