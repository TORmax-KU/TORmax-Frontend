'use client';

import React, { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { TORItem } from '@/types';

// Helper to check client-side rendering without triggering cascading render warnings
const emptySubscribe = () => () => { };
function useIsClient() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
}

interface EditTORModalProps {
    editingTor: TORItem | null;
    onSave: (e: React.SyntheticEvent) => void;
    onCancel: () => void;
    onChange: (field: keyof TORItem, value: any) => void;
    t: {
        editTitle: string;
        colTitle: string;
        colAgency: string;
        colBudget: string;
        colSource: string;
        btnCancel: string;
        btnSave: string;
    };
}

export function EditTORModal({
    editingTor,
    onSave,
    onCancel,
    onChange,
    t
}: EditTORModalProps) {
    const isClient = useIsClient();

    if (!isClient || !editingTor) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] min-h-[100svh] w-full flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onCancel}
        >
            <div
                className="max-w-lg w-full space-y-4 bg-base-100 border border-base-300 text-base-content rounded-xl p-6 shadow-2xl relative z-[10000]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b border-base-300 pb-3">
                    <h3 className="text-lg font-bold text-base-content">
                        {t.editTitle} ({editingTor.id})
                    </h3>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-sm btn-circle btn-ghost"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={onSave} className="space-y-3 text-xs">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold text-base-content">{t.colTitle}</span>
                        </label>
                        <input
                            type="text"
                            value={editingTor.name || ''}
                            onChange={(e) => onChange('name', e.target.value)}
                            className="input input-sm input-bordered w-full bg-base-100 text-base-content"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold text-base-content">{t.colAgency}</span>
                        </label>
                        <input
                            type="text"
                            value={editingTor.employer || ''}
                            onChange={(e) => onChange('employer', e.target.value)}
                            className="input input-sm input-bordered w-full bg-base-100 text-base-content"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-base-content">{t.colBudget}</span>
                            </label>
                            <input
                                type="text"
                                value={editingTor.price || ''}
                                onChange={(e) => onChange('price', e.target.value)}
                                className="input input-sm input-bordered font-mono bg-base-100 text-base-content"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-base-content">{t.colSource}</span>
                            </label>
                            <input
                                type="text"
                                value={editingTor.sourcePortal || ''}
                                onChange={(e) => onChange('sourcePortal', e.target.value)}
                                className="input input-sm input-bordered font-mono bg-base-100 text-base-content"
                            />
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                        <button type="button" onClick={onCancel} className="btn btn-sm btn-ghost">
                            {t.btnCancel}
                        </button>
                        <button type="submit" className="btn btn-sm btn-primary">
                            {t.btnSave}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}