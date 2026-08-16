import { RiAddLine, RiCloseFill } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";

interface AutocompleteMultiselectProps {
    label: string;
    options: string[];
    selected: string[];
    onToggle: (value: string) => void;
    placeholder?: string;
    color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
    filterOptions?: string[];
}
export default function AutocompleteMultiselect({ 
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