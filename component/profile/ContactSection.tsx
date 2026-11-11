'use client';

import { ProfileFormData } from '@/types/profile';
import { ProfileTranslations } from '@/public/mockData/i18n/profile';
import { FormField } from './FormField'
import { FormSection } from './FormSection';

interface ContactSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t: ProfileTranslations;
}

export function ContactSection({
  formData,
  onChange,
  t
}: ContactSectionProps) {
  return (
    <FormSection title={t.sec4Title} description={t.sec4Desc}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
    </FormSection>
  );
}
