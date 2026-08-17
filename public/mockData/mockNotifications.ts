interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: string;
    read: boolean;
    link?: string;
}

// Mock notifications
export const mockNotifications: Notification[] = [
    {
        id: '1',
        title: 'New Project Match',
        message: 'A new TOR project matching your skills has been posted',
        type: 'success',
        timestamp: '2 minutes ago',
        read: false,
        link: '/tor-page/1'
    },
    {
        id: '2',
        title: 'Application Update',
        message: 'Your application for "Smart Contract Audit" has been reviewed',
        type: 'info',
        timestamp: '1 hour ago',
        read: false,
        link: '/applications'
    },
    {
        id: '3',
        title: 'Project Deadline Approaching',
        message: 'Digital Skills Training project deadline is in 3 days',
        type: 'warning',
        timestamp: '3 hours ago',
        read: true,
        link: '/tor-page/2'
    },
    {
        id: '4',
        title: 'New Message from Employer',
        message: 'Tech Education Foundation sent you a message about your proposal',
        type: 'info',
        timestamp: '5 hours ago',
        read: true,
        link: '/messages'
    },
    {
        id: '5',
        title: 'Project Risk Alert',
        message: 'Potential risk detected in "AI-Powered Agricultural Monitoring" project',
        type: 'error',
        timestamp: '1 day ago',
        read: true,
        link: '/tor-page/4'
    },
    {
        id: '6',
        title: 'Profile Complete',
        message: 'Your profile is now 100% complete! Add your portfolio to stand out',
        type: 'success',
        timestamp: '2 days ago',
        read: true,
        link: '/profile'
    }
];