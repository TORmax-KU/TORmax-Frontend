'use client';

import { useState, useEffect } from 'react';
import { initialTORs } from '@/utils/mockData';
import { TORItem } from '@/types';
import { Language } from '@/public/mockData/Language';
import { LogEntry } from '@/interface/LogEntry';
import { INITIAL_USERS } from '@/public/mockData/InitialUsers';

type TabKey = 'ops' | 'users' | 'scraping' | 'diagnostics' | 'logs';

export function useAdmin(activeLang: Language, t: any) {
  const [activeTab, setActiveTab] = useState<TabKey>('ops');
  const currentTORs = initialTORs[activeLang] || initialTORs.en || [];
  const [torList, setTorList] = useState<TORItem[]>(currentTORs);
  const [users, setUsers] = useState(INITIAL_USERS);
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

  useEffect(() => {
    setTorList(initialTORs[activeLang] || initialTORs.en || []);
  }, [activeLang]);

  const addLog = (type: LogEntry['type'], msg: string) => {
    setLogs((prev) => [
      { id: Math.random().toString(36).substring(2, 9), time: new Date().toLocaleTimeString(), type, msg },
      ...prev,
    ]);
  };

  const triggerManualSyncAll = () => {
    addLog('SCRAPE', 'ScraperAPI global ingestion executed across all target nodes.');
    alert(t.syncSuccess || 'ScraperAPI ingestion completed across all target portals!');
  };

  const runNetworkDiagnostic = (domain: string) => {
    addLog('DIAGNOSTIC', `Ping & SSL Handshake diagnostic passed for target domain: ${domain}`);
  };

  const deleteTOR = (id: string) => {
    if (confirm(t.confirmDelete || `Confirm purge of TOR record ${id}?`)) {
      setTorList((prev) => prev.filter((item) => item.id !== id));
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

  const handleEditChange = (field: keyof TORItem, value: any) => {
    if (!editingTor) return;
    setEditingTor({ ...editingTor, [field]: value });
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

  const clearLogs = () => setLogs([]);

  return {
    activeTab,
    setActiveTab,
    torList,
    users,
    editingTor,
    setEditingTor,
    userQuery,
    setUserQuery,
    scraperApiKey,
    setScraperApiKey,
    renderJs,
    setRenderJs,
    ultraPremiumProxies,
    setUltraPremiumProxies,
    logs,
    filteredUsers,
    addLog,
    triggerManualSyncAll,
    runNetworkDiagnostic,
    deleteTOR,
    handleSaveEdit,
    handleEditChange,
    toggleUserStatus,
    clearLogs,
  };
}