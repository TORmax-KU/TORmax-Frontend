'use client';

import { ProfileFormData } from '@/types/profile';
import { ProfileTranslations } from '@/public/mockData/i18n/profile';
import { ToggleCard } from './ToggleCard';
import { FormSection } from './FormSection';


interface CertificationsSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t: ProfileTranslations;
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
    <FormSection title={t.sec2Title} description={t.sec2Desc}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
    </FormSection>
  );
}
