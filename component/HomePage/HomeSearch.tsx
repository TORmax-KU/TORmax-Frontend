'use client';

import { useState, useEffect } from 'react';
import MediaBlock from "../MediaBlock";
import FilterModal from '../Searchbar/FilterModal';
import SearchInput from '../Searchbar/SearchInput';

export default function HomeSearch() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <>
            <div className="relative h-[600px] md:h-[700px] overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <MediaBlock url="/TORment Header.png" objectFit="cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </div>

                {/* Animated Decorative Elements */}
                <div className="absolute inset-0 z-1 pointer-events-none">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />
                </div>

                {/* Content */}
                <div className={`
                    relative z-10 flex flex-col items-center justify-center h-full px-4
                    transition-all duration-1000 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-4 tracking-tight">
                        What project are you
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2 h-[80px]">
                            looking for?
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-white/80 text-lg md:text-xl text-center max-w-2xl mb-8 px-4">
                        Discover the perfect TOR project for your needs. Our intelligent search helps you find exactly what you're looking for.
                    </p>

                    {/* Search Input */}
                    <div className="w-full max-w-3xl animate-fade-in-up delay-300">
                        <div className="relative">
                            <SearchInput mode='dark' altLook/>

                            {/* Quick Search Tags */}
                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                                {['Web Development', 'Mobile Apps', 'AI/ML', 'DevOps', 'Security'].map((tag) => (
                                    <button
                                        key={tag}
                                        className="px-3 py-1 text-xs text-white/70 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/20 hover:text-white hover:border-white/20 transition-all duration-300"
                                        onClick={() => {
                                            const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
                                            if (searchInput) {
                                                searchInput.value = tag;
                                                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                                            }
                                        }}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Statistics Counter */}
                    <div className="grid grid-cols-3 gap-8 mt-12 text-white/90">
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold">10K+</div>
                            <div className="text-xs md:text-sm opacity-70">Projects</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold">5K+</div>
                            <div className="text-xs md:text-sm opacity-70">Contributors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold">98%</div>
                            <div className="text-xs md:text-sm opacity-70">Satisfaction</div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
                        <div className="w-1 h-2 bg-white/50 rounded-full animate-scroll-down" />
                    </div>
                </div>
            </div>

            {/* Filter Modal - Subcomponent */}
            <FilterModal />
        </>
    );
}