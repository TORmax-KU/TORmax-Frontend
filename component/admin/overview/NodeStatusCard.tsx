'use client';

interface NodeStatusCardProps {
  node: {
    id: string;
    key: string;
    name: string;
    status: string;
    avgLatency: string;
    errorRate: string;
    color?: string;
  };
  isSelected: boolean;
  onSelect: (key: string) => void;
  t: {
    statusHealthy: string;
    statusDegraded: string;
    avgLatency: string;
    errorRate: string;
  };
}

export function NodeStatusCard({ node, isSelected, onSelect, t }: NodeStatusCardProps) {
  const isDegraded = node.status === 'Degraded';

  return (
    <div
      onClick={() => onSelect(isSelected ? 'all' : node.key)}
      className={`card bg-base-100 border p-4 shadow-sm cursor-pointer transition-all ${
        isSelected
          ? 'border-primary ring-2 ring-primary/20'
          : isDegraded
            ? 'border-error/50 bg-error/10'
            : 'border-base-300 hover:border-primary/50'
      }`}
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-mono font-bold text-base-content/60">{node.id}</span>
        <span className={`badge badge-xs font-bold ${!isDegraded ? 'badge-success' : 'badge-error'}`}>
          {!isDegraded ? t.statusHealthy : t.statusDegraded}
        </span>
      </div>
      <div className="mt-2">
        <h4 className="font-bold text-sm truncate text-base-content">{node.name}</h4>
        <div className="flex justify-between items-baseline mt-2">
          <div>
            <div className="text-[10px] text-base-content/60 uppercase">{t.avgLatency}</div>
            <div className={`text-lg font-mono font-black ${isDegraded ? 'text-error' : 'text-base-content'}`}>
              {node.avgLatency}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-base-content/60 uppercase">{t.errorRate}</div>
            <div className={`text-xs font-mono font-bold ${parseFloat(node.errorRate) > 2 ? 'text-error' : 'text-success'}`}>
              {node.errorRate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}