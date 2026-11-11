'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RiCloseLine, RiSearchLine } from '@remixicon/react';

interface HeroSearchInputProps {
    onSearch?: (query: string) => void;
    placeholder?: string;
    searchLabel?: string;
    initialValue?: string;
}

export default function HeroSearchInput({
    onSearch,
    placeholder = 'Search procurement titles, agencies, or TOR IDs...',
    searchLabel = 'ค้นหา',
    initialValue = ''
}: HeroSearchInputProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(initialValue);

    // Sync state if URL query changes
    useEffect(() => {
        const urlQuery = searchParams.get('q');
        if (urlQuery !== null) {
            const rafId = requestAnimationFrame(() => setQuery(urlQuery));
            return () => cancelAnimationFrame(rafId);
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
            <div className="relative flex items-center h-14 rounded-[14px] bg-surface border border-line-strong shadow-raised transition-[border-color,box-shadow] duration-200 focus-within:border-brand-soft focus-within:shadow-[0_0_0_4px_var(--brand-tint-strong),var(--elev-md)]">
                {/* Search Icon */}
                <div className="pl-4 pr-2.5 text-ink-4 pointer-events-none flex items-center justify-center">
                    <RiSearchLine className="w-5 h-5" />
                </div>

                {/* Text Input */}
                <input
                    type="text"
                    maxLength={300}
                    aria-label={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="min-w-0 w-full h-full pr-2 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-4"
                />

                {/* Clear Button */}
                {query && (
                    <button
                        type="button"
                        aria-label={searchLabel === 'ค้นหา' ? 'ล้างคำค้นหา' : 'Clear search'}
                        onClick={() => setQuery('')}
                        className="ui-icon-btn h-8 w-8 mr-1 rounded-full"
                    >
                        <RiCloseLine className="w-4 h-4" />
                    </button>
                )}

                {/* Submit Action Button */}
                <div className="shrink-0 pr-2">
                    <button type="submit" className="ui-btn ui-btn-primary h-10 px-5">
                        <span>{searchLabel}</span>
                    </button>
                </div>
            </div>
        </form>
    );
}
