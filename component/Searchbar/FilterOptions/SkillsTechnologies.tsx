'use client';

import { RiCodeLine, RiArrowDownSLine } from "@remixicon/react";
import { FilterState } from ".";
import { TagInput } from "../../Input/TagInput";
import { allSkills } from "@/public/mockData/allSkills";
import { allTechnologies } from "@/public/mockData/allTechnologies";
import { allTools } from "@/public/mockData/allTools";

interface SkillsTechnologiesProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string | string[]) => void;
    onArrayToggle: (field: keyof FilterState, value: string) => void;
}

export default function SkillsTechnologies({
    filters,
    isActive,
    onToggle,
    onInputChange,
    onArrayToggle
}: SkillsTechnologiesProps) {
    return (
        <div className="space-y-3 border-t border-base-300 pt-4">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left hover:bg-base-200/50 p-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-2">
                    <RiCodeLine className="h-4 w-4 text-info" />
                    <span className="font-semibold text-sm">Skills & Technologies</span>
                    {(filters.skills.length + filters.technologies.length + filters.tools.length) > 0 && (
                        <span className="badge badge-info badge-sm">
                            {filters.skills.length + filters.technologies.length + filters.tools.length}
                        </span>
                    )}
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>

            {isActive && (
                <div className="pl-6 space-y-4">
                    <TagInput
                        label="Skills Required"
                        field="skills"
                        options={allSkills}
                        selected={filters.skills}
                        onAdd={onArrayToggle}
                        onRemove={onArrayToggle}
                        placeholder="Search skills..."
                        color="info"
                    />

                    <TagInput
                        label="Technologies"
                        field="technologies"
                        options={allTechnologies}
                        selected={filters.technologies}
                        onAdd={onArrayToggle}
                        onRemove={onArrayToggle}
                        placeholder="Search technologies..."
                        color="secondary"
                    />

                    <TagInput
                        label="Tools"
                        field="tools"
                        options={allTools}
                        selected={filters.tools}
                        onAdd={onArrayToggle}
                        onRemove={onArrayToggle}
                        placeholder="Search tools..."
                        color="accent"
                    />
                </div>
            )}
        </div>
    );
}