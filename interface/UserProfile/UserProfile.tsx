export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
    title: string;
    company: string;
    bio: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
    torPreferences: TORPreferences;
    documents: Document[];
    activity: Activity[];
    socialLinks: SocialLinks;
    statistics: Statistics;
}