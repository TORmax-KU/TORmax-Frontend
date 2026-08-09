import SearchInput from "../Searchbar/SearchInput";

export default function HomeSearch() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
            height: 500
        }}>
            <div style={{
                fontSize: 48,
                padding: 20,
                paddingTop: 180
            }}>
                What project are you looking for?
            </div>
            <SearchInput />
        </div>
    )
}