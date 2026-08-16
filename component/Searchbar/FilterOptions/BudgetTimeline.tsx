'use client';

import { useState, useEffect, useRef } from "react";
import { 
    RiMoneyDollarCircleLine, 
    RiArrowDownSLine,
    RiThumbUpLine 
} from "@remixicon/react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { FilterState } from "./index";

interface BudgetTimelineProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string) => void;
}

// Format number with Thai Baht abbreviation
const formatCurrency = (value: number): string => {
    if (value === 0) return "0฿";
    if (value >= 100000000) return `${(value / 1000000).toFixed(1)}M฿`;
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M฿`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K฿`;
    return `${value}฿`;
};

// Format for display with proper abbreviation
const formatDisplayValue = (value: number): string => {
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

    // Track which input is being edited
    const [editingMin, setEditingMin] = useState(false);
    const [editingMax, setEditingMax] = useState(false);
    const [displayMin, setDisplayMin] = useState("");
    const [displayMax, setDisplayMax] = useState("");
    
    const minInputRef = useRef<HTMLInputElement>(null);
    const maxInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setBudgetRange([
            parseInt(filters.budgetMin) || 0,
            parseInt(filters.budgetMax) || 100000000
        ]);
        // Update display values
        if (!editingMin) {
            setDisplayMin(formatDisplayValue(parseInt(filters.budgetMin) || 0));
        }
        if (!editingMax) {
            setDisplayMax(formatDisplayValue(parseInt(filters.budgetMax) || 100000000));
        }
    }, [filters.budgetMin, filters.budgetMax, editingMin, editingMax]);

    const handleSliderChange = (value: [number, number]) => {
        setBudgetRange(value);
        // Update display values in real-time
        setDisplayMin(formatDisplayValue(value[0]));
        setDisplayMax(formatDisplayValue(value[1]));
    };

    const handleSliderCommit = (value: [number, number]) => {
        onInputChange("budgetMin", value[0].toString());
        onInputChange("budgetMax", value[1].toString());
    };

    const handleMinFocus = () => {
        setEditingMin(true);
        setDisplayMin(budgetRange[0].toString());
        setTimeout(() => minInputRef.current?.select(), 10);
    };

    const handleMinBlur = () => {
        setEditingMin(false);
        const value = parseInt(displayMin) || 0;
        const clampedValue = Math.min(value, budgetRange[1]);
        if (clampedValue !== budgetRange[0]) {
            setBudgetRange([clampedValue, budgetRange[1]]);
            onInputChange("budgetMin", clampedValue.toString());
        }
        setDisplayMin(formatDisplayValue(clampedValue));
    };

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayMin(e.target.value);
    };

    const handleMinKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            minInputRef.current?.blur();
        }
    };

    const handleMaxFocus = () => {
        setEditingMax(true);
        setDisplayMax(budgetRange[1].toString());
        setTimeout(() => maxInputRef.current?.select(), 10);
    };

    const handleMaxBlur = () => {
        setEditingMax(false);
        const value = parseInt(displayMax) || 100000000;
        const clampedValue = Math.max(value, budgetRange[0]);
        if (clampedValue !== budgetRange[1]) {
            setBudgetRange([budgetRange[0], clampedValue]);
            onInputChange("budgetMax", clampedValue.toString());
        }
        setDisplayMax(formatDisplayValue(clampedValue));
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayMax(e.target.value);
    };

    const handleMaxKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            maxInputRef.current?.blur();
        }
    };

    // Preset budget ranges with Thai Baht formatting
    const presetRanges = [
        { label: "ต่ำกว่า 50K", min: 0, max: 50000 },
        { label: "50K - 200K", min: 50000, max: 200000 },
        { label: "200K - 500K", min: 200000, max: 500000 },
        { label: "500K - 1M", min: 500000, max: 1000000 },
        { label: "1M - 5M", min: 1000000, max: 5000000 },
        { label: "5M+", min: 5000000, max: 100000000 }
    ];

    const applyPresetRange = (min: number, max: number) => {
        setBudgetRange([min, max]);
        setDisplayMin(formatDisplayValue(min));
        setDisplayMax(formatDisplayValue(max));
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
                    {/* Budget Slider Section */}
                    <div className="bg-base-200/50 rounded-xl p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-base-content/70">Budget Range</span>
                            <span className="text-xs text-base-content/50 font-mono">
                                {formatCurrency(budgetRange[0])} - {formatCurrency(budgetRange[1])}
                            </span>
                        </div>

                        {/* Custom Styled Range Slider */}
                        <div className="px-1 py-2">
                            <RangeSlider
                                id="budget-slider"
                                min={0}
                                max={100000000}
                                step={10000}
                                value={budgetRange}
                                onInput={handleSliderChange}
                                onRangeSlideEnd={handleSliderCommit}
                                className="budget-slider"
                            />
                        </div>

                        {/* Min/Max Inputs with Display Formatting */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="form-control">
                                <label className="label label-text text-xs opacity-60">Min (฿)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs opacity-50">฿</span>
                                    <input
                                        ref={minInputRef}
                                        type="text"
                                        className={`
                                            input input-bordered input-sm w-full pl-7
                                            transition-all duration-300
                                            ${editingMin ? 'input-primary' : 'cursor-pointer hover:border-accent/50'}
                                        `}
                                        value={editingMin ? displayMin : formatDisplayValue(budgetRange[0])}
                                        onFocus={handleMinFocus}
                                        onBlur={handleMinBlur}
                                        onChange={handleMinChange}
                                        onKeyDown={handleMinKeyDown}
                                        placeholder="0"
                                    />
                                    {!editingMin && budgetRange[0] > 0 && (
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-accent/60 pointer-events-none">
                                            {formatDisplayValue(budgetRange[0])}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label label-text text-xs opacity-60">Max (฿)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs opacity-50">฿</span>
                                    <input
                                        ref={maxInputRef}
                                        type="text"
                                        className={`
                                            input input-bordered input-sm w-full pl-7
                                            transition-all duration-300
                                            ${editingMax ? 'input-primary' : 'cursor-pointer hover:border-accent/50'}
                                        `}
                                        value={editingMax ? displayMax : formatDisplayValue(budgetRange[1])}
                                        onFocus={handleMaxFocus}
                                        onBlur={handleMaxBlur}
                                        onChange={handleMaxChange}
                                        onKeyDown={handleMaxKeyDown}
                                        placeholder="No limit"
                                    />
                                    {!editingMax && budgetRange[1] < 100000000 && (
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-accent/60 pointer-events-none">
                                            {formatDisplayValue(budgetRange[1])}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Preset Ranges */}
                        <div className="space-y-2">
                            <label className="label label-text text-xs opacity-60">Quick Select</label>
                            <div className="flex flex-wrap gap-1.5">
                                {presetRanges.map((preset) => {
                                    const isActive = budgetRange[0] === preset.min && budgetRange[1] === preset.max;
                                    return (
                                        <button
                                            key={preset.label}
                                            onClick={() => applyPresetRange(preset.min, preset.max)}
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
                    </div>

                    {/* Timeline Section */}
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
                </div>
            )}
        </div>
    );
}