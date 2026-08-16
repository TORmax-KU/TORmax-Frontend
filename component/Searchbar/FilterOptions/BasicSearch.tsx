import { RiSearchLine, RiArrowDownSLine, RiUserLine } from "@remixicon/react";
import { FilterState } from ".";

interface BasicSearchProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string) => void;
}

export default function BasicSearch({ 
    filters, 
    isActive, 
    onToggle, 
    onInputChange 
}: BasicSearchProps) {
    return (
        <div className="space-y-3">
            <button 
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left hover:bg-base-200/50 p-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-2">
                    <RiSearchLine className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">Basic Search</span>
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>
            
            {isActive && (
                <div className="pl-6 space-y-3">
                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Keyword</label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            placeholder="Search in project title, description..."
                            value={filters.keyword}
                            onChange={(e) => onInputChange("keyword", e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="form-control">
                            <label className="label label-text text-xs opacity-70">Project Name</label>
                            <input
                                type="text"
                                className="input input-bordered input-sm w-full"
                                placeholder="Project name..."
                                value={filters.projectName}
                                onChange={(e) => onInputChange("projectName", e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label label-text text-xs opacity-70">Description</label>
                            <input
                                type="text"
                                className="input input-bordered input-sm w-full"
                                placeholder="Search in description..."
                                value={filters.description}
                                onChange={(e) => onInputChange("description", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}