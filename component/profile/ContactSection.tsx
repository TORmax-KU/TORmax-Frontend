'use client';

import { ProfileFormData } from '@/types/profile';
import { FormField } from './FormField'
interface ContactSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t: any;
}

export function ContactSection({ 
  formData, 
  onChange, 
  t 
}: ContactSectionProps) {
  return (
    <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-8 rounded-3xl space-y-6 shadow-sm">
      <div className="border-b border-slate-100 dark:border-tormax-borderDark pb-3">
        <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
          {t.sec4Title}
        </h2>
        <p className="text-xs text-slate-500">
          {t.sec4Desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <FormField
          id="contactName"
          label={t.contactName}
          value={formData.contactName}
          onChange={onChange}
        />
        <FormField
          id="contactEmail"
          label={t.contactEmail}
          value={formData.contactEmail}
          onChange={onChange}
          type="email"
        />
        <FormField
          id="contactPhone"
          label={t.contactPhone}
          value={formData.contactPhone}
          onChange={onChange}
          className="font-mono"
        />
      </div>
    </div>
  );
}