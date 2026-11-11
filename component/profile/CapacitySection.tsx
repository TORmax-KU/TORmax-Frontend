'use client';

import { ProfileFormData } from '@/types/profile';
import { ProfileTranslations } from '@/public/mockData/i18n/profile';
import { FormField } from './FormField';
import { FormSection } from './FormSection';

export type CapacityField = 'minBudget' | 'maxBudget' | 'teamSize' | 'capacity';

interface CapacitySectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Partial<Record<CapacityField, string>>;
  t: ProfileTranslations;
}

export function CapacitySection({ formData, onChange, errors, t }: CapacitySectionProps) {
  return (
    <FormSection title={t.capacityTitle} description={t.capacityDesc}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField id="minBudget" label={t.minBudget} value={formData.minBudget} onChange={onChange} type="number" min={0} error={errors.minBudget} />
        <FormField id="maxBudget" label={t.maxBudget} value={formData.maxBudget} onChange={onChange} type="number" min={0} error={errors.maxBudget} />
        <FormField id="teamSize" label={t.teamSize} value={formData.teamSize} onChange={onChange} type="number" min={0} step={1} error={errors.teamSize} />
        <FormField id="capacity" label={t.capacity} value={formData.capacity} onChange={onChange} type="number" min={0} step={1} error={errors.capacity} />
      </div>
    </FormSection>
  );
}
