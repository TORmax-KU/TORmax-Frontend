'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { initialTORs, calculatePassRate } from '@/utils/mockData';

export default function TORDetailPage() {
  const router = useRouter();
  const routeParams = useParams();
  const { t } = useApp();

  const targetId = routeParams?.['tor-id'] as string;
  const tor = initialTORs.find((item) => item.id === targetId);

  if (!tor) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center space-y-4">
        <h2 className="text-xl font-bold">{t('notFound')}</h2>
        <button onClick={() => router.push('/search-feed')} className="text-xs text-[#5B3E96] font-bold underline">
          {t('backToDirectory')}
        </button>
      </div>
    );
  }

  const { count, percentage } = calculatePassRate(tor.requirements);

  return (
    <div className="max-w-5xl mx-auto px-8 py-10 w-full space-y-8">
      <button onClick={() => router.back()} className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white">
        {t('backToList')}
      </button>

      <header className="bg-white dark:bg-[#1C1A24] border border-slate-200 dark:border-[#2D2938] rounded-3xl p-8 space-y-4 shadow-sm">
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className="text-xs font-bold text-[#5B3E96] dark:text-[#9B82C1]">{tor.id} • {tor.method}</span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{tor.name}</h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">{tor.employer}</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-[#5B3E96] dark:text-[#9B82C1]">{tor.matchScore}%</span>
            <span className="block text-[10px] uppercase font-bold text-slate-400">{t('matchConfidence')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-[#2D2938] text-xs">
          <div>
            <span className="block text-slate-400 font-medium">{t('estimatedBudget')}</span>
            <span className="font-black text-slate-900 dark:text-white">{tor.price}</span>
          </div>
          <div>
            <span className="block text-slate-400 font-medium">{t('submissionWindow')}</span>
            <span className="font-bold text-emerald-500">{tor.deadline}</span>
          </div>
          <div>
            <span className="block text-slate-400 font-medium">{t('sourceOrigin')}</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{tor.sourcePortal}</span>
          </div>
          <div>
            <span className="block text-slate-400 font-medium">{t('requirementClearance')}</span>
            <span className="font-bold text-slate-900 dark:text-white">{count}/{tor.requirements.length} ({percentage}%)</span>
          </div>
        </div>
      </header>

      <section className="bg-white dark:bg-[#1C1A24] border border-slate-200 dark:border-[#2D2938] rounded-3xl p-8 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">{t('projectScope')}</h2>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{tor.desc}</p>
      </section>

      <section className="bg-white dark:bg-[#1C1A24] border border-slate-200 dark:border-[#2D2938] rounded-3xl p-8 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">{t('requirementsAudit')}</h2>
        <div className="space-y-3 text-xs">
          {tor.requirements.map((req, idx) => (
            <div key={idx} className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#121118] border border-slate-100 dark:border-[#2D2938] gap-4">
              <span className="font-medium text-slate-800 dark:text-slate-200">{req.text}</span>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold shrink-0 ${req.pass ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                {req.pass ? t('passed') : t('missing')}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}