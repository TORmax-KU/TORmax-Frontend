'use client';

import { RiThumbUpLine } from "@remixicon/react";
import { FilterState } from "..";

interface TimelineSectionProps {
    filters: FilterState;
    onInputChange: (field: keyof FilterState, value: string) => void;
}

export default function TimelineSection({ filters, onInputChange }: TimelineSectionProps) {
    return (
        <div className="bg-base-200/50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
                <RiThumbUpLine className="h-4 w-4 text-info" />
                <span className="text-sm font-medium text-base-content/70">Timeline</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="form-control">
                    <label className="label label-text text-xs opacity-60">Duration (months)</label>
                    <input
                        type="number"
                        className="input input-bordered input-sm w-full"
                        placeholder="e.g., 6"
                        value={filters.timeline}
                        onChange={(e) => onInputChange("timeline", e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label className="label label-text text-xs opacity-60">Start Date</label>
                    <input
                        type="date"
                        className="input input-bordered input-sm w-full"
                        value={filters.startDate}
                        onChange={(e) => onInputChange("startDate", e.target.value)}
                    />
                </div>
                <div className="form-control sm:col-span-2">
                    <label className="label label-text text-xs opacity-60">End Date</label>
                    <input
                        type="date"
                        className="input input-bordered input-sm w-full"
                        value={filters.endDate}
                        onChange={(e) => onInputChange("endDate", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}