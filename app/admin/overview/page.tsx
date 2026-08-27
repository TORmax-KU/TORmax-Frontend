'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useApp } from '@/context/AppContext'; // Adjust path if necessary

// 24-hour Latency Telemetry Data
const LATENCY_HISTORICAL_DATA = [
  { time: '00:00', egp2: 240, cgd: 380, ocsc: 520, fda: 310 },
  { time: '03:00', egp2: 230, cgd: 395, ocsc: 540, fda: 295 },
  { time: '06:00', egp2: 250, cgd: 410, ocsc: 610, fda: 320 },
  { time: '09:00', egp2: 280, cgd: 450, ocsc: 890, fda: 340 }, // Spike on OCSC
  { time: '12:00', egp2: 245, cgd: 420, ocsc: 940, fda: 310 },
  { time: '15:00', egp2: 235, cgd: 405, ocsc: 780, fda: 305 },
  { time: '18:00', egp2: 240, cgd: 390, ocsc: 590, fda: 300 },
  { time: '21:00', egp2: 238, cgd: 385, ocsc: 530, fda: 298 },
];

interface NodeConfig {
  key: string;
  id: string;
  name: string;
  color: string;
  gradientId: string;
  avgLatency: string;
  p99: string;
  errorRate: string;
  status: 'Healthy' | 'Degraded';
}

const NODES: NodeConfig[] = [
  { key: 'egp2', id: 'NODE-01', name: 'BMA eGP2 Proxy', color: '#6366f1', gradientId: 'gradEgp2', avgLatency: '240ms', p99: '310ms', errorRate: '0.1%', status: 'Healthy' },
  { key: 'cgd', id: 'NODE-02', name: 'CGD Main Portal', color: '#10b981', gradientId: 'gradCgd', avgLatency: '410ms', p99: '580ms', errorRate: '0.4%', status: 'Healthy' },
  { key: 'ocsc', id: 'NODE-03', name: 'OCSC Procurement', color: '#ef4444', gradientId: 'gradOcsc', avgLatency: '890ms', p99: '1420ms', errorRate: '7.9%', status: 'Degraded' },
  { key: 'fda', id: 'NODE-04', name: 'FDA MOPH Node', color: '#f59e0b', gradientId: 'gradFda', avgLatency: '310ms', p99: '420ms', errorRate: '0.2%', status: 'Healthy' },
];

const i18n = {
  en: {
    backToAdmin: 'Back to Admin Console',
    title: 'Proxy Latency & Diagnostic Overview',
    subtitle: 'Real-time proxy node health metrics, response latency distributions, and root-cause indicators',
    nodeDegraded: '1 Node Degraded',
    runPing: 'Run Full Ping Diagnostic',
    rootCauseTitle: 'Root-Cause Detected: ',
    rootCauseMsg: 'High P99 latency spike (890ms) & 7.9% drop rate detected on target node NODE-03 (OCSC Procurement) around 09:00 AM.',
    avgLatency: 'Avg Latency',
    errorRate: 'Error Rate',
    latencyTrendTitle: 'Proxy Network Latency Trend (24h)',
    latencyTrendSub: 'Response latency (ms) over time',
    allNodes: 'All Nodes',
    distributionTitle: 'Latency Distribution (P50 vs P99)',
    distributionSub: 'Filtered P50 vs P99 comparison',
    incidentTitle: 'Incident Diagnostic & Auto-Healing Activity Log',
    alertTriggered: '[ALERT TRIGGERED]',
    alertMsg: 'High tail latency on NODE-03. P99 reached 1,420ms (Threshold: 600ms).',
    autoHeal: '[AUTO-HEAL]',
    autoHealMsg: 'ScraperAPI dynamic IP rotation engaged for host',
    diagnostic: '[DIAGNOSTIC]',
    diagnosticMsg: 'Direct ping probe to rest of nodes (NODE-01, NODE-02, NODE-04) returned normal latency under 400ms.',
    pingAlert: 'Diagnostic ping executed across all nodes.',
    statusHealthy: 'Healthy',
    statusDegraded: 'Degraded',
  },
  th: {
    backToAdmin: 'กลับสู่ระบบจัดการ',
    title: 'ภาพรวมการตรวจสอบและเวลาตอบสนองของพร็อกซี',
    subtitle: 'ตัวชี้วัดความสมบูรณ์ของโหนดพร็อกซีแบบเรียลไทม์ การกระจายความล่าช้า และตัวบ่งชี้สาเหตุหลัก',
    nodeDegraded: '1 โหนดทำงานผิดปกติ',
    runPing: 'ทดสอบการเชื่อมต่อทุกโหนด',
    rootCauseTitle: 'ตรวจพบสาเหตุหลัก: ',
    rootCauseMsg: 'พบความล่าช้า P99 สูงผิดปกติ (890ms) และอัตราข้อมูลสูญหาย 7.9% ที่โหนด NODE-03 (OCSC Procurement) เวลาประมาณ 09:00 น.',
    avgLatency: 'ความล่าช้าเฉลี่ย',
    errorRate: 'อัตราข้อผิดพลาด',
    latencyTrendTitle: 'แนวโน้มความล่าช้าของเครือข่ายพร็อกซี (24 ชม.)',
    latencyTrendSub: 'ระยะเวลาตอบสนอง (มิลลิวินาที) ตามช่วงเวลา',
    allNodes: 'ทุกโหนด',
    distributionTitle: 'การกระจายความล่าช้า (P50 เปรียบเทียบ P99)',
    distributionSub: 'การเปรียบเทียบค่า P50 และ P99 ของโหนดที่เลือก',
    incidentTitle: 'บันทึกการวินิจฉัยอุบัติการณ์และการแก้ไขอัตโนมัติ',
    alertTriggered: '[แจ้งเตือน]',
    alertMsg: 'พบความล่าช้าสูงที่ปลายทางโหนด NODE-03 ค่า P99 สูงถึง 1,420ms (เกณฑ์มาตรฐาน: 600ms)',
    autoHeal: '[แก้ไขอัตโนมัติ]',
    autoHealMsg: 'ระบบหมุนเวียน IP อัตโนมัติของ ScraperAPI เริ่มทำงานสำหรับโฮสต์',
    diagnostic: '[การวินิจฉัย]',
    diagnosticMsg: 'การทดสอบปิงไปยังโหนดที่เหลือ (NODE-01, NODE-02, NODE-04) ได้รับค่าความล่าช้าปกติไม่เกิน 400ms',
    pingAlert: 'ดำเนินการทดสอบปิงทุกโหนดเรียบร้อยแล้ว',
    statusHealthy: 'ปกติ',
    statusDegraded: 'เฝ้าระวัง',
  },
};

export default function OverviewPage() {
  const { lang: contextLang } = useApp();
  const lang = (contextLang?.toLowerCase() as 'en' | 'th') || 'en';
  const t = i18n[lang];

  // State for active node isolation filter ("all" or key of specific node)
  const [activeNodeKey, setActiveNodeKey] = useState<string>('all');

  // Filter nodes according to selected filter state
  const visibleNodes = activeNodeKey === 'all' 
    ? NODES 
    : NODES.filter((node) => node.key === activeNodeKey);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 w-full space-y-8 bg-base-100 text-base-content min-h-screen">
      {/* Header Toolbar with Back to Admin Button */}
      <div className="border-b border-base-300 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <Link href="/admin" className="btn btn-outline btn-sm gap-2 font-bold text-base-content">
              <i className="ri-arrow-left-line text-base"></i>
              {t.backToAdmin}
            </Link>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2 text-base-content">
              <i className="ri-pulse-fill text-warning"></i>
              {t.title}
            </h1>
          </div>
          <p className="text-xs text-base-content/70 mt-1 pl-1">
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge badge-warning badge-sm gap-1 font-mono font-bold">
            <i className="ri-alert-line"></i> {t.nodeDegraded}
          </span>
          <button 
            onClick={() => alert(t.pingAlert)}
            className="btn btn-primary btn-sm gap-2"
          >
            <i className="ri-radar-line"></i> {t.runPing}
          </button>
        </div>
      </div>

      {/* Incident Quick-Look Alert Banner */}
      <div className="alert alert-warning shadow-sm border border-warning/30 text-xs">
        <i className="ri-alert-fill text-lg"></i>
        <div>
          <span className="font-bold uppercase tracking-wider">{t.rootCauseTitle}</span>
          <span className="font-medium">{t.rootCauseMsg}</span>
        </div>
      </div>

      {/* Node Status Summary Cards (Clickable for Instant Filtering) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {NODES.map((node) => {
          const isSelected = activeNodeKey === node.key;
          return (
            <div
              key={node.id}
              onClick={() => setActiveNodeKey(isSelected ? 'all' : node.key)}
              className={`card bg-base-100 border p-4 shadow-sm cursor-pointer transition-all ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20'
                  : node.status === 'Degraded'
                  ? 'border-error/50 bg-error/10'
                  : 'border-base-300 hover:border-primary/50'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono font-bold text-base-content/60">{node.id}</span>
                <span className={`badge badge-xs font-bold ${node.status === 'Healthy' ? 'badge-success' : 'badge-error'}`}>
                  {node.status === 'Healthy' ? t.statusHealthy : t.statusDegraded}
                </span>
              </div>
              <div className="mt-2">
                <h4 className="font-bold text-sm truncate text-base-content">{node.name}</h4>
                <div className="flex justify-between items-baseline mt-2">
                  <div>
                    <div className="text-[10px] text-base-content/60 uppercase">{t.avgLatency}</div>
                    <div className={`text-lg font-mono font-black ${node.status === 'Degraded' ? 'text-error' : 'text-base-content'}`}>
                      {node.avgLatency}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-base-content/60 uppercase">{t.errorRate}</div>
                    <div className={`text-xs font-mono font-bold ${parseFloat(node.errorRate) > 2 ? 'text-error' : 'text-success'}`}>
                      {node.errorRate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Latency Charts Section with Node Isolation Filter Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Historical Latency Chart */}
        <div className="lg:col-span-2 card bg-base-100 border border-base-300 shadow-sm p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-base-300 pb-3">
            <div>
              <h3 className="font-bold text-sm flex items-center gap-2 text-base-content">
                <i className="ri-line-chart-line text-primary"></i>
                {t.latencyTrendTitle}
              </h3>
              <p className="text-xs text-base-content/70">{t.latencyTrendSub}</p>
            </div>

            {/* Interactive Node Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setActiveNodeKey('all')}
                className={`btn btn-xs ${activeNodeKey === 'all' ? 'btn-neutral' : 'btn-ghost text-base-content'}`}
              >
                {t.allNodes}
              </button>
              {NODES.map((node) => (
                <button
                  key={node.key}
                  onClick={() => setActiveNodeKey(node.key)}
                  className={`btn btn-xs gap-1 ${
                    activeNodeKey === node.key ? 'btn-primary' : 'btn-outline text-base-content'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: node.color }}
                  ></span>
                  {node.id}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LATENCY_HISTORICAL_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  {NODES.map((node) => (
                    <linearGradient key={node.gradientId} id={node.gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={node.color} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={node.color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'currentColor' }} />
                <YAxis tick={{ fontSize: 11, fill: 'currentColor' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-base-200, #1e293b)',
                    borderColor: 'var(--tormax-border-dark, #334155)',
                    borderRadius: '0.5rem',
                    fontSize: '11px',
                    color: 'var(--foreground, #f8fafc)',
                  }}
                />
                <ReferenceLine
                  y={600}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  label={{ value: 'SLA 600ms', fill: '#ef4444', fontSize: 10 }}
                />

                {visibleNodes.map((node) => (
                  <Area
                    key={node.key}
                    type="monotone"
                    dataKey={node.key}
                    stroke={node.color}
                    fill={`url(#${node.gradientId})`}
                    strokeWidth={2}
                    name={node.name}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latency Percentile Distribution */}
        <div className="card bg-base-100 border border-base-300 shadow-sm p-5 space-y-4">
          <div className="border-b border-base-300 pb-3">
            <h3 className="font-bold text-sm flex items-center gap-2 text-base-content">
              <i className="ri-bar-chart-2-line text-secondary"></i>
              {t.distributionTitle}
            </h3>
            <p className="text-xs text-base-content/70">{t.distributionSub}</p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={visibleNodes.map((n) => ({
                  name: n.id,
                  p50: parseInt(n.avgLatency),
                  p99: parseInt(n.p99),
                }))}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'currentColor' }} />
                <YAxis tick={{ fontSize: 10, fill: 'currentColor' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-base-200, #1e293b)',
                    borderColor: 'var(--tormax-border-dark, #334155)',
                    borderRadius: '0.5rem',
                    fontSize: '11px',
                    color: 'var(--foreground, #f8fafc)',
                  }}
                />
                <Bar dataKey="p50" fill="#6366f1" name="P50 Median (ms)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="p99" fill="#f43f5e" name="P99 Max (ms)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Incident Log Timeline */}
      <div className="card bg-base-100 border border-base-300 shadow-sm p-5 space-y-3">
        <h3 className="font-bold text-sm flex items-center gap-2 text-base-content">
          <i className="ri-history-line text-info"></i>
          {t.incidentTitle}
        </h3>

        <div className="space-y-3 text-xs pt-2">
          <div className="flex gap-4 items-start border-l-2 border-error pl-4 py-1">
            <span className="font-mono text-base-content/60 whitespace-nowrap">09:12:44 AM</span>
            <div className="text-base-content">
              <span className="font-bold text-error uppercase">{t.alertTriggered}</span> {t.alertMsg}
            </div>
          </div>
          <div className="flex gap-4 items-start border-l-2 border-warning pl-4 py-1">
            <span className="font-mono text-base-content/60 whitespace-nowrap">09:14:02 AM</span>
            <div className="text-base-content">
              <span className="font-bold text-warning uppercase">{t.autoHeal}</span> {t.autoHealMsg}{' '}
              <code className="font-mono bg-base-200 px-1 py-0.5 rounded border border-base-300">egp.ocsc.go.th</code>.
            </div>
          </div>
          <div className="flex gap-4 items-start border-l-2 border-success pl-4 py-1">
            <span className="font-mono text-base-content/60 whitespace-nowrap">09:15:30 AM</span>
            <div className="text-base-content">
              <span className="font-bold text-success uppercase">{t.diagnostic}</span> {t.diagnosticMsg}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}