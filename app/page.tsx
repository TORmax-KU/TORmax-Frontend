import ProjectListingsTabs from "@/component/HomePage/ProjectRecommendation/ProjectListingsTabs";
import HomeSearch from "@/component/HomePage/HomeSearch";
import TrackingProjects from "@/component/HomePage/TrackingProjects";
import Dashboard from "@/component/HomePage/Dashboard";

export default function Home() {
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
    </div>
  );
}
