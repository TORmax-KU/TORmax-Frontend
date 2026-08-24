'use client';

import React, { useState } from 'react';
import { initialTORs, initialLogs } from '@/utils/mockData';
import { TORItem, SystemLog } from '@/types';

export default function AdminPage() {
    const [tors, setTors] = useState<TORItem[]>(initialTORs);
    const [logs, setLogs] = useState<SystemLog[]>(initialLogs);

    const handleDelete = (id: string) => {
        if (confirm(`Are you sure you want to delete ${id}?`)) {
            setTors(tors.filter(t => t.id !== id));
            const now = new Date().toLocaleTimeString();
            setLogs([{ time: now, type: 'ALERT', msg: `Manually deleted TOR: ${id}` }, ...logs]);
        }
    };

    const handleManualSync = () => {
        const now = new Date().toLocaleTimeString();
        setLogs([{ time: now, type: 'SYNC', msg: 'Manual multi-portal sync triggered.' }, ...logs]);
        alert('Synchronization complete across endpoints!');
    };

    return (
        <div className="max-w-6xl mx-auto px-8 py-10 w-full space-y-8">
            <div className="border-b border-slate-200 dark:border-[#2D2938] pb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-[#5B3E96] dark:text-[#9B82C1]">TORmax System Operations Admin</h1>
                    <p className="text-xs text-slate-500 mt-1">Multi-source procurement ingestion engine controls</p>
                </div>
                <button onClick={handleManualSync} className="px-4 py-2 bg-[#5B3E96] text-white text-xs font-bold rounded-xl shadow">
                    Force Multi-Sync ⚡
                </button>
            </div>

            <div className="bg-white dark:bg-[#1C1A24] p-6 rounded-2xl border border-slate-200 dark:border-[#2D2938] space-y-4 shadow-sm">
                <h3 className="font-bold text-base">Ingested Procurement Specs</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                        <thead class="bg-[#5B3E96] text-white uppercase text-[11px]">
                            <tr>
                                <th className="p-3">ID</th>
                                <th className="p-3">Source</th>
                                <th className="p-3">Title</th>
                                <th className="p-3">Price</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-[#2D2938]">
                            {tors.map(t => (
                                <tr key={t.id}>
                                    <td className="p-3 font-bold">{t.id}</td>
                                    <td className="p-3 text-[#5B3E96] dark:text-[#9B82C1] font-bold">{t.sourcePortal}</td>
                                    <td className="p-3 font-sans">{t.name}</td>
                                    <td className="p-3 font-bold">{t.price}</td>
                                    <td className="p-3 text-right">
                                        <button onClick={() => handleDelete(t.id)} className="text-red-500 font-bold hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1C1A24] p-6 rounded-2xl border border-slate-200 dark:border-[#2D2938] space-y-3 shadow-sm">
                <h3 className="font-bold text-sm">Ingestion Log Console</h3>
                <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-[11px] space-y-2 h-40 overflow-y-auto">
                    {logs.map((l, i) => (
                        <div key={i}>
                            <span className="text-slate-500">[{l.time}]</span>{' '}
                            <span className={l.type === 'ALERT' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>{l.type}</span> — {l.msg}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}