'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { initialTORs } from '@/utils/mockData';
import { TORItem } from '@/types';

interface LogEntry {
  id: string;
  time: string;
  type: 'SYNC' | 'CREATE' | 'ALERT';
  msg: string;
}

export default function AdminPage() {
  const [torList, setTorList] = useState<TORItem[]>(initialTORs);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      time: new Date().toLocaleTimeString(),
      type: 'SYNC',
      msg: 'System booted. Multi-source daemon actively monitoring 4 portal endpoints.',
    },
  ]);

  // Helper to prepend log messages
  const addLog = (type: LogEntry['type'], msg: string) => {
    const newEntry: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      time: new Date().toLocaleTimeString(),
      type,
      msg,
    };
    setLogs((prev) => [newEntry, ...prev]);
  };

  // Action: Force Sync All Portals
  const triggerManualSyncAll = () => {
    addLog(
      'SYNC',
      'Manual multi-portal sync triggered by Superadmin. Contacted 4 source endpoints.'
    );
    alert('Manual synchronization completed across all 4 TOR portal endpoints!');
  };

  // Action: Create New Mock TOR Spec
  const createNewMockTOR = () => {
    const newId = `TOR-670${Math.floor(1000 + Math.random() * 9000)}`;
    const newTOR: TORItem = {
      id: newId,
      price: '฿ 12,000,000 THB',
      rawPrice: 12000000,
      sourcePortal: 'Direct Ministry Tender Boards',
      name: 'Enterprise Data Analytics Platform for Agricultural Planning',
      employer: 'Ministry of Agriculture and Cooperatives',
      tags: ['Software', 'Data'],
      matchScore: 88,
      deadline: '15 Days Remaining',
      desc: 'Cloud-native analytics platform for satellite crop yield monitoring and predictive supply chain modeling.',
      method: 'e-Bidding',
      requirements: [
        { text: 'Registered capital of at least ฿5,000,000 THB', pass: true },
        { text: 'ISO 9001 or ISO 27001 Certification', pass: true },
      ],
      feasibility: {
        budgetFit: 90,
        securityFit: 90,
        techStack: 85,
        timelineFit: 80,
        localPresence: 100,
      },
    };

    setTorList((prev) => [newTOR, ...prev]);
    addLog('CREATE', `Created new manual TOR spec: ${newId}`);
  };

  // Action: Delete Single TOR Entry
  const deleteTOR = (id: string) => {
    if (confirm(`Are you sure you want to delete ${id} from the active database?`)) {
      setTorList((prev) => prev.filter((t) => t.id !== id));
      addLog('ALERT', `Manually deleted TOR entry: ${id}`);
    }
  };

  // Action: Clear Console Logs
  const clearSystemLogs = () => {
    setLogs([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 w-full space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 dark:border-tormax-borderDark pb-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-display text-tormax-purple dark:text-tormax-lavender tracking-tight">
            TORmax System Operations Admin
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Master operational control panel for multi-source procurement ingestion engines & tenant vector models
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full font-bold border border-emerald-500/30">
            ● Multi-Source Daemon Active
          </span>
          <button
            onClick={triggerManualSyncAll}
            className="px-4 py-2 bg-tormax-purple text-white text-xs font-bold rounded-xl shadow hover:bg-tormax-purpleDeep transition-all active:scale-95 cursor-pointer"
          >
            Force Multi-Sync ⚡
          </button>
        </div>
      </div>

      {/* Telemetry Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-2 shadow-sm">
          <div className="text-xs font-bold text-slate-400">Connected Source Portals</div>
          <div className="text-3xl font-black font-display text-emerald-500">4 Portals</div>
          <p className="text-[11px] text-slate-500">e-GP, Open API, SRT, MDES</p>
        </div>

        <div className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-2 shadow-sm">
          <div className="text-xs font-bold text-slate-400">Total Indexed Specs</div>
          <div className="text-3xl font-black font-display text-slate-900 dark:text-white">
            {torList.length} Active
          </div>
          <p className="text-[11px] text-slate-500">Across all Thai ministries</p>
        </div>

        <div className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-2 shadow-sm">
          <div className="text-xs font-bold text-slate-400">Vector Match Model</div>
          <div className="text-3xl font-black font-display text-tormax-purple dark:text-tormax-lavender">
            v3.4 Neural
          </div>
          <p className="text-[11px] text-slate-500">96.2% precision score</p>
        </div>

        <div className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-2 shadow-sm">
          <div className="text-xs font-bold text-slate-400">Active Vendor Subscriptions</div>
          <div className="text-3xl font-black font-display text-amber-500">1,240 Enterprise</div>
          <p className="text-[11px] text-slate-500">Daily Digest recipients</p>
        </div>
      </div>

      {/* Portal Connector Status Grid */}
      <div className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-4 shadow-sm">
        <h3 className="font-bold text-sm font-display text-slate-900 dark:text-white">
          Multi-Portal Ingestion Connector Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100">
                🌐 Central Public e-GP Portal API
              </div>
              <div className="text-[11px] text-slate-500">
                Interval: Every 15 mins • Polled 14 items recently
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold rounded">
              HEALTHY
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100">
                🔗 Open Procurement Data Portal API
              </div>
              <div className="text-[11px] text-slate-500">
                Interval: Every 30 mins • Polled 8 items recently
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold rounded">
              HEALTHY
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100">
                🚂 State Enterprise Bidding Portals (SRT / EGAT)
              </div>
              <div className="text-[11px] text-slate-500">
                Interval: Every 60 mins • Scraped 6 items recently
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold rounded">
              HEALTHY
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100">
                🏢 Direct Ministry Tender Boards (MDES)
              </div>
              <div className="text-[11px] text-slate-500">Interval: Every 2 hours • Sync OK</div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold rounded">
              HEALTHY
            </span>
          </div>
        </div>
      </div>

      {/* Ingested Documents Database Table */}
      <div className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-4 shadow-sm">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h3 className="font-bold text-base font-display text-slate-900 dark:text-white">
              Ingested Procurement Document Database
            </h3>
            <p className="text-xs text-slate-500">
              Manage, edit, or archive multi-portal TOR specifications in the live database.
            </p>
          </div>
          <button
            onClick={createNewMockTOR}
            className="px-3.5 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-all active:scale-95 cursor-pointer"
          >
            + Add Manual TOR Spec
          </button>
        </div>

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
                  <td className="p-3 text-right space-x-3">
                    <Link
                      href={`/tor-page/${t.id}`}
                      className="text-tormax-purple dark:text-tormax-lavender underline font-bold hover:opacity-80"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => deleteTOR(t.id)}
                      className="text-red-500 hover:underline font-bold cursor-pointer"
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

      {/* Realtime Operations Console */}
      <div className="bg-white dark:bg-tormax-surfaceDark p-6 rounded-2xl border border-slate-200 dark:border-tormax-borderDark space-y-3 shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm font-display text-slate-900 dark:text-white">
            Realtime Ingestion & Vector Log Console
          </h3>
          <button
            onClick={clearSystemLogs}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            Clear Logs
          </button>
        </div>

        <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-[11px] space-y-2 h-40 overflow-y-auto">
          {logs.length === 0 ? (
            <div className="text-slate-500">Console logs cleared.</div>
          ) : (
            logs.map((log) => (
              <div key={log.id}>
                <span className="text-slate-500">[{log.time}]</span>{' '}
                <span
                  className={`font-bold ${
                    log.type === 'ALERT'
                      ? 'text-amber-400'
                      : log.type === 'CREATE'
                      ? 'text-sky-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {log.type}
                </span>{' '}
                — {log.msg}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}