import { RiUserLine, RiArrowDownSLine } from "@remixicon/react";
import { FilterState } from "./FilterIndex";

interface ContractorProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string | string[]) => void;
    onArrayToggle: (field: keyof FilterState, value: string) => void;
}

const languages = [
    "English", "Spanish", "French", "German", "Chinese", "Japanese",
    "Arabic", "Hindi", "Portuguese", "Russian", "Italian", "Korean"
];

const ratings = ["4.5+", "4.0+", "3.5+", "3.0+"];

export default function Contractor({ 
    filters, 
    isActive, 
    onToggle, 
    onInputChange,
    onArrayToggle 
}: ContractorProps) {
    return (
        <div className="space-y-3 border-t border-base-300 pt-4">
            <button 
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left hover:bg-base-200/50 p-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-2">
                    <RiUserLine className="h-4 w-4 text-success" />
                    <span className="font-semibold text-sm">Contractor</span>
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>
            
            {isActive && (
                <div className="pl-6 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="form-control">
                            <label className="label label-text text-xs opacity-70">Contractor Name</label>
                            <input
                                type="text"
                                className="input input-bordered input-sm w-full"
                                placeholder="Search by name..."
                                value={filters.contractorName}
                                onChange={(e) => onInputChange("contractorName", e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label label-text text-xs opacity-70">Company</label>
                            <input
                                type="text"
                                className="input input-bordered input-sm w-full"
                                placeholder="Company name..."
                                value={filters.contractorCompany}
                                onChange={(e) => onInputChange("contractorCompany", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Location</label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            placeholder="City, Country..."
                            value={filters.contractorLocation}
                            onChange={(e) => onInputChange("contractorLocation", e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Minimum Rating</label>
                        <select
                            className="select select-bordered select-sm w-full"
                            value={filters.contractorRating}
                            onChange={(e) => onInputChange("contractorRating", e.target.value)}
                        >
                            <option value="">Any Rating</option>
                            {ratings.map((rating) => (
                                <option key={rating} value={rating}>{rating} ★</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Languages</label>
                        <div className="flex flex-wrap gap-1.5">
                            {languages.map((language) => (
                                <button
                                    key={language}
                                    type="button"
                                    onClick={() => onArrayToggle("contractorLanguages", language)}
                                    className={`
                                        px-2 py-1 rounded-full text-xs font-medium transition-all duration-300
                                        ${filters.contractorLanguages.includes(language)
                                            ? 'bg-success text-success-content shadow-md shadow-success/20'
                                            : 'bg-base-200 hover:bg-base-300 text-base-content/70'
                                        }
                                    `}
                                >
                                    {language}
                                </button>
                            ))}
                        </div>
                        {filters.contractorLanguages.length > 0 && (
                            <p className="text-xs opacity-60 mt-1">
                                Selected: {filters.contractorLanguages.join(" • ")}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}