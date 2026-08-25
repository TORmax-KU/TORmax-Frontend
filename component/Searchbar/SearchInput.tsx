'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchInputProps {
    mode?: 'dark' | 'light';
    altLook?: boolean;
    onSearch?: (query: string) => void;
    placeholder?: string;
    initialValue?: string;
}

export default function SearchInput({
    mode = 'dark',
    altLook = false,
    onSearch,
    placeholder = 'Search procurement titles, agencies, or TOR IDs...',
    initialValue = ''
}: SearchInputProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(initialValue);

    // Sync state if URL query changes
    useEffect(() => {
        const urlQuery = searchParams.get('q');
        if (urlQuery !== null) {
            setQuery(urlQuery);
        }
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedQuery = query.trim();

        if (onSearch) {
            onSearch(trimmedQuery);
            return;
        }

        if (trimmedQuery) {
            router.push(`/search-feed?q=${encodeURIComponent(trimmedQuery)}`);
        } else {
            router.push('/search-feed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            <div
                className={`relative flex items-center rounded-2xl transition-all duration-300 ${mode === 'dark'
                        ? 'bg-slate-900/90 border border-slate-700/80 text-white shadow-2xl focus-within:border-indigo-500/80 focus-within:ring-4 focus-within:ring-indigo-500/20'
                        : 'bg-white border border-slate-200 text-slate-900 shadow-md focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/10'
                    } ${altLook ? 'backdrop-blur-xl' : ''}`}
            >
                {/* Search Icon */}
                <div className="pl-4 pr-2 text-slate-400 pointer-events-none flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Text Input */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full py-4 pr-3 bg-transparent text-sm sm:text-base outline-none placeholder:text-slate-400 ${mode === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}
                />

                {/* Clear Button */}
                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="p-1 mr-1 text-slate-400 hover:text-slate-200 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}

                {/* Submit Action Button */}
                <div className="pr-2">
                    <button
                        type="submit"
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
                    >
                        <span>Search</span>
                    </button>
                </div>
            </div>
        </form>
    );
}