'use client';

import { useState } from "react";
import { 
    RiBriefcaseLine, 
    RiArrowDownSLine, 
} from "@remixicon/react";
import { FilterState } from "..";
import { allIndustries } from "@/public/mockData/allIndustries";
import { categories } from "@/public/mockData/categories";
import { industryCategoryMap } from "@/public/mockData/industryCategoryMap";
import { priorityOptions } from "@/public/mockData/priorityOptions";
import { statusOptions } from "@/public/mockData/statusOptions";
import { SimpleMultiselect } from "../../../Input/SimpleMultiselect";
import { ExperienceLevelSlider } from "./ExperienceLevelSlider";
import { TeamSizeSlider } from "./TeamSizeSlider";
import AutocompleteMultiselect from "../../../Input/AutocompleteMultiselect";

interface ProjectDetailsProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string | string[]) => void;
    onArrayToggle: (field: keyof FilterState, value: string) => void;
}

export default function ProjectDetails({ 
    filters, 
    isActive, 
    onToggle, 
    onInputChange,
    onArrayToggle 
}: ProjectDetailsProps) {
    const [selectedIndustry, setSelectedIndustry] = useState<string>(
        filters.industry[0] || ""
    );

    // Get filtered categories based on selected industry
    const getFilteredCategories = () => {
        if (selectedIndustry && industryCategoryMap[selectedIndustry]) {
            return industryCategoryMap[selectedIndustry];
        }
        return categories;
    };

    const handleIndustryChange = (value: string) => {
        setSelectedIndustry(value);
        onInputChange("industry", value ? [value] : []);
    };

    const handleCategoryToggle = (value: string) => {
        onArrayToggle("category", value);
    };

    return (
        <div className="space-y-3 border-t border-base-300 pt-4">
            <button 
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left hover:bg-base-200/50 p-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-2">
                    <RiBriefcaseLine className="h-4 w-4 text-secondary" />
                    <span className="font-semibold text-sm">Project Details</span>
                    {(filters.category.length + filters.status.length + filters.priority.length) > 0 && (
                        <span className="badge badge-secondary badge-sm">
                            {filters.category.length + filters.status.length + filters.priority.length}
                        </span>
                    )}
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>
            
            {isActive && (
                <div className="pl-6 space-y-4">
                    {/* Industry - Single Select */}
                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Industry</label>
                        <select
                            className="select select-bordered select-sm w-full"
                            value={selectedIndustry}
                            onChange={(e) => handleIndustryChange(e.target.value)}
                        >
                            <option value="">All Industries</option>
                            {allIndustries.map((industry) => (
                                <option key={industry} value={industry}>{industry}</option>
                            ))}
                        </select>
                    </div>

                    {/* Category - Autocomplete Multiselect with Industry Filter */}
                    <AutocompleteMultiselect
                        label="Category"
                        options={categories}
                        selected={filters.category}
                        onToggle={handleCategoryToggle}
                        placeholder="Search categories..."
                        color="secondary"
                        filterOptions={getFilteredCategories()}
                    />

                    {/* Status - Simple Multiselect */}
                    <SimpleMultiselect
                        label="Status"
                        options={statusOptions}
                        selected={filters.status}
                        onToggle={(value) => onArrayToggle("status", value)}
                        color="primary"
                    />

                    {/* Priority - Simple Multiselect */}
                    <SimpleMultiselect
                        label="Priority"
                        options={priorityOptions}
                        selected={filters.priority}
                        onToggle={(value) => onArrayToggle("priority", value)}
                        color="error"
                    />

                    {/* Experience Level - Slider */}
                    <ExperienceLevelSlider
                        value={filters.experienceLevel}
                        onChange={(value) => onInputChange("experienceLevel", value)}
                    />

                    {/* Team Size - Slider */}
                    <TeamSizeSlider
                        value={filters.teamSize}
                        onChange={(value) => onInputChange("teamSize", value)}
                    />
                </div>
            )}
        </div>
    );
}