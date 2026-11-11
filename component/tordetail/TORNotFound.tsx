'use client';

import { useRouter } from 'next/navigation';
import { RiArrowLeftLine, RiFileSearchLine } from '@remixicon/react';

interface TORNotFoundProps {
  notFound: string;
  backToDirectory: string;
}

export function TORNotFound({ notFound, backToDirectory }: TORNotFoundProps) {
  const router = useRouter();

  return (
    <div className="ui-page">
      <div className="ui-empty py-16">
        <div className="ui-empty-icon"><RiFileSearchLine size={20} /></div>
        <h2 className="ui-section-title">
          {notFound}
        </h2>
        <button
          onClick={() => router.push('/search-feed')}
          className="ui-btn ui-btn-secondary ui-btn-sm mt-3"
        >
          <RiArrowLeftLine size={14} /> {backToDirectory}
        </button>
      </div>
    </div>
  );
}
