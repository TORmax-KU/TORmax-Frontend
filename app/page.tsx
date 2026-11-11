'use client';

import HomeSearch from '@/component/HomeSearch';
import { LiveOpportunities } from '@/component/LiveOpportunities';
import { AboutTORSection } from '@/component/AboutTORSection';

export default function Home() {
  return <div className="w-full"><HomeSearch /><main className="ui-page"><LiveOpportunities /><AboutTORSection /></main></div>;
}
