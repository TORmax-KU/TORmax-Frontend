'use client';

import { useState, useRef, useEffect } from "react";
import SearchFilter from "./SearchFilter";
import { AltVersion } from "../ProjectListings/AltVersion";

interface SearchInputProps extends AltVersion {
    mode?: 'light' | 'dark';
}

export default function SearchInput({ mode = 'light', altLook = false }: SearchInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Mode-based styling
    const getModeStyles = () => {
        if (mode === 'light') {
            return {
                // Container
                containerBg: 'bg-white/80 backdrop-blur-md',
                containerBorder: 'border-gray-200/50 hover:border-primary/30',
                // Input wrapper - keep glass look
                inputBg: 'bg-white/50 backdrop-blur-sm',
                inputBorder: 'border-gray-200/50 hover:border-gray-300/70',
                // Text colors
                text: 'text-gray-800',
                placeholder: 'placeholder-gray-400',
                icon: 'text-gray-500',
                // Clear button
                clearButton: 'text-gray-400 hover:text-gray-600',
                // Suggestions
                suggestionBg: 'bg-white/95 backdrop-blur-sm border-gray-200/50',
                suggestionText: 'text-gray-700',
                suggestionHover: 'hover:bg-gray-50',
                // Result text
                resultText: 'text-gray-500',
            };
        }
        // Dark mode
        return {
            containerBg: 'bg-white/5 backdrop-blur-md',
            containerBorder: 'border-white/10 hover:border-white/30',
            inputBg: 'bg-white/5 backdrop-blur-sm',
            inputBorder: 'border-white/10 hover:border-white/20',
            text: 'text-white',
            placeholder: 'placeholder-white/40',
            icon: 'text-white/40',
            clearButton: 'text-white/40 hover:text-white/60',
            suggestionBg: 'bg-base-100/90 backdrop-blur-sm border-white/10',
            suggestionText: 'text-white/60',
            suggestionHover: 'hover:bg-white/5',
            resultText: 'text-white/30',
        };
    };

    const styles = getModeStyles();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && searchValue.trim()) {
                e.preventDefault();
                console.log('Searching for:', searchValue);
            }
        };

        const input = inputRef.current;
        if (input) {
            input.addEventListener('keydown', handleKeyDown);
            return () => input.removeEventListener('keydown', handleKeyDown);
        }
    }, [searchValue]);

    return (
        <div className={`z-10 relative ${styles.containerBg} rounded-2xl shadow-2xl border ${styles.containerBorder} p-1 transition-all duration-300 hover:shadow-primary/20`}>
            <div className="w-full">
                <div className={`
                    flex items-center gap-3 transition-all duration-300
                    ${altLook ? 'bg-transparent rounded-xl p-2' : ''}
                `}>
                    <div className={`
                        relative flex-1 transition-all duration-300
                        ${isFocused ? 'scale-[1.01]' : ''}
                    `}>
                        <div className={`
                            relative flex items-center gap-3
                            ${styles.inputBg}
                            border ${styles.inputBorder} rounded-xl
                            transition-all duration-300
                            ${isFocused
                                ? 'border-primary/50 shadow-lg shadow-primary/20 ring-2 ring-primary/20'
                                : ''
                            }
                        `}>
                            {/* Search Icon */}
                            <div className="flex-shrink-0 pl-4">
                                <svg
                                    className={`h-5 w-5 transition-colors duration-300 ${styles.icon}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </div>

                            {/* Input */}
                            <input
                                ref={inputRef}
                                type="search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder={altLook ? "Search projects..." : "Search"}
                                className={`
                                    flex-1 bg-transparent border-none outline-none 
                                    py-4 pr-2 
                                    ${styles.text}
                                    ${styles.placeholder}
                                    ${altLook ? 'text-lg' : 'text-base'}
                                `}
                                aria-label="Search for projects"
                            />

                            {/* Clear Button */}
                            {searchValue && (
                                <button
                                    onClick={() => setSearchValue('')}
                                    className={`flex-shrink-0 mr-1 p-1 rounded-full transition-colors ${styles.clearButton}`}
                                    aria-label="Clear search"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}

                            {/* Filter Button */}
                            <div className="flex-shrink-0 pr-2 relative z-50">
                                <SearchFilter mode={mode} />
                            </div>
                        </div>

                        {/* Search Suggestions */}
                        {isFocused && searchValue.length > 1 && (
                            <div className={`absolute top-full left-0 right-0 mt-2 ${styles.suggestionBg} border rounded-xl shadow-2xl overflow-hidden z-[60]`}>
                                <div className="p-2 space-y-1">
                                    <div className={`px-3 py-2 text-sm ${styles.suggestionText} ${styles.suggestionHover} rounded-lg cursor-pointer transition-colors`}>
                                        🔍 Search for "{searchValue}"
                                    </div>
                                    <div className={`px-3 py-2 text-sm ${styles.suggestionText} ${styles.suggestionHover} rounded-lg cursor-pointer transition-colors`}>
                                        💡 Try searching for specific technologies
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {altLook && searchValue && (
                    <div className={`mt-2 text-sm ${styles.resultText}`}>
                        {searchValue.length > 0 && `Showing results for "${searchValue}"`}
                    </div>
                )}
            </div>
        </div>
    );
}