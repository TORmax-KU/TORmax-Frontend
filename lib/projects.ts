import { API_BASE_URL } from './auth';
import { formatSubmissionDeadline } from './submission';

export interface Project {
  _id: string;
  analysisStatus?: 'pending' | 'processing' | 'completed' | 'failed' | 'awaiting_documents' | 'needs_review' | 'retry_pending';
  analysisHold?: boolean;
  analyzedAt?: string;
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
  aiAnalysis?: { documentUrls?: string[]; fieldResults?: Partial<Record<'budget' | 'announcedAt' | 'deadline', { status: 'found' | 'not_found' | 'ambiguous'; reason: string; evidence?: { quote: string; page: number; documentIndex: number } | null }>>; mandatorySkillNames?: string[]; noMandatorySkillsReason?: string; skillEvidence?: Array<{ name: string; quote: string; page?: number; documentIndex?: number }> };
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
  const unknown = lang === 'th' ? 'ต้นทางไม่ระบุข้อมูล' : 'Not provided by source';
  return {
    submission: { availability: project.availability, deadline: project.deadline, deadlinePrecision: project.deadlinePrecision, submissionStartAt: project.submissionStartAt },
    lang,
    id: project._id,
    displayId: project.externalId || project._id,
    name: project.title?.trim() || pendingExtraction(lang),
    employer: project.agency || unknown,
    price: project.budget == null || !Number.isFinite(project.budget) || project.budget < 0 ? extractionFieldLabel(project, 'budget', lang) : new Intl.NumberFormat(lang === 'th' ? 'th-TH' : 'en-US', { style: 'currency', currency: 'THB', maximumFractionDigits: 2 }).format(project.budget),
    sourcePortal: project.source || unknown,
    method: project.procurementMethod || unknown,
    deadline: project.deadline && Number.isFinite(Date.parse(project.deadline)) ? formatSubmissionDeadline(project, lang) : extractionFieldLabel(project, 'deadline', lang),
    availability: project.availability || 'unverified',
    availabilityLabel: availabilityLabel(project.availability, lang),
    published: project.announcedAt && Number.isFinite(Date.parse(project.announcedAt)) ? formatProcurementDate(project.announcedAt, lang, false) : extractionFieldLabel(project, 'announcedAt', lang),
    desc: project.descriptions || (lang === 'th' ? 'รอ AI สรุปเอกสาร TOR' : 'Awaiting AI TOR summary'),
    tags: [...new Set([...(project.sourceSkillNames || []), ...(project.requiredSkills || []).flatMap(skill => typeof skill === 'string' ? [] : [skill.name]), ...(project.aiAnalysis?.mandatorySkillNames || [])])],
  };
}

export type ProjectCard = ReturnType<typeof projectCard>;

export function pendingExtraction(lang: 'th' | 'en') {
  return lang === 'th' ? 'รอ AI สกัดข้อมูล' : 'Pending AI extraction';
}

export function extractionFieldLabel(project: Project, field: 'budget' | 'announcedAt' | 'deadline', lang: 'th' | 'en') {
  const status = project.aiAnalysis?.fieldResults?.[field]?.status;
  if (status === 'not_found') return lang === 'th' ? 'ไม่พบในเอกสารที่วิเคราะห์' : 'Not found in analyzed documents';
  if (status === 'ambiguous') return lang === 'th' ? 'ต้องตรวจสอบข้อมูล' : 'Needs review';
  return pendingExtraction(lang);
}
