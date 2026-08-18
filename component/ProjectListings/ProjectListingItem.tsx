'use client';

import { 
    RiAddCircleFill, 
    RiFileList2Line, 
    RiHeartLine, 
    RiHeartFill, 
    RiMapPinLine, 
    RiBuildingLine, 
    RiTimeLine,
    RiBookmarkLine,
    RiBookmarkFill,
    RiEyeLine,
    RiStarLine,
    RiStarFill,
    RiBriefcaseLine,
    RiArrowRightLine,
    RiCheckLine,
    RiUserLine,
    RiMoneyDollarCircleLine,
    RiCalendarLine
} from "@remixicon/react";
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
        isTracked?: boolean;
        budget?: string;
        applicants?: number;
        deadline?: string;
        rating?: number;
        description?: string;
        tags?: string[];
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
        isSaved: false,
        isTracked: false,
        budget: "฿500,000 - 1,000,000",
        applicants: 12,
        deadline: "2024-03-15",
        rating: 4.8,
        description: "Comprehensive digital skills training program targeting rural communities with limited access to technology.",
        tags: ["Training", "Education", "Youth", "Digital Skills"]
    }
}: ProjectListingItemProps) {
    const [isSaved, setIsSaved] = useState(project.isSaved || false);
    const [isTracked, setIsTracked] = useState(project.isTracked || false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleSaved = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSaved(!isSaved);
    };

    const toggleTracked = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsTracked(!isTracked);
    };

    const formatCurrency = (value: string) => {
        return value;
    };

    // AltLook: Clean, minimal design for smaller screens
    if (altLook) {
        return (
            <li 
                className={`${compact ? 'py-1' : 'py-2'} px-2 hover:bg-base-200/50 rounded-lg transition-all duration-200`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex items-center justify-between w-full gap-2">
                    <Link href={`/tor-page/${project.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                            <div className={`${compact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-primary/10 flex items-center justify-center text-primary`}>
                                <RiFileList2Line className={`${compact ? 'h-4 w-4' : 'h-5 w-5'}`} />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className={`font-medium ${compact ? 'text-xs' : 'text-sm'} truncate flex items-center gap-1.5`}>
                                {project.title}
                                {project.rating && (
                                    <span className="flex items-center gap-0.5 text-warning text-[10px]">
                                        <RiStarFill className="h-3 w-3" />
                                        {project.rating}
                                    </span>
                                )}
                            </div>
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
                                    {project.budget && (
                                        <span className="flex items-center gap-1">
                                            <RiMoneyDollarCircleLine className="h-3 w-3" />
                                            {project.budget}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </Link>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-0.5 flex-shrink-0 pr-2">
                        <button 
                            onClick={toggleTracked}
                            className={`btn btn-ghost ${compact ? 'btn-xs' : 'btn-sm'} btn-square hover:scale-110 transition-transform ${isTracked ? 'text-primary' : ''}`}
                            aria-label={isTracked ? "Remove from tracked" : "Add to tracked"}
                            title={isTracked ? "Remove from tracked" : "Add to tracked"}
                        >
                            {isTracked ? (
                                <RiBookmarkFill className={`${compact ? 'h-4 w-4' : 'h-5 w-5'}`} />
                            ) : (
                                <RiBookmarkLine className={`${compact ? 'h-4 w-4' : 'h-5 w-5'}`} />
                            )}
                        </button>
                        <button 
                            onClick={toggleSaved}
                            className={`btn btn-ghost ${compact ? 'btn-xs' : 'btn-sm'} btn-square hover:scale-110 transition-transform`}
                            aria-label={isSaved ? "Unsave project" : "Save project"}
                            title={isSaved ? "Remove from saved" : "Save project"}
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

    // Default: Full featured professional design
    return (
        <li 
            className="hover:bg-base-200/50 rounded-xl transition-all duration-300 group border border-base-200/50 hover:border-primary/20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 p-4">
                {/* Left: Icon & Content */}
                <Link href={`/tor-page/${project.id}`} className="flex items-start gap-4 flex-1 min-w-0 w-full">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300 shadow-sm">
                            <RiFileList2Line className="h-7 w-7" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Title & Rating */}
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                            </div>
                            {project.rating && (
                                <span className="flex items-center gap-1 text-sm font-medium text-warning whitespace-nowrap">
                                    <RiStarFill className="h-4 w-4" />
                                    {project.rating}
                                </span>
                            )}
                        </div>

                        {/* Employer & Category */}
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-sm text-base-content/70 flex items-center gap-1">
                                <RiBuildingLine className="h-4 w-4" />
                                {project.employer}
                            </span>
                            <span className="badge badge-primary badge-sm">
                                {project.category}
                            </span>
                            {project.tags && project.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="badge badge-ghost badge-sm text-xs">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Details Row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-base-content/50">
                            <span className="flex items-center gap-1">
                                <RiMapPinLine className="h-3.5 w-3.5" />
                                {project.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <RiTimeLine className="h-3.5 w-3.5" />
                                {project.postedAt}
                            </span>
                            {project.budget && (
                                <span className="flex items-center gap-1 font-medium text-base-content/70">
                                    <RiMoneyDollarCircleLine className="h-3.5 w-3.5" />
                                    {project.budget}
                                </span>
                            )}
                            {project.applicants && (
                                <span className="flex items-center gap-1">
                                    <RiUserLine className="h-3.5 w-3.5" />
                                    {project.applicants} applicants
                                </span>
                            )}
                            {project.deadline && (
                                <span className="flex items-center gap-1">
                                    <RiCalendarLine className="h-3.5 w-3.5" />
                                    Due {project.deadline}
                                </span>
                            )}
                        </div>

                        {/* Description Preview */}
                        {project.description && (
                            <p className="text-xs text-base-content/40 mt-2 line-clamp-1">
                                {project.description}
                            </p>
                        )}
                    </div>
                </Link>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-1 flex-shrink-0 ml-auto md:ml-0 w-full md:w-auto justify-end md:justify-start mt-3 md:mt-0">
                    {/* Track Button */}
                    <button 
                        onClick={toggleTracked}
                        className={`btn btn-ghost btn-sm btn-square transition-all duration-300 ${isTracked ? 'text-primary bg-primary/10' : 'hover:bg-base-200'}`}
                        aria-label={isTracked ? "Remove from tracked" : "Add to tracked"}
                        title={isTracked ? "Remove from tracked" : "Add to tracked"}
                    >
                        {isTracked ? (
                            <RiBookmarkFill className="h-5 w-5" />
                        ) : (
                            <RiBookmarkLine className="h-5 w-5" />
                        )}
                    </button>

                    {/* Favorite Button */}
                    <button 
                        onClick={toggleSaved}
                        className={`btn btn-ghost btn-sm btn-square transition-all duration-300 ${isSaved ? 'text-error bg-error/10' : 'hover:bg-base-200'}`}
                        aria-label={isSaved ? "Unsave project" : "Save project"}
                        title={isSaved ? "Remove from saved" : "Save project"}
                    >
                        {isSaved ? (
                            <RiHeartFill className="h-5 w-5" />
                        ) : (
                            <RiHeartLine className="h-5 w-5" />
                        )}
                    </button>

                    {/* View Details Button */}
                    <Link 
                        href={`/tor-page/${project.id}`}
                        className="btn btn-ghost btn-sm gap-1 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                    >
                        View
                        <RiArrowRightLine className="h-4 w-4" />
                    </Link>

                    {/* Apply Button */}
                    <button className="btn btn-primary btn-sm gap-1 shadow-sm hover:shadow-md transition-all duration-300">
                        Apply
                        <RiAddCircleFill className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </li>
    );
}