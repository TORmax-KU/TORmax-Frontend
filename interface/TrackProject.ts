export interface TrackedProject {
    id: string;
    title: string;
    titleTh: string;
    agency: string;
    budget: string;
    submissionDeadline: string;
    published?: string;
    status: 'active' | 'upcoming' | 'closed';
    category: string;
    trackedDate: string;
}
