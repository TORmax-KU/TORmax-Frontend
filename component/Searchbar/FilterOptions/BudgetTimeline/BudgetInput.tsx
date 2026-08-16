'use client';

import { useState, useRef, useEffect } from "react";
import { formatDisplayValue } from "./index";

interface BudgetInputProps {
    budgetRange: [number, number];
    onBudgetChange: (min: number, max: number) => void;
}

export default function BudgetInput({ budgetRange, onBudgetChange }: BudgetInputProps) {
    const [editingMin, setEditingMin] = useState(false);
    const [editingMax, setEditingMax] = useState(false);
    const [displayMin, setDisplayMin] = useState("");
    const [displayMax, setDisplayMax] = useState("");
    
    const minInputRef = useRef<HTMLInputElement>(null);
    const maxInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!editingMin) {
            setDisplayMin(formatDisplayValue(budgetRange[0]));
        }
        if (!editingMax) {
            setDisplayMax(formatDisplayValue(budgetRange[1]));
        }
    }, [budgetRange, editingMin, editingMax]);

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
            onBudgetChange(clampedValue, budgetRange[1]);
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
            onBudgetChange(budgetRange[0], clampedValue);
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

    return (
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
    );
}