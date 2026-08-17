'use client';

import { RiGraduationCapLine, RiTimeLine, RiAddLine, RiCloseLine } from "@remixicon/react";
import { Education as EducationType } from "@/interface/UserProfile/Education";

interface EducationProps {
    education: EducationType[];
    isEditing: boolean;
    onUpdate: (education: EducationType[]) => void;
}

export default function Education({ education, isEditing, onUpdate }: EducationProps) {
    const addEducation = () => {
        const newEdu: EducationType = {
            id: Date.now().toString(),
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            current: false
        };
        onUpdate([...education, newEdu]);
    };

    const removeEducation = (id: string) => {
        onUpdate(education.filter(edu => edu.id !== id));
    };

    const updateEducation = (id: string, field: keyof EducationType, value: any) => {
        onUpdate(education.map(edu => 
            edu.id === id ? { ...edu, [field]: value } : edu
        ));
    };

    return (
        <div className="bg-base-100 rounded-box shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    <RiGraduationCapLine className="h-5 w-5 text-accent" />
                    Education
                </h3>
                {isEditing && (
                    <button className="btn btn-ghost btn-sm gap-1" onClick={addEducation}>
                        <RiAddLine className="h-4 w-4" />
                        Add
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {education.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-accent/30 pl-4 relative">
                        {isEditing && (
                            <button 
                                className="absolute -right-2 -top-2 btn btn-ghost btn-xs btn-square"
                                onClick={() => removeEducation(edu.id)}
                            >
                                <RiCloseLine className="h-4 w-4" />
                            </button>
                        )}
                        
                        {isEditing ? (
                            <div className="space-y-2">
                                <input 
                                    type="text" 
                                    className="input input-bordered input-sm w-full" 
                                    placeholder="Institution"
                                    value={edu.institution}
                                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                />
                                <input 
                                    type="text" 
                                    className="input input-bordered input-sm w-full" 
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                />
                                <input 
                                    type="text" 
                                    className="input input-bordered input-sm w-full" 
                                    placeholder="Field of Study"
                                    value={edu.field}
                                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <input 
                                        type="month" 
                                        className="input input-bordered input-sm flex-1" 
                                        value={edu.startDate}
                                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                    />
                                    <input 
                                        type="month" 
                                        className="input input-bordered input-sm flex-1" 
                                        value={edu.endDate}
                                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                        disabled={edu.current}
                                    />
                                </div>
                                <label className="flex items-center gap-2 text-sm">
                                    <input 
                                        type="checkbox" 
                                        className="checkbox checkbox-sm"
                                        checked={edu.current}
                                        onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                                    />
                                    Currently studying
                                </label>
                            </div>
                        ) : (
                            <>
                                <h4 className="font-semibold">{edu.institution}</h4>
                                <p className="text-sm text-base-content/60">{edu.degree} • {edu.field}</p>
                                <p className="text-xs text-base-content/40 flex items-center gap-1">
                                    <RiTimeLine className="h-3 w-3" />
                                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                </p>
                            </>
                        )}
                    </div>
                ))}

                {education.length === 0 && !isEditing && (
                    <p className="text-sm text-base-content/40 text-center py-4">No education added yet</p>
                )}
            </div>
        </div>
    );
}