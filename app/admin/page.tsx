'use client';

import React, { useState } from 'react';
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

interface LogEntry {
  id: string;
  time: string;
  type: 'SYNC' | 'CREATE' | 'ALERT' | 'SCRAPE' | 'DIAGNOSTIC';
  msg: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Superadmin' | 'Analyst' | 'Vendor';
  status: 'Active' | 'Suspended';
  company: string;
}

const INITIAL_USERS: User[] = [
  { id: 'USR-001', name: 'Somchai Prasert', email: 'somchai@techcorp.co.th', role: 'Superadmin', status: 'Active', company: 'TechCorp Thailand' },
  { id: 'USR-002', name: 'Kanya Wong', email: 'kanya@cybersec.co.th', role: 'Analyst', status: 'Active', company: 'CyberSec Systems' },
  { id: 'USR-003', name: 'Anan Srisai', email: 'anan@telecom.co.th', role: 'Vendor', status: 'Active', company: 'National Telecom Partner' },
  { id: 'USR-004', name: 'Nipon Boon', email: 'nipon@infra.co.th', role: 'Vendor', status: 'Suspended', company: 'InfraCloud Solutions' },
];

const SCRAPING_TARGETS = [
  { id: 'NODE-01', name: 'BMA Procurement eGP2', domain: 'egp2.bangkok.go.th', url: 'https://egp2.bangkok.go.th/project-search?&budgetYear=2569', frequency: '15m', latency: '240ms', status: 'Healthy', successRate: '99.4%' },
  { id: 'NODE-02', name: 'CGD Main Announcement Portal', domain: 'process5.gprocurement.go.th', url: 'https://process5.gprocurement.go.th/egp-agpc01-web/announcement?keywordSearch=', frequency: '10m', latency: '410ms', status: 'Healthy', successRate: '98.8%' },
  { id: 'NODE-03', name: 'Department of Science Service RSS', domain: 'dss.go.th', url: 'https://www.dss.go.th/procurement/rss-cgd', frequency: '30m', latency: '120ms', status: 'Healthy', successRate: '100%' },
  { id: 'NODE-04', name: 'OCSC eGP Procurement', domain: 'egp.ocsc.go.th', url: 'https://egp.ocsc.go.th/procurement/all', frequency: '1h', latency: '580ms', status: 'Degraded', successRate: '92.1%' },
  { id: 'NODE-05', name: 'FDA MOPH Procurement Search', domain: 'gprocurement.fda.moph.go.th', url: 'https://gprocurement.fda.moph.go.th/procurement_search', frequency: '30m', latency: '310ms', status: 'Healthy', successRate: '97.5%' },
  { id: 'NODE-06', name: 'Phuket PAO Procurement', domain: 'egp.ppao.go.th', url: 'https://egp.ppao.go.th/', frequency: '2h', latency: '190ms', status: 'Healthy', successRate: '99.1%' },
];

// Telemetry history chart data (replacing static metric cards)
const TELEMETRY_HISTORY_DATA = [
  { time: '08:00', docsIngested: 120, healthRate: 97.2, avgLatency: 280, activeUsers: 14 },
  { time: '10:00', docsIngested: 145, healthRate: 98.1, avgLatency: 265, activeUsers: 19 },
  { time: '12:00', docsIngested: 180, healthRate: 99.0, avgLatency: 240, activeUsers: 24 },
  { time: '14:00', docsIngested: 210, healthRate: 98.5, avgLatency: 255, activeUsers: 22 },
  { time: '16:00', docsIngested: 235, healthRate: 98.2, avgLatency: 243, activeUsers: 18 },
  { time: '18:00', docsIngested: 250, healthRate: 98.8, avgLatency: 230, activeUsers: 15 },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'ops' | 'users' | 'scraping' | 'diagnostics' | 'logs'>('ops');
  const [torList, setTorList] = useState<TORItem[]>(initialTORs);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [editingTor, setEditingTor] = useState<TORItem | null>(null);
  const [userQuery, setUserQuery] = useState('');

  // ScraperAPI Config State
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
    alert('ScraperAPI ingestion completed across all target portals!');
  };

  const runNetworkDiagnostic = (domain: string) => {
    addLog('DIAGNOSTIC', `Ping & SSL Handshake diagnostic passed for target domain: ${domain}`);
  };

  const deleteTOR = (id: string) => {
    if (confirm(`Confirm purge of TOR record ${id} from persistent vector store?`)) {
      setTorList((prev) => prev.filter((t) => t.id !== id));
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
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 w-full space-y-8">
      {/* Executive Header & Aligned Global Actions Toolbar */}
      <div className="border-b border-base-200 pb-6 flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
              <i className="ri-shield-flash-line text-primary"></i>
              TORmax Executive Console
            </h1>
            <span className="badge badge-success badge-sm gap-1 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Cluster
            </span>
          </div>
          <p className="text-xs text-base-content/70 mt-1 font-medium">
            Ingestion telemetry, proxy orchestration, access governance, and infrastructure diagnostics
          </p>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/overview" className="btn btn-outline btn-sm gap-2">
            <i className="ri-bar-chart-box-line text-lg"></i>
            Telemetry Metrics
          </Link>
          <button onClick={triggerManualSyncAll} className="btn btn-primary btn-sm gap-2">
            <i className="ri-refresh-line"></i>
            Execute ScraperAPI Sync
            <span className="badge badge-ghost badge-xs font-mono">6 Targets</span>
          </button>
        </div>
      </div>

      {/* History Telemetry Representation: Chart Section */}
      <div className="card bg-base-100 border border-base-200 shadow-sm p-5 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-sm uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
              <i className="ri-line-chart-line text-primary"></i>
              System Telemetry & Historical Trends
            </h2>
            <p className="text-xs text-base-content/50">Real-time throughput and health telemetry across recent polling windows</p>
          </div>
          <div className="flex gap-4 text-xs font-mono font-bold">
            <span className="text-primary">● Ingested Docs</span>
            <span className="text-success">● Scraper Health (%)</span>
            <span className="text-warning">● Latency (ms)</span>
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
              <XAxis dataKey="time" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  fontSize: '12px',
                  color: '#fff',
                }}
              />
              <Area type="monotone" dataKey="docsIngested" stroke="#6366f1" fillOpacity={1} fill="url(#colorDocs)" />
              <Area type="monotone" dataKey="healthRate" stroke="#10b981" fillOpacity={1} fill="url(#colorHealth)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Primary Navigation Tabs (daisyUI) */}
      <div role="tablist" className="tabs tabs-bordered overflow-x-auto">
        <button
          role="tab"
          onClick={() => setActiveTab('ops')}
          className={`tab whitespace-nowrap gap-2 ${activeTab === 'ops' ? 'tab-active font-bold' : ''}`}
        >
          <i className="ri-folder-open-line"></i>
          TOR Repository & Ops
          <span className="badge badge-sm font-mono">{torList.length}</span>
        </button>

        <button
          role="tab"
          onClick={() => setActiveTab('users')}
          className={`tab whitespace-nowrap gap-2 ${activeTab === 'users' ? 'tab-active font-bold' : ''}`}
        >
          <i className="ri-[#group-line] ri-team-line"></i>
          User Governance
          <span className="badge badge-sm font-mono">{users.length}</span>
        </button>

        <button
          role="tab"
          onClick={() => setActiveTab('scraping')}
          className={`tab whitespace-nowrap gap-2 ${activeTab === 'scraping' ? 'tab-active font-bold' : ''}`}
        >
          <i className="ri-radar-line"></i>
          Web Scraping & Proxies
        </button>

        <button
          role="tab"
          onClick={() => setActiveTab('diagnostics')}
          className={`tab whitespace-nowrap gap-2 ${activeTab === 'diagnostics' ? 'tab-active font-bold' : ''}`}
        >
          <i className="ri-pulse-line"></i>
          Network Diagnostics
        </button>

        {/* Dedicated Tab for Log Console */}
        <button
          role="tab"
          onClick={() => setActiveTab('logs')}
          className={`tab whitespace-nowrap gap-2 ${activeTab === 'logs' ? 'tab-active font-bold' : ''}`}
        >
          <i className="ri-terminal-box-line"></i>
          Diagnostic Log Console
          <span className="badge badge-error badge-xs font-mono">{logs.length}</span>
        </button>
      </div>

      {/* TAB 1: TOR OPERATIONS & REPOSITORY */}
      {activeTab === 'ops' && (
        <div className="card bg-base-100 border border-base-200 p-6 space-y-4 shadow-sm">
          <div>
            <h3 className="font-bold text-base">Ingested Document Repository</h3>
            <p className="text-xs text-base-content/70">Extracted procurement specs ready for vector querying</p>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-xs">
              <thead>
                <tr>
                  <th>TOR ID</th>
                  <th>Source Portal</th>
                  <th>Project Title</th>
                  <th>Procuring Agency</th>
                  <th>Budget Price</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {torList.map((t) => (
                  <tr key={t.id}>
                    <td className="font-mono font-bold">{t.id}</td>
                    <td>
                      <span className="badge badge-primary badge-outline font-mono text-[10px]">{t.sourcePortal}</span>
                    </td>
                    <td className="truncate max-w-xs font-medium">{t.name}</td>
                    <td className="text-base-content/70">{t.employer}</td>
                    <td className="font-mono font-bold">{t.price}</td>
                    <td className="text-right space-x-1">
                      <button onClick={() => setEditingTor({ ...t })} className="btn btn-xs btn-outline">
                        <i className="ri-edit-line"></i> Modify
                      </button>
                      <button onClick={() => deleteTOR(t.id)} className="btn btn-xs btn-error btn-outline">
                        <i className="ri-delete-bin-line"></i> Purge
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
        <div className="card bg-base-100 border border-base-200 p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h3 className="font-bold text-base">Platform Access Control & User Governance</h3>
              <p className="text-xs text-base-content/70">Manage user authorization, permissions, and roles</p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Filter user, email, or company..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="input input-sm input-bordered w-64 pr-8 text-xs"
              />
              <i className="ri-search-line absolute right-2.5 top-2 text-base-content/50"></i>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-xs">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User Details</th>
                  <th>Organization</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-right">Access Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="font-mono text-base-content/50">{u.id}</td>
                    <td>
                      <div className="font-bold">{u.name}</div>
                      <div className="text-[11px] text-base-content/60 font-mono">{u.email}</div>
                    </td>
                    <td>{u.company}</td>
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
                        {u.status === 'Active' ? 'Suspend Access' : 'Authorize Access'}
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
          <div className="card bg-base-100 border border-base-200 p-6 space-y-4 shadow-sm">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h3 className="font-bold text-base">ScraperAPI Proxy Cluster Settings</h3>
                <p className="text-xs text-base-content/70">Configure request headers and IP rotation rules</p>
              </div>
              <span className="badge badge-success gap-1 font-mono font-bold">
                <i className="ri-[#checkbox-circle-line] ri-check-line"></i> Pool Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-xs">ScraperAPI Token</span>
                </label>
                <input
                  type="password"
                  value={scraperApiKey}
                  onChange={(e) => setScraperApiKey(e.target.value)}
                  className="input input-sm input-bordered font-mono"
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
                  <span className="label-text font-bold text-xs">Headless JS Rendering</span>
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
                  <span className="label-text font-bold text-xs">Thai Residential Proxies</span>
                </label>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-200 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-base">Target Thai Procurement Portals</h3>
            <div className="divide-y divide-base-200">
              {SCRAPING_TARGETS.map((target) => (
                <div key={target.id} className="py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-base-content/50 font-bold">{target.id}</span>
                      <span className="font-bold text-xs">{target.name}</span>
                    </div>
                    <a href={target.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline font-mono">
                      {target.url}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-ghost font-mono text-[10px]">Interval: {target.frequency}</span>
                    <button
                      onClick={() => addLog('SCRAPE', `Initiated manual scrape request for: ${target.name}`)}
                      className="btn btn-xs btn-primary"
                    >
                      <i className="ri-download-cloud-line"></i> Scrape
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
        <div className="card bg-base-100 border border-base-200 p-6 space-y-4 shadow-sm">
          <div>
            <h3 className="font-bold text-base">ScraperAPI Proxy & Target Health Matrix</h3>
            <p className="text-xs text-base-content/70">Real-time latency and SSL handshake validation across targets</p>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-xs">
              <thead>
                <tr>
                  <th>Target Node</th>
                  <th>Domain Host</th>
                  <th>Latency</th>
                  <th>Success Rate</th>
                  <th>Node Health</th>
                  <th className="text-right">Diagnostic Action</th>
                </tr>
              </thead>
              <tbody>
                {SCRAPING_TARGETS.map((target) => (
                  <tr key={target.id}>
                    <td className="font-bold">{target.name}</td>
                    <td className="font-mono text-base-content/60">{target.domain}</td>
                    <td className="font-mono font-bold">{target.latency}</td>
                    <td>
                      <progress
                        className="progress progress-success w-24"
                        value={parseFloat(target.successRate)}
                        max="100"
                      ></progress>
                      <span className="text-[10px] block text-base-content/60 font-mono">{target.successRate}</span>
                    </td>
                    <td>
                      <span className={`badge badge-sm font-bold ${target.status === 'Healthy' ? 'badge-success' : 'badge-warning'}`}>
                        {target.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <button onClick={() => runNetworkDiagnostic(target.domain)} className="btn btn-xs btn-outline">
                        <i className="ri-ping-pong-line"></i> Ping
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: DEDICATED DIAGNOSTIC LOG CONSOLE */}
      {activeTab === 'logs' && (
        <div className="card bg-base-100 border border-base-200 p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                <i className="ri-terminal-box-line text-error"></i>
                System Operations & Diagnostic Log Console
              </h3>
              <p className="text-xs text-base-content/70">Persistent operational event stream and diagnostic logs</p>
            </div>
            <button onClick={() => setLogs([])} className="btn btn-xs btn-ghost text-error">
              Clear Terminal
            </button>
          </div>

          <div className="bg-slate-950 text-slate-200 rounded-xl p-4 font-mono text-xs h-96 overflow-y-auto space-y-2 border border-slate-800 shadow-inner">
            {logs.length === 0 ? (
              <div className="text-slate-600 italic">No log items recorded. Console is idle.</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex gap-3 leading-relaxed border-b border-slate-900/60 pb-1">
                  <span className="text-slate-500 font-bold">[{log.time}]</span>
                  <span
                    className={`font-bold px-1.5 rounded text-[10px] ${
                      log.type === 'ALERT'
                        ? 'bg-rose-500/20 text-rose-400'
                        : log.type === 'SCRAPE'
                        ? 'bg-indigo-500/20 text-indigo-400'
                        : log.type === 'DIAGNOSTIC'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {log.type}
                  </span>
                  <span className="text-slate-300">{log.msg}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* EDIT MODAL FOR TOR ITEM */}
      {editingTor && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold">Modify Procurement Record ({editingTor.id})</h3>
              <button onClick={() => setEditingTor(null)} className="btn btn-sm btn-circle btn-ghost">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Project Title</span>
                </label>
                <input
                  type="text"
                  value={editingTor.name}
                  onChange={(e) => setEditingTor({ ...editingTor, name: e.target.value })}
                  className="input input-sm input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Procuring Agency</span>
                </label>
                <input
                  type="text"
                  value={editingTor.employer}
                  onChange={(e) => setEditingTor({ ...editingTor, employer: e.target.value })}
                  className="input input-sm input-bordered w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Budget Price</span>
                  </label>
                  <input
                    type="text"
                    value={editingTor.price}
                    onChange={(e) => setEditingTor({ ...editingTor, price: e.target.value })}
                    className="input input-sm input-bordered font-mono"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Source Portal</span>
                  </label>
                  <input
                    type="text"
                    value={editingTor.sourcePortal}
                    onChange={(e) => setEditingTor({ ...editingTor, sourcePortal: e.target.value })}
                    className="input input-sm input-bordered font-mono"
                  />
                </div>
              </div>

              <div className="modal-action pt-2">
                <button type="button" onClick={() => setEditingTor(null)} className="btn btn-sm btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-primary">
                  Save Specification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}