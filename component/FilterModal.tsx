'use client';

import React from 'react';

export interface FilterState {
  query: string;
  method: string;
  agency: string;
  minBudget: number | '';
  maxBudget: number | '';
  requireIso: boolean;
  requireCapital: boolean;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (newFilters: FilterState) => void;
  onReset: () => void;
  agencies: string[];
  methods: string[];
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApply,
  onReset,
  agencies,
  methods,
}) => {
  const [draft, setDraft] = React.useState<FilterState>(filters);

  // Keep draft in sync when modal opens
  React.useEffect(() => {
    setDraft(filters);
  }, [filters, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-tormax-borderDark pb-3">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>🎛️</span> Advanced Filters & Source Portals
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          {/* Procurement Method */}
          <div className="space-y-1">
            <label className="text-slate-600 dark:text-slate-300">Procurement Method</label>
            <select
              value={draft.method}
              onChange={(e) => setDraft({ ...draft, method: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-tormax-purple"
            >
              <option value="ALL">All Methods</option>
              {methods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Agency */}
          <div className="space-y-1">
            <label className="text-slate-600 dark:text-slate-300">Procuring Agency</label>
            <select
              value={draft.agency}
              onChange={(e) => setDraft({ ...draft, agency: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-tormax-purple"
            >
              <option value="ALL">All Agencies</option>
              {agencies.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Range */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-600 dark:text-slate-300">Min Budget (THB)</label>
              <input
                type="number"
                placeholder="0"
                value={draft.minBudget}
                onChange={(e) =>
                  setDraft({ ...draft, minBudget: e.target.value ? Number(e.target.value) : '' })
                }
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-tormax-purple"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-600 dark:text-slate-300">Max Budget (THB)</label>
              <input
                type="number"
                placeholder="No Limit"
                value={draft.maxBudget}
                onChange={(e) =>
                  setDraft({ ...draft, maxBudget: e.target.value ? Number(e.target.value) : '' })
                }
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-tormax-purple"
              />
            </div>
          </div>

          {/* Special Requirements */}
          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={draft.requireIso}
                onChange={(e) => setDraft({ ...draft, requireIso: e.target.checked })}
                className="rounded text-tormax-purple focus:ring-tormax-purple"
              />
              Require ISO 27001 Certification
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={draft.requireCapital}
                onChange={(e) => setDraft({ ...draft, requireCapital: e.target.checked })}
                className="rounded text-tormax-purple focus:ring-tormax-purple"
              />
              Require Minimum Registered Capital
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-tormax-borderDark flex justify-end gap-3">
            <button
              type="button"
              onClick={onReset}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Reset Filters
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-tormax-purple hover:bg-tormax-purpleDeep text-white rounded-xl shadow-md transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};