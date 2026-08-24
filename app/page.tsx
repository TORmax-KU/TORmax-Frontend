import ProjectListingsTabs from "@/component/HomePage/ProjectRecommendation/ProjectListingsTabs";
import HomeSearch from "@/component/HomePage/HomeSearch";
import TrackingProjects from "@/component/HomePage/TrackingProjects";
import Dashboard from "@/component/HomePage/Dashboard";
import { TORCard } from "@/component/TORCard";
import { initialTORs } from "@/utils/mockData";
import Link from "next/link";

export default function Home() {

  const topMatches = [...initialTORs].sort((a, b) => b.matchScore - a.matchScore);
  return (
    <div>
      <div className="dark:bg-base-300 bg-base-100 min-h-[80%]">
        <HomeSearch />
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        justifyContent: 'center'
      }}>
      <Dashboard/>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10 w-full space-y-10">
      <section className="bg-gradient-to-r from-[#3B2468] to-[#5B3E96] rounded-3xl p-8 text-white space-y-4 shadow-xl">
        <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
          Vector Ingestion Engine Active
        </span>
        <h1 className="text-3xl font-black">AI-Matched Government Procurement Dashboard</h1>
        <p className="text-xs text-slate-200 max-w-2xl leading-relaxed">
          Real-time analysis of Thai public sector e-GP tenders, matching corporate credentials, ISO compliance, and project capability vectors.
        </p>
        <div className="pt-2 flex gap-4">
          <Link href="/search-feed" className="px-5 py-2.5 bg-white text-[#3B2468] rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors">
            Explore All Opportunities
          </Link>
          <Link href="/profile" className="px-5 py-2.5 bg-[#3B2468] border border-white/30 text-white rounded-xl font-bold text-xs hover:bg-white/10 transition-colors">
            Update Vendor Vector
          </Link>
        </div>
      </section>

      <section id="daily-digest" className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Daily Digest Top Matches</h2>
            <p className="text-xs text-slate-500">Highest statistical alignment with your corporate profile</p>
          </div>
          <Link href="/search-feed" className="text-xs font-bold text-[#5B3E96] dark:text-[#9B82C1] hover:underline">
            View Directory →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topMatches.map(tor => (
            <TORCard key={tor.id} item={tor} />
          ))}
        </div>
      </section>
    </div>
    </div>
  );
}
