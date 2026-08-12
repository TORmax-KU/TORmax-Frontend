import MediaBlock from "../MediaBlock";
import SearchInput from "../Searchbar/SearchInput";

export default function HomeSearch() {
    return (
        <div style={{
            display: 'flex',
            position: 'relative',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
            height: 500
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                height: '100%',
                width: '100%',
            }}>
            <MediaBlock url="/TORment Header.png" objectFit="cover"/>
            </div>
            <div style={{
                fontSize: 48,
                padding: 20,
                paddingTop: 180,
                zIndex: 1,
                textShadow: '2px 4px  3px rgba(0, 0, 0, 0.45)'
            }}>
                What project are you looking for?
            </div>
            <SearchInput />
        </div>
    )
}