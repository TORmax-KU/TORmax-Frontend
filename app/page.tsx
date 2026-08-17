import ProjectListingsTabs from "@/component/HomePage/ProjectRecommendation/ProjectListingsTabs";
import HomeSearch from "@/component/HomePage/HomeSearch";
import TrackingProjects from "@/component/HomePage/TrackingProjects";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="dark:bg-base-300 bg-base-100 min-h-[80%]">
        <HomeSearch />
      </div>
      
      <div style={{
        display: 'flex',
        gap: 10,
        justifyContent: 'center'
      }}>
      <TrackingProjects />
      <ProjectListingsTabs />
      </div>
    </div>
  );
}
