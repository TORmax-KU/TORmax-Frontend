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
  deadlinePrecision?: 'datetime' | 'date' | 'unknown';
  announcedAt?: string;
  procurementStartAt?: string;
  submissionStartAt?: string;
  documentSaleEndAt?: string;
  procurementMethod?: string;
  referencePrice?: number;
  sourceStatus?: string;
  procurementStatus?: string;
  availability?: string;
  sourceVerifiedAt?: string;
  lastScrapedAt?: string;
  dataVerified?: boolean;
  documents?: Array<{ title: string; url: string; kind: 'tor' | 'announcement' | 'other'; verifiedAt?: string }>;
  qualifications?: string[];
  deliverables?: string[];
  sourceSkillNames?: string[];
  contact?: { name?: string; phone?: string; email?: string; address?: string };
  submissionLocation?: string;
  requiredSkills?: Array<{ _id: string; name: string } | string>;
  aiAnalysis?: { mandatorySkillNames?: string[]; noMandatorySkillsReason?: string; skillEvidence?: Array<{ name: string; quote: string; page?: number; documentIndex?: number }> };
}

export interface IngestionStatus { status: string; code?: string; lastAttemptAt?: string; lastSuccessAt?: string; nextAttemptAt?: string; intervalMinutes: number }
export interface ProjectResults { projects: Project[]; total: number; page: number; limit: number; ingestion?: IngestionStatus }

export function formatProcurementDate(value: string | undefined, lang: 'th' | 'en', includeTime = true) {
  if (!value || Number.isNaN(new Date(value).getTime())) return lang === 'th' ? 'ไม่ระบุในข้อมูลต้นทาง' : 'Not provided by source';
  return new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { timeZone: 'Asia/Bangkok', dateStyle: 'medium', ...(includeTime ? { timeStyle: 'short' as const } : {}) }).format(new Date(value));
}

export function availabilityLabel(value: string | undefined, lang: 'th' | 'en') {
  const labels: Record<string, [string, string]> = { open: ['ยังไม่ถึงวันปิดรับ', 'Before closing deadline'], unknown: ['ไม่พบกำหนดปิดรับ', 'Closing deadline unknown'], closed: ['ปิดรับแล้ว', 'Closed'], awarded: ['ประกาศผลแล้ว', 'Awarded'], cancelled: ['ยกเลิกแล้ว', 'Cancelled'], draft: ['ร่างประกาศ', 'Draft'], unverified: ['รอตรวจสอบข้อมูลล่าสุด', 'Awaiting source verification'] };
  return (labels[value || 'unverified'] || labels.unverified)[lang === 'th' ? 0 : 1];
}

export function safeSourceUrl(value?: string) {
  if (!value) return null;
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : null; } catch { return null; }
}

export async function getProjects(params: URLSearchParams, signal: AbortSignal): Promise<ProjectResults> {
  const response = await fetch(`${API_BASE_URL}/api/projects?${params}`, { signal });
  if (!response.ok) throw new Error('Could not load TORs');
  return response.json();
}

export function projectCard(project: Project, lang: 'th' | 'en') {
  const unknown = lang === 'th' ? 'ไม่ระบุ' : 'Not specified';
  return {
    id: project._id,
    displayId: project.externalId || project._id,
    name: project.title,
    employer: project.agency || unknown,
    price: project.budget == null ? unknown : new Intl.NumberFormat(lang === 'th' ? 'th-TH' : 'en-US', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(project.budget),
    sourcePortal: project.source || unknown,
    method: project.procurementMethod || unknown,
    deadline: project.deadline ? formatProcurementDate(project.deadline, lang, project.deadlinePrecision !== 'date') : (lang === 'th' ? 'ไม่พบกำหนดปิดรับ — กรุณาตรวจสอบกับหน่วยงาน' : 'Unknown — confirm with the agency'),
    availability: project.availability || 'unverified',
    availabilityLabel: availabilityLabel(project.availability, lang),
    published: formatProcurementDate(project.announcedAt, lang, false),
    desc: project.description || project.descriptions || (lang === 'th' ? 'ต้นทางยังไม่มีรายละเอียดขอบเขตงานที่ตรวจสอบได้' : 'Verified scope of work is not available yet.'),
    tags: [...new Set([...(project.sourceSkillNames || []), ...(project.requiredSkills || []).flatMap(skill => typeof skill === 'string' ? [] : [skill.name]), ...(project.aiAnalysis?.mandatorySkillNames || [])])],
  };
}

export type ProjectCard = ReturnType<typeof projectCard>;
