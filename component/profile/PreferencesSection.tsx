'use client';

import { ProfileFormData } from '@/types/profile';
import { RiMailLine, RiNotification3Line } from '@remixicon/react';
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
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <label htmlFor="matchThreshold" className="ui-label">
              {t.matchThreshold}
            </label>
            <output htmlFor="matchThreshold" className="text-sm font-semibold tabular-nums text-accent">
              {formData.matchThreshold}%
            </output>
          </div>
          <input
            type="range"
            id="matchThreshold"
            min="50"
            max="95"
            step="1"
            value={formData.matchThreshold}
            onChange={onChange}
            aria-describedby="matchThresholdHint"
            aria-valuetext={`${formData.matchThreshold}%`}
            className="w-full cursor-pointer accent-brand"
          />
          <div className="flex justify-between gap-4 text-xs text-ink-3">
            <span>{t.matchThresholdLower}</span>
            <span className="text-right">{t.matchThresholdHigher}</span>
          </div>
          <p id="matchThresholdHint" className="ui-hint">
            {t.matchThresholdHint.replace('{threshold}', String(formData.matchThreshold))}
          </p>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-ink">{t.matchAlertsTitle}</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ToggleCard
              id="notifyMatchesInApp"
              title={t.matchInApp}
              icon={<RiNotification3Line size={16} />}
              description={t.matchInAppDesc}
              checked={formData.notifyMatchesInApp}
              onChange={onChange}
            />
            <ToggleCard
              id="notifyMatchesEmail"
              title={t.matchEmail}
              icon={<RiMailLine size={16} />}
              description={t.matchEmailDesc}
              checked={formData.notifyMatchesEmail}
              onChange={onChange}
            />
          </div>
        </fieldset>
        <fieldset className="space-y-3 border-t border-line pt-5">
          <legend className="text-sm font-semibold text-ink">{t.highBudgetAlertsTitle}</legend>
          <p className="ui-hint">{t.highBudgetAlertsHint}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ToggleCard
              id="notifyHighBudgetInApp"
              title={t.highBudgetInApp}
              icon={<RiNotification3Line size={16} />}
              description={t.highBudgetInAppDesc}
              checked={formData.notifyHighBudgetInApp}
              onChange={onChange}
            />
            <ToggleCard
              id="notifyHighBudgetEmail"
              title={t.highBudgetEmail}
              icon={<RiMailLine size={16} />}
              description={t.highBudgetEmailDesc}
              checked={formData.notifyHighBudgetEmail}
              onChange={onChange}
            />
          </div>
        </fieldset>
        <p className="ui-hint">{t.alertDeliveryHint}</p>
        {(formData.notifyMatchesEmail || formData.notifyHighBudgetEmail) && <p className="ui-hint">
          {t.emailDestination}: <span className="font-medium text-ink">{formData.contactEmail}</span>. {t.emailSetupHint}
        </p>}
      </div>
    </FormSection>
  );
}
