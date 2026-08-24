'use client';

import React from 'react';
import { FilterState } from '@/types';

export interface FilterModalProps {
    isOpen: boolean;
    filters: FilterState;
    onClose: () => void;
    onApply: (updated: FilterState) => void;
    onReset: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, filters, onClose, onApply, onReset }) => {
    const [localFilters, setLocalFilters] = React.useState<FilterState>(filters);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1C1A24] border border-slate-200 dark:border-[#2D2938] rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl">
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-[#2D2938] pb-4">
                    <div>
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Advanced Filter Engine</h3>
                        <p className="text-xs text-slate-500">Configure multi-attribute criteria</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-xl font-bold">✕</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                        <label className="font-bold block text-slate-700 dark:text-slate-300">Procurement Method</label>
                        <select
                            value={localFilters.method}
                            onChange={(e) => setLocalFilters({ ...localFilters, method: e.target.value })}
                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#121118] border border-slate-200 dark:border-[#2D2938] font-semibold"
                        >
                            <option value="ALL">All Bidding Methods</option>
                            <option value="e-Bidding">e-Bidding</option>
                            <option value="e-Market">e-Market</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="font-bold block text-slate-700 dark:text-slate-300">Agency / Ministry</label>
                        <select
                            value={localFilters.agency}
                            onChange={(e) => setLocalFilters({ ...localFilters, agency: e.target.value })}
                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#121118] border border-slate-200 dark:border-[#2D2938] font-semibold"
                        >
                            <option value="ALL">All Agencies</option>
                            <option value="Ministry of Digital Economy and Society (MDES)">MDES</option>
                            <option value="State Railway of Thailand">State Railway of Thailand</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-[#2D2938]">
                    <button onClick={onReset} className="px-5 py-2.5 border border-slate-200 dark:border-[#2D2938] rounded-xl text-xs font-bold">Reset</button>
                    <button onClick={() => onApply(localFilters)} className="px-6 py-2.5 bg-[#5B3E96] text-white rounded-xl text-xs font-bold shadow">Apply Filters</button>
                </div>
            </div>
        </div>
    );
};