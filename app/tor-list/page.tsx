import ProjectListing from "@/component/ProjectListings/ProjectListing";
import SearchInput from "@/component/Searchbar/SearchInput";

export default function TORList() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            paddingTop: 100,
        }}>
            <SearchInput />
            <div style={{
                width: '100%',
                paddingLeft: 100,
                paddingRight: 100,
                paddingTop: 50
            }}>
                <ProjectListing detailed/>
            </div>

        </div>
    )
}