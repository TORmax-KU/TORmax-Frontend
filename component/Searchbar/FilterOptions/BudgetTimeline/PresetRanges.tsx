'use client';

import { pricePresetRanges } from "@/public/mockData/pricePresetRanges";


interface PresetRangesProps {
    budgetRange: [number, number];
    onBudgetChange: (min: number, max: number) => void;
}

export default function PresetRanges({ budgetRange, onBudgetChange }: PresetRangesProps) {

    return (
        <div className="space-y-2">
            <label className="label label-text text-xs opacity-60">Quick Select</label>
            <div className="flex flex-wrap gap-1.5">
                {pricePresetRanges.map((preset) => {
                    const isActive = budgetRange[0] === preset.min && budgetRange[1] === preset.max;
                    return (
                        <button
                            key={preset.label}
                            onClick={() => onBudgetChange(preset.min, preset.max)}
                            className={`
                                px-2.5 py-1 rounded-full text-xs font-medium 
                                transition-all duration-300 whitespace-nowrap
                                ${isActive
                                    ? 'bg-accent text-accent-content shadow-md shadow-accent/20'
                                    : 'bg-base-200 hover:bg-base-300 text-base-content/70'
                                }
                            `}
                        >
                            {preset.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}