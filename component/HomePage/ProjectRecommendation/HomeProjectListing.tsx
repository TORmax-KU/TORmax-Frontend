import HomeProjectListingItem from "./HomeProjectListingItem";

export default function HomeProjectListing() {
    // accept TOR query list
    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            <HomeProjectListingItem/>
            <HomeProjectListingItem/>
            <HomeProjectListingItem/>
        </ul>
    )
}