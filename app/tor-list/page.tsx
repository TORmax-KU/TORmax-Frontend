import ProjectListing from "@/component/ProjectListings/ProjectListing";
import SearchInput from "@/component/Searchbar/SearchInput";

export default function TORList() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            paddingTop: 50
        }}>
            <SearchInput/>
            <ProjectListing/>
        </div>
    )
}