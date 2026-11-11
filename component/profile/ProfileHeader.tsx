'use client';

import { PageHeader } from '@/component/PageHeader';

interface ProfileHeaderProps {
  title: string;
  subtitle: string;
}

export function ProfileHeader({ title, subtitle }: ProfileHeaderProps) {
  return (
    <div className="ui-page max-w-4xl">
      <PageHeader className="pb-0" title={title} description={subtitle} />
    </div>
  );
}
