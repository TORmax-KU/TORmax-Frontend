'use client';

import { Experience } from "@/interface/UserProfile/Experience";
import { RiBuildingLine, RiTimeLine, RiAddLine, RiCloseLine } from "@remixicon/react";

interface WorkExperienceProps {
    experience: Experience[];
    isEditing: boolean;
    onUpdate: (experience: Experience[]) => void;
}

export default function WorkExperience({ experience, isEditing, onUpdate }: WorkExperienceProps) {
    const addExperience = () => {
        const newExp: Experience = {
            id: Date.now().toString(),
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        };
        onUpdate([...experience, newExp]);
    };

    const removeExperience = (id: string) => {
        onUpdate(experience.filter(exp => exp.id !== id));
    };

    const updateExperience = (id: string, field: keyof Experience, value: any) => {
        onUpdate(experience.map(exp => 
            exp.id === id ? { ...exp, [field]: value } : exp
        ));
    };

    return (
        <div className="bg-base-100 rounded-box shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    <RiBuildingLine className="h-5 w-5 text-secondary" />
                    Work Experience
                </h3>
                {isEditing && (
                    <button className="btn btn-ghost btn-sm gap-1" onClick={addExperience}>
                        <RiAddLine className="h-4 w-4" />
                        Add
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-primary/30 pl-4 relative">
                        {isEditing && (
                            <button 
                                className="absolute -right-2 -top-2 btn btn-ghost btn-xs btn-square"
                                onClick={() => removeExperience(exp.id)}
                            >
                                <RiCloseLine className="h-4 w-4" />
                            </button>
                        )}
                        
                        {isEditing ? (
                            <div className="space-y-2">
                                <input 
                                    type="text" 
                                    className="input input-bordered input-sm w-full" 
                                    placeholder="Job Title"
                                    value={exp.title}
                                    onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                                />
                                <input 
                                    type="text" 
                                    className="input input-bordered input-sm w-full" 
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <input 
                                        type="month" 
                                        className="input input-bordered input-sm flex-1" 
                                        value={exp.startDate}
                                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                    />
                                    <input 
                                        type="month" 
                                        className="input input-bordered input-sm flex-1" 
                                        value={exp.endDate}
                                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                        disabled={exp.current}
                                    />
                                </div>
                                <label className="flex items-center gap-2 text-sm">
                                    <input 
                                        type="checkbox" 
                                        className="checkbox checkbox-sm"
                                        checked={exp.current}
                                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                    />
                                    Current position
                                </label>
                                <textarea 
                                    className="textarea textarea-bordered w-full h-20 text-sm"
                                    placeholder="Description"
                                    value={exp.description}
                                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                />
                            </div>
                        ) : (
                            <>
                                <h4 className="font-semibold">{exp.title}</h4>
                                <p className="text-sm text-base-content/60">{exp.company} • {exp.location}</p>
                                <p className="text-xs text-base-content/40 flex items-center gap-1">
                                    <RiTimeLine className="h-3 w-3" />
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </p>
                                <p className="text-sm text-base-content/70 mt-1">{exp.description}</p>
                            </>
                        )}
                    </div>
                ))}

                {experience.length === 0 && !isEditing && (
                    <p className="text-sm text-base-content/40 text-center py-4">No experience added yet</p>
                )}
            </div>
        </div>
    );
}