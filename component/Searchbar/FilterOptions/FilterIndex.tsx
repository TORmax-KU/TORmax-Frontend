'use client';

import { useState, useMemo } from "react";
import FilterHeader from "./FilterHeader";
import BasicSearch from "./BasicSearch";
import ProjectDetails from "./ProjectDetails";
import BudgetTimeline from "./BudgetTimeline";
import SkillsTechnologies from "./SkillsTechnologies";
import Contractor from "./Contractor";
import WorkRequirements from "./WorkRequirements";
import AdditionalOptions from "./AdditionalOptions";
import { RiSearchLine } from "@remixicon/react";

export type FilterState = {
    keyword: string;
    projectName: string;
    description: string;
    category: string[];
    industry: string[];
    subcategory: string[];
    status: string[];
    priority: string[];
    budgetMin: string;
    budgetMax: string;
    timeline: string;
    startDate: string;
    endDate: string;
    skills: string[];
    tools: string[];
    technologies: string[];
    experienceLevel: string[];
    contractorName: string;
    contractorCompany: string;
    contractorLocation: string;
    contractorRating: string;
    contractorLanguages: string[];
    contractorSkills: string[];
    teamSize: string;
    workType: string[];
    location: string[];
    remote: boolean;
    onsite: boolean;
    hybrid: boolean;
    hasAttachments: boolean;
    isUrgent: boolean;
    isFeatured: boolean;
    isVerified: boolean;
    isSustainable: boolean;
    isSocialImpact: boolean;
    createdAt: string;
    updatedAt: string;
};

const initialFilters: FilterState = {
    keyword: "",
    projectName: "",
    description: "",
    category: [],
    industry: [],
    subcategory: [],
    status: [],
    priority: [],
    budgetMin: "",
    budgetMax: "",
    timeline: "",
    startDate: "",
    endDate: "",
    skills: [],
    tools: [],
    technologies: [],
    experienceLevel: [],
    contractorName: "",
    contractorCompany: "",
    contractorLocation: "",
    contractorRating: "",
    contractorLanguages: [],
    contractorSkills: [],
    teamSize: "",
    workType: [],
    location: [],
    remote: false,
    onsite: false,
    hybrid: false,
    hasAttachments: false,
    isUrgent: false,
    isFeatured: false,
    isVerified: false,
    isSustainable: false,
    isSocialImpact: false,
    createdAt: "",
    updatedAt: ""
};

export default function FilterOptions() {
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [activeSections, setActiveSections] = useState<Record<string, boolean>>({
        basic: true,
        project: false,
        budget: false,
        skills: false,
        contractor: false,
        requirements: false,
        additional: false
    });

    const handleInputChange = (field: keyof FilterState, value: string | string[] | boolean) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayToggle = (field: keyof FilterState, value: string) => {
        setFilters(prev => {
            const current = prev[field] as string[];
            return {
                ...prev,
                [field]: current.includes(value)
                    ? current.filter(item => item !== value)
                    : [...current, value]
            };
        });
    };

    const handleClearFilters = () => {
        setFilters(initialFilters);
    };

    const handleApplyFilters = () => {
        console.log("Applied filters:", filters);
        const modal = document.getElementById('my_modal_7') as HTMLInputElement;
        if (modal) modal.checked = false;
    };

    const toggleSection = (section: string) => {
        setActiveSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const getActiveFilterCount = useMemo(() => {
        let count = 0;
        const checkField = (field: any) => {
            if (Array.isArray(field)) return field.length > 0;
            if (typeof field === 'boolean') return field === true;
            if (typeof field === 'string') return field !== "";
            return false;
        };

        Object.values(filters).forEach(value => {
            if (checkField(value)) count++;
        });
        return count;
    }, [filters]);

    return (
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            <FilterHeader 
                activeCount={getActiveFilterCount} 
                onClear={handleClearFilters} 
            />
            
            <BasicSearch 
                filters={filters}
                isActive={activeSections.basic}
                onToggle={() => toggleSection('basic')}
                onInputChange={handleInputChange}
            />
            
            <ProjectDetails 
                filters={filters}
                isActive={activeSections.project}
                onToggle={() => toggleSection('project')}
                onInputChange={handleInputChange}
                onArrayToggle={handleArrayToggle}
            />
            
            <BudgetTimeline 
                filters={filters}
                isActive={activeSections.budget}
                onToggle={() => toggleSection('budget')}
                onInputChange={handleInputChange}
            />
            
            <SkillsTechnologies 
                filters={filters}
                isActive={activeSections.skills}
                onToggle={() => toggleSection('skills')}
                onInputChange={handleInputChange}
                onArrayToggle={handleArrayToggle}
            />
            
            <Contractor 
                filters={filters}
                isActive={activeSections.contractor}
                onToggle={() => toggleSection('contractor')}
                onInputChange={handleInputChange}
                onArrayToggle={handleArrayToggle}
            />
            
            <WorkRequirements 
                filters={filters}
                isActive={activeSections.requirements}
                onToggle={() => toggleSection('requirements')}
                onInputChange={handleInputChange}
                onArrayToggle={handleArrayToggle}
            />
            
            <AdditionalOptions 
                filters={filters}
                isActive={activeSections.additional}
                onToggle={() => toggleSection('additional')}
                onInputChange={handleInputChange}
            />

            {/* Actions - Floating Footer */}
            <div className="sticky bottom-0 bg-base-100/95 backdrop-blur-sm border-t border-base-300 pt-4 pb-2 -mx-2 px-4 rounded-b-xl">
                <div className="flex gap-3">
                    <button
                        className="btn btn-primary flex-1 gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                        onClick={handleApplyFilters}
                    >
                        <RiSearchLine className="h-4 w-4" />
                        Apply Filters
                        {getActiveFilterCount > 0 && (
                            <span className="badge badge-sm bg-white/20 text-white ml-1">
                                {getActiveFilterCount}
                            </span>
                        )}
                    </button>
                    <button
                        className="btn btn-ghost flex-1 hover:bg-base-200 transition-all duration-300"
                        onClick={handleClearFilters}
                    >
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    );
}