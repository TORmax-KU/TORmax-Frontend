import React from "react";

interface ProjectListingItemProps {
    label: string
    defaultChecked?: boolean
    children: React.ReactNode
}

export default function ProjectListingTabItem({
    label,
    defaultChecked=false,
    children
}
    : ProjectListingItemProps) {
    return (
        <React.Fragment>
            <input type="radio" name="my_tabs_2" className="tab" aria-label={label} defaultChecked={defaultChecked} style={{
                fontSize: 20
            }} />
            <div className="sticky start-0 tab-content max-w-120 border-base-300 bg-base-100 p-6">{children}</div>
        </React.Fragment>
    )
}