import { useState } from "react";

type Tor = { username: string; port: string };
type Language = { name: string };
type Skill = { name: string };
type Education = { degree: string; school: string; year: string };

const emptyTor: Tor = { username: "", port: "" };
const emptyLanguage: Language = { name: "" };
const emptySkill: Skill = { name: "" };
const emptyEducation: Education = { degree: "", school: "", year: "" };

const skillOptions: string[] = ["React", "Node.js", "Python", "UI Design", "DevOps"];

export default function ProfessionInfoForm() {
    // Ensure these are always initialized as arrays
    const [tors, setTors] = useState<Tor[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [skills, setSkills] = useState<string[]>([]);
    const [educations, setEducations] = useState<Education[]>([]);

    const handleChange = <T,>(
        setter: React.Dispatch<React.SetStateAction<T[]>>,
        index: number,
        field: keyof T,
        value: string
    ) => {
        setter((items) => {
            // Ensure items is an array
            if (!Array.isArray(items)) return [];
            return items.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            );
        });
    };

    const toggleSkill = (skill: string) =>
        setSkills((prev) => {
            // Ensure prev is an array
            const currentSkills = Array.isArray(prev) ? prev : [];
            return currentSkills.includes(skill)
                ? currentSkills.filter((s) => s !== skill)
                : [...currentSkills, skill];
        });

    // Safely add new items with proper array syntax
    const addTor = () => {
        setTors((prev) => {
            const current = Array.isArray(prev) ? prev : [];
            return [...current, { ...emptyTor }];
        });
    };

    const addLanguage = () => {
        setLanguages((prev) => {
            const current = Array.isArray(prev) ? prev : [];
            return [...current, { ...emptyLanguage }];
        });
    };

    const addEducation = () => {
        setEducations((prev) => {
            const current = Array.isArray(prev) ? prev : [];
            return [...current, { ...emptyEducation }];
        });
    };

    return (
        <form className="space-y-8 p-6">
            {/* TOR Users */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg font-bold">TOR Users</legend>
                <div className="space-y-2">
                    {Array.isArray(tors) && tors.map((tor, i) => (
                        <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                                className="input input-bordered w-full"
                                placeholder="Username"
                                value={tor.username}
                                onChange={(e) => handleChange<Tor>(setTors, i, "username", e.target.value)}
                            />
                            <input
                                className="input input-bordered w-full"
                                placeholder="Port"
                                value={tor.port}
                                onChange={(e) => handleChange<Tor>(setTors, i, "port", e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className="btn btn-outline btn-sm mt-2"
                    onClick={addTor}
                >
                    + Add TOR
                </button>
            </fieldset>

            {/* Languages */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg font-bold">Languages</legend>
                <div className="space-y-2">
                    {Array.isArray(languages) && languages.map((lang, i) => (
                        <input
                            key={i}
                            className="input input-bordered w-full"
                            placeholder="Language name"
                            value={lang.name}
                            onChange={(e) => handleChange<Language>(setLanguages, i, "name", e.target.value)}
                        />
                    ))}
                </div>
                <button
                    type="button"
                    className="btn btn-outline btn-sm mt-2"
                    onClick={addLanguage}
                >
                    + Add Language
                </button>
            </fieldset>

            {/* Skills (multiselect) */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg font-bold">Skills</legend>
                <div className="flex flex-wrap gap-2">
                    {skillOptions?.map((skill) => (
                        <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`badge badge-lg cursor-pointer ${
                                Array.isArray(skills) && skills.includes(skill)
                                    ? "badge-primary"
                                    : "badge-outline"
                            }`}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
                <p className="text-sm opacity-70 mt-2">
                    Selected: {Array.isArray(skills) ? skills.join(", ") || "None" : "None"}
                </p>
            </fieldset>

            {/* Education */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg font-bold">Education</legend>
                <div className="space-y-2">
                    {Array.isArray(educations) && educations.map((edu, i) => (
                        <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input
                                className="input input-bordered w-full"
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) => handleChange<Education>(setEducations, i, "degree", e.target.value)}
                            />
                            <input
                                className="input input-bordered w-full"
                                placeholder="School"
                                value={edu.school}
                                onChange={(e) => handleChange<Education>(setEducations, i, "school", e.target.value)}
                            />
                            <input
                                className="input input-bordered w-full"
                                placeholder="Year"
                                value={edu.year}
                                onChange={(e) => handleChange<Education>(setEducations, i, "year", e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className="btn btn-outline btn-sm mt-2"
                    onClick={addEducation}
                >
                    + Add Education
                </button>
            </fieldset>

            <button type="submit" className="btn btn-primary w-full sm:w-auto mt-6">
                Save
            </button>
        </form>
    );
}