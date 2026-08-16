'use client';

import { useState, useRef, useEffect } from "react";
import { RiCodeLine, RiArrowDownSLine, RiCloseFill, RiAddLine } from "@remixicon/react";
import { FilterState } from "./FilterIndex";

interface SkillsTechnologiesProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string | string[]) => void;
    onArrayToggle: (field: keyof FilterState, value: string) => void;
}

// All available options
const allSkills = [
    "Project Management", "Team Leadership", "Strategic Planning", "Budget Management",
    "Data Analysis", "Research & Development", "Technical Writing", "Quality Assurance",
    "Risk Management", "Compliance", "Supply Chain Management", "Inventory Management",
    "Customer Relationship Management", "Business Development", "Financial Analysis",
    "Graphic Design", "User Research", "Prototyping", "Information Architecture",
    "Content Strategy", "SEO", "Social Media Marketing", "Email Marketing",
    "Communication", "Problem Solving", "Critical Thinking", "Adaptability",
    "Time Management", "Collaboration", "Emotional Intelligence", "Negotiation"
];

const allTechnologies = [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "Go", "Rust",
    "React", "Vue.js", "Angular", "Next.js", "Node.js", "Express",
    "Django", "Spring Boot", "Laravel", "GraphQL", "REST API",
    "MongoDB", "PostgreSQL", "MySQL", "Redis", "Cassandra",
    "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"
];

const allTools = [
    "Git", "GitHub", "GitLab", "Bitbucket", "Jenkins",
    "GitHub Actions", "CircleCI", "Travis CI", "Slack",
    "Jira", "Confluence", "Trello", "Asana", "Figma",
    "InVision", "Miro", "Sketch", "VSCode", "IntelliJ",
    "Postman", "Swagger", "Insomnia"
];

interface TagInputProps {
    label: string;
    field: keyof FilterState;
    options: string[];
    selected: string[];
    onAdd: (field: keyof FilterState, value: string) => void;
    onRemove: (field: keyof FilterState, value: string) => void;
    placeholder?: string;
    color?: 'info' | 'secondary' | 'accent';
}

function TagInput({ 
    label, 
    field, 
    options, 
    selected, 
    onAdd, 
    onRemove, 
    placeholder = "Type to search...",
    color = 'info'
}: TagInputProps) {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter suggestions based on input
    useEffect(() => {
        if (inputValue.trim().length > 0) {
            const filtered = options.filter(opt => 
                opt.toLowerCase().includes(inputValue.toLowerCase()) &&
                !selected.includes(opt)
            );
            setSuggestions(filtered.slice(0, 10));
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [inputValue, options, selected]);

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
        onAdd(field, value);
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

    const colorClasses = {
        info: 'bg-info/10 text-info border-info/30 hover:bg-info/20',
        secondary: 'bg-secondary/10 text-secondary border-secondary/30 hover:bg-secondary/20',
        accent: 'bg-accent/10 text-accent border-accent/30 hover:bg-accent/20'
    };

    return (
        <div className="form-control" ref={containerRef}>
            <label className="label label-text text-xs opacity-70">{label}</label>
            
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
                                onClick={() => handleAdd(suggestion)}
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

            {/* Selected Tags - Displayed outside the input */}
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
                                onClick={() => onRemove(field, item)}
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

export default function SkillsTechnologies({ 
    filters, 
    isActive, 
    onToggle, 
    onInputChange,
    onArrayToggle 
}: SkillsTechnologiesProps) {
    return (
        <div className="space-y-3 border-t border-base-300 pt-4">
            <button 
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left hover:bg-base-200/50 p-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-2">
                    <RiCodeLine className="h-4 w-4 text-info" />
                    <span className="font-semibold text-sm">Skills & Technologies</span>
                    {(filters.skills.length + filters.technologies.length + filters.tools.length) > 0 && (
                        <span className="badge badge-info badge-sm">
                            {filters.skills.length + filters.technologies.length + filters.tools.length}
                        </span>
                    )}
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>
            
            {isActive && (
                <div className="pl-6 space-y-4">
                    <TagInput
                        label="Skills Required"
                        field="skills"
                        options={allSkills}
                        selected={filters.skills}
                        onAdd={onArrayToggle}
                        onRemove={onArrayToggle}
                        placeholder="Search skills..."
                        color="info"
                    />

                    <TagInput
                        label="Technologies"
                        field="technologies"
                        options={allTechnologies}
                        selected={filters.technologies}
                        onAdd={onArrayToggle}
                        onRemove={onArrayToggle}
                        placeholder="Search technologies..."
                        color="secondary"
                    />

                    <TagInput
                        label="Tools"
                        field="tools"
                        options={allTools}
                        selected={filters.tools}
                        onAdd={onArrayToggle}
                        onRemove={onArrayToggle}
                        placeholder="Search tools..."
                        color="accent"
                    />
                </div>
            )}
        </div>
    );
}