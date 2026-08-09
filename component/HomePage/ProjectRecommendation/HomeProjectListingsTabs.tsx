import HomeProjectListing from "./HomeProjectListing";
import HomeProjectListingTabItem from "./HomeProjectListingsTabItem";

export default function HomeProjectListingsTabs() {
    return (
        <div style={{
            width: '35%',
            padding: 15,
            paddingLeft: 25
        }}>

            <div className="overflow-x-auto w-full">
  <div className="tabs-lift tabs min-w-max">

                <HomeProjectListingTabItem defaultChecked
                    label="Latest">
                    <HomeProjectListing/>
                </HomeProjectListingTabItem>
                <HomeProjectListingTabItem label="Your interests">
                    <HomeProjectListing/>
                </HomeProjectListingTabItem>
                <HomeProjectListingTabItem label="Employer you know">
                    <HomeProjectListing/>
                </HomeProjectListingTabItem>
            </div>
            </div>
        </div>
    )
}