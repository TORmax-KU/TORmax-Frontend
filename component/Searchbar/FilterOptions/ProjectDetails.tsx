import { RiBriefcaseLine, RiArrowDownSLine } from "@remixicon/react";
import { FilterState } from "./FilterIndex";

interface ProjectDetailsProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string | string[]) => void;
    onArrayToggle: (field: keyof FilterState, value: string) => void;
}

const categories = [
    "Web Development", "Mobile Development", "AI & Machine Learning", 
    "Data Science & Analytics", "Cloud Computing", "DevOps & Infrastructure", 
    "Cybersecurity", "Blockchain & Web3", "IoT & Embedded Systems", "AR/VR & Metaverse",
    "Game Development", "UI/UX Design", "Graphic Design", "Branding & Identity",
    "Video Production", "Animation & Motion Graphics", "Business Consulting",
    "Project Management", "Digital Marketing", "Content Marketing",
    "Civil Engineering", "Medical Research", "Academic Research",
    "Music Production", "Film Production", "Non-Profit Management",
    "Legal Services", "Finance & Accounting", "Real Estate"
];

const industries = [
    "Technology", "Healthcare", "Finance", "Education", 
    "Retail & E-commerce", "Manufacturing", "Construction", 
    "Energy & Utilities", "Transportation & Logistics", 
    "Media & Entertainment", "Non-Profit", "Government",
    "Real Estate", "Agriculture", "Hospitality", 
    "Professional Services", "Telecommunications", 
    "Aerospace & Defense", "Automotive", "Food & Beverage"
];

const statusOptions = ["Open", "In Progress", "Review", "Completed", "On Hold", "Cancelled", "Draft"];
const priorityOptions = ["Low", "Medium", "High", "Critical", "Urgent"];
const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Expert", "Any"];
const teamSizes = ["1-3", "4-6", "7-10", "10+", "20+", "50+"];

export default function ProjectDetails({ 
    filters, 
    isActive, 
    onToggle, 
    onInputChange,
    onArrayToggle 
}: ProjectDetailsProps) {
    return (
        <div className="space-y-3 border-t border-base-300 pt-4">
            <button 
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left hover:bg-base-200/50 p-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-2">
                    <RiBriefcaseLine className="h-4 w-4 text-secondary" />
                    <span className="font-semibold text-sm">Project Details</span>
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>
            
            {isActive && (
                <div className="pl-6 space-y-3">
                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Industry</label>
                        <select
                            className="select select-bordered select-sm w-full"
                            value={filters.industry[0] || ""}
                            onChange={(e) => onInputChange("industry", e.target.value ? [e.target.value] : [])}
                        >
                            <option value="">All Industries</option>
                            {industries.map((industry) => (
                                <option key={industry} value={industry}>{industry}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Category</label>
                        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => onArrayToggle("category", category)}
                                    className={`
                                        px-2 py-1 rounded-full text-xs font-medium transition-all duration-300
                                        ${filters.category.includes(category)
                                            ? 'bg-secondary text-secondary-content shadow-md shadow-secondary/20'
                                            : 'bg-base-200 hover:bg-base-300 text-base-content/70'
                                        }
                                    `}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Status</label>
                        <div className="flex flex-wrap gap-1.5">
                            {statusOptions.map((status) => (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => onArrayToggle("status", status)}
                                    className={`
                                        px-2 py-1 rounded-full text-xs font-medium transition-all duration-300
                                        ${filters.status.includes(status)
                                            ? 'bg-primary text-primary-content shadow-md shadow-primary/20'
                                            : 'bg-base-200 hover:bg-base-300 text-base-content/70'
                                        }
                                    `}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Priority</label>
                        <div className="flex flex-wrap gap-1.5">
                            {priorityOptions.map((priority) => (
                                <button
                                    key={priority}
                                    type="button"
                                    onClick={() => onArrayToggle("priority", priority)}
                                    className={`
                                        px-2 py-1 rounded-full text-xs font-medium transition-all duration-300
                                        ${filters.priority.includes(priority)
                                            ? priority === 'Critical' ? 'bg-error text-error-content' :
                                              priority === 'High' ? 'bg-warning text-warning-content' :
                                              'bg-info text-info-content'
                                            : 'bg-base-200 hover:bg-base-300 text-base-content/70'
                                        }
                                    `}
                                >
                                    {priority}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="form-control">
                            <label className="label label-text text-xs opacity-70">Experience Level</label>
                            <select
                                className="select select-bordered select-sm w-full"
                                value={filters.experienceLevel[0] || ""}
                                onChange={(e) => onInputChange("experienceLevel", e.target.value ? [e.target.value] : [])}
                            >
                                <option value="">All Levels</option>
                                {experienceLevels.map((level) => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label label-text text-xs opacity-70">Team Size</label>
                            <select
                                className="select select-bordered select-sm w-full"
                                value={filters.teamSize}
                                onChange={(e) => onInputChange("teamSize", e.target.value)}
                            >
                                <option value="">Any Size</option>
                                {teamSizes.map((size) => (
                                    <option key={size} value={size}>{size} members</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}