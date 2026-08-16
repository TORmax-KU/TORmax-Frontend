interface Project {
    id: string;
    name: string;
    status: 'Approved' | 'Applied' | 'Rejected' | 'Unavailable';
    date: string;
    trackingId: string;
    category: string;
}

export const mockProjects: Project[] = [
    { id: '1', name: 'AI-Powered Analytics Platform', status: 'Approved', date: '2024-01-15', trackingId: 'TOR-001', category: 'AI/ML' },
    { id: '2', name: 'Blockchain Identity Management', status: 'Applied', date: '2024-01-20', trackingId: 'TOR-002', category: 'Blockchain' },
    { id: '3', name: 'Smart City IoT Network', status: 'Rejected', date: '2024-01-10', trackingId: 'TOR-003', category: 'IoT' },
    { id: '4', name: 'Sustainable Energy Grid', status: 'Unavailable', date: '2024-01-05', trackingId: 'TOR-004', category: 'Energy' },
    { id: '5', name: 'Healthcare Data Platform', status: 'Approved', date: '2024-01-25', trackingId: 'TOR-005', category: 'Healthcare' },
    { id: '6', name: 'Autonomous Drone Fleet', status: 'Applied', date: '2024-01-18', trackingId: 'TOR-006', category: 'Robotics' },
];