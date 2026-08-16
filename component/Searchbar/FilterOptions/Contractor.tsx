'use client';

import { useState, useRef, useEffect } from "react";
import { RiUserLine, RiArrowDownSLine, RiCloseFill, RiAddLine } from "@remixicon/react";
import { FilterState } from "./FilterIndex";

interface ContractorProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string | string[]) => void;
    onArrayToggle: (field: keyof FilterState, value: string) => void;
}

const allLanguages = [
    "English", "Spanish", "French", "German", "Chinese", "Japanese",
    "Arabic", "Hindi", "Portuguese", "Russian", "Italian", "Korean",
    "Dutch", "Turkish", "Polish", "Ukrainian", "Thai", "Vietnamese",
    "Indonesian", "Malay", "Swahili", "Greek", "Hebrew", "Swedish"
];

const ratings = ["4.5+", "4.0+", "3.5+", "3.0+"];

interface LanguageTagInputProps {
    selected: string[];
    onAdd: (value: string) => void;
    onRemove: (value: string) => void;
}

function LanguageTagInput({ selected, onAdd, onRemove }: LanguageTagInputProps) {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter suggestions based on input
    useEffect(() => {
        if (inputValue.trim().length > 0) {
            const filtered = allLanguages.filter(lang => 
                lang.toLowerCase().includes(inputValue.toLowerCase()) &&
                !selected.includes(lang)
            );
            setSuggestions(filtered.slice(0, 10));
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [inputValue, selected]);

    // Close suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAdd = (value: string) => {
        onAdd(value);
        setInputValue("");
        setIsOpen(false);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && suggestions.length > 0) {
            e.preventDefault();
            handleAdd(suggestions[0]);
        }
        if (e.key === 'Escape') {
            setIsOpen(false);
            inputRef.current?.blur();
        }
    };

    return (
        <div className="form-control" ref={containerRef}>
            <label className="label label-text text-xs opacity-70">Languages</label>
            
            {/* Input with suggestions */}
            <div className="relative">
                <div className={`
                    flex items-center gap-2
                    bg-base-200/50 rounded-xl
                    border border-base-300/50
                    transition-all duration-300
                    ${isOpen ? 'border-primary/50 ring-2 ring-primary/20' : 'hover:border-base-300'}
                    px-3 py-2
                `}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => {
                            if (inputValue.trim().length > 0) {
                                setIsOpen(true);
                            }
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Search languages..."
                        className="
                            w-full bg-transparent border-none outline-none
                            text-sm placeholder:text-base-content/30
                        "
                    />
                    {selected.length > 0 && (
                        <span className="text-xs text-base-content/40 whitespace-nowrap">
                            {selected.length} selected
                        </span>
                    )}
                </div>

                {/* Suggestions Dropdown */}
                {isOpen && suggestions.length > 0 && (
                    <div className="
                        absolute top-full left-0 right-0 mt-1
                        bg-base-100 border border-base-300 rounded-xl
                        shadow-2xl shadow-black/20
                        max-h-48 overflow-y-auto
                        z-50
                        custom-scrollbar
                    ">
                        {suggestions.map((suggestion) => (
                            <button
                                key={suggestion}
                                type="button"
                                onClick={() => handleAdd(suggestion)}
                                className="
                                    w-full text-left px-4 py-2.5
                                    text-sm hover:bg-base-200
                                    transition-all duration-150
                                    flex items-center gap-2
                                    border-b border-base-200/50 last:border-0
                                "
                            >
                                <RiAddLine className="h-4 w-4 text-success/50" />
                                <span>{suggestion}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Selected Language Tags - Displayed outside the input */}
            {selected.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {selected.map((language) => (
                        <span
                            key={language}
                            className="
                                inline-flex items-center gap-1
                                px-2.5 py-1 rounded-full text-xs font-medium
                                bg-success/10 text-success border border-success/30
                                transition-all duration-200
                                hover:scale-105
                                cursor-default
                            "
                        >
                            {language}
                            <button
                                type="button"
                                onClick={() => onRemove(language)}
                                className="
                                    hover:bg-white/20 rounded-full p-0.5
                                    transition-all duration-200
                                    hover:scale-110
                                    ml-0.5
                                "
                                aria-label={`Remove ${language}`}
                            >
                                <RiCloseFill className="h-3 w-3" />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Contractor({ 
    filters, 
    isActive, 
    onToggle, 
    onInputChange,
    onArrayToggle 
}: ContractorProps) {
    return (
        <div className="space-y-3 border-t border-base-300 pt-4">
            <button 
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left hover:bg-base-200/50 p-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-2">
                    <RiUserLine className="h-4 w-4 text-success" />
                    <span className="font-semibold text-sm">Contractor</span>
                    {filters.contractorLanguages.length > 0 && (
                        <span className="badge badge-success badge-sm">
                            {filters.contractorLanguages.length}
                        </span>
                    )}
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>
            
            {isActive && (
                <div className="pl-6 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="form-control">
                            <label className="label label-text text-xs opacity-70">Contractor Name</label>
                            <input
                                type="text"
                                className="input input-bordered input-sm w-full"
                                placeholder="Search by name..."
                                value={filters.contractorName}
                                onChange={(e) => onInputChange("contractorName", e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label label-text text-xs opacity-70">Company</label>
                            <input
                                type="text"
                                className="input input-bordered input-sm w-full"
                                placeholder="Company name..."
                                value={filters.contractorCompany}
                                onChange={(e) => onInputChange("contractorCompany", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Location</label>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full"
                            placeholder="City, Country..."
                            value={filters.contractorLocation}
                            onChange={(e) => onInputChange("contractorLocation", e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Minimum Rating</label>
                        <select
                            className="select select-bordered select-sm w-full"
                            value={filters.contractorRating}
                            onChange={(e) => onInputChange("contractorRating", e.target.value)}
                        >
                            <option value="">Any Rating</option>
                            {ratings.map((rating) => (
                                <option key={rating} value={rating}>{rating} ★</option>
                            ))}
                        </select>
                    </div>

                    {/* Languages - Now using autocomplete + tags */}
                    <LanguageTagInput
                        selected={filters.contractorLanguages}
                        onAdd={(value) => onArrayToggle("contractorLanguages", value)}
                        onRemove={(value) => onArrayToggle("contractorLanguages", value)}
                    />
                </div>
            )}
        </div>
    );
}