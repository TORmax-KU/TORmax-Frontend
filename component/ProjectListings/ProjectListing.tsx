import ProjectListingItem from "./ProjectListingItem";

export interface DetailedVersion {
    detailed?: boolean
}

export default function ProjectListing({ detailed = false }: DetailedVersion) {
    // accept TOR query list
    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            <ProjectListingItem detailed={detailed} />
            <ProjectListingItem detailed={detailed} />
            <ProjectListingItem detailed={detailed} />
        </ul>
    )
}