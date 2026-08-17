'use client';

import { RiSettingsLine } from "@remixicon/react";
import { TORPreferences as TORPrefs }  from './../../interface/UserProfile/TORPreferences';

interface TORPreferencesProps {
    preferences: TORPrefs;
    isEditing: boolean;
    onUpdate: (preferences: TORPrefs) => void;
}

const categories = ["Development", "Blockchain", "Smart Contracts", "DApps", "DeFi", "NFT", "Web3", "Security"];
const locations = ["Bangkok", "Chiang Mai", "Phuket", "Remote", "Hybrid"];
const projectTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const experienceLevels = ["Entry", "Junior", "Mid", "Senior", "Expert", "Lead"];
const languages = ["English", "Thai", "Chinese", "Japanese", "Korean"];

export default function TORPreferences({ preferences, isEditing, onUpdate }: TORPreferencesProps) {
    const toggleArrayItem = (field: keyof TORPrefs, item: string) => {
        const current = preferences[field] as string[];
        if (Array.isArray(current)) {
            const updated = current.includes(item)
                ? current.filter(i => i !== item)
                : [...current, item];
            onUpdate({ ...preferences, [field]: updated });
        }
    };

    return (
        <div className="bg-base-100 rounded-box shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <RiSettingsLine className="h-5 w-5 text-warning" />
                TOR Preferences
            </h3>

            <div className="space-y-4">
                {/* Categories */}
                <div>
                    <label className="text-sm font-medium text-base-content/70">Categories</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`badge ${preferences.categories.includes(cat) ? 'badge-primary' : 'badge-ghost'} badge-lg cursor-pointer`}
                                onClick={() => isEditing && toggleArrayItem('categories', cat)}
                                disabled={!isEditing}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Locations */}
                <div>
                    <label className="text-sm font-medium text-base-content/70">Locations</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {locations.map((loc) => (
                            <button
                                key={loc}
                                className={`badge ${preferences.locations.includes(loc) ? 'badge-secondary' : 'badge-ghost'} badge-lg cursor-pointer`}
                                onClick={() => isEditing && toggleArrayItem('locations', loc)}
                                disabled={!isEditing}
                            >
                                {loc}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project Types */}
                <div>
                    <label className="text-sm font-medium text-base-content/70">Project Types</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {projectTypes.map((type) => (
                            <button
                                key={type}
                                className={`badge ${preferences.projectTypes.includes(type) ? 'badge-accent' : 'badge-ghost'} badge-lg cursor-pointer`}
                                onClick={() => isEditing && toggleArrayItem('projectTypes', type)}
                                disabled={!isEditing}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Languages */}
                <div>
                    <label className="text-sm font-medium text-base-content/70">Languages</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {languages.map((lang) => (
                            <button
                                key={lang}
                                className={`badge ${preferences.languages.includes(lang) ? 'badge-info' : 'badge-ghost'} badge-lg cursor-pointer`}
                                onClick={() => isEditing && toggleArrayItem('languages', lang)}
                                disabled={!isEditing}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Budget Range */}
                <div>
                    <label className="text-sm font-medium text-base-content/70">Budget Range (THB)</label>
                    <div className="flex gap-4 mt-1">
                        <div className="flex-1">
                            <input 
                                type="number" 
                                className="input input-bordered input-sm w-full" 
                                placeholder="Min"
                                value={preferences.minBudget}
                                onChange={(e) => onUpdate({...preferences, minBudget: parseInt(e.target.value) || 0})}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="flex-1">
                            <input 
                                type="number" 
                                className="input input-bordered input-sm w-full" 
                                placeholder="Max"
                                value={preferences.maxBudget}
                                onChange={(e) => onUpdate({...preferences, maxBudget: parseInt(e.target.value) || 0})}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </div>

                {/* Availability */}
                <div>
                    <label className="text-sm font-medium text-base-content/70">Availability</label>
                    <select 
                        className="select select-bordered select-sm w-full mt-1"
                        value={preferences.availability}
                        onChange={(e) => onUpdate({...preferences, availability: e.target.value})}
                        disabled={!isEditing}
                    >
                        <option value="Immediate">Immediate</option>
                        <option value="1 week">1 Week</option>
                        <option value="2 weeks">2 Weeks</option>
                        <option value="1 month">1 Month</option>
                    </select>
                </div>

                {/* Remote */}
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        className="checkbox checkbox-primary checkbox-sm"
                        checked={preferences.remote}
                        onChange={(e) => onUpdate({...preferences, remote: e.target.checked})}
                        disabled={!isEditing}
                    />
                    <label className="text-sm">Open to Remote Work</label>
                </div>
            </div>
        </div>
    );
}