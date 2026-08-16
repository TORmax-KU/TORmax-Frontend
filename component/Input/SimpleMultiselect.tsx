import { RiArrowDownSLine, RiCheckLine, RiCloseFill } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";

interface SimpleMultiselectProps {
    label: string;
    options: string[];
    selected: string[];
    onToggle: (value: string) => void;
    color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
}

export function SimpleMultiselect({ 
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