'use client';

import HomeSearch from '@/component/HomeSearch';
import { LiveOpportunities } from '@/component/LiveOpportunities';

export default function Home() {
  return <div className="w-full"><div className="dark:bg-base-300 bg-base-100"><HomeSearch /></div><main className="max-w-6xl mx-auto px-6 sm:px-8 py-10"><LiveOpportunities /></main></div>;
}
