'use client';

import React, { useState, useRef, useEffect } from "react";
import { DetailedVersion } from "../ProjectListings/ProjectListing";
import SearchFilter from "./SearchFilter";

export default function SearchInput({ detailed = false }: DetailedVersion) {
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && searchValue.trim()) {
            e.preventDefault();
            // Trigger search - you can replace this with your search logic
            console.log('Searching for:', searchValue);
            // Example: router.push(`/search?q=${encodeURIComponent(searchValue)}`);
        }
    };

    const input = inputRef.current;
    if (input) {
        input.addEventListener('keydown', handleKeyDown);
        return () => input.removeEventListener('keydown', handleKeyDown);
    }
}, [searchValue]);

    return (
        <div className="w-full">
            <div className={`
                flex items-center gap-3 transition-all duration-300
                ${detailed ? 'bg-transparent rounded-xl p-2' : ''}
            `}>
                <div className={`
                    relative flex-1 transition-all duration-300
                    ${isFocused ? 'scale-[1.01]' : ''}
                `}>
                    <div className={`
                        relative flex items-center gap-3
                        bg-white/10 backdrop-blur-sm 
                        border border-white/20 rounded-xl
                        transition-all duration-300
                        hover:border-white/40
                        ${isFocused 
                            ? 'border-primary/50 shadow-lg shadow-primary/20 ring-2 ring-primary/20' 
                            : ''
                        }
                    `}>
                        <div className="flex-shrink-0 pl-4">
                            <svg 
                                className={`h-5 w-5 transition-colors duration-300 ${
                                    isFocused ? 'text-white/50' : 'text-white/50'
                                }`} 
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

                        <input
                            ref={inputRef}
                            type="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder={detailed ? "Search projects..." : "Search"}
                            className={`
                                flex-1 bg-transparent border-none outline-none 
                                py-4 pr-2 text-white placeholder-white/50
                                ${detailed ? 'text-lg' : 'text-base'}
                            `}
                            style={{ color: 'white' }}
                            aria-label="Search for projects"
                        />

                        {/* Filter Button - Inside input */}
                        <div className="flex-shrink-0 pr-2 relative z-50">
                            <SearchFilter />
                        </div>

                        {searchValue && (
                            <button
                                onClick={() => setSearchValue('')}
                                className="flex-shrink-0 mr-1 p-1 rounded-full hover:bg-white/10 transition-colors"
                                aria-label="Clear search"
                            >
                                <svg className="h-4 w-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}

                    </div>

                    {/* Search Suggestions */}
                    {isFocused && searchValue.length > 1 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-base-100/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[60]">
                            <div className="p-2 space-y-1">
                                <div className="px-3 py-2 text-sm text-white/70 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                                    🔍 Search for "{searchValue}"
                                </div>
                                <div className="px-3 py-2 text-sm text-white/70 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                                    💡 Try searching for specific technologies
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {detailed && searchValue && (
                <div className="mt-2 text-sm text-white/40">
                    {searchValue.length > 0 && `Showing results for "${searchValue}"`}
                </div>
            )}
        </div>
    );
}