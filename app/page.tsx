'use client';

import HomeSearch from '@/component/HomeSearch';
import { LiveOpportunities } from '@/component/LiveOpportunities';
import { AboutTORSection } from '@/component/AboutTORSection';

export default function Home() {
  return <div className="w-full"><div className="dark:bg-base-300 bg-base-100"><HomeSearch /></div><main className="max-w-6xl mx-auto px-6 sm:px-8 py-10"><LiveOpportunities /><AboutTORSection /></main></div>;
}
