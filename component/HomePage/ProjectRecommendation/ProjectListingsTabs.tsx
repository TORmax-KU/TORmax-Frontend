import ProjectListing from "../../ProjectListings/ProjectListing";
import ProjectListingTabItem from "./ProjectListingsTabItem";

export default function ProjectListingsTabs() {
    return (
        <div style={{
            width: '100%',
            padding: 15,
            paddingLeft: 25
        }}>

            <div className="overflow-x-auto w-full">
                <div className="tabs-lift tabs min-w-max">

                    <ProjectListingTabItem defaultChecked
                        label="Latest">
                        <ProjectListing />
                    </ProjectListingTabItem>
                    <ProjectListingTabItem label="Your interests">
                        <ProjectListing />
                    </ProjectListingTabItem>
                    <ProjectListingTabItem label="Employer you know">
                        <ProjectListing />
                    </ProjectListingTabItem>
                </div>
            </div>
        </div>
    )
}