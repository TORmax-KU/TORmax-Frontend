'use client';

import { useState } from "react";
import { RiFireLine, RiHeartLine, RiBuildingLine, RiCheckLine } from "@remixicon/react";
import { AltVersion } from "@/component/ProjectListings/AltVersion";
import ProjectListing from "@/component/ProjectListings/ProjectListing";
import ProjectListingTabItem from "./ProjectListingsTabItem";

interface ProjectListingsTabsProps extends AltVersion {
    compact?: boolean;
}

export default function ProjectListingsTabs({ 
    altLook = false, 
    compact = false 
}: ProjectListingsTabsProps) {
    const [activeTab, setActiveTab] = useState('latest');

    // Tab configurations
    const tabs = [
        { id: 'latest', label: 'Latest', icon: <RiFireLine className="h-4 w-4" /> },
        { id: 'interests', label: 'Your Interests', icon: <RiHeartLine className="h-4 w-4" /> },
        { id: 'employers', label: 'Employers You Know', icon: <RiBuildingLine className="h-4 w-4" /> },
    ];

    return (
        <div className={`
            w-full 
            ${altLook ? 'p-2' : 'p-4 sm:p-6'}
            ${!altLook ? 'max-w-7xl mx-auto' : ''}
        `}>
            {/* Tabs */}
            <div className="overflow-x-auto w-full">
                <div className={`
                    tabs 
                    ${altLook ? 'tabs-sm' : 'tabs-lift tabs-lg'}
                    min-w-max gap-1
                `}>
                    {tabs.map((tab) => (
                        <ProjectListingTabItem
                            key={tab.id}
                            label={tab.label}
                            defaultChecked={tab.id === 'latest'}
                            altLook={altLook}
                            compact={compact}
                            icon={tab.icon}
                        >
                            <ProjectListing 
                                altLook={altLook} 
                                compact={compact}
                            />
                        </ProjectListingTabItem>
                    ))}
                </div>
            </div>

            {/* Footer Info */}
            <div className={`
                flex justify-between items-center mt-4 text-xs text-base-content/30
                ${altLook ? 'px-2' : 'px-4'}
            `}>
                <span>Showing latest projects</span>
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success" />
                    Live updates
                </span>
            </div>
        </div>
    );
}