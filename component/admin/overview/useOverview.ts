'use client';

import { useState } from 'react';
import { NODES } from '@/public/mockData/Nodes';
import { LATENCY_HISTORICAL_DATA } from '@/public/mockData/LatencyHistoricalData';

export function useOverview() {
  const [activeNodeKey, setActiveNodeKey] = useState<string>('all');

  const visibleNodes = activeNodeKey === 'all'
    ? NODES
    : NODES.filter((node) => node.key === activeNodeKey);

  const handleNodeSelect = (key: string) => {
    setActiveNodeKey(key);
  };

  const handlePingAlert = () => {
    alert('Ping diagnostic initiated across all nodes...');
  };

  // Incident log data
  const incidents = [
    {
      time: '09:12:44 AM',
      type: 'error' as const,
      title: 'Alert Triggered',
      message: 'Latency spike detected on EGP node (1,130ms).',
    },
    {
      time: '09:14:02 AM',
      type: 'warning' as const,
      title: 'Auto-Heal',
      message: 'Traffic re-routing to DR node egp.ocsc.go.th.',
    },
    {
      time: '09:15:30 AM',
      type: 'success' as const,
      title: 'Diagnostic',
      message: 'Latency normalized. All nodes back to healthy baseline.',
    },
  ];

  return {
    activeNodeKey,
    visibleNodes,
    handleNodeSelect,
    handlePingAlert,
    incidents,
    nodes: NODES,
    latencyData: LATENCY_HISTORICAL_DATA,
  };
}