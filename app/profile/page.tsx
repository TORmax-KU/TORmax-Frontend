'use client';

import React, { useState } from 'react';
import { initialProfile } from '@/utils/mockData';
import { UserProfile } from '@/types';
import { VectorMatcher } from '@/component/VectorMatcher';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Vendor credentials saved successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-10 w-full space-y-8">
      <header className="border-b border-slate-200 dark:border-[#2D2938] pb-4">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Vendor Qualifications & Preferences</h1>
        <p className="text-slate-500 text-xs mt-1">Manage company credentials, certifications, and vector preferences.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Identity */}
        <div className="bg-white dark:bg-[#1C1A24] border border-slate-200 dark:border-[#2D2938] p-8 rounded-3xl space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Corporate Identity Credentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <label className="font-bold text-slate-700 dark:text-slate-300">Company Name</label>
              <input 
                type="text" 
                value={profile.companyName} 
                onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#121118] border border-slate-200 dark:border-[#2D2938] font-semibold"
              />
            </div>
            <div className="space-y-2">
              <label className="font-bold text-slate-700 dark:text-slate-300">Commercial Tax ID</label>
              <input 
                type="text" 
                value={profile.taxId} 
                onChange={(e) => setProfile({ ...profile, taxId: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#121118] border border-slate-200 dark:border-[#2D2938] font-mono font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Certifications */}
        <div className="bg-white dark:bg-[#1C1A24] border border-slate-200 dark:border-[#2D2938] p-8 rounded-3xl space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Statutory Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <label className="p-4 rounded-2xl border border-slate-200 dark:border-[#2D2938] flex items-center justify-between cursor-pointer">
              <span className="font-bold">ISO/IEC 27001 Security</span>
              <input 
                type="checkbox" 
                checked={profile.iso27001} 
                onChange={(e) => setProfile({ ...profile, iso27001: e.target.checked })}
                className="w-5 h-5 accent-[#5B3E96]"
              />
            </label>
            <label className="p-4 rounded-2xl border border-slate-200 dark:border-[#2D2938] flex items-center justify-between cursor-pointer">
              <span className="font-bold">ISO 9001 Quality Management</span>
              <input 
                type="checkbox" 
                checked={profile.iso9001} 
                onChange={(e) => setProfile({ ...profile, iso9001: e.target.checked })}
                className="w-5 h-5 accent-[#5B3E96]"
              />
            </label>
          </div>
        </div>

        {/* Section 3: Vector Tuning Component */}
        <VectorMatcher 
          keywords={profile.trackedKeywords}
          threshold={profile.matchThreshold}
          onKeywordsChange={(val) => setProfile({ ...profile, trackedKeywords: val })}
          onThresholdChange={(val) => setProfile({ ...profile, matchThreshold: val })}
        />

        <div className="flex justify-end gap-4">
          <button type="submit" className="px-8 py-3 bg-[#5B3E96] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#3B2468]">
            Save Credentials
          </button>
        </div>
      </form>
    </div>
  );
}