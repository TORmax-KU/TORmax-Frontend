import HomeSearch from "@/component/HomePage/HomeSearch";
import { initialTORs } from "@/utils/mockData";
import DailyDigestSection from "@/component/DailyDigestSection";

export default function Home() {
  // Defensive sort to ensure array safety
  const topMatches = Array.isArray(initialTORs)
    ? [...initialTORs].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    : [];

  return (
    <div className="w-full">
      {/* Search Header Hero Container */}
      <div className="dark:bg-base-300 bg-base-100 min-h-[80%]">
        <HomeSearch />
      </div>

      {/* Main Content Body */}
      <main className="max-w-6xl mx-auto px-6 sm:px-8 py-10 w-full space-y-10">
        <section id="daily-digest">
          <DailyDigestSection 
            topMatches={topMatches} 
            userProfile={{ companyName: "Acme Innovations Ltd." }}
          />
        </section>
      </main>
    </div>
  );
}