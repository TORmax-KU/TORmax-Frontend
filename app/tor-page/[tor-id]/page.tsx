'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { initialTORs } from '@/utils/mockData';
import { useApp } from '@/context/AppContext'; // Adjust path based on your context setup

export default function TORDetailPage() {
  const router = useRouter();
  const routeParams = useParams();
  const { t } = useApp();

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

  const userProfile = { companyName: 'Acme Innovations Ltd.' };
  const passCount = tor.requirements?.filter((r) => r.pass).length ?? 0;
  const totalReqs = tor.requirements?.length ?? 1;
  const passPct = Math.round((passCount / totalReqs) * 100);

  const handleSubmitBid = () => {
    alert(`Redirecting to official portal site: ${tor.sourcePortal}...`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Immersive Header */}
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
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-700 dark:text-amber-300 font-semibold">
            ℹ️ <strong>Multi-Portal Ingestion Note:</strong> Synchronized from{' '}
            <strong>{tor.sourcePortal}</strong>.
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
                <strong className="font-bold text-slate-800 dark:text-slate-200">{tor.method}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Submission Deadline:</span>
                <strong className="font-bold text-emerald-600 dark:text-emerald-400">
                  {tor.deadline}
                </strong>
              </div>
            </div>
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

            <div className="space-y-3">
              {tor.requirements?.map((req, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start space-x-3 text-xs ${
                    req.pass
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-amber-500/30 bg-amber-500/5'
                  }`}
                >
                  <span
                    className={`text-base font-bold ${
                      req.pass ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {req.pass ? '✓' : '⚠️'}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {req.text}
                    </p>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {req.pass
                        ? 'Verified via Corporate Profile Credentials'
                        : 'Gap Identified: Update profile credentials'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar: Feasibility */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-6 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-tormax-purple dark:text-tormax-lavender">
              Bidding Feasibility Matrix
            </h3>
            <div className="space-y-4 pt-2 text-xs font-semibold">
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

          <div className="p-6 bg-tormax-purple/10 border border-tormax-purple/30 rounded-2xl space-y-3">
            <button
              onClick={handleSubmitBid}
              className="w-full py-3 bg-tormax-purple hover:bg-tormax-purpleDeep text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Submit Bid Proposal via {tor.sourcePortal} ↗
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}