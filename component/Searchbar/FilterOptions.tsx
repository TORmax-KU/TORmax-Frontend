'use client';

import { useState } from "react";

type FilterState = {
    name: string;
    employer: string;
    port: string;
    skill: string[];
    language: string[];
    education: string;
    status: string;
};

export default function FilterOptions() {
    const [filters, setFilters] = useState<FilterState>({
        name: "",
        employer: "",
        port: "",
        skill: [],
        language: [],
        education: "",
        status: ""
    });

    const skillOptions: string[] = ["React", "Node.js", "Python", "UI Design", "DevOps"];
    const languageOptions: string[] = ["English", "Spanish", "French", "German", "Chinese"];
    const statusOptions: string[] = ["Active", "Inactive", "Pending", "Archived"];
    const educationOptions: string[] = ["Bachelor's", "Master's", "PhD", "Diploma", "Certificate"];

    const handleInputChange = (field: keyof FilterState, value: string | string[]) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleSkillToggle = (skill: string) => {
        setFilters(prev => ({
            ...prev,
            skill: prev.skill.includes(skill)
                ? prev.skill.filter(s => s !== skill)
                : [...prev.skill, skill]
        }));
    };

    const handleLanguageToggle = (language: string) => {
        setFilters(prev => ({
            ...prev,
            language: prev.language.includes(language)
                ? prev.language.filter(l => l !== language)
                : [...prev.language, language]
        }));
    };

    const handleClearFilters = () => {
        setFilters({
            name: "",
            employer: "",
            port: "",
            skill: [],
            language: [],
            education: "",
            status: ""
        });
    };

    const handleApplyFilters = () => {
        console.log("Applied filters:", filters);
        // Your filter logic here
    };

    return (
        <div className="space-y-4">
            {/* Basic Search */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold">Search</legend>
                <div className="grid grid-row-1 sm:grid-row-2 gap-2">
                    <input
                        type="text"
                        className="input input-bordered input-sm w-full"
                        placeholder="Name..."
                        value={filters.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                    <input
                        type="text"
                        className="input input-bordered input-sm w-full"
                        placeholder="Employer..."
                        value={filters.employer}
                        onChange={(e) => handleInputChange("employer", e.target.value)}
                    />
                    <input
                        type="text"
                        className="input input-bordered input-sm w-full"
                        placeholder="Port..."
                        value={filters.port}
                        onChange={(e) => handleInputChange("port", e.target.value)}
                    />
                </div>
            </fieldset>

            {/* Status */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold">Status</legend>
                <div className="flex flex-wrap gap-1.5">
                    {statusOptions.map((status) => (
                        <button
                            key={status}
                            type="button"
                            onClick={() => handleInputChange("status", filters.status === status ? "" : status)}
                            className={`badge badge-sm cursor-pointer transition-all ${filters.status === status
                                    ? "badge-primary"
                                    : "badge-outline"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </fieldset>

            {/* Skills */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold">Skills</legend>
                <div className="flex flex-wrap gap-1.5">
                    {skillOptions.map((skill) => (
                        <button
                            key={skill}
                            type="button"
                            onClick={() => handleSkillToggle(skill)}
                            className={`badge badge-sm cursor-pointer transition-all ${filters.skill.includes(skill)
                                    ? "badge-primary"
                                    : "badge-outline"
                                }`}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
                {filters.skill.length > 0 && (
                    <p className="text-xs opacity-70 mt-1">
                        {filters.skill.join(", ")}
                    </p>
                )}
            </fieldset>

            {/* Languages */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold">Languages</legend>
                <div className="flex flex-wrap gap-1.5">
                    {languageOptions.map((language) => (
                        <button
                            key={language}
                            type="button"
                            onClick={() => handleLanguageToggle(language)}
                            className={`badge badge-sm cursor-pointer transition-all ${filters.language.includes(language)
                                    ? "badge-primary"
                                    : "badge-outline"
                                }`}
                        >
                            {language}
                        </button>
                    ))}
                </div>
                {filters.language.length > 0 && (
                    <p className="text-xs opacity-70 mt-1">
                        {filters.language.join(", ")}
                    </p>
                )}
            </fieldset>

            {/* Education */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold">Education</legend>
                <select
                    className="select select-bordered select-sm w-full"
                    value={filters.education}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                >
                    <option value="">All Levels</option>
                    {educationOptions.map((edu) => (
                        <option key={edu} value={edu}>{edu}</option>
                    ))}
                </select>
            </fieldset>

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t border-base-300">
                <button
                    className="btn btn-primary btn-sm flex-1"
                    onClick={handleApplyFilters}
                >
                    Apply
                </button>
                <button
                    className="btn btn-ghost btn-sm flex-1"
                    onClick={handleClearFilters}
                >
                    Clear
                </button>
            </div>
        </div>
    );
}