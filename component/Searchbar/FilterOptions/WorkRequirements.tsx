'use client';

import {
    RiSettingsLine,
    RiArrowDownSLine
} from "@remixicon/react";
import { FilterState } from ".";
import { locations } from "@/public/mockData/locations";
import { workTypes } from "@/public/mockData/workTypes";
import { Multiselect } from "../../Input/Multiselect";

interface WorkRequirementsProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string | string[] | boolean) => void;
    onArrayToggle: (field: keyof FilterState, value: string) => void;
}


export default function WorkRequirements({
    filters,
    isActive,
    onToggle,
    onInputChange,
    onArrayToggle
}: WorkRequirementsProps) {
    // Calculate total selected count
    const totalSelected = filters.workType.length + filters.location.length;

    return (
        <div className="space-y-3 border-t border-base-300 pt-4">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left hover:bg-base-200/50 p-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-2">
                    <RiSettingsLine className="h-4 w-4 text-warning" />
                    <span className="font-semibold text-sm">Work Requirements</span>
                    {totalSelected > 0 && (
                        <span className="badge badge-warning badge-sm">
                            {totalSelected}
                        </span>
                    )}
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>

            {isActive && (
                <div className="pl-6 space-y-4">
                    {/* Work Type - Multiselect (no "Any" logic) */}
                    <Multiselect
                        label="Work Type"
                        options={workTypes}
                        selected={filters.workType}
                        onToggle={(value) => onArrayToggle("workType", value)}
                        color="warning"
                        placeholder="Select work types..."
                    />

                    {/* Location Type - Multiselect with "Any" logic */}
                    <Multiselect
                        label="Location Type"
                        options={locations}
                        selected={filters.location}
                        onToggle={(value) => onArrayToggle("location", value)}
                        color="primary"
                        placeholder="Select locations..."
                        hasAnyOption={true}
                    />
                </div>
            )}
        </div>
    );
}