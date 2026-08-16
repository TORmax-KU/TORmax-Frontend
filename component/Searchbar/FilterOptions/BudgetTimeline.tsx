import { RiMoneyDollarCircleLine, RiArrowDownSLine } from "@remixicon/react";
import { FilterState } from "./FilterIndex";

interface BudgetTimelineProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string) => void;
}

export default function BudgetTimeline({ 
    filters, 
    isActive, 
    onToggle, 
    onInputChange 
}: BudgetTimelineProps) {
    return (
        <div className="space-y-3 border-t border-base-300 pt-4">
            <button 
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left hover:bg-base-200/50 p-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-2">
                    <RiMoneyDollarCircleLine className="h-4 w-4 text-accent" />
                    <span className="font-semibold text-sm">Budget & Timeline</span>
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>
            
            {isActive && (
                <div className="pl-6 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="form-control">
                            <label className="label label-text text-xs opacity-70">Min Budget</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs opacity-50">$</span>
                                <input
                                    type="number"
                                    className="input input-bordered input-sm w-full pl-7"
                                    placeholder="0"
                                    value={filters.budgetMin}
                                    onChange={(e) => onInputChange("budgetMin", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label label-text text-xs opacity-70">Max Budget</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs opacity-50">$</span>
                                <input
                                    type="number"
                                    className="input input-bordered input-sm w-full pl-7"
                                    placeholder="100000"
                                    value={filters.budgetMax}
                                    onChange={(e) => onInputChange("budgetMax", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Timeline (months)</label>
                        <input
                            type="number"
                            className="input input-bordered input-sm w-full"
                            placeholder="Expected duration in months"
                            value={filters.timeline}
                            onChange={(e) => onInputChange("timeline", e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="form-control">
                            <label className="label label-text text-xs opacity-70">Start Date</label>
                            <input
                                type="date"
                                className="input input-bordered input-sm w-full"
                                value={filters.startDate}
                                onChange={(e) => onInputChange("startDate", e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label label-text text-xs opacity-70">End Date</label>
                            <input
                                type="date"
                                className="input input-bordered input-sm w-full"
                                value={filters.endDate}
                                onChange={(e) => onInputChange("endDate", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}