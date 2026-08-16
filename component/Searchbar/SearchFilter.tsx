'use client';

import React, { useState, useEffect } from "react";
import { RiFilter2Fill } from "@remixicon/react";

interface SearchFilterProps {
    mode?: 'light' | 'dark';
}

export default function SearchFilter({ mode = 'light' }: SearchFilterProps) {
    const [filterCount, setFilterCount] = useState(0);

    useEffect(() => {
        const savedFilters = localStorage.getItem('activeFilters');
        if (savedFilters) {
            const count = JSON.parse(savedFilters).length || 0;
            setFilterCount(count);
        }
    }, []);

    // Mode-based styling
    const getModeStyles = () => {
        if (mode === 'light') {
            return {
                button: 'bg-white/60 backdrop-blur-sm hover:bg-white/80 border-gray-200/50 hover:border-gray-300/70 text-gray-600 hover:text-gray-900 shadow-sm',
                icon: filterCount > 0 ? 'text-primary' : 'text-gray-500 group-hover:text-gray-700',
                tooltip: 'bg-white/95 backdrop-blur-sm text-gray-800 border-gray-200/50',
                tooltipArrow: 'bg-white/95 border-r border-b border-gray-200/50',
                activeBg: 'border-primary/30 bg-primary/5',
            };
        }
        // Dark mode
        return {
            button: 'bg-white/5 backdrop-blur-sm hover:bg-white/10 border-white/10 hover:border-white/30 text-white/50 hover:text-white',
            icon: filterCount > 0 ? 'text-primary' : 'group-hover:text-white',
            tooltip: 'bg-base-300/95 backdrop-blur-sm text-white/80 border-white/10',
            tooltipArrow: 'bg-base-300/95 border-r border-b border-white/10',
            activeBg: 'border-primary/30 bg-primary/5',
        };
    };

    const styles = getModeStyles();

    return (
        <label 
            htmlFor="my_modal_7" 
            className={`
                relative flex items-center gap-2 px-4 py-2.5
                rounded-xl cursor-pointer
                border
                transition-all duration-300
                group
                ${styles.button}
                ${filterCount > 0 ? styles.activeBg : ''}
            `}
            aria-label="Open filters"
        >
            <RiFilter2Fill className={`
                h-5 w-5 transition-all duration-300
                ${styles.icon}
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
            <div className={`
                absolute -top-12 left-1/2 -translate-x-1/2
                px-3 py-1.5
                text-xs
                rounded-lg
                opacity-0 group-hover:opacity-100
                transition-all duration-200
                pointer-events-none
                whitespace-nowrap
                border
                shadow-xl
                ${styles.tooltip}
            `}>
                {filterCount > 0 
                    ? `${filterCount} active filter${filterCount > 1 ? 's' : ''} applied` 
                    : 'Open filters'
                }
                <span className={`
                    absolute -bottom-1.5 left-1/2 -translate-x-1/2
                    w-3 h-3
                    rotate-45
                    border-r border-b
                    ${styles.tooltipArrow}
                `} />
            </div>
        </label>
    );
}