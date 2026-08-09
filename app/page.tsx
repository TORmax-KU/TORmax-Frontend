import HomeProjectListings from "@/component/HomePage/HomeProjectListings";
import HomeSearch from "@/component/HomePage/HomeSearch";
import TrackingProjects from "@/component/HomePage/TrackingProjects";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HomeSearch />
      <TrackingProjects />
      <HomeProjectListings />
    </div>
  );
}
