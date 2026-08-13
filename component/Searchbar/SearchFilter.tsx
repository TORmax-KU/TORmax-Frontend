import { RiFilter2Fill } from "@remixicon/react";
import React from "react";
import FilterOptions from "./FilterOptions";

export default function SearchFilter() {
    return (
        <React.Fragment>
            <label htmlFor="my_modal_7" ><RiFilter2Fill/></label>

            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <FilterOptions/>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </React.Fragment>

    )
}