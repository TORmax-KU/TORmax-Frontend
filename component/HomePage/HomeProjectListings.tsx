import HomeProjectListingItem from "./HomeProjectListingsItem";

export default function HomeProjectListings() {
    return (
        <div style={{
            width: '35%',
            backgroundColor: 'darksalmon',
            padding: 15,
            paddingLeft: 25
        }}>
            <div style={{
                fontSize:  20
            }}>
                HomeProjectListings
            </div>
            
            <HomeProjectListingItem/>
            <HomeProjectListingItem/>
            <HomeProjectListingItem/>
        </div>
    )
}