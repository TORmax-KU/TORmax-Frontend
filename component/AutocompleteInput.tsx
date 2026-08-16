import { RiAddLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";

interface AutocompleteInputProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function AutocompleteInput({ 
    label, 
    value, 
    options, 
    onChange, 
    placeholder = "Type to search..."
}: AutocompleteInputProps) {
    const [inputValue, setInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        if (inputValue.trim().length > 0) {
            const filtered = options.filter(opt => 
                opt.toLowerCase().includes(inputValue.toLowerCase()) &&
                opt !== value
            );
            setSuggestions(filtered.slice(0, 8));
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [inputValue, options, value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (selected: string) => {
        onChange(selected);
        setInputValue(selected);
        setIsOpen(false);
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
                </div>

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
        </div>
    );
}