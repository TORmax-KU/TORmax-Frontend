'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { torpagei18n } from '@/public/mockData/i18n/torpage';
import { Language } from '@/public/mockData/Language';
import { DeliverablesList } from '@/component/tordetail/DeliverablesList';
import { EmployerContact } from '@/component/tordetail/EmployerContact';
import { FeasibilityMatrix } from '@/component/tordetail/FeasibilityMatrix';
import { MultiPortalBanner } from '@/component/tordetail/MultiPortalBanner';
import { ProjectSummary } from '@/component/tordetail/ProjectSummary';
import { QualificationChecklist } from '@/component/tordetail/QualificationChecklist';
import { SkillsTags } from '@/component/tordetail/SkillsTags';
import { SubmissionCard } from '@/component/tordetail/SubmissionCard';
import { TORHeader } from '@/component/tordetail/TORHeader';
import { TORNotFound } from '@/component/tordetail/TORNotFound';
import { useTORDetail } from '@/component/tordetail/useTORDetail';
import { SubmissionModal } from '@/component/tordetail/SubmissionModal';

export default function TORDetailPage() {
  const { lang: contextLang } = useApp();
  const activeLang: Language = (contextLang?.toLowerCase() as Language) === 'th' ? 'th' : 'en';
  const t = torpagei18n[activeLang];

  const {
    tor,
    userProfile,
    passCount,
    totalReqs,
    passPct,
    projectDeliverables,
    tags,
    showSubmitModal,
    setShowSubmitModal,
  } = useTORDetail(activeLang);

  if (!tor) {
    return <TORNotFound notFound={t.notFound} backToDirectory={t.backToDirectory} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-16">
      <TORHeader
        id={tor.id}
        sourcePortal={tor.sourcePortal}
        price={tor.price}
        name={tor.name}
        employer={tor.employer}
        backToDirectory={t.backToDirectory}
      />

      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details & Checklist */}
        <div className="lg:col-span-2 space-y-8">
          <MultiPortalBanner
            sourcePortal={tor.sourcePortal}
            multiPortalNote={t.multiPortalNote}
            synchronizedFrom={t.synchronizedFrom}
            submissionPortal={t.submissionPortal}
            onSubmissionClick={() => setShowSubmitModal(true)}
          />

          <ProjectSummary
            desc={tor.desc}
            method={tor.method}
            deadline={tor.deadline}
            t={t}
          />

          <DeliverablesList
            deliverables={projectDeliverables}
            t={t}
          />

          <QualificationChecklist
            requirements={tor.requirements || []}
            companyName={userProfile.companyName}
            passCount={passCount}
            totalReqs={totalReqs}
            passPct={passPct}
            t={t}
          />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <SubmissionCard
            sourcePortal={tor.sourcePortal}
            t={t}
            onSubmitClick={() => setShowSubmitModal(true)}
          />

          <FeasibilityMatrix
            budgetFit={tor.feasibility?.budgetFit ?? 0}
            securityFit={tor.feasibility?.securityFit ?? 0}
            t={t}
          />

          <EmployerContact
            employer={tor.employer}
            t={t}
          />

          <SkillsTags
            tags={tags}
            t={t}
          />
        </div>
      </main>

      <SubmissionModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        sourcePortal={tor.sourcePortal}
        id={tor.id}
        userProfile={userProfile}
        t={t}
      />
    </div>
  );
}