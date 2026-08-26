'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { initialTORs } from '@/utils/mockData';
import { useApp } from '@/context/AppContext';

export default function TORDetailPage() {
  const router = useRouter();
  const routeParams = useParams();
  const { t } = useApp();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const targetId = routeParams?.['tor-id'] as string;
  const tor = initialTORs.find((item) => item.id === targetId);

  // 404 Fallback using localized strings
  if (!tor) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {t('notFound')}
        </h2>
        <button
          onClick={() => router.push('/search-feed')}
          className="text-xs text-[#5B3E96] font-bold underline cursor-pointer hover:opacity-80 transition-opacity"
        >
          {t('backToDirectory')}
        </button>
      </div>
    );
  }

  // Company profile data for quick-copy reference modal
  const userProfile = {
    companyName: 'Acme Innovations Ltd.',
    taxId: '0105563012948',
    dunsNumber: '65-432-8901',
    primaryContact: 'Alex Rivera (VP of GovTech)',
    email: 'bids@acmeinnovations.io',
    phone: '+66 2 890 1234',
    bankAccount: 'Bangkok Bank #102-3-48192-0',
  };

  const passCount = tor.requirements?.filter((r) => r.pass).length ?? 0;
  const totalReqs = tor.requirements?.length ?? 1;
  const passPct = Math.round((passCount / totalReqs) * 100);

  // Deliverables / Objectives list
  const projectDeliverables = tor.deliverables || [
    'System Architecture Design & Infrastructure Roadmap Document',
    'High-Availability Microservices Integration & Data Pipeline Setup',
    'ISO/IEC 27001 Security Audit & Automated Compliance Penetration Test',
    'User Acceptance Testing (UAT) & Administrative Training Handover',
    '24/7 SLA Maintenance Support during 12-Month Post-Launch Guarantee',
  ];

  // Domain skills & tags
  const tags = tor.tags || [
    'Cloud Migration',
    'Enterprise Procurement',
    'Cybersecurity',
    'API Integration',
    'GovTech Standard',
  ];

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-16">
      {/* Restored Immersive Header */}
      <header className="bg-slate-900 text-white min-h-[260px] px-6 sm:px-8 py-10 flex flex-col justify-center border-b border-slate-800">
        <div className="max-w-5xl mx-auto w-full space-y-3">
          <div className="flex items-center space-x-3 text-xs font-mono">
            <Link
              href="/search-feed"
              className="text-tormax-lavender hover:underline transition-colors"
            >
              ← {t('backToDirectory')}
            </Link>
            <span>/</span>
            <span className="text-slate-400">{tor.id}</span>
            <span>/</span>
            <span className="text-amber-400 font-bold">{tor.sourcePortal}</span>
          </div>
          <div className="text-3xl md:text-5xl font-black font-display text-tormax-lavender tracking-tight">
            {tor.price}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {tor.name}
          </h1>
          <p className="text-sm font-semibold text-slate-300">🏛️ {tor.employer}</p>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details & Checklist */}
        <div className="lg:col-span-2 space-y-8">
          {/* Multi-Portal Ingestion Banner */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-700 dark:text-amber-300 font-semibold flex items-center justify-between">
            <div>
              ℹ️ <strong>Multi-Portal Ingestion Note:</strong> Synchronized from{' '}
              <strong>{tor.sourcePortal}</strong>.
            </div>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="text-xs text-[#5B3E96] dark:text-tormax-lavender font-bold underline hover:opacity-80 transition-opacity"
            >
              Submission Portal ↗
            </button>
          </div>

          {/* Project Summary */}
          <section className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-6 rounded-2xl space-y-3 shadow-sm">
            <h2 className="text-sm font-bold font-display uppercase tracking-wider text-tormax-purple dark:text-tormax-lavender">
              Project Summary & Objectives
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {tor.desc}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-3 text-xs border-t border-slate-100 dark:border-tormax-borderDark">
              <div>
                <span className="text-slate-400 block">Bidding Method:</span>
                <strong className="font-bold text-slate-800 dark:text-slate-200">
                  {tor.method || 'e-Bidding'}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block">Submission Deadline:</span>
                <strong className="font-bold text-emerald-600 dark:text-emerald-400">
                  {tor.deadline}
                </strong>
              </div>
            </div>
          </section>

          {/* Key Deliverables & Action Items */}
          <section className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-6 rounded-2xl space-y-4 shadow-sm">
            <h2 className="text-sm font-bold font-display uppercase tracking-wider text-tormax-purple dark:text-tormax-lavender flex items-center gap-2">
              <span>🎯</span> Key Scope & Deliverables
            </h2>
            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              {projectDeliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-tormax-purple dark:text-tormax-lavender font-bold text-xs">
                    {idx + 1}.
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Qualification & Mandate Checklist */}
          <section className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-6 rounded-2xl space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-tormax-borderDark pb-3">
              <div>
                <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  Qualification & Mandate Checklist
                </h2>
                <p className="text-xs text-slate-500">
                  Automated evaluation against {userProfile.companyName} profile credentials.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/settings/profile"
                  className="text-xs font-bold text-[#5B3E96] dark:text-tormax-lavender underline hover:opacity-80 transition-opacity flex items-center gap-1"
                >
                  <span>Update Profile Credentials</span>
                  <span>→</span>
                </Link>
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${
                    passPct >= 75
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {passCount}/{totalReqs} Passed ({passPct}%)
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {tor.requirements?.map((req, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start justify-between gap-4 text-xs ${
                    req.pass
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-amber-500/30 bg-amber-500/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`text-base font-bold ${
                        req.pass
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {req.pass ? '✓' : '⚠️'}
                    </span>
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {req.text}
                      </p>
                      <div>
                        {req.pass ? (
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            Verified via Corporate Profile Credentials
                          </span>
                        ) : (
                          <div className="flex items-center gap-1 text-[10px]">
                            <span className="text-amber-700 dark:text-amber-400 font-semibold">
                              Gap Identified:
                            </span>
                            <Link
                              href="/settings/profile"
                              className="font-bold text-amber-800 dark:text-amber-300 underline hover:text-[#5B3E96] dark:hover:text-tormax-lavender transition-colors flex items-center gap-0.5"
                            >
                              <span>Update company credentials</span>
                              <span className="text-xs">→</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                      req.pass
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {req.pass ? 'COMPLIANT' : 'GAP IDENTIFIED'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Submission Card */}
          <div className="p-6 bg-tormax-purple/10 border border-tormax-purple/30 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-tormax-purple dark:text-tormax-lavender">
              Proposal Submission
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              Submissions are processed on the official portal{' '}
              <strong className="text-amber-500">{tor.sourcePortal}</strong>.
            </p>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-3 bg-tormax-purple hover:bg-tormax-purpleDeep text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Submit Bid Proposal via {tor.sourcePortal}</span>
              <span>↗</span>
            </button>
          </div>

          {/* Bidding Feasibility Matrix */}
          <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-6 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-tormax-purple dark:text-tormax-lavender">
              Bidding Feasibility Matrix
            </h3>
            <div className="space-y-4 text-xs font-semibold">
              <div>
                <div className="flex justify-between text-[11px] mb-1 text-slate-700 dark:text-slate-300">
                  <span>Capital & Budget Fit</span>
                  <span className="font-bold">{tor.feasibility?.budgetFit ?? 0}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-tormax-purple h-full transition-all duration-500"
                    style={{ width: `${tor.feasibility?.budgetFit ?? 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 text-slate-700 dark:text-slate-300">
                  <span>Security & ISO Clearance</span>
                  <span className="font-bold">{tor.feasibility?.securityFit ?? 0}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-tormax-purple h-full transition-all duration-500"
                    style={{ width: `${tor.feasibility?.securityFit ?? 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Employer Contacts */}
          <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-6 rounded-2xl space-y-3 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-tormax-purple dark:text-tormax-lavender">
              Employer Contact Info
            </h3>
            <div className="text-xs space-y-2 text-slate-700 dark:text-slate-300 font-medium">
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                {tor.employer}
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span>👤</span>
                <span>Division of Public e-Procurement</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span>📧</span>
                <a
                  href="mailto:procurement@gov.th"
                  className="hover:underline text-tormax-purple dark:text-tormax-lavender font-mono"
                >
                  procurement@gov.th
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span>📞</span>
                <span className="font-mono">+66 2 123 4567 ext 89</span>
              </div>
            </div>
          </div>

          {/* Associated Skills & Tags */}
          <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-6 rounded-2xl space-y-3 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-tormax-purple dark:text-tormax-lavender">
              Required Skills & Tags
            </h3>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* QUICK-FILL & PORTAL LINK MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden space-y-5 p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Submit Proposal Reference
                </h3>
                <p className="text-xs text-slate-500">
                  Target: <strong>{tor.sourcePortal}</strong> ({tor.id})
                </p>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Use your registered corporate details below for quick copy-pasting into the official government portal form.
            </p>

            {/* Quick Copy Data Grid */}
            <div className="space-y-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              {[
                { label: 'Company Name', key: 'companyName', val: userProfile.companyName },
                { label: 'Tax Identification ID', key: 'taxId', val: userProfile.taxId },
                { label: 'DUNS Number', key: 'dunsNumber', val: userProfile.dunsNumber },
                { label: 'Primary Contact', key: 'primaryContact', val: userProfile.primaryContact },
                { label: 'Contact Email', key: 'email', val: userProfile.email },
                { label: 'Bank Account Ref', key: 'bankAccount', val: userProfile.bankAccount },
              ].map((field) => (
                <div
                  key={field.key}
                  className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60 last:border-0"
                >
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">
                      {field.label}
                    </span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {field.val}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(field.val, field.key)}
                    className="text-[11px] text-tormax-purple dark:text-tormax-lavender hover:underline font-bold px-2 py-1 rounded bg-tormax-purple/10 border border-tormax-purple/20"
                  >
                    {copiedField === field.key ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.gprocurement.go.th"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-tormax-purple hover:bg-tormax-purpleDeep text-white text-xs font-bold rounded-xl text-center shadow transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Official {tor.sourcePortal} Portal</span>
                <span>↗</span>
              </a>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}