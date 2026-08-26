'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { initialTORs } from '@/utils/mockData';
import { TORItem } from '@/types';

interface LogEntry {
  id: string;
  time: string;
  type: 'SYNC' | 'CREATE' | 'ALERT' | 'SCRAPE';
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
  { name: 'BMA Procurement eGP2', url: 'https://egp2.bangkok.go.th/project-search?&budgetYear=2569', frequency: 'Every 15 mins' },
  { name: 'CGD Main Announcement Portal', url: 'https://process5.gprocurement.go.th/egp-agpc01-web/announcement?keywordSearch=', frequency: 'Every 10 mins' },
  { name: 'Department of Science Service RSS', url: 'https://www.dss.go.th/procurement/rss-cgd', frequency: 'Every 30 mins' },
  { name: 'OCSC eGP Procurement', url: 'https://egp.ocsc.go.th/procurement/all', frequency: 'Every 1 hour' },
  { name: 'FDA MOPH Procurement Search', url: 'https://gprocurement.fda.moph.go.th/procurement_search', frequency: 'Every 30 mins' },
  { name: 'Phuket PAO Procurement', url: 'https://egp.ppao.go.th/', frequency: 'Every 2 hours' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'ops' | 'users' | 'scraping'>('ops');
  const [torList, setTorList] = useState<TORItem[]>(initialTORs);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [editingTor, setEditingTor] = useState<TORItem | null>(null);
  const [userQuery, setUserQuery] = useState('');
  
  // ScraperAPI Config State
  const [scraperApiKey, setScraperApiKey] = useState('sc_api_****************');
  const [renderJs, setRenderJs] = useState(true);

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      time: new Date().toLocaleTimeString(),
      type: 'SYNC',
      msg: 'System booted. Multi-source daemon actively monitoring ScraperAPI endpoints.',
    },
  ]);

  const addLog = (type: LogEntry['type'], msg: string) => {
    setLogs((prev) => [{ id: Math.random().toString(36).substring(2, 9), time: new Date().toLocaleTimeString(), type, msg }, ...prev]);
  };

  const triggerManualSyncAll = () => {
    addLog('SCRAPE', 'ScraperAPI sync triggered across 6 target Thai government endpoints.');
    alert('ScraperAPI ingestion completed across target portals!');
  };

  const deleteTOR = (id: string) => {
    if (confirm(`Delete ${id} from active database?`)) {
      setTorList((prev) => prev.filter((t) => t.id !== id));
      addLog('ALERT', `Manually deleted TOR entry: ${id}`);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTor) return;
    setTorList((prev) => prev.map((item) => (item.id === editingTor.id ? editingTor : item)));
    addLog('CREATE', `Updated TOR details for ${editingTor.id}`);
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
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 w-full space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-tormax-borderDark pb-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-display text-tormax-purple dark:text-tormax-lavender tracking-tight">
            TORmax Admin Control Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Multi-source procurement ingestion, user governance, and ScraperAPI configuration
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/overview"
            className="px-4 py-2 bg-slate-900 dark:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 hover:bg-slate-800 transition-all"
          >
            📊 Analytics & Stats Page →
          </Link>
          <button
            onClick={triggerManualSyncAll}
            className="px-4 py-2 bg-tormax-purple text-white text-xs font-bold rounded-xl shadow hover:bg-tormax-purpleDeep transition-all active:scale-95 cursor-pointer"
          >
            Run ScraperAPI Sync ⚡
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-tormax-borderDark gap-2">
        <button
          onClick={() => setActiveTab('ops')}
          className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
            activeTab === 'ops'
              ? 'border-tormax-purple text-tormax-purple dark:text-tormax-lavender dark:border-tormax-lavender'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          📂 TOR Operations & Database ({torList.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
            activeTab === 'users'
              ? 'border-tormax-purple text-tormax-purple dark:text-tormax-lavender dark:border-tormax-lavender'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          👥 User Management ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('scraping')}
          className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
            activeTab === 'scraping'
              ? 'border-tormax-purple text-tormax-purple dark:text-tormax-lavender dark:border-tormax-lavender'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          🕷️ Web Scraping (ScraperAPI)
        </button>
      </div>

      {/* TAB 1: TOR OPERATIONS */}
      {activeTab === 'ops' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-4 shadow-sm">
            <h3 className="font-bold text-base font-display text-slate-900 dark:text-white">
              Ingested Procurement Document Database
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-tormax-purple text-white uppercase text-[11px]">
                  <tr>
                    <th className="p-3">TOR ID</th>
                    <th className="p-3">Source Portal</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Agency</th>
                    <th className="p-3">Budget Price</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-tormax-borderDark">
                  {torList.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{t.id}</td>
                      <td className="p-3 text-tormax-purple dark:text-tormax-lavender font-bold">
                        {t.sourcePortal}
                      </td>
                      <td className="p-3 truncate max-w-xs font-sans font-medium text-slate-800 dark:text-slate-200">
                        {t.name}
                      </td>
                      <td className="p-3 font-sans text-slate-500">{t.employer}</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{t.price}</td>
                      <td className="p-3 text-right space-x-3 font-sans">
                        <button
                          onClick={() => setEditingTor({ ...t })}
                          className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded hover:bg-slate-200 cursor-pointer"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteTOR(t.id)}
                          className="text-red-500 font-bold hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-4 shadow-sm">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h3 className="font-bold text-base font-display text-slate-900 dark:text-white">
                Platform Access Control & User Directory
              </h3>
              <p className="text-xs text-slate-500">Manage vendor accounts, analysts, and access permissions</p>
            </div>
            <input
              type="text"
              placeholder="Search user, email, or company..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs w-64 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-3">User ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-tormax-borderDark font-medium">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                    <td className="p-3 font-mono font-bold text-slate-500">{u.id}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      {u.name}
                      <div className="text-[11px] text-slate-400 font-normal">{u.email}</div>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">{u.company}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                          u.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-red-500/10 text-red-600 dark:text-red-400'
                        }`}
                      >
                        ● {u.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded hover:bg-slate-200 cursor-pointer text-xs"
                      >
                        {u.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: WEBSCRAPING (SCRAPERAPI) */}
      {activeTab === 'scraping' && (
        <div className="space-y-6">
          {/* ScraperAPI Configuration Box */}
          <div className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-4 shadow-sm">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h3 className="font-bold text-base font-display text-slate-900 dark:text-white">
                  ScraperAPI Proxy & Ingestion Daemon Settings
                </h3>
                <p className="text-xs text-slate-500">
                  Routes automated headless requests through anti-bot & IP rotation proxies
                </p>
              </div>
              <span className="text-xs font-mono bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full font-bold">
                API Status: Connected
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">ScraperAPI Key</label>
                <input
                  type="password"
                  value={scraperApiKey}
                  onChange={(e) => setScraperApiKey(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center space-x-3 pt-6">
                <input
                  type="checkbox"
                  id="renderJs"
                  checked={renderJs}
                  onChange={(e) => setRenderJs(e.target.checked)}
                  className="w-4 h-4 rounded text-tormax-purple"
                />
                <label htmlFor="renderJs" className="font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Enable Headless JS Rendering (<code className="font-mono text-tormax-purple">render=true</code>)
                </label>
              </div>
            </div>
          </div>

          {/* Configured Government Targets */}
          <div className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-4 shadow-sm">
            <h3 className="font-bold text-base font-display text-slate-900 dark:text-white">
              Target Thai Procurement Portals
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-tormax-borderDark">
              {SCRAPING_TARGETS.map((target, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 dark:text-white text-xs">{target.name}</div>
                    <a
                      href={target.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-mono text-tormax-purple dark:text-tormax-lavender hover:underline truncate block max-w-xl"
                    >
                      {target.url}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded">
                      {target.frequency}
                    </span>
                    <button
                      onClick={() => addLog('SCRAPE', `Polled target: ${target.name}`)}
                      className="px-3 py-1 bg-tormax-purple text-white font-bold text-xs rounded-lg hover:bg-tormax-purpleDeep cursor-pointer"
                    >
                      Scrape Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* POPOVER / EDIT MODAL FOR TOR ITEM */}
      {editingTor && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-tormax-borderDark pb-3">
              <h3 className="text-lg font-black font-display text-slate-900 dark:text-white">
                Edit TOR Spec ({editingTor.id})
              </h3>
              <button
                onClick={() => setEditingTor(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Project Name</label>
                <input
                  type="text"
                  value={editingTor.name}
                  onChange={(e) => setEditingTor({ ...editingTor, name: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Employer Agency</label>
                <input
                  type="text"
                  value={editingTor.employer}
                  onChange={(e) => setEditingTor({ ...editingTor, employer: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Budget Price Display</label>
                  <input
                    type="text"
                    value={editingTor.price}
                    onChange={(e) => setEditingTor({ ...editingTor, price: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Source Portal</label>
                  <input
                    type="text"
                    value={editingTor.sourcePortal}
                    onChange={(e) => setEditingTor({ ...editingTor, sourcePortal: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingTor(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-tormax-purple hover:bg-tormax-purpleDeep text-white rounded-xl font-bold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Realtime Operations Console */}
      <div className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-3 shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm font-display text-slate-900 dark:text-white">
            Ingestion & Vector Log Console
          </h3>
          <button
            onClick={() => setLogs([])}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            Clear Logs
          </button>
        </div>

        <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-[11px] space-y-2 h-40 overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id}>
              <span className="text-slate-500">[{log.time}]</span>{' '}
              <span
                className={`font-bold ${
                  log.type === 'ALERT'
                    ? 'text-amber-400'
                    : log.type === 'CREATE'
                    ? 'text-sky-400'
                    : log.type === 'SCRAPE'
                    ? 'text-purple-400'
                    : 'text-emerald-400'
                }`}
              >
                {log.type}
              </span>{' '}
              — {log.msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}