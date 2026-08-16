import { AltVersion } from "./AltVersion";
import ProjectListingItem from "./ProjectListingItem";

export default function ProjectListing({ altLook = false }: AltVersion) {
    // accept TOR query list
    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            <ProjectListingItem altLook={altLook} />
            <ProjectListingItem altLook={altLook} />
            <ProjectListingItem altLook={altLook} />
        </ul>
    )
}