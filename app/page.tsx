import HomeProjectListingsTabs from "@/component/HomePage/ProjectRecommendation/HomeProjectListingsTabs";
import HomeSearch from "@/component/HomePage/HomeSearch";
import TrackingProjects from "@/component/HomePage/TrackingProjects";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HomeSearch />
      <div style={{
        display: 'flex',
        gap: 10,
        justifyContent: 'center'
      }}>
      <TrackingProjects />
      <HomeProjectListingsTabs />
      </div>
    </div>
  );
}
