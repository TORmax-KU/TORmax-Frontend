import { TORRequirement } from '@/types';

export function calculatePassRate(requirements: TORRequirement[]): { count: number; percentage: number } {
  const count = requirements.filter(requirement => requirement.pass).length;
  return { count, percentage: requirements.length ? Math.round(count / requirements.length * 100) : 0 };
}
