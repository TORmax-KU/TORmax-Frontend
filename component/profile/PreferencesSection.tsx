'use client';

import { ProfileFormData } from '@/types/profile';
import { ToggleCard } from './ToggleCard';

interface PreferencesSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t: any;
}

export function PreferencesSection({ 
  formData, 
  onChange, 
  t 
}: PreferencesSectionProps) {
  return (
    <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-8 rounded-3xl space-y-6 shadow-sm">
      <div className="border-b border-slate-100 dark:border-tormax-borderDark pb-3">
        <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
          {t.sec3Title}
        </h2>
        <p className="text-xs text-slate-500">
          {t.sec3Desc}
        </p>
      </div>

      <div className="space-y-6 text-xs">
        <div className="space-y-2">
          <label htmlFor="trackedKeywords" className="font-bold block text-slate-700 dark:text-slate-300">
            {t.trackedKeywords}
          </label>
          <input
            type="text"
            id="trackedKeywords"
            value={formData.trackedKeywords}
            onChange={onChange}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple"
          />
          <p className="text-[11px] text-slate-400">
            {t.keywordsHint}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="matchThreshold" className="font-bold text-slate-700 dark:text-slate-300">
              {t.matchThreshold}
            </label>
            <span className="font-bold text-tormax-purple dark:text-tormax-lavender text-sm">
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
            className="w-full accent-tormax-purple cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <ToggleCard
            id="dailyDigestEmail"
            title={t.dailyEmail}
            description={t.dailyEmailDesc}
            checked={formData.dailyDigestEmail}
            onChange={onChange}
          />
          <ToggleCard
            id="smsAlerts"
            title={t.smsAlerts}
            description={t.smsAlertsDesc}
            checked={formData.smsAlerts}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}