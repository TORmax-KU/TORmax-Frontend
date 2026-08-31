'use client';

import { useRouter } from 'next/navigation';

interface TORNotFoundProps {
  notFound: string;
  backToDirectory: string;
}

export function TORNotFound({ notFound, backToDirectory }: TORNotFoundProps) {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-12 text-center space-y-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        {notFound}
      </h2>
      <button
        onClick={() => router.push('/search-feed')}
        className="text-xs text-[#5B3E96] font-bold underline cursor-pointer hover:opacity-80 transition-opacity"
      >
        ← {backToDirectory}
      </button>
    </div>
  );
}