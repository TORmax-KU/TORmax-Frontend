import { RiStarLine, RiArrowDownSLine } from "@remixicon/react";
import { FilterState } from ".";

interface AdditionalOptionsProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: boolean) => void;
}

export default function AdditionalOptions({ 
    filters, 
    isActive, 
    onToggle, 
    onInputChange 
}: AdditionalOptionsProps) {
    return (
        <div className="space-y-3 border-t border-base-300 pt-4">
            <button 
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left hover:bg-base-200/50 p-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-2">
                    <RiStarLine className="h-4 w-4 text-error" />
                    <span className="font-semibold text-sm">Additional Options</span>
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>
            
            {isActive && (
                <div className="pl-6 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-error checkbox-sm"
                                checked={filters.isUrgent}
                                onChange={(e) => onInputChange("isUrgent", e.target.checked)}
                            />
                            🔥 Urgent Projects
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-warning checkbox-sm"
                                checked={filters.isFeatured}
                                onChange={(e) => onInputChange("isFeatured", e.target.checked)}
                            />
                            ⭐ Featured Projects
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-success checkbox-sm"
                                checked={filters.isVerified}
                                onChange={(e) => onInputChange("isVerified", e.target.checked)}
                            />
                            ✅ Verified Projects
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-info checkbox-sm"
                                checked={filters.hasAttachments}
                                onChange={(e) => onInputChange("hasAttachments", e.target.checked)}
                            />
                            📎 Has Attachments
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary checkbox-sm"
                                checked={filters.isSustainable}
                                onChange={(e) => onInputChange("isSustainable", e.target.checked)}
                            />
                            🌱 Sustainable
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-secondary checkbox-sm"
                                checked={filters.isSocialImpact}
                                onChange={(e) => onInputChange("isSocialImpact", e.target.checked)}
                            />
                            🤝 Social Impact
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}