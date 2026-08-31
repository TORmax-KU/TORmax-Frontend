'use client';

import { NodeStatusCard } from './NodeStatusCard';

interface NodeStatusGridProps {
  nodes: any[];
  activeNodeKey: string;
  onNodeSelect: (key: string) => void;
  t: {
    statusHealthy: string;
    statusDegraded: string;
    avgLatency: string;
    errorRate: string;
  };
}

export function NodeStatusGrid({ nodes, activeNodeKey, onNodeSelect, t }: NodeStatusGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {nodes.map((node) => (
        <NodeStatusCard
          key={node.id}
          node={node}
          isSelected={activeNodeKey === node.key}
          onSelect={onNodeSelect}
          t={t}
        />
      ))}
    </div>
  );
}