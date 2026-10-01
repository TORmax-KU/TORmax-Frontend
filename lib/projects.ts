import { API_BASE_URL } from './auth';

export interface Project {
  _id: string;
  title: string;
  agency?: string;
  budget?: number;
  description?: string;
  descriptions?: string;
  externalId?: string;
  source?: string;
  sourceUrl?: string;
  deadline?: string;
  requiredSkills?: Array<{ _id: string; name: string } | string>;
  aiAnalysis?: { mandatorySkillNames?: string[]; noMandatorySkillsReason?: string };
}

export interface ProjectResults { projects: Project[]; total: number; page: number; limit: number }

export async function getProjects(params: URLSearchParams, signal: AbortSignal): Promise<ProjectResults> {
  const response = await fetch(`${API_BASE_URL}/api/projects?${params}`, { signal });
  if (!response.ok) throw new Error('Could not load TORs');
  return response.json();
}

export function projectCard(project: Project, lang: 'th' | 'en') {
  const unknown = lang === 'th' ? 'ไม่ระบุ' : 'Not specified';
  const date = project.deadline ? new Date(project.deadline) : null;
  return {
    id: project._id,
    displayId: project.externalId || project._id,
    name: project.title,
    employer: project.agency || unknown,
    price: project.budget == null ? unknown : new Intl.NumberFormat(lang === 'th' ? 'th-TH' : 'en-US', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(project.budget),
    sourcePortal: project.source || unknown,
    method: unknown,
    deadline: date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-GB') : unknown,
    desc: project.descriptions || project.description || (lang === 'th' ? 'ยังไม่มีสรุป TOR' : 'No TOR summary available yet.'),
    tags: [...new Set([...(project.requiredSkills || []).flatMap(skill => typeof skill === 'string' ? [] : [skill.name]), ...(project.aiAnalysis?.mandatorySkillNames || [])])],
  };
}

export type ProjectCard = ReturnType<typeof projectCard>;
