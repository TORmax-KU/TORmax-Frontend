'use client';

import React, { useState, useEffect } from "react";
import { RiFilter2Fill } from "@remixicon/react";

export default function SearchFilter() {
    const [filterCount, setFilterCount] = useState(0);

    useEffect(() => {
        // Get active filter count from localStorage or state management
        const savedFilters = localStorage.getItem('activeFilters');
        if (savedFilters) {
            const count = JSON.parse(savedFilters).length || 0;
            setFilterCount(count);
        }
    }, []);

    return (
        <label 
            htmlFor="my_modal_7" 
            className={`
                relative flex items-center gap-2 px-4 py-2.5
                rounded-xl cursor-pointer
                bg-white/5 hover:bg-white/10
                border border-white/10 hover:border-white/30
                text-white/60 hover:text-white
                transition-all duration-300
                group
                ${filterCount > 0 ? 'border-primary/30 bg-primary/5' : ''}
            `}
            aria-label="Open filters"
        >
            <RiFilter2Fill className={`
                h-5 w-5 transition-all duration-300
                ${filterCount > 0 ? 'text-primary' : 'group-hover:text-white'}
            `} />
            
            <span className="hidden md:inline text-sm font-medium">
                Filters
            </span>

            {/* Active Filter Count Badge */}
            {filterCount > 0 && (
                <span className="
                    absolute -top-1 -right-1 
                    flex items-center justify-center
                    w-5 h-5 
                    text-xs font-bold
                    bg-gradient-to-r from-primary to-secondary
                    text-white
                    rounded-full
                    shadow-lg shadow-primary/30
                    animate-pulse
                ">
                    {filterCount}
                </span>
            )}

            {/* Tooltip on hover */}
            <div className="
                absolute -top-12 left-1/2 -translate-x-1/2
                px-3 py-1.5
                bg-base-300/95 backdrop-blur-sm
                text-xs text-black/80
                rounded-lg
                opacity-0 group-hover:opacity-100
                transition-all duration-200
                pointer-events-none
                whitespace-nowrap
                border border-white/10
                shadow-xl
            ">
                {filterCount > 0 
                    ? `${filterCount} active filter${filterCount > 1 ? 's' : ''} applied` 
                    : 'Open filters'
                }
                <span className="
                    absolute -bottom-1.5 left-1/2 -translate-x-1/2
                    w-3 h-3
                    bg-base-300/95
                    rotate-45
                    border-r border-b border-white/10
                " />
            </div>
        </label>
    );
}