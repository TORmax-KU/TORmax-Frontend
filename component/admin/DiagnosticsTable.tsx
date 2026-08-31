'use client';

import { SCRAPING_TARGETS } from '@/public/mockData/scrapingTargets';

interface DiagnosticsTableProps {
  onPing: (domain: string) => void;
  t: {
    diagTitle: string;
    diagSubtitle: string;
    colTargetNode: string;
    colDomainHost: string;
    colLatency: string;
    colSuccessRate: string;
    colHealth: string;
    colActions: string;
    btnPing: string;
  };
}

export function DiagnosticsTable({ onPing, t }: DiagnosticsTableProps) {
  return (
    <div className="card bg-base-100 border border-base-300 p-6 space-y-4 shadow-sm">
      <div>
        <h3 className="font-bold text-base text-base-content">{t.diagTitle}</h3>
        <p className="text-xs text-base-content/80">{t.diagSubtitle}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-xs text-base-content">
          <thead>
            <tr className="text-base-content/80">
              <th>{t.colTargetNode}</th>
              <th>{t.colDomainHost}</th>
              <th>{t.colLatency}</th>
              <th>{t.colSuccessRate}</th>
              <th>{t.colHealth}</th>
              <th className="text-right">{t.colActions}</th>
            </tr>
          </thead>
          <tbody>
            {SCRAPING_TARGETS.map((target) => (
              <tr key={target.id}>
                <td className="font-bold text-base-content">{target.name}</td>
                <td className="font-mono text-base-content/70">{target.domain}</td>
                <td className="font-mono font-bold text-base-content">{target.latency}</td>
                <td>
                  <progress
                    className="progress progress-success w-24"
                    value={parseFloat(target.successRate)}
                    max="100"
                  ></progress>
                  <span className="text-[10px] block text-base-content/70 font-mono">{target.successRate}</span>
                </td>
                <td>
                  <span className={`badge badge-sm font-bold ${target.status === 'Healthy' ? 'badge-success' : 'badge-warning'}`}>
                    {target.status}
                  </span>
                </td>
                <td className="text-right">
                  <button onClick={() => onPing(target.domain)} className="btn btn-xs btn-outline">
                    <i className="ri-ping-pong-line"></i> {t.btnPing}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}