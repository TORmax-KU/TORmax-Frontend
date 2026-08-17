'use client';

import { RiAddCircleFill, RiFileList2Line, RiHeartLine, RiHeartFill, RiMapPinLine, RiBuildingLine, RiTimeLine } from "@remixicon/react";
import Link from "next/link";
import { useState } from "react";
import { AltVersion } from "../../interface/AltVersion";

interface ProjectListingItemProps extends AltVersion {
    project?: {
        id: string;
        title: string;
        employer: string;
        location: string;
        category: string;
        postedAt: string;
        isSaved?: boolean;
    };
}

export default function ProjectListingItem({
    altLook = false,
    compact = false,
    project = {
        id: "1",
        title: "Digital Skills Training for Rural Youth",
        employer: "Tech Education Foundation",
        location: "Northern Region, Thailand",
        category: "Education",
        postedAt: "2 days ago",
        isSaved: false
    }
}: ProjectListingItemProps) {
    const [isSaved, setIsSaved] = useState(project.isSaved || false);

    const toggleSaved = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSaved(!isSaved);
    };

    // AltLook: Clean, minimal design for smaller screens
    if (altLook) {
        return (
            <li className={`${compact ? 'py-1' : 'py-2'} px-2 hover:bg-base-200/50 rounded-lg transition-all duration-200`}>
                <div className="flex items-center justify-between w-full gap-2">
                    {/* Left: Link with content */}
                    <Link href={`/tor-page/${project.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                            <div className={`${compact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-primary/10 flex items-center justify-center text-primary`}>
                                <RiFileList2Line className={`${compact ? 'h-4 w-4' : 'h-5 w-5'}`} />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className={`font-medium ${compact ? 'text-xs' : 'text-sm'} truncate`}>{project.title}</div>
                            <div className="flex items-center gap-2 text-xs text-base-content/50">
                                <RiBuildingLine className="h-3 w-3" />
                                <span className={compact ? 'text-[10px]' : 'text-xs'}>{project.employer}</span>
                            </div>
                            {!compact && (
                                <div className="flex items-center gap-3 mt-1 text-xs text-base-content/40">
                                    <span className="flex items-center gap-1">
                                        <RiMapPinLine className="h-3 w-3" />
                                        {project.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <RiTimeLine className="h-3 w-3" />
                                        {project.postedAt}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>

                    {/* Right: Buttons with padding right */}
                    <div className="flex items-center gap-0.5 flex-shrink-0 pr-5">
                        <button 
                            onClick={toggleSaved}
                            className={`btn btn-ghost ${compact ? 'btn-xs' : 'btn-sm'} btn-square hover:scale-110 transition-transform`}
                            aria-label={isSaved ? "Unsave project" : "Save project"}
                        >
                            {isSaved ? (
                                <RiHeartFill className={`${compact ? 'h-4 w-4' : 'h-5 w-5'} text-error`} />
                            ) : (
                                <RiHeartLine className={`${compact ? 'h-4 w-4' : 'h-5 w-5'}`} />
                            )}
                        </button>
                        <button className={`btn btn-primary ${compact ? 'btn-xs' : 'btn-sm'} gap-0.5`}>
                            Apply
                            <RiAddCircleFill className={`${compact ? 'h-3 w-3' : 'h-4 w-4'}`} />
                        </button>
                    </div>
                </div>
            </li>
        );
    }

    // Default: Full featured design
    return (
        <li className="hover:bg-base-200/50 rounded-lg transition-all duration-200 group">
            <div className="flex items-center justify-between w-full px-3 py-3 gap-3">
                {/* Left: Link with content */}
                <Link href={`/tor-page/${project.id}`} className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                            <RiFileList2Line className="h-6 w-6" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-base truncate">{project.title}</h3>
                            <span className="badge badge-primary badge-sm flex-shrink-0">
                                {project.category}
                            </span>
                        </div>
                        <div className="text-sm text-base-content/60 truncate">
                            {project.employer}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-base-content/40">
                            <span className="flex items-center gap-1">
                                <RiMapPinLine className="h-3 w-3" />
                                {project.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <RiTimeLine className="h-3 w-3" />
                                {project.postedAt}
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Right: Action Buttons with padding right */}
                <div className="flex items-center gap-0.5 flex-shrink-0 pr-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                        onClick={toggleSaved}
                        className="btn btn-ghost btn-sm btn-square hover:scale-110 transition-transform"
                        aria-label={isSaved ? "Unsave project" : "Save project"}
                    >
                        {isSaved ? (
                            <RiHeartFill className="h-5 w-5 text-error" />
                        ) : (
                            <RiHeartLine className="h-5 w-5" />
                        )}
                    </button>
                    <button className="btn btn-primary btn-sm gap-1">
                        Apply
                        <RiAddCircleFill className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </li>
    );
}