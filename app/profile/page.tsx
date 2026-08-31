'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { profilei18n } from '@/public/mockData/i18n/profile';
import { ProfileFormData } from '@/types/profile';
import { CertificationsSection } from '@/component/profile/CertificationsSection';
import { ContactSection } from '@/component/profile/ContactSection';
import { CorporateIdentitySection } from '@/component/profile/CorporateIdentitySection';
import { FormActions } from '@/component/profile/FormActions';
import { PreferencesSection } from '@/component/profile/PreferencesSection';
import { ProfileHeader } from '@/component/profile/ProfileHeader';

export default function ProfilePage() {
  const router = useRouter();
  const { userProfile, updateUserProfile, lang } = useApp();

  const activeLang = (lang?.toLowerCase() as 'en' | 'th') === 'th' ? 'th' : 'en';
  const t = profilei18n[activeLang];

  const [formData, setFormData] = useState<ProfileFormData>({
    companyName: userProfile?.companyName || 'Acme Innovations Ltd.',
    taxId: userProfile?.taxId || '0105562098711',
    registeredCapital: userProfile?.registeredCapital || '฿ 10,000,000 THB',
    yearsInBusiness: userProfile?.yearsInBusiness || 8,
    iso27001: userProfile?.iso27001 ?? true,
    iso9001: userProfile?.iso9001 ?? true,
    iso20000: userProfile?.iso20000 ?? false,
    nbtcLicense: userProfile?.nbtcLicense ?? false,
    trackedKeywords: userProfile?.trackedKeywords ||
      'Cloud, Data Center, Fiber Optic, Cybersecurity, AI',
    matchThreshold: userProfile?.matchThreshold || 75,
    dailyDigestEmail: userProfile?.dailyDigestEmail ?? true,
    smsAlerts: userProfile?.smsAlerts ?? false,
    contactName: userProfile?.contactName || 'Somchai Prasert',
    contactEmail: userProfile?.contactEmail || 'somchai@acme.co.th',
    contactPhone: userProfile?.contactPhone || '+66 81 928 3746',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    alert(t.savedAlert);
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <ProfileHeader title={t.title} subtitle={t.subtitle} />

      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-10 w-full space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <CorporateIdentitySection 
            formData={formData} 
            onChange={handleChange} 
            t={t} 
          />
          
          <CertificationsSection 
            formData={formData} 
            onChange={handleChange} 
            t={t} 
          />
          
          <PreferencesSection 
            formData={formData} 
            onChange={handleChange} 
            t={t} 
          />
          
          <ContactSection 
            formData={formData} 
            onChange={handleChange} 
            t={t} 
          />

          <FormActions 
            cancelText={t.cancel} 
            saveText={t.save} 
          />
        </form>
      </main>
    </div>
  );
}