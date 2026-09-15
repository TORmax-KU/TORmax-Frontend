'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { fetchUserById, updateUser } from '@/lib/auth';
import { profilei18n } from '@/public/mockData/i18n/profile';
import { ProfileFormData } from '@/types/profile';
import { CertificationsSection } from '@/component/profile/CertificationsSection';
import { ContactSection } from '@/component/profile/ContactSection';
import { CorporateIdentitySection } from '@/component/profile/CorporateIdentitySection';
import { FormActions } from '@/component/profile/FormActions';
import { PreferencesSection } from '@/component/profile/PreferencesSection';
import { ProfileHeader } from '@/component/profile/ProfileHeader';

const NUMBER_FIELD_RANGES: Record<string, { min: number; max: number }> = {
  yearsInBusiness: { min: 0, max: 200 },
  matchThreshold: { min: 50, max: 95 },
};

const emptyFormData: ProfileFormData = {
  companyName: '',
  taxId: '',
  registeredCapital: '',
  yearsInBusiness: 0,
  iso27001: false,
  iso9001: false,
  iso20000: false,
  nbtcLicense: false,
  trackedKeywords: '',
  matchThreshold: 75,
  dailyDigestEmail: true,
  smsAlerts: false,
  contactName: '',
  contactEmail: '',
  contactPhone: '',
};

export default function ProfilePage() {
  const router = useRouter();
  const { lang } = useApp();
  const { user, isLoading: isAuthLoading, refetchUser } = useAuth();

  const activeLang = (lang?.toLowerCase() as 'en' | 'th') === 'th' ? 'th' : 'en';
  const t = profilei18n[activeLang];

  const [formData, setFormData] = useState<ProfileFormData>(emptyFormData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    let cancelled = false;
    (async () => {
      const profile = await fetchUserById(user._id);
      if (cancelled) return;

      if (!profile) {
        setError('Failed to load profile');
        setIsLoading(false);
        return;
      }

      setFormData({
        companyName: profile.companyName || '',
        taxId: profile.taxId || '',
        registeredCapital: profile.registeredCapital || '',
        yearsInBusiness: profile.yearsInBusiness || 0,
        iso27001: profile.iso27001 ?? false,
        iso9001: profile.iso9001 ?? false,
        iso20000: profile.iso20000 ?? false,
        nbtcLicense: profile.nbtcLicense ?? false,
        trackedKeywords: profile.trackedKeywords || '',
        matchThreshold: profile.matchThreshold ?? 75,
        dailyDigestEmail: profile.dailyDigestEmail ?? true,
        smsAlerts: profile.smsAlerts ?? false,
        contactName: profile.realName || '',
        contactEmail: profile.email || '',
        contactPhone: profile.contactPhone || '',
      });
      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [user, isAuthLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    const range = NUMBER_FIELD_RANGES[id];

    let nextValue: string | number | boolean = value;
    if (type === 'checkbox') {
      nextValue = checked;
    } else if (range) {
      const parsed = Number(value);
      nextValue = Number.isNaN(parsed)
        ? range.min
        : Math.min(range.max, Math.max(range.min, parsed));
    }

    setFormData((prev) => ({ ...prev, [id]: nextValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    setError(null);

    try {
      await updateUser(user._id, {
        companyName: formData.companyName,
        taxId: formData.taxId,
        registeredCapital: formData.registeredCapital,
        yearsInBusiness: formData.yearsInBusiness,
        iso27001: formData.iso27001,
        iso9001: formData.iso9001,
        iso20000: formData.iso20000,
        nbtcLicense: formData.nbtcLicense,
        trackedKeywords: formData.trackedKeywords,
        matchThreshold: formData.matchThreshold,
        dailyDigestEmail: formData.dailyDigestEmail,
        smsAlerts: formData.smsAlerts,
        realName: formData.contactName,
        contactPhone: formData.contactPhone,
      });
      await refetchUser();
      alert(t.savedAlert);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <ProfileHeader title={t.title} subtitle={t.subtitle} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <ProfileHeader title={t.title} subtitle={t.subtitle} />

      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-10 w-full space-y-8">
        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-800 text-red-700 dark:text-red-300 text-xs p-4">
            {error}
          </div>
        )}

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
            saveText={isSaving ? '...' : t.save}
          />
        </form>
      </main>
    </div>
  );
}