'use client';

import { useState, useRef, useEffect } from "react";
import { RiMapPinLine, RiCloseFill } from "@remixicon/react";
import { RADAR_CONFIG, isRadarConfigured } from "@/config/radar";

interface LocationPickerProps {
    value: string;
    onChange: (value: string) => void;
}

// Radar Autocomplete Widget (Lightweight version without full map)
function RadarAutocomplete({ onSelect }: { onSelect: (address: string) => void }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Array<{ text: string; id: string }>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch suggestions from Radar API
    const fetchSuggestions = async (searchText: string) => {
        if (!searchText.trim() || !isRadarConfigured()) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                `https://api.radar.io/v1/geocode/forward?query=${encodeURIComponent(searchText)}&layers=address,locality,country&limit=10`,
                {
                    headers: {
                        'Authorization': RADAR_CONFIG.apiKey,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch suggestions');
            }

            const data = await response.json();
            
            // Transform Radar response to simple suggestions
            if (data.addresses && data.addresses.length > 0) {
                const formattedSuggestions = data.addresses.map((address: any) => ({
                    text: address.formattedAddress || address.addressLabel || 
                          `${address.addressLine1 || ''} ${address.locality || ''} ${address.countryCode || ''}`.trim(),
                    id: address.id || `radar-${Math.random()}`,
                }));
                setSuggestions(formattedSuggestions);
                setIsOpen(true);
            } else {
                setSuggestions([]);
                setIsOpen(false);
            }
        } catch (error) {
            console.error('Radar autocomplete error:', error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Debounce the search input
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length > 1) {
                fetchSuggestions(query);
            } else {
                setSuggestions([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

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

    const handleSelect = (suggestion: string) => {
        onSelect(suggestion);
        setQuery(suggestion);
        setIsOpen(false);
        setSuggestions([]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && suggestions.length > 0) {
            e.preventDefault();
            handleSelect(suggestions[0].text);
        }
        if (e.key === 'Escape') {
            setIsOpen(false);
            inputRef.current?.blur();
        }
    };

    return (
        <div className="relative" ref={containerRef}>
            <div className={`
                flex items-center gap-2
                bg-base-200/50 rounded-xl
                border border-base-300/50
                transition-all duration-300
                ${isOpen ? 'border-primary/50 ring-2 ring-primary/20' : 'hover:border-base-300'}
                px-3 py-2
            `}>
                <RiMapPinLine className="h-4 w-4 text-primary/50 flex-shrink-0" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (suggestions.length > 0) setIsOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for city, address, or country..."
                    className="
                        w-full bg-transparent border-none outline-none
                        text-sm placeholder:text-base-content/30
                    "
                />
                {isLoading && (
                    <span className="loading loading-spinner loading-xs text-primary/50" />
                )}
                {query && !isLoading && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery("");
                            setSuggestions([]);
                            setIsOpen(false);
                            onSelect("");
                        }}
                        className="p-0.5 rounded-full hover:bg-base-300/50 transition-colors"
                    >
                        <RiCloseFill className="h-4 w-4 text-base-content/40" />
                    </button>
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
                            key={suggestion.id}
                            type="button"
                            onClick={() => handleSelect(suggestion.text)}
                            className="
                                w-full text-left px-4 py-2.5
                                text-sm hover:bg-base-200
                                transition-all duration-150
                                flex items-center gap-2
                                border-b border-base-200/50 last:border-0
                            "
                        >
                            <RiMapPinLine className="h-4 w-4 text-primary/30 flex-shrink-0" />
                            <span>{suggestion.text}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function LocationPicker({ value, onChange }: LocationPickerProps) {
    const [showMap, setShowMap] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(value);

    const handleLocationSelect = (location: string) => {
        setSelectedLocation(location);
        onChange(location);
    };

    // Popular locations for quick selection
    const popularLocations = [
        "Bangkok, Thailand",
        "New York, USA",
        "London, UK",
        "Tokyo, Japan",
        "Paris, France",
        "Berlin, Germany",
        "Sydney, Australia",
        "Singapore",
        "Dubai, UAE",
        "Toronto, Canada",
    ];

    return (
        <div className="form-control">
            <label className="label label-text text-xs opacity-70 flex items-center gap-2">
                <RiMapPinLine className="h-3 w-3" />
                Location
            </label>
            
            <div className="space-y-3">
                {/* Radar Autocomplete */}
                <RadarAutocomplete onSelect={handleLocationSelect} />

                {/* Quick location chips */}
                <div className="flex flex-wrap gap-1.5">
                    {popularLocations.map((loc) => (
                        <button
                            key={loc}
                            type="button"
                            onClick={() => handleLocationSelect(loc)}
                            className={`
                                px-2.5 py-1 rounded-full text-xs font-medium
                                transition-all duration-200
                                ${selectedLocation === loc 
                                    ? 'bg-primary text-primary-content shadow-md shadow-primary/20' 
                                    : 'bg-base-200 hover:bg-base-300 text-base-content/70'
                                }
                            `}
                        >
                            {loc.split(',')[0]}
                        </button>
                    ))}
                </div>

                {/* Selected location display */}
                {selectedLocation && (
                    <div className="flex items-center gap-2 text-xs text-base-content/60 bg-base-200/30 rounded-lg px-3 py-1.5">
                        <RiMapPinLine className="h-3 w-3 text-primary" />
                        <span>{selectedLocation}</span>
                        <button
                            type="button"
                            onClick={() => handleLocationSelect("")}
                            className="ml-auto hover:text-error transition-colors"
                        >
                            <RiCloseFill className="h-4 w-4" />
                        </button>
                    </div>
                )}

                {/* API Status */}
                {!isRadarConfigured() && (
                    <div className="text-xs text-warning/70 flex items-center gap-1.5">
                        <span className="loading loading-bars loading-xs" />
                        Radar API key not configured
                    </div>
                )}
            </div>
        </div>
    );
}