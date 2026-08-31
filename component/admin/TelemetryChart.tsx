'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface TelemetryChartProps {
  data: any[];
  t: {
    telemetryTitle: string;
    telemetrySubtitle: string;
    ingestedDocs: string;
    scraperHealth: string;
  };
}

export function TelemetryChart({ data, t }: TelemetryChartProps) {
  return (
    <div className="card bg-base-200/50 border border-base-300 shadow-sm p-5 space-y-3">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h2 className="font-bold text-sm uppercase tracking-wider text-base-content flex items-center gap-1.5">
            <i className="ri-line-chart-line text-primary"></i>
            {t.telemetryTitle}
          </h2>
          <p className="text-xs text-base-content/70">{t.telemetrySubtitle}</p>
        </div>
        <div className="flex gap-4 text-xs font-mono font-bold">
          <span className="text-primary">{t.ingestedDocs}</span>
          <span className="text-success">{t.scraperHealth}</span>
        </div>
      </div>

      <div className="h-48 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'currentColor' }} />
            <YAxis tick={{ fontSize: 11, fill: 'currentColor' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-base-200, #1e293b)',
                borderColor: 'var(--tormax-border-dark, #334155)',
                borderRadius: '0.5rem',
                fontSize: '12px',
                color: 'var(--foreground, #f8fafc)',
              }}
            />
            <Area type="monotone" dataKey="docsIngested" stroke="#6366f1" fillOpacity={1} fill="url(#colorDocs)" />
            <Area type="monotone" dataKey="healthRate" stroke="#10b981" fillOpacity={1} fill="url(#colorHealth)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}