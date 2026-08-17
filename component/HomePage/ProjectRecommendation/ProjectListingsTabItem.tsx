'use client';

import { AltVersion } from "@/interface/AltVersion";
import React, { useState } from "react";

interface ProjectListingTabItemProps extends AltVersion {
    label: string;
    defaultChecked?: boolean;
    children: React.ReactNode;
    icon?: React.ReactNode;
}

export default function ProjectListingTabItem({
    label,
    defaultChecked = false,
    children,
    altLook = false,
    compact = false,
    icon
}: ProjectListingTabItemProps) {
    const [isActive, setIsActive] = useState(defaultChecked);

    return (
        <React.Fragment>
            <input
                type="radio"
                name="project_tabs"
                className="tab"
                aria-label={label}
                defaultChecked={defaultChecked}
                onChange={() => setIsActive(true)}
                style={{
                    fontSize: altLook ? '16px' : '20px',
                    padding: altLook ? '8px 12px' : '12px 20px',
                }}
            />
            <div className={`
                sticky start-0 tab-content w-full border-base-300 bg-base-100 
                ${altLook ? 'p-3' : 'p-6'}
                transition-all duration-300
            `}>
                <div className={`
                    ${altLook ? 'text-sm' : ''}
                `}>
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
}