'use client';

import { RiCodeLine, RiAddLine, RiCloseLine } from "@remixicon/react";
import { useState } from "react";

interface SkillsProps {
    skills: string[];
    isEditing: boolean;
    onUpdate: (skills: string[]) => void;
}

export default function Skills({ skills, isEditing, onUpdate }: SkillsProps) {
    const [newSkill, setNewSkill] = useState('');

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            onUpdate([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const removeSkill = (skill: string) => {
        onUpdate(skills.filter(s => s !== skill));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <div className="bg-base-100 rounded-box shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <RiCodeLine className="h-5 w-5 text-info" />
                Skills
            </h3>

            {isEditing && (
                <div className="flex gap-2 mb-4">
                    <input 
                        type="text" 
                        className="input input-bordered input-sm flex-1" 
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="btn btn-primary btn-sm" onClick={addSkill}>
                        <RiAddLine className="h-4 w-4" />
                    </button>
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span key={skill} className="badge badge-info badge-lg gap-1">
                        {skill}
                        {isEditing && (
                            <button 
                                className="hover:bg-white/20 rounded-full p-0.5"
                                onClick={() => removeSkill(skill)}
                            >
                                <RiCloseLine className="h-3 w-3" />
                            </button>
                        )}
                    </span>
                ))}
                {skills.length === 0 && !isEditing && (
                    <p className="text-sm text-base-content/40">No skills added yet</p>
                )}
            </div>
        </div>
    );
}