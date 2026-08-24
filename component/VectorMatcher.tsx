'use client';

import React from 'react';

export interface VectorMatcherProps {
    keywords: string;
    threshold: number;
    onKeywordsChange: (val: string) => void;
    onThresholdChange: (val: number) => void;
}

export const VectorMatcher: React.FC<VectorMatcherProps> = ({
    keywords,
    threshold,
    onKeywordsChange,
    onThresholdChange,
}) => {
    return (
        <div className="bg-white dark:bg-[#1C1A24] border border-slate-200 dark:border-[#2D2938] p-8 rounded-3xl space-y-6 shadow-sm">
            <div className="border-b border-slate-200 dark:border-[#2D2938] pb-3">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Vector Match Tuning</h2>
                <p class="text-xs text-slate-500">Set capability tags & match confidence thresholds.</p>
            </div>

            <div className="space-y-6 text-xs">
                <div className="space-y-2">
                    <label className="font-bold block text-slate-700 dark:text-slate-300">Tracked Capability Keywords</label>
                    <input
                        type="text"
                        value={keywords}
                        onChange={(e) => onKeywordsChange(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#121118] border border-slate-200 dark:border-[#2D2938] font-semibold text-slate-900 dark:text-slate-100"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Minimum Match Confidence</label>
                        <span className="font-bold text-[#5B3E96] dark:text-[#9B82C1] text-sm">{threshold}%</span>
                    </div>
                    <input
                        type="range"
                        min="50"
                        max="95"
                        value={threshold}
                        onChange={(e) => onThresholdChange(Number(e.target.value))}
                        className="w-full accent-[#5B3E96]"
                    />
                </div>
            </div>
        </div>
    );
};