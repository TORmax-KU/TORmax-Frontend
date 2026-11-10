import { API_BASE_URL } from './auth';
import { Project } from './projects';

// Vendor matches computed by the backend matching engine (FR-08, UC1).

export type BudgetFit = 'within' | 'below' | 'above' | 'unknown';

export interface MatchedProject extends Project {
  match: { percentage: number; matchedSkillIds: string[] };
}

// Explains an empty list: wrong account type, no skills yet, or criteria too narrow.
export interface MatchProfile {
  isVendor: boolean;
  hasSkills: boolean;
  matchThreshold: number;
  minBudget: number | null;
  maxBudget: number | null;
}

export interface MatchResults {
  projects: MatchedProject[];
  total: number;
  page: number;
  limit: number;
  profile: MatchProfile;
}

export interface NamedSkill { _id: string; name: string }

// GET /api/projects/:id/match — how the signed-in vendor fits one TOR.
export interface ProjectMatch {
  projectId: string;
  matchPercentage: number | null;
  requiredCount: number;
  matchedSkills: NamedSkill[];
  missingSkills: NamedSkill[];
  unmappedSkillNames: string[];
  matchThreshold: number;
  budgetFit: BudgetFit;
  isMatch: boolean;
}

export class SignedOutError extends Error {}

export async function getMatches(page: number, signal: AbortSignal): Promise<MatchResults> {
  const params = new URLSearchParams({ page: String(page), limit: '20' });
  const response = await fetch(`${API_BASE_URL}/api/matches?${params}`, { credentials: 'include', signal });
  if (response.status === 401) throw new SignedOutError();
  if (!response.ok) throw new Error('Could not load matches');
  return response.json();
}

export async function getProjectMatch(projectId: string, signal: AbortSignal): Promise<ProjectMatch> {
  const response = await fetch(`${API_BASE_URL}/api/projects/${encodeURIComponent(projectId)}/match`, { credentials: 'include', signal });
  if (response.status === 401) throw new SignedOutError();
  if (!response.ok) throw new Error('Could not load match');
  return response.json();
}

export function formatBudgetRange(profile: Pick<MatchProfile, 'minBudget' | 'maxBudget'>, lang: 'th' | 'en') {
  const money = (value: number) => new Intl.NumberFormat(lang === 'th' ? 'th-TH' : 'en-US', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(value);
  const { minBudget: min, maxBudget: max } = profile;
  if (min == null && max == null) return lang === 'th' ? 'ไม่จำกัดงบประมาณ' : 'any budget';
  if (min != null && max != null) return `${money(min)} – ${money(max)}`;
  if (min != null) return lang === 'th' ? `ตั้งแต่ ${money(min)}` : `from ${money(min)}`;
  return lang === 'th' ? `ไม่เกิน ${money(max as number)}` : `up to ${money(max as number)}`;
}
