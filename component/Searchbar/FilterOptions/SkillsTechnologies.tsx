import { RiCodeLine, RiArrowDownSLine } from "@remixicon/react";
import { FilterState } from "./FilterIndex";

interface SkillsTechnologiesProps {
    filters: FilterState;
    isActive: boolean;
    onToggle: () => void;
    onInputChange: (field: keyof FilterState, value: string | string[]) => void;
    onArrayToggle: (field: keyof FilterState, value: string) => void;
}

const skillsOptions = [
    "Project Management", "Team Leadership", "Strategic Planning", "Budget Management",
    "Data Analysis", "Research & Development", "Technical Writing", "Quality Assurance",
    "Risk Management", "Compliance", "Supply Chain Management", "Inventory Management",
    "Customer Relationship Management", "Business Development", "Financial Analysis",
    "Graphic Design", "User Research", "Prototyping", "Information Architecture",
    "Content Strategy", "SEO", "Social Media Marketing", "Email Marketing",
    "Communication", "Problem Solving", "Critical Thinking", "Adaptability",
    "Time Management", "Collaboration", "Emotional Intelligence", "Negotiation"
];

const technologies = [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "Go", "Rust",
    "React", "Vue.js", "Angular", "Next.js", "Node.js", "Express",
    "Django", "Spring Boot", "Laravel", "GraphQL", "REST API",
    "MongoDB", "PostgreSQL", "MySQL", "Redis", "Cassandra",
    "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"
];

const tools = [
    "Git", "GitHub", "GitLab", "Bitbucket", "Jenkins",
    "GitHub Actions", "CircleCI", "Travis CI", "Slack",
    "Jira", "Confluence", "Trello", "Asana", "Figma",
    "InVision", "Miro", "Sketch", "VSCode", "IntelliJ",
    "Postman", "Swagger", "Insomnia"
];

export default function SkillsTechnologies({ 
    filters, 
    isActive, 
    onToggle, 
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
                </div>
                <RiArrowDownSLine className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>
            
            {isActive && (
                <div className="pl-6 space-y-3">
                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Skills Required</label>
                        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                            {skillsOptions.slice(0, 20).map((skill) => (
                                <button
                                    key={skill}
                                    type="button"
                                    onClick={() => onArrayToggle("skills", skill)}
                                    className={`
                                        px-2 py-1 rounded-full text-xs font-medium transition-all duration-300
                                        ${filters.skills.includes(skill)
                                            ? 'bg-info text-info-content shadow-md shadow-info/20'
                                            : 'bg-base-200 hover:bg-base-300 text-base-content/70'
                                        }
                                    `}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                        {filters.skills.length > 0 && (
                            <p className="text-xs opacity-60 mt-1">
                                Selected: {filters.skills.join(" • ")}
                            </p>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Technologies</label>
                        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                            {technologies.slice(0, 15).map((tech) => (
                                <button
                                    key={tech}
                                    type="button"
                                    onClick={() => onArrayToggle("technologies", tech)}
                                    className={`
                                        px-2 py-1 rounded-full text-xs font-medium transition-all duration-300
                                        ${filters.technologies.includes(tech)
                                            ? 'bg-secondary text-secondary-content shadow-md shadow-secondary/20'
                                            : 'bg-base-200 hover:bg-base-300 text-base-content/70'
                                        }
                                    `}
                                >
                                    {tech}
                                </button>
                            ))}
                        </div>
                        {filters.technologies.length > 0 && (
                            <p className="text-xs opacity-60 mt-1">
                                Selected: {filters.technologies.join(" • ")}
                            </p>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label label-text text-xs opacity-70">Tools</label>
                        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                            {tools.slice(0, 12).map((tool) => (
                                <button
                                    key={tool}
                                    type="button"
                                    onClick={() => onArrayToggle("tools", tool)}
                                    className={`
                                        px-2 py-1 rounded-full text-xs font-medium transition-all duration-300
                                        ${filters.tools.includes(tool)
                                            ? 'bg-accent text-accent-content shadow-md shadow-accent/20'
                                            : 'bg-base-200 hover:bg-base-300 text-base-content/70'
                                        }
                                    `}
                                >
                                    {tool}
                                </button>
                            ))}
                        </div>
                        {filters.tools.length > 0 && (
                            <p className="text-xs opacity-60 mt-1">
                                Selected: {filters.tools.join(" • ")}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}