export interface TORRequirement {
    text: string;
    pass: boolean;
}

export interface TORFeasibility {
    budgetFit: number;
    securityFit: number;
    techStack: number;
    timelineFit: number;
    localPresence: number;
}

export interface TORItem {
    id: string;
    price: string;
    rawPrice: number;
    sourcePortal: string;
    name: string;
    employer: string;
    tags: string[];
    matchScore: number;
    deadline: string;
    desc: string;
    method: 'e-Bidding' | 'e-Market' | 'Direct Selection';
    requirements: TORRequirement[];
    feasibility: TORFeasibility;
}

export interface UserProfile {
    companyName: string;
    taxId: string;
    registeredCapital: string;
    yearsInBusiness: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    iso27001: boolean;
    iso9001: boolean;
    iso20000: boolean;
    nbtcLicense: boolean;
    dailyDigestEmail: boolean;
    smsAlerts: boolean;
    matchThreshold: number;
    trackedKeywords: string;
    preferredAgencies: string[];
}

export interface FilterState {
    query: string;
    method: string;
    agency: string;
    minBudget: number;
    maxBudget: number;
    requireIso: boolean;
    requireCapital: boolean;
}

export interface SystemLog {
    time: string;
    type: 'SYNC' | 'VECTOR' | 'ALERT' | 'CREATE';
    msg: string;
}