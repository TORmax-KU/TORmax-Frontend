'use client';

import { useState } from "react";
import { RiMoneyDollarCircleLine, RiArrowDownSLine } from "@remixicon/react";
import { FilterState } from "..";
import BudgetSlider from "./BudgetSlider";
import BudgetInput from "./BudgetInput";
import PresetRanges from "./PresetRanges";
import TimelineSection from "./TimelineSection";

interface BudgetTimelineProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string) => void;
}

// Format number with Thai Baht abbreviation
export const formatCurrency = (value: number): string => {
    if (value === 0) return "0฿";
    if (value >= 100000000) return `${(value / 1000000).toFixed(1)}M฿`;
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M฿`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K฿`;
    return `${value}฿`;
};

export const formatDisplayValue = (value: number): string => {
    if (!value || value === 0) return "";
    return formatCurrency(value);
};

export default function BudgetTimeline({ 
    filters, 
    isActive, 
    onToggle, 
    onInputChange 
}: BudgetTimelineProps) {
    const [budgetRange, setBudgetRange] = useState<[number, number]>([
        parseInt(filters.budgetMin) || 0,
        parseInt(filters.budgetMax) || 100000000
    ]);

    const handleBudgetChange = (min: number, max: number) => {
        setBudgetRange([min, max]);
        onInputChange("budgetMin", min.toString());
        onInputChange("budgetMax", max.toString());
    };

    return (
        <div className="space-y-3 border-t border-base-300 pt-4">
            <button 
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left hover:bg-base-200/50 p-2 rounded-lg transition-colors group"
            >
                <div className="flex items-center gap-2">
                    <RiMoneyDollarCircleLine className="h-4 w-4 text-accent" />
                    <span className="font-semibold text-sm">Budget & Timeline</span>
                    {(budgetRange[0] > 0 || budgetRange[1] < 100000000) && (
                        <span className="badge badge-accent badge-sm ml-2">
                            {formatCurrency(budgetRange[0])} - {formatCurrency(budgetRange[1])}
                        </span>
                    )}
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>
            
            {isActive && (
                <div className="pl-6 space-y-4 animate-fade-in-up">
                    <div className="bg-base-200/50 rounded-xl p-4 space-y-4">
                        <BudgetSlider
                            budgetRange={budgetRange}
                            onBudgetChange={handleBudgetChange}
                        />
                        
                        <BudgetInput
                            budgetRange={budgetRange}
                            onBudgetChange={handleBudgetChange}
                        />
                        
                        <PresetRanges
                            budgetRange={budgetRange}
                            onBudgetChange={handleBudgetChange}
                        />
                    </div>

                    <TimelineSection
                        filters={filters}
                        onInputChange={onInputChange}
                    />
                </div>
            )}
        </div>
    );
}