import { RiSettingsLine, RiArrowDownSLine } from "@remixicon/react";
import { FilterState } from "./FilterIndex";

interface WorkRequirementsProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string | string[] | boolean) => void;
    onArrayToggle: (field: keyof FilterState, value: string) => void;
}

const workTypes = ["Full Time", "Part Time", "Contract", "Freelance", "Volunteer"];
const locations = ["Remote", "Onsite", "Hybrid", "Any"];

export default function WorkRequirements({ 
    filters, 
    isActive, 
    onToggle, 
    onInputChange,
    onArrayToggle 
}: WorkRequirementsProps) {
    return (
        <div className="space-y-3 border-t border-base-300 pt-4">
            <button 
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left hover:bg-base-200/50 p-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-2">
                    <RiSettingsLine className="h-4 w-4 text-warning" />
                    <span className="font-semibold text-sm">Work Requirements</span>
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>
            
            {isActive && (
                <div className="pl-6 space-y-3">
                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Work Type</label>
                        <select
                            className="select select-bordered select-sm w-full"
                            value={filters.workType[0] || ""}
                            onChange={(e) => onInputChange("workType", e.target.value ? [e.target.value] : [])}
                        >
                            <option value="">All Types</option>
                            {workTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Location Type</label>
                        <select
                            className="select select-bordered select-sm w-full"
                            value={filters.location[0] || ""}
                            onChange={(e) => onInputChange("location", e.target.value ? [e.target.value] : [])}
                        >
                            <option value="">All Locations</option>
                            {locations.map((location) => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Work Setup</label>
                        <div className="flex flex-wrap gap-3">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary checkbox-sm"
                                    checked={filters.remote}
                                    onChange={(e) => onInputChange("remote", e.target.checked)}
                                />
                                Remote
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-secondary checkbox-sm"
                                    checked={filters.onsite}
                                    onChange={(e) => onInputChange("onsite", e.target.checked)}
                                />
                                Onsite
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-accent checkbox-sm"
                                    checked={filters.hybrid}
                                    onChange={(e) => onInputChange("hybrid", e.target.checked)}
                                />
                                Hybrid
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}