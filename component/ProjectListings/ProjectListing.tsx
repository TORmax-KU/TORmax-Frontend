import ProjectListingItem from "./ProjectListingItem";

export interface BigInfoVersion {
    biginfo?: boolean
}

export default function ProjectListing({ biginfo = false }: BigInfoVersion) {
    // accept TOR query list
    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            <ProjectListingItem biginfo={biginfo} />
            <ProjectListingItem biginfo={biginfo} />
            <ProjectListingItem biginfo={biginfo} />
        </ul>
    )
}