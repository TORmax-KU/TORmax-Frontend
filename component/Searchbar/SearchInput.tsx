import React from "react";
import { DetailedVersion } from "../ProjectListings/ProjectListing";
import SearchFilter from "./SearchFilter";

export default function SearchInput({ detailed = false }: DetailedVersion) {
    return (
        <div style={{
            display: 'flex',
            gap: 10,
            alignItems: 'center'
        }}>
            <label className="input">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>
            <input type="search" required placeholder="Search" />
            
        </label><SearchFilter/>
        </div>
        
    )
}