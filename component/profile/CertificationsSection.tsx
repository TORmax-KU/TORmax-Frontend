'use client';

import { ProfileFormData } from '@/types/profile';
import { ToggleCard } from './ToggleCard';


interface CertificationsSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t: any;
}

export function CertificationsSection({ 
  formData, 
  onChange, 
  t 
}: CertificationsSectionProps) {
  const certifications = [
    {
      id: 'iso27001',
      title: t.iso27001Title,
      desc: t.iso27001Desc,
      checked: formData.iso27001,
    },
    {
      id: 'iso9001',
      title: t.iso9001Title,
      desc: t.iso9001Desc,
      checked: formData.iso9001,
    },
    {
      id: 'iso20000',
      title: t.iso20000Title,
      desc: t.iso20000Desc,
      checked: formData.iso20000,
    },
    {
      id: 'nbtcLicense',
      title: t.nbtcTitle,
      desc: t.nbtcDesc,
      checked: formData.nbtcLicense,
    },
  ];

  return (
    <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-8 rounded-3xl space-y-6 shadow-sm">
      <div className="border-b border-slate-100 dark:border-tormax-borderDark pb-3">
        <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
          {t.sec2Title}
        </h2>
        <p className="text-xs text-slate-500">
          {t.sec2Desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {certifications.map((cert) => (
          <ToggleCard
            key={cert.id}
            id={cert.id}
            title={cert.title}
            description={cert.desc}
            checked={cert.checked}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}