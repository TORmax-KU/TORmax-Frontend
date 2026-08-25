'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function ProfilePage() {
  const router = useRouter();
  const { userProfile, updateUserProfile } = useApp();

  // Local form state initialized from context profile
  const [formData, setFormData] = useState({
    companyName: userProfile?.companyName || 'Acme Innovations Ltd.',
    taxId: userProfile?.taxId || '0105562098711',
    registeredCapital: userProfile?.registeredCapital || '฿ 10,000,000 THB',
    yearsInBusiness: userProfile?.yearsInBusiness || 8,
    iso27001: userProfile?.iso27001 ?? true,
    iso9001: userProfile?.iso9001 ?? true,
    iso20000: userProfile?.iso20000 ?? false,
    nbtcLicense: userProfile?.nbtcLicense ?? false,
    trackedKeywords:
      userProfile?.trackedKeywords ||
      'Cloud, Data Center, Fiber Optic, Cybersecurity, AI',
    matchThreshold: userProfile?.matchThreshold || 75,
    dailyDigestEmail: userProfile?.dailyDigestEmail ?? true,
    smsAlerts: userProfile?.smsAlerts ?? false,
    contactName: userProfile?.contactName || 'Somchai Prasert',
    contactEmail: userProfile?.contactEmail || 'somchai@acme.co.th',
    contactPhone: userProfile?.contactPhone || '+66 81 928 3746',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateUserProfile) {
      updateUserProfile(formData);
    }
    alert('Vendor qualification credentials and alert preferences saved successfully!');
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Immersive Header */}
      <header className="bg-slate-900 text-white min-h-[220px] px-6 sm:px-8 py-10 flex flex-col justify-center border-b border-slate-800">
        <div className="max-w-5xl mx-auto w-full space-y-2">
          <h1 className="text-3xl font-black font-display text-white tracking-tight">
            Vendor Qualifications & Preferences
          </h1>
          <p className="text-slate-300 text-xs font-medium">
            Manage company details, qualification credentials, vector matching criteria, and alert subscriptions.
          </p>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-10 w-full space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: CORPORATE IDENTITY */}
          <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-8 rounded-3xl space-y-6 shadow-sm">
            <div className="border-b border-slate-100 dark:border-tormax-borderDark pb-3">
              <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
                1. Corporate Identity Credentials
              </h2>
              <p className="text-xs text-slate-500">
                Official DBD registration data used for eligibility verification.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <label htmlFor="companyName" className="font-bold block text-slate-700 dark:text-slate-300">
                  Registered Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="taxId" className="font-bold block text-slate-700 dark:text-slate-300">
                  Commercial Tax ID Number
                </label>
                <input
                  type="text"
                  id="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-mono font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="registeredCapital" className="font-bold block text-slate-700 dark:text-slate-300">
                  Paid-up Capital (THB ฿)
                </label>
                <input
                  type="text"
                  id="registeredCapital"
                  value={formData.registeredCapital}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="yearsInBusiness" className="font-bold block text-slate-700 dark:text-slate-300">
                  Years in Active Operation
                </label>
                <input
                  type="number"
                  id="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: CERTIFICATIONS & LICENSES */}
          <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-8 rounded-3xl space-y-6 shadow-sm">
            <div className="border-b border-slate-100 dark:border-tormax-borderDark pb-3">
              <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
                2. Certifications & Statutory Licenses
              </h2>
              <p className="text-xs text-slate-500">
                Select active qualifications held by your enterprise to auto-clear TOR mandatory checklists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <label className="p-4 rounded-2xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between cursor-pointer bg-slate-50 dark:bg-tormax-canvasDark hover:border-tormax-purple transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">ISO/IEC 27001 Information Security</div>
                  <div className="text-[11px] text-slate-500">Required for most MDES & IT infrastructure TORs</div>
                </div>
                <input
                  type="checkbox"
                  id="iso27001"
                  checked={formData.iso27001}
                  onChange={handleChange}
                  className="w-5 h-5 accent-tormax-purple cursor-pointer"
                />
              </label>

              <label className="p-4 rounded-2xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between cursor-pointer bg-slate-50 dark:bg-tormax-canvasDark hover:border-tormax-purple transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">ISO 9001 Quality Management</div>
                  <div className="text-[11px] text-slate-500">Standard for hardware supply & state enterprise bids</div>
                </div>
                <input
                  type="checkbox"
                  id="iso9001"
                  checked={formData.iso9001}
                  onChange={handleChange}
                  className="w-5 h-5 accent-tormax-purple cursor-pointer"
                />
              </label>

              <label className="p-4 rounded-2xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between cursor-pointer bg-slate-50 dark:bg-tormax-canvasDark hover:border-tormax-purple transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">ISO 20000 Service Management</div>
                  <div className="text-[11px] text-slate-500">Managed IT services & data center operations</div>
                </div>
                <input
                  type="checkbox"
                  id="iso20000"
                  checked={formData.iso20000}
                  onChange={handleChange}
                  className="w-5 h-5 accent-tormax-purple cursor-pointer"
                />
              </label>

              <label className="p-4 rounded-2xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between cursor-pointer bg-slate-50 dark:bg-tormax-canvasDark hover:border-tormax-purple transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">NBTC Telecom License Class 1/2/3</div>
                  <div className="text-[11px] text-slate-500">Mandatory for fiber optic & telecom cabling tender eligibility</div>
                </div>
                <input
                  type="checkbox"
                  id="nbtcLicense"
                  checked={formData.nbtcLicense}
                  onChange={handleChange}
                  className="w-5 h-5 accent-tormax-purple cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* SECTION 3: KEYWORD VECTOR MATCHER & NOTIFICATION PREFERENCES */}
          <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-8 rounded-3xl space-y-6 shadow-sm">
            <div className="border-b border-slate-100 dark:border-tormax-borderDark pb-3">
              <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
                3. Vector Match Tuning & Daily Digest Subscriptions
              </h2>
              <p className="text-xs text-slate-500">
                Set matching sensitivity and delivery channels across multi-portal listings.
              </p>
            </div>

            <div className="space-y-6 text-xs">
              <div className="space-y-2">
                <label htmlFor="trackedKeywords" className="font-bold block text-slate-700 dark:text-slate-300">
                  Tracked Capability Keywords (Comma Separated)
                </label>
                <input
                  type="text"
                  id="trackedKeywords"
                  value={formData.trackedKeywords}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
                <p className="text-[11px] text-slate-400">
                  Incoming TORs containing these keywords will be prioritized in your Daily Digest.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="matchThreshold" className="font-bold text-slate-700 dark:text-slate-300">
                    Minimum Digest Match Confidence Threshold
                  </label>
                  <span className="font-bold text-tormax-purple dark:text-tormax-lavender text-sm">
                    {formData.matchThreshold}%
                  </span>
                </div>
                <input
                  type="range"
                  id="matchThreshold"
                  min="50"
                  max="95"
                  value={formData.matchThreshold}
                  onChange={handleChange}
                  className="w-full accent-tormax-purple cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <label className="p-4 rounded-2xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between cursor-pointer bg-slate-50 dark:bg-tormax-canvasDark hover:border-tormax-purple transition-colors">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">✉️ Daily Email Digest</div>
                    <div className="text-[11px] text-slate-500">Receive morning briefing at 07:30 AM</div>
                  </div>
                  <input
                    type="checkbox"
                    id="dailyDigestEmail"
                    checked={formData.dailyDigestEmail}
                    onChange={handleChange}
                    className="w-5 h-5 accent-tormax-purple cursor-pointer"
                  />
                </label>

                <label className="p-4 rounded-2xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between cursor-pointer bg-slate-50 dark:bg-tormax-canvasDark hover:border-tormax-purple transition-colors">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">📲 SMS Instant High-Value Alerts</div>
                    <div className="text-[11px] text-slate-500">Urgent notifications for bids over ฿20M</div>
                  </div>
                  <input
                    type="checkbox"
                    id="smsAlerts"
                    checked={formData.smsAlerts}
                    onChange={handleChange}
                    className="w-5 h-5 accent-tormax-purple cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* SECTION 4: PRIMARY CONTACT REPRESENTATIVE */}
          <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-8 rounded-3xl space-y-6 shadow-sm">
            <div className="border-b border-slate-100 dark:border-tormax-borderDark pb-3">
              <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
                4. Designated Procurement Officer
              </h2>
              <p className="text-xs text-slate-500">
                Primary point of contact for proposal submissions and system updates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="space-y-2">
                <label htmlFor="contactName" className="font-bold block text-slate-700 dark:text-slate-300">
                  Representative Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contactEmail" className="font-bold block text-slate-700 dark:text-slate-300">
                  Direct Business Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contactPhone" className="font-bold block text-slate-700 dark:text-slate-300">
                  Mobile Phone Number
                </label>
                <input
                  type="text"
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-mono font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
                />
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push('/home')}
              className="px-6 py-3 border border-slate-300 dark:border-tormax-borderDark font-bold text-xs text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-tormax-purple hover:bg-tormax-purpleDeep text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Save Vendor Credentials
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}