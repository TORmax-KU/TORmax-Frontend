'use client';

import { useState, useRef, useEffect } from "react";
import { 
    RiBriefcaseLine, 
    RiArrowDownSLine, 
    RiCloseFill, 
    RiAddLine,
    RiCheckLine
} from "@remixicon/react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { FilterState } from "./FilterIndex";

interface ProjectDetailsProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string | string[]) => void;
    onArrayToggle: (field: keyof FilterState, value: string) => void;
}

const categories = [
    "Web Development", "Mobile Development", "AI & Machine Learning", 
    "Data Science & Analytics", "Cloud Computing", "DevOps & Infrastructure", 
    "Cybersecurity", "Blockchain & Web3", "IoT & Embedded Systems", "AR/VR & Metaverse",
    "Game Development", "UI/UX Design", "Graphic Design", "Branding & Identity",
    "Video Production", "Animation & Motion Graphics", "Business Consulting",
    "Project Management", "Digital Marketing", "Content Marketing",
    "Civil Engineering", "Medical Research", "Academic Research",
    "Music Production", "Film Production", "Non-Profit Management",
    "Legal Services", "Finance & Accounting", "Real Estate"
];

const allIndustries = [
    "Technology", "Healthcare", "Finance", "Education", 
    "Retail & E-commerce", "Manufacturing", "Construction", 
    "Energy & Utilities", "Transportation & Logistics", 
    "Media & Entertainment", "Non-Profit", "Government",
    "Real Estate", "Agriculture", "Hospitality", 
    "Professional Services", "Telecommunications", 
    "Aerospace & Defense", "Automotive", "Food & Beverage"
];

const statusOptions = ["Open", "In Progress", "Review", "Completed", "On Hold", "Cancelled", "Draft"];
const priorityOptions = ["Low", "Medium", "High", "Critical", "Urgent"];

// Map industries to categories (for filtering)
const industryCategoryMap: Record<string, string[]> = {
    "Technology": ["Web Development", "Mobile Development", "AI & Machine Learning", "Data Science & Analytics", "Cloud Computing", "DevOps & Infrastructure", "Cybersecurity", "Blockchain & Web3", "IoT & Embedded Systems", "AR/VR & Metaverse", "Game Development"],
    "Healthcare": ["Medical Research", "Healthcare Administration", "Biotechnology"],
    "Finance": ["Finance & Accounting", "Business Consulting"],
    "Education": ["Academic Research", "Curriculum Development", "Educational Technology"],
    "Retail & E-commerce": ["Digital Marketing", "UI/UX Design", "Content Marketing"],
    "Manufacturing": ["Project Management", "Supply Chain Management"],
    "Construction": ["Civil Engineering", "Architecture", "Construction Management"],
    "Media & Entertainment": ["Video Production", "Animation & Motion Graphics", "Music Production", "Film Production"],
    "Non-Profit": ["Non-Profit Management", "Community Development", "Social Work"],
    "Government": ["Public Administration", "Policy Research"],
    "Real Estate": ["Real Estate", "Property Management"],
    "Professional Services": ["Business Consulting", "Legal Services", "Project Management"],
};

// Autocomplete Multiselect Component
interface AutocompleteMultiselectProps {
    label: string;
    options: string[];
    selected: string[];
    onToggle: (value: string) => void;
    placeholder?: string;
    color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
    filterOptions?: string[];
}

function AutocompleteMultiselect({ 
    label, 
    options, 
    selected, 
    onToggle, 
    placeholder = "Search or select...",
    color = 'primary',
    filterOptions
}: AutocompleteMultiselectProps) {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter suggestions based on input and selected
    useEffect(() => {
        const availableOptions = filterOptions 
            ? options.filter(opt => filterOptions.includes(opt))
            : options;
        
        if (inputValue.trim().length > 0) {
            const filtered = availableOptions.filter(opt => 
                opt.toLowerCase().includes(inputValue.toLowerCase()) &&
                !selected.includes(opt)
            );
            setSuggestions(filtered.slice(0, 10));
            setIsOpen(true);
        } else {
            // Show all available options when input is empty
            const filtered = availableOptions.filter(opt => !selected.includes(opt));
            setSuggestions(filtered.slice(0, 10));
            setIsOpen(true);
        }
    }, [inputValue, options, selected, filterOptions]);

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

    const handleSelect = (value: string) => {
        onToggle(value);
        setInputValue("");
        inputRef.current?.focus();
    };

    const handleRemove = (value: string) => {
        onToggle(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && suggestions.length > 0) {
            e.preventDefault();
            handleSelect(suggestions[0]);
        }
        if (e.key === 'Escape') {
            setIsOpen(false);
            inputRef.current?.blur();
        }
    };

    const colorClasses = {
        primary: 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20',
        secondary: 'bg-secondary/10 text-secondary border-secondary/30 hover:bg-secondary/20',
        accent: 'bg-accent/10 text-accent border-accent/30 hover:bg-accent/20',
        info: 'bg-info/10 text-info border-info/30 hover:bg-info/20',
        success: 'bg-success/10 text-success border-success/30 hover:bg-success/20',
        warning: 'bg-warning/10 text-warning border-warning/30 hover:bg-warning/20',
        error: 'bg-error/10 text-error border-error/30 hover:bg-error/20'
    };

    return (
        <div className="form-control" ref={containerRef}>
            <label className="label label-text text-xs opacity-70">{label}</label>
            
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
                        onFocus={() => setIsOpen(true)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
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
                                onClick={() => handleSelect(suggestion)}
                                className="
                                    w-full text-left px-4 py-2.5
                                    text-sm hover:bg-base-200
                                    transition-all duration-150
                                    flex items-center gap-2
                                    border-b border-base-200/50 last:border-0
                                "
                            >
                                <RiAddLine className="h-4 w-4 text-primary/50" />
                                <span>{suggestion}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Selected Tags */}
            {selected.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {selected.map((item) => (
                        <span
                            key={item}
                            className={`
                                inline-flex items-center gap-1
                                px-2.5 py-1 rounded-full text-xs font-medium
                                border
                                ${colorClasses[color]}
                                transition-all duration-200
                                hover:scale-105
                                cursor-default
                            `}
                        >
                            {item}
                            <button
                                type="button"
                                onClick={() => handleRemove(item)}
                                className="
                                    hover:bg-white/20 rounded-full p-0.5
                                    transition-all duration-200
                                    hover:scale-110
                                    ml-0.5
                                "
                                aria-label={`Remove ${item}`}
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

// Simple Multiselect with Tags (for Status and Priority)
interface SimpleMultiselectProps {
    label: string;
    options: string[];
    selected: string[];
    onToggle: (value: string) => void;
    color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
}

function SimpleMultiselect({ 
    label, 
    options, 
    selected, 
    onToggle, 
    color = 'primary'
}: SimpleMultiselectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const colorClasses = {
        primary: 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20',
        secondary: 'bg-secondary/10 text-secondary border-secondary/30 hover:bg-secondary/20',
        accent: 'bg-accent/10 text-accent border-accent/30 hover:bg-accent/20',
        info: 'bg-info/10 text-info border-info/30 hover:bg-info/20',
        success: 'bg-success/10 text-success border-success/30 hover:bg-success/20',
        warning: 'bg-warning/10 text-warning border-warning/30 hover:bg-warning/20',
        error: 'bg-error/10 text-error border-error/30 hover:bg-error/20'
    };

    return (
        <div className="form-control" ref={containerRef}>
            <label className="label label-text text-xs opacity-70">{label}</label>
            
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-full flex items-center justify-between
                        bg-base-200/50 rounded-xl
                        border border-base-300/50
                        transition-all duration-300
                        ${isOpen ? 'border-primary/50 ring-2 ring-primary/20' : 'hover:border-base-300'}
                        px-3 py-2
                        text-sm
                    `}
                >
                    <span className="text-base-content/70">
                        {selected.length > 0 
                            ? `${selected.length} selected` 
                            : `Select ${label.toLowerCase()}...`
                        }
                    </span>
                    <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <div className="
                        absolute top-full left-0 right-0 mt-1
                        bg-base-100 border border-base-300 rounded-xl
                        shadow-2xl shadow-black/20
                        max-h-48 overflow-y-auto
                        z-50
                        custom-scrollbar
                    ">
                        {options.map((option) => {
                            const isSelected = selected.includes(option);
                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => onToggle(option)}
                                    className="
                                        w-full text-left px-4 py-2.5
                                        text-sm hover:bg-base-200
                                        transition-all duration-150
                                        flex items-center gap-2
                                        border-b border-base-200/50 last:border-0
                                    "
                                >
                                    <span className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200
                                        ${isSelected 
                                            ? 'bg-primary border-primary text-white' 
                                            : 'border-base-300'
                                        }
                                    `}>
                                        {isSelected && <RiCheckLine className="h-3 w-3" />}
                                    </span>
                                    <span>{option}</span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Selected Tags */}
            {selected.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {selected.map((item) => (
                        <span
                            key={item}
                            className={`
                                inline-flex items-center gap-1
                                px-2.5 py-1 rounded-full text-xs font-medium
                                border
                                ${colorClasses[color]}
                                transition-all duration-200
                                hover:scale-105
                                cursor-default
                            `}
                        >
                            {item}
                            <button
                                type="button"
                                onClick={() => onToggle(item)}
                                className="
                                    hover:bg-white/20 rounded-full p-0.5
                                    transition-all duration-200
                                    hover:scale-110
                                    ml-0.5
                                "
                                aria-label={`Remove ${item}`}
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

// Slider Component for Experience Level
interface LevelSliderProps {
    value: string[];
    onChange: (value: string[]) => void;
}

function ExperienceLevelSlider({ value, onChange }: LevelSliderProps) {
    const levels = ["Entry", "Mid", "Senior", "Expert"];
    const [range, setRange] = useState<[number, number]>([
        value.length > 0 ? levels.indexOf(value[0]) : 0,
        value.length > 1 ? levels.indexOf(value[1]) : levels.length - 1
    ]);

    const handleSliderChange = (val: [number, number]) => {
        setRange(val);
        const minLevel = levels[val[0]];
        const maxLevel = levels[val[1]];
        if (minLevel === maxLevel) {
            onChange([minLevel]);
        } else {
            onChange([minLevel, maxLevel]);
        }
    };

    return (
        <div className="form-control">
            <label className="label label-text text-xs opacity-70">Experience Level</label>
            <div className="bg-base-200/50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-xs">
                    <span className="text-base-content/60">{levels[range[0]]}</span>
                    <span className="text-base-content/60">{levels[range[1]]}</span>
                </div>
                <RangeSlider
                    min={0}
                    max={levels.length - 1}
                    step={1}
                    value={range}
                    onInput={handleSliderChange}
                    className="level-slider"
                />
                <div className="flex justify-between text-xs text-base-content/40">
                    {levels.map((level, index) => (
                        <span key={level} className={index >= range[0] && index <= range[1] ? 'text-primary font-medium' : ''}>
                            {level}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Slider Component for Team Size
interface TeamSizeSliderProps {
    value: string;
    onChange: (value: string) => void;
}

function TeamSizeSlider({ value, onChange }: TeamSizeSliderProps) {
    const sizes = ["1-3", "4-6", "7-10", "10+", "20+", "50+"];
    const currentIndex = value ? sizes.indexOf(value) : -1;
    
    // For single thumb slider, use value as [0, selectedIndex]
    const [sliderValue, setSliderValue] = useState<[number, number]>([
        0, // Lower thumb fixed at 0
        currentIndex >= 0 ? currentIndex : 0
    ]);

    // Update when value prop changes
    useEffect(() => {
        const idx = value ? sizes.indexOf(value) : -1;
        setSliderValue([0, idx >= 0 ? idx : 0]);
    }, [value]);

    const handleSliderChange = (val: [number, number]) => {
        // Only the upper thumb moves (val[1])
        const index = Math.round(val[1]);
        if (index >= 0 && index < sizes.length) {
            setSliderValue([0, index]);
            onChange(sizes[index]);
        }
    };

    return (
        <div className="form-control">
            <label className="label label-text text-xs opacity-70">Team Size</label>
            <div className="bg-base-200/50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-base-content/70">
                        {currentIndex >= 0 ? sizes[currentIndex] : 'Any Size'}
                    </span>
                    <span className="text-xs text-base-content/40">
                        {currentIndex >= 0 ? `${currentIndex + 1}/${sizes.length}` : 'Select'}
                    </span>
                </div>
                
                {/* Single thumb slider configuration */}
                <RangeSlider
                    min={0}
                    max={sizes.length - 1}
                    step={1}
                    value={sliderValue}
                    onInput={handleSliderChange}
                    className="team-slider"
                    // Key fix: Disable lower thumb and range sliding
                    thumbsDisabled={[true, false]}  // Lower thumb disabled, upper thumb active
                    rangeSlideDisabled={true}       // Disable range sliding
                />
                
                <div className="flex justify-between text-xs text-base-content/40">
                    {sizes.map((size, index) => (
                        <span 
                            key={size} 
                            className={`
                                transition-all duration-200
                                ${index === currentIndex ? 'text-primary font-bold scale-110' : 'hover:text-base-content/70'}
                            `}
                        >
                            {size}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-base-content/30">Small</span>
                    <span className="text-[10px] text-base-content/30">Large</span>
                </div>
                {currentIndex >= 0 && (
                    <button
                        type="button"
                        onClick={() => {
                            setSliderValue([0, 0]);
                            onChange("");
                        }}
                        className="text-xs text-base-content/40 hover:text-error transition-colors"
                    >
                        Clear selection
                    </button>
                )}
            </div>
        </div>
    );
}

export default function ProjectDetails({ 
    filters, 
    isActive, 
    onToggle, 
    onInputChange,
    onArrayToggle 
}: ProjectDetailsProps) {
    const [selectedIndustry, setSelectedIndustry] = useState<string>(
        filters.industry[0] || ""
    );

    // Get filtered categories based on selected industry
    const getFilteredCategories = () => {
        if (selectedIndustry && industryCategoryMap[selectedIndustry]) {
            return industryCategoryMap[selectedIndustry];
        }
        return categories;
    };

    const handleIndustryChange = (value: string) => {
        setSelectedIndustry(value);
        onInputChange("industry", value ? [value] : []);
    };

    const handleCategoryToggle = (value: string) => {
        onArrayToggle("category", value);
    };

    return (
        <div className="space-y-3 border-t border-base-300 pt-4">
            <button 
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left hover:bg-base-200/50 p-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-2">
                    <RiBriefcaseLine className="h-4 w-4 text-secondary" />
                    <span className="font-semibold text-sm">Project Details</span>
                    {(filters.category.length + filters.status.length + filters.priority.length) > 0 && (
                        <span className="badge badge-secondary badge-sm">
                            {filters.category.length + filters.status.length + filters.priority.length}
                        </span>
                    )}
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>
            
            {isActive && (
                <div className="pl-6 space-y-4">
                    {/* Industry - Single Select */}
                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Industry</label>
                        <select
                            className="select select-bordered select-sm w-full"
                            value={selectedIndustry}
                            onChange={(e) => handleIndustryChange(e.target.value)}
                        >
                            <option value="">All Industries</option>
                            {allIndustries.map((industry) => (
                                <option key={industry} value={industry}>{industry}</option>
                            ))}
                        </select>
                    </div>

                    {/* Category - Autocomplete Multiselect with Industry Filter */}
                    <AutocompleteMultiselect
                        label="Category"
                        options={categories}
                        selected={filters.category}
                        onToggle={handleCategoryToggle}
                        placeholder="Search categories..."
                        color="secondary"
                        filterOptions={getFilteredCategories()}
                    />

                    {/* Status - Simple Multiselect */}
                    <SimpleMultiselect
                        label="Status"
                        options={statusOptions}
                        selected={filters.status}
                        onToggle={(value) => onArrayToggle("status", value)}
                        color="primary"
                    />

                    {/* Priority - Simple Multiselect */}
                    <SimpleMultiselect
                        label="Priority"
                        options={priorityOptions}
                        selected={filters.priority}
                        onToggle={(value) => onArrayToggle("priority", value)}
                        color="error"
                    />

                    {/* Experience Level - Slider */}
                    <ExperienceLevelSlider
                        value={filters.experienceLevel}
                        onChange={(value) => onInputChange("experienceLevel", value)}
                    />

                    {/* Team Size - Slider */}
                    <TeamSizeSlider
                        value={filters.teamSize}
                        onChange={(value) => onInputChange("teamSize", value)}
                    />
                </div>
            )}
        </div>
    );
}