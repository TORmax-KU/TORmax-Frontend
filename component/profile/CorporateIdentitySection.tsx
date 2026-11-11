'use client';

import { ProfileFormData } from '@/types/profile';
import { ProfileTranslations } from '@/public/mockData/i18n/profile';
import { FormField }  from './FormField'
import { FormSection } from './FormSection';

interface CorporateIdentitySectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t: ProfileTranslations;
}

export function CorporateIdentitySection({
  formData,
  onChange,
  t
}: CorporateIdentitySectionProps) {
  return (
    <FormSection title={t.sec1Title} description={t.sec1Desc}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
          min={0}
          max={200}
        />
      </div>
    </FormSection>
  );
}
