'use client';

import React from 'react';
import Link from 'next/link';
import { TORItem } from '@/types';
import { TORCard } from './TORCard';

interface DailyDigestSectionProps {
    topMatches: TORItem[];
    userProfile?: {
        companyName?: string;
    };
}

export default function DailyDigestSection({
    topMatches = [],
    userProfile = { companyName: 'Your Company' }
}: DailyDigestSectionProps) {
    return (
        <div className="space-y-6 scroll-mt-24">
            {/* Header Bar */}
            <div className="border-b border-slate-200 dark:border-tormax-borderDark pb-4 flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white tracking-tight">
                        Daily Digest — Today's Curated Bids
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        High confidence matches tailored to <strong className="text-slate-700 dark:text-slate-200">{userProfile.companyName}</strong> capabilities.
                    </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/20 shadow-xs">
                        Updated 2 Hours Ago
                    </span>
                    <Link
                        href="/search-feed"
                        className="hidden sm:inline-flex text-xs font-bold text-tormax-purple dark:text-tormax-lavender hover:underline"
                    >
                        View Directory →
                    </Link>
                </div>
            </div>

            {/* 3-Column Grid using TORCard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topMatches.slice(0, 3).map((tor) => (
                    <TORCard key={tor.id} tor={tor} />
                ))}
            </div>
        </div>
    );
}