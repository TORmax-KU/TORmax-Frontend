'use client';

import { ProfileFormData } from '@/types/profile';
import { ProfileTranslations } from '@/public/mockData/i18n/profile';
import { FormField } from './FormField';

export type CapacityField = 'minBudget' | 'maxBudget' | 'teamSize' | 'capacity';

interface CapacitySectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Partial<Record<CapacityField, string>>;
  t: ProfileTranslations;
}

export function CapacitySection({ formData, onChange, errors, t }: CapacitySectionProps) {
  return (
    <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-8 rounded-3xl space-y-6 shadow-sm">
      <div className="border-b border-slate-100 dark:border-tormax-borderDark pb-3">
        <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
          {t.capacityTitle}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {t.capacityDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <FormField id="minBudget" label={t.minBudget} value={formData.minBudget} onChange={onChange} type="number" min={0} error={errors.minBudget} />
        <FormField id="maxBudget" label={t.maxBudget} value={formData.maxBudget} onChange={onChange} type="number" min={0} error={errors.maxBudget} />
        <FormField id="teamSize" label={t.teamSize} value={formData.teamSize} onChange={onChange} type="number" min={0} step={1} error={errors.teamSize} />
        <FormField id="capacity" label={t.capacity} value={formData.capacity} onChange={onChange} type="number" min={0} step={1} error={errors.capacity} />
      </div>
    </div>
  );
}
