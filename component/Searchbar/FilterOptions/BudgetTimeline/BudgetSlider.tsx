'use client';

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { formatCurrency } from "./index";

interface BudgetSliderProps {
    budgetRange: [number, number];
    onBudgetChange: (min: number, max: number) => void;
}

export default function BudgetSlider({ budgetRange, onBudgetChange }: BudgetSliderProps) {
    const handleSliderChange = (value: [number, number]) => {
        onBudgetChange(value[0], value[1]);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-base-content/70">Budget Range</span>
                <span className="text-xs text-base-content/50 font-mono">
                    {formatCurrency(budgetRange[0])} - {formatCurrency(budgetRange[1])}
                </span>
            </div>

            <div className="px-1 py-2">
                <RangeSlider
                    id="budget-slider"
                    min={0}
                    max={100000000}
                    step={10000}
                    value={budgetRange}
                    onInput={handleSliderChange}
                    className="budget-slider"
                />
            </div>
        </div>
    );
}