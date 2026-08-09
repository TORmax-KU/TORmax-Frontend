import React from "react";

interface HomeProjectListingItemProps {
    label: string
    defaultChecked?: boolean
    children: React.ReactNode
}

export default function HomeProjectListingTabItem({
    label,
    defaultChecked=false,
    children
}
    : HomeProjectListingItemProps) {
    return (
        <React.Fragment>
            <input type="radio" name="my_tabs_2" className="tab" aria-label={label} defaultChecked={defaultChecked} style={{
                fontSize: 20
            }} />
            <div className="sticky start-0 tab-content max-w-100 border-base-300 bg-base-100 p-6">{children}</div>
        </React.Fragment>
    )
}