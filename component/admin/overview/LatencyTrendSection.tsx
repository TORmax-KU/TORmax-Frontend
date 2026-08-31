'use client';

import { LatencyChart } from './LatencyChart';

interface LatencyTrendSectionProps {
  data: any[];
  nodes: any[];
  activeNodeKey: string;
  visibleNodes: any[];
  onNodeFilter: (key: string) => void;
  t: {
    latencyTrendTitle: string;
    latencyTrendSub: string;
    allNodes: string;
    [key: string]: any;
  };
}

export function LatencyTrendSection({
  data,
  nodes,
  activeNodeKey,
  visibleNodes,
  onNodeFilter,
  t,
}: LatencyTrendSectionProps) {
  return (
    <div className="lg:col-span-2 card bg-base-100 border border-base-300 shadow-sm p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-base-300 pb-3">
        <div>
          <h3 className="font-bold text-sm flex items-center gap-2 text-base-content">
            <i className="ri-line-chart-line text-primary"></i>
            {t.latencyTrendTitle}
          </h3>
          <p className="text-xs text-base-content/70">{t.latencyTrendSub}</p>
        </div>

        {/* Interactive Node Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onNodeFilter('all')}
            className={`btn btn-xs ${activeNodeKey === 'all' ? 'btn-neutral' : 'btn-ghost text-base-content'}`}
          >
            {t.allNodes}
          </button>
          {nodes.map((node) => (
            <button
              key={node.key}
              onClick={() => onNodeFilter(node.key)}
              className={`btn btn-xs gap-1 ${activeNodeKey === node.key ? 'btn-primary' : 'btn-outline text-base-content'}`}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: node.color }}
              ></span>
              {node.id}
            </button>
          ))}
        </div>
      </div>

      <LatencyChart data={data} visibleNodes={visibleNodes} t={t} />
    </div>
  );
}