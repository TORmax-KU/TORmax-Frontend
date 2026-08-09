import ProjectListingItem from "./ProjectListingItem";

export default function ProjectListing() {
    // accept TOR query list
    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            <ProjectListingItem/>
            <ProjectListingItem/>
            <ProjectListingItem/>
        </ul>
    )
}