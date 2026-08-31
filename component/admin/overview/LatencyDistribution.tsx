'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface LatencyDistributionProps {
  nodes: any[];
  t: {
    distributionTitle: string;
    distributionSub: string;
  };
}

export function LatencyDistribution({ nodes, t }: LatencyDistributionProps) {
  const data = nodes.map((n) => ({
    name: n.id,
    p50: parseInt(n.avgLatency),
    p99: parseInt(n.p99),
  }));

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm p-5 space-y-4">
      <div className="border-b border-base-300 pb-3">
        <h3 className="font-bold text-sm flex items-center gap-2 text-base-content">
          <i className="ri-bar-chart-2-line text-secondary"></i>
          {t.distributionTitle}
        </h3>
        <p className="text-xs text-base-content/70">{t.distributionSub}</p>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'currentColor' }} />
            <YAxis tick={{ fontSize: 10, fill: 'currentColor' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-base-200, #1e293b)',
                borderColor: 'var(--tormax-border-dark, #334155)',
                borderRadius: '0.5rem',
                fontSize: '11px',
                color: 'var(--foreground, #f8fafc)',
              }}
            />
            <Bar dataKey="p50" fill="#6366f1" name="P50 Median (ms)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="p99" fill="#f43f5e" name="P99 Max (ms)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}