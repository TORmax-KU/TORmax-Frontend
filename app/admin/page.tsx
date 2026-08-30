'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { initialTORs } from '@/utils/mockData';
import { TORItem } from '@/types';
import { useApp } from '@/context/AppContext';
import { Language } from '@/public/mockData/Language';
import { LogEntry } from '@/interface/LogEntry';
import { admini18n } from '@/public/mockData/i18n/admin';
import { INITIAL_USERS } from '@/public/mockData/InitialUsers';
import { SCRAPING_TARGETS } from '@/public/mockData/scrapingTargets';
import { TELEMETRY_HISTORY_DATA } from '@/public/mockData/TelemetryHistoryData';

export default function AdminPage() {
  // Consume language state from App Context
  const { lang: contextLang } = useApp();
  const activeLang: Language = (contextLang?.toLowerCase() as Language) === 'th' ? 'th' : 'en';
  const t = admini18n[activeLang];

  const [activeTab, setActiveTab] = useState<'ops' | 'users' | 'scraping' | 'diagnostics' | 'logs'>('ops');
  
  // Resolve localized dataset array
  const currentTORs = initialTORs[activeLang] || initialTORs.en || [];
  const [torList, setTorList] = useState<TORItem[]>(currentTORs);

  // Sync dataset when active language changes
  useEffect(() => {
    setTorList(initialTORs[activeLang] || initialTORs.en || []);
  }, [activeLang]);

  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [editingTor, setEditingTor] = useState<TORItem | null>(null);
  const [userQuery, setUserQuery] = useState('');

  const [scraperApiKey, setScraperApiKey] = useState('sc_api_****************');
  const [renderJs, setRenderJs] = useState(true);
  const [ultraPremiumProxies, setUltraPremiumProxies] = useState(true);

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      time: new Date().toLocaleTimeString(),
      type: 'SYNC',
      msg: 'Daemon connected to ScraperAPI endpoint clusters. 6 Thai procurement targets active.',
    },
  ]);

  const addLog = (type: LogEntry['type'], msg: string) => {
    setLogs((prev) => [
      { id: Math.random().toString(36).substring(2, 9), time: new Date().toLocaleTimeString(), type, msg },
      ...prev,
    ]);
  };

  const triggerManualSyncAll = () => {
    addLog('SCRAPE', 'ScraperAPI global ingestion executed across all target nodes.');
    alert(activeLang === 'th' ? 'ดำเนินการดึงข้อมูล ScraperAPI สำเร็จทุกเป้าหมาย!' : 'ScraperAPI ingestion completed across all target portals!');
  };

  const runNetworkDiagnostic = (domain: string) => {
    addLog('DIAGNOSTIC', `Ping & SSL Handshake diagnostic passed for target domain: ${domain}`);
  };

  const deleteTOR = (id: string) => {
    if (confirm(activeLang === 'th' ? `ยืนยันการลบข้อมูล TOR รหัส ${id} หรือไม่?` : `Confirm purge of TOR record ${id} from persistent vector store?`)) {
      setTorList((prev) => prev.filter((tItem) => tItem.id !== id));
      addLog('ALERT', `Manually deleted TOR entry: ${id}`);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTor) return;
    setTorList((prev) => prev.map((item) => (item.id === editingTor.id ? editingTor : item)));
    addLog('CREATE', `Updated specifications for TOR: ${editingTor.id}`);
    setEditingTor(null);
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u))
    );
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(userQuery.toLowerCase()) ||
      u.company.toLowerCase().includes(userQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 w-full space-y-8 text-base-content bg-base-100 min-h-screen">
      {/* Executive Header & Aligned Global Actions Toolbar */}
      <div className="border-b border-base-300 pb-6 flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2 text-base-content">
              <i className="ri-shield-flash-line text-primary"></i>
              {t.title}
            </h1>
            <span className="badge badge-success badge-sm gap-1 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.liveCluster}
            </span>
          </div>
          <p className="text-xs text-base-content/80 mt-1 font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/overview" className="btn btn-outline btn-sm gap-2 text-base-content">
            <i className="ri-bar-chart-box-line text-lg"></i>
            {t.telemetryMetrics}
          </Link>
          <button onClick={triggerManualSyncAll} className="btn btn-primary btn-sm gap-2">
            <i className="ri-refresh-line"></i>
            {t.executeSync}
            <span className="badge badge-ghost badge-xs font-mono">6 {t.targets}</span>
          </button>
        </div>
      </div>

      {/* History Telemetry Chart Section */}
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
            <AreaChart data={TELEMETRY_HISTORY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

      {/* Primary Navigation Tabs */}
      <div role="tablist" className="tabs tabs-bordered overflow-x-auto">
        <button
          role="tab"
          onClick={() => setActiveTab('ops')}
          className={`tab whitespace-nowrap gap-2 text-base-content ${activeTab === 'ops' ? 'tab-active font-bold border-primary text-primary' : ''}`}
        >
          <i className="ri-folder-open-line"></i>
          {t.tabOps}
          <span className="badge badge-sm font-mono">{torList.length}</span>
        </button>

        <button
          role="tab"
          onClick={() => setActiveTab('users')}
          className={`tab whitespace-nowrap gap-2 text-base-content ${activeTab === 'users' ? 'tab-active font-bold border-primary text-primary' : ''}`}
        >
          <i className="ri-team-line"></i>
          {t.tabUsers}
          <span className="badge badge-sm font-mono">{users.length}</span>
        </button>

        <button
          role="tab"
          onClick={() => setActiveTab('scraping')}
          className={`tab whitespace-nowrap gap-2 text-base-content ${activeTab === 'scraping' ? 'tab-active font-bold border-primary text-primary' : ''}`}
        >
          <i className="ri-radar-line"></i>
          {t.tabScraping}
        </button>

        <button
          role="tab"
          onClick={() => setActiveTab('diagnostics')}
          className={`tab whitespace-nowrap gap-2 text-base-content ${activeTab === 'diagnostics' ? 'tab-active font-bold border-primary text-primary' : ''}`}
        >
          <i className="ri-pulse-line"></i>
          {t.tabDiagnostics}
        </button>

        <button
          role="tab"
          onClick={() => setActiveTab('logs')}
          className={`tab whitespace-nowrap gap-2 text-base-content ${activeTab === 'logs' ? 'tab-active font-bold border-primary text-primary' : ''}`}
        >
          <i className="ri-terminal-box-line"></i>
          {t.tabLogs}
          <span className="badge badge-error badge-xs font-mono">{logs.length}</span>
        </button>
      </div>

      {/* TAB 1: TOR OPERATIONS & REPOSITORY */}
      {activeTab === 'ops' && (
        <div className="card bg-base-100 border border-base-300 p-6 space-y-4 shadow-sm">
          <div>
            <h3 className="font-bold text-base text-base-content">{t.repoTitle}</h3>
            <p className="text-xs text-base-content/80">{t.repoSubtitle}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-xs text-base-content">
              <thead>
                <tr className="text-base-content/80">
                  <th>{t.colTorId}</th>
                  <th>{t.colSource}</th>
                  <th>{t.colTitle}</th>
                  <th>{t.colAgency}</th>
                  <th>{t.colBudget}</th>
                  <th className="text-right">{t.colActions}</th>
                </tr>
              </thead>
              <tbody>
                {torList.map((tItem) => (
                  <tr key={tItem.id}>
                    <td className="font-mono font-bold text-base-content">{tItem.id}</td>
                    <td>
                      <span className="badge badge-primary badge-outline font-mono text-[10px]">{tItem.sourcePortal}</span>
                    </td>
                    <td className="truncate max-w-xs font-medium text-base-content">{tItem.name}</td>
                    <td className="text-base-content/80">{tItem.employer}</td>
                    <td className="font-mono font-bold text-base-content">{tItem.price}</td>
                    <td className="text-right space-x-1">
                      <button onClick={() => setEditingTor({ ...tItem })} className="btn btn-xs btn-outline">
                        <i className="ri-edit-line"></i> {t.btnModify}
                      </button>
                      <button onClick={() => deleteTOR(tItem.id)} className="btn btn-xs btn-error btn-outline">
                        <i className="ri-delete-bin-line"></i> {t.btnPurge}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: USER GOVERNANCE */}
      {activeTab === 'users' && (
        <div className="card bg-base-100 border border-base-300 p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h3 className="font-bold text-base text-base-content">{t.userTitle}</h3>
              <p className="text-xs text-base-content/80">{t.userSubtitle}</p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder={t.searchUserPlaceholder}
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="input input-sm input-bordered w-64 pr-8 text-xs text-base-content bg-base-100"
              />
              <i className="ri-search-line absolute right-2.5 top-2 text-base-content/70"></i>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-xs text-base-content">
              <thead>
                <tr className="text-base-content/80">
                  <th>{t.colUserId}</th>
                  <th>{t.colUserDetails}</th>
                  <th>{t.colOrg}</th>
                  <th>{t.colRole}</th>
                  <th>{t.colStatus}</th>
                  <th className="text-right">{t.colAccessAction}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="font-mono text-base-content/70">{u.id}</td>
                    <td>
                      <div className="font-bold text-base-content">{u.name}</div>
                      <div className="text-[11px] text-base-content/80 font-mono">{u.email}</div>
                    </td>
                    <td className="text-base-content">{u.company}</td>
                    <td>
                      <span className="badge badge-accent badge-sm font-bold">{u.role}</span>
                    </td>
                    <td>
                      <span className={`badge badge-sm font-bold ${u.status === 'Active' ? 'badge-success' : 'badge-error'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`btn btn-xs ${u.status === 'Active' ? 'btn-warning btn-outline' : 'btn-success btn-outline'}`}
                      >
                        {u.status === 'Active' ? t.btnSuspend : t.btnAuthorize}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: WEBSCRAPING & PROXIES */}
      {activeTab === 'scraping' && (
        <div className="space-y-6">
          <div className="card bg-base-100 border border-base-300 p-6 space-y-4 shadow-sm">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h3 className="font-bold text-base text-base-content">{t.scraperTitle}</h3>
                <p className="text-xs text-base-content/80">{t.scraperSubtitle}</p>
              </div>
              <span className="badge badge-success gap-1 font-mono font-bold">
                <i className="ri-check-line"></i> {t.poolActive}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-xs text-base-content">{t.apiKeyLabel}</span>
                </label>
                <input
                  type="password"
                  value={scraperApiKey}
                  onChange={(e) => setScraperApiKey(e.target.value)}
                  className="input input-sm input-bordered font-mono bg-base-100 text-base-content"
                />
              </div>

              <div className="form-control pt-6">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    checked={renderJs}
                    onChange={(e) => setRenderJs(e.target.checked)}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="label-text font-bold text-xs text-base-content">{t.jsRendering}</span>
                </label>
              </div>

              <div className="form-control pt-6">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    checked={ultraPremiumProxies}
                    onChange={(e) => setUltraPremiumProxies(e.target.checked)}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="label-text font-bold text-xs text-base-content">{t.residentialProxies}</span>
                </label>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-300 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-base text-base-content">{t.targetsTitle}</h3>
            <div className="divide-y divide-base-300">
              {SCRAPING_TARGETS.map((target) => (
                <div key={target.id} className="py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-base-content/70 font-bold">{target.id}</span>
                      <span className="font-bold text-xs text-base-content">{target.name}</span>
                    </div>
                    <a href={target.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline font-mono">
                      {target.url}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-ghost font-mono text-[10px] text-base-content">{t.interval}: {target.frequency}</span>
                    <button
                      onClick={() => addLog('SCRAPE', `Initiated manual scrape request for: ${target.name}`)}
                      className="btn btn-xs btn-primary"
                    >
                      <i className="ri-download-cloud-line"></i> {t.btnScrape}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: NETWORK DIAGNOSTICS */}
      {activeTab === 'diagnostics' && (
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
                      <button onClick={() => runNetworkDiagnostic(target.domain)} className="btn btn-xs btn-outline">
                        <i className="ri-ping-pong-line"></i> {t.btnPing}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: DIAGNOSTIC LOG CONSOLE */}
      {activeTab === 'logs' && (
        <div className="card bg-base-100 border border-base-300 p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base flex items-center gap-2 text-base-content">
                <i className="ri-terminal-box-line text-error"></i>
                {t.logTitle}
              </h3>
              <p className="text-xs text-base-content/80">{t.logSubtitle}</p>
            </div>
            <button onClick={() => setLogs([])} className="btn btn-xs btn-ghost text-error">
              {t.btnClear}
            </button>
          </div>

          <div className="bg-base-200 border border-base-300 text-base-content rounded-xl p-4 font-mono text-xs h-96 overflow-y-auto space-y-2 shadow-inner">
            {logs.length === 0 ? (
              <div className="text-base-content/50 italic">{t.noLogs}</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex gap-3 leading-relaxed border-b border-base-300/60 pb-1">
                  <span className="text-base-content/60 font-bold">[{log.time}]</span>
                  <span
                    className={`font-bold px-1.5 rounded text-[10px] ${
                      log.type === 'ALERT'
                        ? 'bg-error/20 text-error'
                        : log.type === 'SCRAPE'
                        ? 'bg-primary/20 text-primary'
                        : log.type === 'DIAGNOSTIC'
                        ? 'bg-warning/20 text-warning'
                        : 'bg-success/20 text-success'
                    }`}
                  >
                    {log.type}
                  </span>
                  <span className="text-base-content">{log.msg}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* EDIT MODAL FOR TOR ITEM */}
      {editingTor && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg space-y-4 bg-base-100 border border-base-300 text-base-content">
            <div className="flex justify-between items-center border-b border-base-300 pb-3">
              <h3 className="text-lg font-bold text-base-content">
                {t.editTitle} ({editingTor.id})
              </h3>
              <button onClick={() => setEditingTor(null)} className="btn btn-sm btn-circle btn-ghost">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-base-content">{t.colTitle}</span>
                </label>
                <input
                  type="text"
                  value={editingTor.name}
                  onChange={(e) => setEditingTor({ ...editingTor, name: e.target.value })}
                  className="input input-sm input-bordered w-full bg-base-100 text-base-content"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-base-content">{t.colAgency}</span>
                </label>
                <input
                  type="text"
                  value={editingTor.employer}
                  onChange={(e) => setEditingTor({ ...editingTor, employer: e.target.value })}
                  className="input input-sm input-bordered w-full bg-base-100 text-base-content"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-base-content">{t.colBudget}</span>
                  </label>
                  <input
                    type="text"
                    value={editingTor.price}
                    onChange={(e) => setEditingTor({ ...editingTor, price: e.target.value })}
                    className="input input-sm input-bordered font-mono bg-base-100 text-base-content"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-base-content">{t.colSource}</span>
                  </label>
                  <input
                    type="text"
                    value={editingTor.sourcePortal}
                    onChange={(e) => setEditingTor({ ...editingTor, sourcePortal: e.target.value })}
                    className="input input-sm input-bordered font-mono bg-base-100 text-base-content"
                  />
                </div>
              </div>

              <div className="modal-action pt-2">
                <button type="button" onClick={() => setEditingTor(null)} className="btn btn-sm btn-ghost">
                  {t.btnCancel}
                </button>
                <button type="submit" className="btn btn-sm btn-primary">
                  {t.btnSave}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}