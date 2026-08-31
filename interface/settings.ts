export interface UserSettings {
    // Account
    email: string;
    phone: string;
    language: string;
    timezone: string;
    
    // Security
    twoFactorAuth: boolean;
    sessionTimeout: string;
    loginAlerts: boolean;
    
    // Notifications
    emailNotifications: boolean;
    pushNotifications: boolean;
    projectUpdates: boolean;
    messages: boolean;
    marketingEmails: boolean;
    
    // Privacy
    profileVisibility: 'public' | 'private' | 'employers';
    showEmail: boolean;
    showPhone: boolean;
    
    // Appearance
    theme: 'light' | 'dark' | 'system';
    compactMode: boolean;
    reducedMotion: boolean;
}

export const defaultSettings: UserSettings = {
    email: "john.doe@example.com",
    phone: "+66 8X-XXX-XXXX",
    language: "English",
    timezone: "Asia/Bangkok (GMT+7)",
    
    twoFactorAuth: true,
    sessionTimeout: "30 minutes",
    loginAlerts: true,
    
    emailNotifications: true,
    pushNotifications: true,
    projectUpdates: true,
    messages: true,
    marketingEmails: false,
    
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    
    theme: 'system',
    compactMode: false,
    reducedMotion: false,
};