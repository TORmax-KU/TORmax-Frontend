'use client';

import { ProfileFormData } from '@/types/profile';
import { RiMailLine, RiSmartphoneLine } from '@remixicon/react';
import { ProfileTranslations } from '@/public/mockData/i18n/profile';
import { ToggleCard } from './ToggleCard';
import { FormSection } from './FormSection';

interface PreferencesSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t: ProfileTranslations;
}

export function PreferencesSection({
  formData,
  onChange,
  t
}: PreferencesSectionProps) {
  return (
    <FormSection title={t.sec3Title} description={t.sec3Desc}>
      <div className="space-y-6">
        <div className="space-y-1.5">
          <label htmlFor="trackedKeywords" className="ui-label">
            {t.trackedKeywords}
          </label>
          <input
            type="text"
            id="trackedKeywords"
            value={formData.trackedKeywords}
            onChange={onChange}
            className="ui-field"
          />
          <p className="ui-hint">
            {t.keywordsHint}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <label htmlFor="matchThreshold" className="ui-label">
              {t.matchThreshold}
            </label>
            <span className="text-sm font-semibold tabular-nums text-accent">
              {formData.matchThreshold}%
            </span>
          </div>
          <input
            type="range"
            id="matchThreshold"
            min="50"
            max="95"
            value={formData.matchThreshold}
            onChange={onChange}
            className="w-full cursor-pointer accent-brand"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ToggleCard
            id="dailyDigestEmail"
            title={t.dailyEmail}
            icon={<RiMailLine size={16} />}
            description={t.dailyEmailDesc}
            checked={formData.dailyDigestEmail}
            onChange={onChange}
          />
          <ToggleCard
            id="smsAlerts"
            title={t.smsAlerts}
            icon={<RiSmartphoneLine size={16} />}
            description={t.smsAlertsDesc}
            checked={formData.smsAlerts}
            onChange={onChange}
          />
        </div>
      </div>
    </FormSection>
  );
}
