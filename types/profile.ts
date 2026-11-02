export interface ProfileFormData {
  companyName: string;
  taxId: string;
  registeredCapital: string;
  yearsInBusiness: number;
  // Kept as typed text so invalid input can be highlighted instead of silently clamped.
  minBudget: string;
  maxBudget: string;
  teamSize: string;
  capacity: string;
  iso27001: boolean;
  iso9001: boolean;
  iso20000: boolean;
  nbtcLicense: boolean;
  trackedKeywords: string;
  matchThreshold: number;
  dailyDigestEmail: boolean;
  smsAlerts: boolean;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  skills: string[];
}
