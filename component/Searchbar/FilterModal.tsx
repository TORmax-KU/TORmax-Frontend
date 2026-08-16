'use client';

import React from "react";
import FilterOptions from "./FilterOptions";

export default function FilterModal() {
    return (
        <>
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box max-w-2xl p-0 overflow-hidden rounded-2xl">
                    {/* Header with gradient accent */}
                    <div className="relative">
                        <div className="p-6">
                            <FilterOptions />
                        </div>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </>
    );
}