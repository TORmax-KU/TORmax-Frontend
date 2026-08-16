import { projects } from "@/public/mockData/mockProjects";
import { AltVersion } from "./AltVersion";
import ProjectListingItem from "./ProjectListingItem";
import { RiSearchLine } from "@remixicon/react";

interface ProjectListingProps extends AltVersion {
    projects?: any[];
}

export default function ProjectListing({ altLook = false, compact = false }: ProjectListingProps) {


    return (
        <div className="space-y-3">

            {/* Project List */}
            <ul className={`list bg-base-100 rounded-box shadow-md ${altLook ? 'divide-y divide-base-200/50' : ''}`}>
                {projects.map((project) => (
                    <ProjectListingItem 
                        key={project.id}
                        altLook={altLook}
                        compact={compact}
                        project={project}
                    />
                ))}
            </ul>

            {/* Load More */}
            {!altLook && (
                <div className="text-center pt-2">
                    <button className="btn btn-ghost btn-sm text-base-content/40 hover:text-primary transition-colors">
                        Load more projects
                    </button>
                </div>
            )}
        </div>
    );
}