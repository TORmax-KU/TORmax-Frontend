'use client';

import { ProfileFormData } from '@/types/profile';
import { FormField }  from './FormField'

interface CorporateIdentitySectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t: any;
}

export function CorporateIdentitySection({ 
  formData, 
  onChange, 
  t 
}: CorporateIdentitySectionProps) {
  return (
    <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-8 rounded-3xl space-y-6 shadow-sm">
      <div className="border-b border-slate-100 dark:border-tormax-borderDark pb-3">
        <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
          {t.sec1Title}
        </h2>
        <p className="text-xs text-slate-500">
          {t.sec1Desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <FormField
          id="companyName"
          label={t.companyName}
          value={formData.companyName}
          onChange={onChange}
        />
        <FormField
          id="taxId"
          label={t.taxId}
          value={formData.taxId}
          onChange={onChange}
          className="font-mono"
        />
        <FormField
          id="registeredCapital"
          label={t.registeredCapital}
          value={formData.registeredCapital}
          onChange={onChange}
        />
        <FormField
          id="yearsInBusiness"
          label={t.yearsInBusiness}
          value={formData.yearsInBusiness}
          onChange={onChange}
          type="number"
        />
      </div>
    </div>
  );
}