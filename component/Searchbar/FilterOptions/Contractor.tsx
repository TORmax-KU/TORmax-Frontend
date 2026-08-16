'use client';

import {
    RiUserLine,
    RiArrowDownSLine
} from "@remixicon/react";
import "react-range-slider-input/dist/style.css";
import { FilterState } from ".";
import LocationPicker from "@/component/RadarMap/LocationPicker";
import AutocompleteInput from "@/component/Input/AutocompleteInput";
import StarRatingSlider from "@/component/Input/StarRatingSlider";
import { companyNames } from "@/public/mockData/companyNames";
import { contractorNames } from "@/public/mockData/contractorNames";
import AutocompleteMultiselect from "@/component/Input/AutocompleteMultiselect";
import { allLanguages } from "@/public/mockData/allLanguages";

interface ContractorProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string | string[]) => void;
    onArrayToggle: (field: keyof FilterState, value: string) => void;
}

export default function Contractor({
    filters,
    isActive,
    onToggle,
    onInputChange,
    onArrayToggle
}: ContractorProps) {
    // Handler for language toggle
    const handleLanguageToggle = (value: string) => {
        onArrayToggle("contractorLanguages", value);
    };

    return (
        <div className="space-y-3 border-t border-base-300 pt-4">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left hover:bg-base-200/50 p-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-2">
                    <RiUserLine className="h-4 w-4 text-success" />
                    <span className="font-semibold text-sm">Contractor</span>
                    {(filters.contractorLanguages.length > 0 || filters.contractorRating) && (
                        <span className="badge badge-success badge-sm">
                            {filters.contractorLanguages.length + (filters.contractorRating ? 1 : 0)}
                        </span>
                    )}
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>

            {isActive && (
                <div className="pl-6 space-y-4">
                    {/* Name & Company - Autocomplete */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <AutocompleteInput
                            label="Contractor Name"
                            value={filters.contractorName}
                            options={contractorNames}
                            onChange={(value) => onInputChange("contractorName", value)}
                            placeholder="Search contractor name..."
                        />
                        <AutocompleteInput
                            label="Company"
                            value={filters.contractorCompany}
                            options={companyNames}
                            onChange={(value) => onInputChange("contractorCompany", value)}
                            placeholder="Search company name..."
                        />
                    </div>

                    {/* Location - With quick suggestions */}
                    <LocationPicker
                        value={filters.contractorLocation}
                        onChange={(value) => onInputChange("contractorLocation", value)}
                    />

                    {/* Rating - Star Slider */}
                    <StarRatingSlider
                        value={filters.contractorRating}
                        onChange={(value) => onInputChange("contractorRating", value)}
                    />

                    {/* Languages - Autocomplete with tags */}
                    <AutocompleteMultiselect
                        label="Languages"
                        options={allLanguages}
                        selected={filters.contractorLanguages}
                        onToggle={handleLanguageToggle}
                        placeholder="Search languages..."
                        color="success"
                    />
                </div>
            )}
        </div>
    );
}