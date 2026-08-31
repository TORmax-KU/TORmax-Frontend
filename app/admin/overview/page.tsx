'use client';

import { IncidentBanner } from '@/component/admin/overview/IncidentBanner';
import { IncidentTimeline } from '@/component/admin/overview/IncidentTimeline';
import { LatencyDistribution } from '@/component/admin/overview/LatencyDistribution';
import { LatencyTrendSection } from '@/component/admin/overview/LatencyTrendSection';
import { NodeStatusGrid } from '@/component/admin/overview/NodeStatusGrid';
import { OverviewHeader } from '@/component/admin/overview/OverviewHeader';
import { useApp } from '@/context/AppContext';
import { overviewi18n } from '@/public/mockData/i18n/overview';
import { useOverview } from '../../../component/admin/overview/useOverview';
export default function OverviewPage() {
  const { lang: contextLang } = useApp();
  const lang = (contextLang?.toLowerCase() as 'en' | 'th') || 'en';
  const t = overviewi18n[lang];

  const {
    activeNodeKey,
    visibleNodes,
    handleNodeSelect,
    handlePingAlert,
    incidents,
    nodes,
    latencyData,
  } = useOverview();

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 w-full space-y-8 bg-base-100 text-base-content min-h-screen">
      <OverviewHeader t={t} onPingClick={handlePingAlert} />

      <IncidentBanner t={t} />

      <NodeStatusGrid
        nodes={nodes}
        activeNodeKey={activeNodeKey}
        onNodeSelect={handleNodeSelect}
        t={t}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LatencyTrendSection
          data={latencyData}
          nodes={nodes}
          activeNodeKey={activeNodeKey}
          visibleNodes={visibleNodes}
          onNodeFilter={handleNodeSelect}
          t={t}
        />

        <LatencyDistribution nodes={visibleNodes} t={t} />
      </div>

      <IncidentTimeline incidents={incidents} t={t} />
    </div>
  );
}