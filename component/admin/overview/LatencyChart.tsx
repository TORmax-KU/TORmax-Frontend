'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

interface LatencyChartProps {
  data: any[];
  visibleNodes: any[];
  t: {
    latencyTrendTitle: string;
    latencyTrendSub: string;
    allNodes: string;
    [key: string]: any;
  };
}

export function LatencyChart({ data, visibleNodes, t }: LatencyChartProps) {
  return (
    <div className="h-64 w-full pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {visibleNodes.map((node) => (
              <linearGradient key={node.gradientId} id={node.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={node.color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={node.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'currentColor' }} />
          <YAxis tick={{ fontSize: 11, fill: 'currentColor' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-base-200, #1e293b)',
              borderColor: 'var(--tormax-border-dark, #334155)',
              borderRadius: '0.5rem',
              fontSize: '11px',
              color: 'var(--foreground, #f8fafc)',
            }}
          />
          <ReferenceLine
            y={600}
            stroke="#ef4444"
            strokeDasharray="4 4"
            label={{ value: 'SLA 600ms', fill: '#ef4444', fontSize: 10 }}
          />

          {visibleNodes.map((node) => (
            <Area
              key={node.key}
              type="monotone"
              dataKey={node.key}
              stroke={node.color}
              fill={`url(#${node.gradientId})`}
              strokeWidth={2}
              name={node.name}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}