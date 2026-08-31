'use client';

type TabKey = 'ops' | 'users' | 'scraping' | 'diagnostics' | 'logs';

interface AdminTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  torCount: number;
  userCount: number;
  logCount: number;
  t: {
    tabOps: string;
    tabUsers: string;
    tabScraping: string;
    tabDiagnostics: string;
    tabLogs: string;
  };
}

export function AdminTabs({ 
  activeTab, 
  onTabChange, 
  torCount, 
  userCount, 
  logCount, 
  t 
}: AdminTabsProps) {
  const tabs = [
    { key: 'ops' as const, icon: 'ri-folder-open-line', label: t.tabOps, count: torCount },
    { key: 'users' as const, icon: 'ri-team-line', label: t.tabUsers, count: userCount },
    { key: 'scraping' as const, icon: 'ri-radar-line', label: t.tabScraping },
    { key: 'diagnostics' as const, icon: 'ri-pulse-line', label: t.tabDiagnostics },
    { key: 'logs' as const, icon: 'ri-terminal-box-line', label: t.tabLogs, count: logCount, isError: true },
  ];

  return (
    <div role="tablist" className="tabs tabs-bordered overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          onClick={() => onTabChange(tab.key)}
          className={`tab whitespace-nowrap gap-2 text-base-content ${
            activeTab === tab.key ? 'tab-active font-bold border-primary text-primary' : ''
          }`}
        >
          <i className={tab.icon}></i>
          {tab.label}
          {tab.count !== undefined && (
            <span className={`badge badge-sm font-mono ${tab.isError ? 'badge-error' : ''}`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}