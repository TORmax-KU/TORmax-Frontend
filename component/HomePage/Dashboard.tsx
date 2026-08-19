'use client';

import { useState } from "react";
import Link from "next/link";
import {
    RiArrowRightLine,
    RiTimeLine,
    RiCheckLine,
    RiCloseLine,
    RiQuestionLine,
    RiBuildingLine,
    RiMapPinLine,
    RiBriefcaseLine,
    RiBookmarkLine,
    RiRefreshLine,
    RiFireLine,
    RiCalendarLine,
    RiNotificationLine,
    RiLockLine,
    RiLineChartLine
} from "@remixicon/react";

// Types
interface TrackedProject {
    id: string;
    name: string;
    employer: string;
    location: string;
    category: string;
    status: 'Approved' | 'Applied' | 'Rejected' | 'Unavailable';
    date: string;
    trackingId: string;
    lastUpdate: string;
}

interface ProjectFeed {
    id: string;
    title: string;
    employer: string;
    location: string;
    category: string;
    postedAt: string;
    budget: string;
    deadline: string;
    matches: string[];
    urgency: 'Low' | 'Medium' | 'High';
    isNew: boolean;
}

// Mock Data
const trackedProjects: TrackedProject[] = [
    { id: '1', name: 'Digital Skills Training for Rural Youth', employer: 'Tech Education Foundation', location: 'Northern Region, Thailand', category: 'Education', status: 'Approved', date: '2024-01-15', trackingId: 'TOR-001', lastUpdate: '2 hours ago' },
    { id: '2', name: 'Smart Contract Audit for DeFi Protocol', employer: 'Crypto Innovations', location: 'Remote', category: 'Blockchain', status: 'Applied', date: '2024-01-20', trackingId: 'TOR-002', lastUpdate: '1 day ago' },
    { id: '3', name: 'Community Health Worker Program', employer: 'Health Access International', location: 'Southern Region, Thailand', category: 'Healthcare', status: 'Rejected', date: '2024-01-10', trackingId: 'TOR-003', lastUpdate: '3 days ago' },
    { id: '4', name: 'AI-Powered Agricultural Monitoring', employer: 'Smart Farms Co.', location: 'Central Region, Thailand', category: 'Agriculture', status: 'Unavailable', date: '2024-01-05', trackingId: 'TOR-004', lastUpdate: '5 days ago' },
];

const feedProjects: ProjectFeed[] = [
    { id: 'f1', title: 'Blockchain Identity Management System', employer: 'Digital Identity Foundation', location: 'Remote', category: 'Blockchain', postedAt: '2 hours ago', budget: '฿800K - 1.2M', deadline: '2024-03-15', matches: ['Solidity', 'Web3', 'Security'], urgency: 'High', isNew: true },
    { id: 'f2', title: 'Sustainable Energy Grid Optimization', employer: 'Green Energy Solutions', location: 'Bangkok, Thailand', category: 'Energy', postedAt: '5 hours ago', budget: '฿500K - 900K', deadline: '2024-04-01', matches: ['Python', 'Data Science', 'IoT'], urgency: 'Medium', isNew: true },
    { id: 'f3', title: 'Healthcare Data Analytics Platform', employer: 'MediTech Innovations', location: 'Remote', category: 'Healthcare', postedAt: '1 day ago', budget: '฿1.2M - 2M', deadline: '2024-05-15', matches: ['Healthcare', 'Data Analysis', 'Security'], urgency: 'Low', isNew: false },
    { id: 'f4', title: 'E-Learning Platform for Digital Skills', employer: 'EduTech Foundation', location: 'Chiang Mai, Thailand', category: 'Education', postedAt: '2 days ago', budget: '฿600K - 1M', deadline: '2024-04-20', matches: ['Education', 'Full Stack', 'UX Design'], urgency: 'Medium', isNew: false },
    { id: 'f5', title: 'Supply Chain Traceability Solution', employer: 'LogiChain Corp', location: 'Remote', category: 'Supply Chain', postedAt: '3 days ago', budget: '฿1M - 1.5M', deadline: '2024-06-01', matches: ['Blockchain', 'Supply Chain', 'DApp'], urgency: 'Low', isNew: false },
];

const interestProjects: ProjectFeed[] = [
    { id: 'i1', title: 'AI-Driven Customer Service Chatbot', employer: 'TechAI Solutions', location: 'Remote', category: 'AI/ML', postedAt: '1 hour ago', budget: '฿750K - 1.1M', deadline: '2024-03-20', matches: ['NLP', 'Python', 'Machine Learning'], urgency: 'High', isNew: true },
    { id: 'i2', title: 'Decentralized Finance (DeFi) Protocol', employer: 'DeFi Innovations', location: 'Remote', category: 'Blockchain', postedAt: '3 hours ago', budget: '฿1.5M - 2.5M', deadline: '2024-04-10', matches: ['Solidity', 'DeFi', 'Web3'], urgency: 'High', isNew: true },
    { id: 'i3', title: 'Smart City IoT Infrastructure', employer: 'UrbanTech', location: 'Bangkok, Thailand', category: 'IoT', postedAt: '1 day ago', budget: '฿2M - 3M', deadline: '2024-07-01', matches: ['IoT', 'Sensor Networks', 'Data Analytics'], urgency: 'Medium', isNew: false },
];

const employerProjects: ProjectFeed[] = [
    { id: 'e1', title: 'Corporate Training Program', employer: 'Tech Education Foundation', location: 'Northern Region, Thailand', category: 'Education', postedAt: '6 hours ago', budget: '฿400K - 700K', deadline: '2024-03-25', matches: ['Training', 'Education', 'Program Management'], urgency: 'Medium', isNew: true },
    { id: 'e2', title: 'Smart Contract Security Audit', employer: 'Crypto Innovations', location: 'Remote', category: 'Blockchain', postedAt: '1 day ago', budget: '฿900K - 1.4M', deadline: '2024-04-05', matches: ['Security', 'Solidity', 'Auditing'], urgency: 'High', isNew: false },
];

// Subcomponents
const StatusBadge = ({ status }: { status: TrackedProject['status'] }) => {
    const config = {
        'Approved': { color: 'badge-success', icon: <RiCheckLine className="h-3 w-3" />, label: 'Approved' },
        'Applied': { color: 'badge-warning', icon: <RiTimeLine className="h-3 w-3" />, label: 'Applied' },
        'Rejected': { color: 'badge-error', icon: <RiCloseLine className="h-3 w-3" />, label: 'Rejected' },
        'Unavailable': { color: 'badge-ghost', icon: <RiQuestionLine className="h-3 w-3" />, label: 'Unavailable' },
    };
    const { color, icon, label } = config[status];
    return (
        <span className={`badge ${color} gap-1.5 px-3 py-2 text-xs`}>
            {icon}
            {label}
        </span>
    );
};

const UrgencyBadge = ({ urgency }: { urgency: string }) => {
    const config = {
        'High': { color: 'badge-error', label: '🔥 Urgent' },
        'Medium': { color: 'badge-warning', label: '⏳ Soon' },
        'Low': { color: 'badge-info', label: '📅 Later' },
    };
    const { color, label } = config[urgency as keyof typeof config] || config['Low'];
    return <span className={`badge ${color} gap-1 text-xs`}>{label}</span>;
};

// Locked Overlay Component
const LockedOverlay = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <Link href={href} className="relative block group">
        <div className="relative overflow-hidden rounded-2xl">
            {/* Glass Blur Overlay */}
            <div className="absolute inset-0 backdrop-blur-md bg-[#9B8EAA]/20 dark:bg-[#9B8EAA]/10 z-10 flex flex-col items-center justify-center gap-2 group-hover:bg-[#9B8EAA]/30 dark:group-hover:bg-[#9B8EAA]/20 transition-all duration-300">
                <div className="p-3 rounded-full bg-[#9B8EAA]/30 dark:bg-[#9B8EAA]/20 backdrop-blur-sm">
                    <RiLockLine className="h-8 w-8 text-[#9B8EAA] dark:text-[#A8B5A0]" />
                </div>
                <p className="text-sm font-medium text-[#7A6B8A] dark:text-[#A8B5A0]">
                    Log in to see more
                </p>
                <p className="text-xs text-[#7A6B8A]/70 dark:text-[#A8B5A0]/60">
                    Click to login
                </p>
            </div>

            {/* Content with reduced opacity */}
            <div className="opacity-40 blur-[1px] scale-[0.98] transition-all duration-300 group-hover:opacity-30 group-hover:blur-[2px]">
                {children}
            </div>
        </div>
    </Link>
);

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<'latest' | 'interests' | 'employers'>('latest');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true); 

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    const getFeedData = () => {
        switch (activeTab) {
            case 'interests': return interestProjects;
            case 'employers': return employerProjects;
            default: return feedProjects;
        }
    };

    const feedData = getFeedData();

    // Check if the current tab should be locked
    const isTabLocked = !isLoggedIn && activeTab !== 'latest';

    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <RiFireLine className="h-7 w-7 text-primary" />
                        Dashboard
                    </h1>
                    <p className="text-sm text-base-content/50">Your personalized TOR project hub</p>
                </div>
            </div>

            {/* Stats Grid - Locked if not logged in */}
            {isLoggedIn ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    <div className="stat bg-base-100 shadow-sm rounded-box p-3">
                        <div className="stat-figure text-primary">
                            <RiBriefcaseLine className="h-5 w-5" />
                        </div>
                        <div className="stat-title text-[10px] uppercase tracking-wider">Total Tracked</div>
                        <div className="stat-value text-xl">{trackedProjects.length}</div>
                    </div>
                    <div className="stat bg-base-100 shadow-sm rounded-box p-3">
                        <div className="stat-figure text-success">
                            <RiCheckLine className="h-5 w-5" />
                        </div>
                        <div className="stat-title text-[10px] uppercase tracking-wider">Approved</div>
                        <div className="stat-value text-xl text-success">
                            {trackedProjects.filter(p => p.status === 'Approved').length}
                        </div>
                    </div>
                    <div className="stat bg-base-100 shadow-sm rounded-box p-3">
                        <div className="stat-figure text-warning">
                            <RiTimeLine className="h-5 w-5" />
                        </div>
                        <div className="stat-title text-[10px] uppercase tracking-wider">In Progress</div>
                        <div className="stat-value text-xl text-warning">
                            {trackedProjects.filter(p => p.status === 'Applied').length}
                        </div>
                    </div>
                    <div className="stat bg-base-100 shadow-sm rounded-box p-3">
                        <div className="stat-figure text-accent">
                            <RiLineChartLine className="h-5 w-5" />
                        </div>
                        <div className="stat-title text-[10px] uppercase tracking-wider">New Matches</div>
                        <div className="stat-value text-xl text-accent">
                            {feedProjects.filter(p => p.isNew).length + interestProjects.filter(p => p.isNew).length}
                        </div>
                    </div>
                </div>
            ) : (
                <LockedOverlay href="/login">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                        <div className="stat bg-base-100 shadow-sm rounded-box p-3">
                            <div className="stat-figure text-primary">
                                <RiBriefcaseLine className="h-5 w-5" />
                            </div>
                            <div className="stat-title text-[10px] uppercase tracking-wider">Total Tracked</div>
                            <div className="stat-value text-xl">{trackedProjects.length}</div>
                        </div>
                        <div className="stat bg-base-100 shadow-sm rounded-box p-3">
                            <div className="stat-figure text-success">
                                <RiCheckLine className="h-5 w-5" />
                            </div>
                            <div className="stat-title text-[10px] uppercase tracking-wider">Approved</div>
                            <div className="stat-value text-xl text-success">
                                {trackedProjects.filter(p => p.status === 'Approved').length}
                            </div>
                        </div>
                        <div className="stat bg-base-100 shadow-sm rounded-box p-3">
                            <div className="stat-figure text-warning">
                                <RiTimeLine className="h-5 w-5" />
                            </div>
                            <div className="stat-title text-[10px] uppercase tracking-wider">In Progress</div>
                            <div className="stat-value text-xl text-warning">
                                {trackedProjects.filter(p => p.status === 'Applied').length}
                            </div>
                        </div>
                        <div className="stat bg-base-100 shadow-sm rounded-box p-3">
                            <div className="stat-figure text-accent">
                                <RiLineChartLine className="h-5 w-5" />
                            </div>
                            <div className="stat-title text-[10px] uppercase tracking-wider">New Matches</div>
                            <div className="stat-value text-xl text-accent">
                                {feedProjects.filter(p => p.isNew).length + interestProjects.filter(p => p.isNew).length}
                            </div>
                        </div>
                    </div>
                </LockedOverlay>
            )}

            {/* Two-column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Tracked Projects */}
                <div className="lg:col-span-1">
                    {isLoggedIn ? (
                        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200/50 p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold flex items-center gap-2">
                                    <RiBookmarkLine className="h-4 w-4 text-primary" />
                                    Tracked Projects
                                </h2>
                                <Link href="/tracked" className="text-xs text-primary hover:underline flex items-center gap-1">
                                    View all
                                    <RiArrowRightLine className="h-3 w-3" />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {trackedProjects.slice(0, 3).map((project) => (
                                    <Link
                                        key={project.id}
                                        href={`/tor-page/${project.id}`}
                                        className="block p-3 bg-base-200/30 rounded-xl hover:bg-base-200/50 transition-colors group"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{project.name}</p>
                                                <p className="text-xs text-base-content/50 truncate flex items-center gap-1">
                                                    <RiBuildingLine className="h-3 w-3" />
                                                    {project.employer}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <StatusBadge status={project.status} />
                                                    <span className="text-[10px] text-base-content/30 flex items-center gap-0.5">
                                                        <RiTimeLine className="h-3 w-3" />
                                                        {project.lastUpdate}
                                                    </span>
                                                </div>
                                            </div>
                                            <RiArrowRightLine className="h-4 w-4 text-base-content/20 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                                        </div>
                                    </Link>
                                ))}

                                {trackedProjects.length === 0 && (
                                    <div className="text-center py-6 text-base-content/40">
                                        <p className="text-sm">No projects tracked yet</p>
                                        <Link href="/tor-list" className="text-xs text-primary hover:underline">
                                            Browse projects
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <LockedOverlay href="/login">
                            <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200/50 p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-semibold flex items-center gap-2">
                                        <RiBookmarkLine className="h-4 w-4 text-primary" />
                                        Tracked Projects
                                    </h2>
                                    <span className="text-xs text-primary/50">View all</span>
                                </div>
                                <div className="space-y-3">
                                    {trackedProjects.slice(0, 3).map((project) => (
                                        <div key={project.id} className="block p-3 bg-base-200/30 rounded-xl">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{project.name}</p>
                                                    <p className="text-xs text-base-content/50 truncate flex items-center gap-1">
                                                        <RiBuildingLine className="h-3 w-3" />
                                                        {project.employer}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1.5">
                                                        <StatusBadge status={project.status} />
                                                        <span className="text-[10px] text-base-content/30 flex items-center gap-0.5">
                                                            <RiTimeLine className="h-3 w-3" />
                                                            {project.lastUpdate}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </LockedOverlay>
                    )}
                </div>

                {/* Right: Feed */}
                <div className="lg:col-span-2">
                    <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200/50 p-4">
                        {/* Tabs - Always visible */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-1 bg-base-200/50 rounded-xl p-1">
                                <button
                                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'latest'
                                            ? 'bg-primary text-primary-content shadow-sm'
                                            : 'hover:bg-base-200'
                                        }`}
                                    onClick={() => setActiveTab('latest')}
                                >
                                    Latest
                                </button>
                                <button
                                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'interests'
                                            ? 'bg-primary text-primary-content shadow-sm'
                                            : 'hover:bg-base-200'
                                        }`}
                                    onClick={() => setActiveTab('interests')}
                                >
                                    Your Interests
                                </button>
                                <button
                                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'employers'
                                            ? 'bg-primary text-primary-content shadow-sm'
                                            : 'hover:bg-base-200'
                                        }`}
                                    onClick={() => setActiveTab('employers')}
                                >
                                    Employers You Know
                                </button>
                            </div>
                            <span className="text-[10px] text-base-content/30">{feedData.length} projects</span>
                        </div>

                        {/* Feed Content - Latest is always visible, others are locked */}
                        {isTabLocked ? (
                            <LockedOverlay href="/login">
                                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                                    {feedData.map((project) => (
                                        <div key={project.id} className="block p-3 bg-base-200/30 rounded-xl">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 mt-0.5">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                        <RiBriefcaseLine className="h-4 w-4" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div>
                                                            <p className="text-sm font-medium">
                                                                {project.title}
                                                                {project.isNew && (
                                                                    <span className="ml-2 text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                                                        New
                                                                    </span>
                                                                )}
                                                            </p>
                                                            <p className="text-xs text-base-content/50 truncate flex items-center gap-1">
                                                                <RiBuildingLine className="h-3 w-3" />
                                                                {project.employer}
                                                                <span className="mx-1">•</span>
                                                                <RiMapPinLine className="h-3 w-3" />
                                                                {project.location}
                                                            </p>
                                                        </div>
                                                        <UrgencyBadge urgency={project.urgency} />
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px] text-base-content/40">
                                                        <span className="flex items-center gap-0.5">
                                                            <RiCalendarLine className="h-3 w-3" />
                                                            {project.deadline}
                                                        </span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-0.5">
                                                            <RiTimeLine className="h-3 w-3" />
                                                            {project.postedAt}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{project.budget}</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                                        {project.matches.slice(0, 3).map((tag) => (
                                                            <span key={tag} className="badge badge-ghost badge-xs">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {project.matches.length > 3 && (
                                                            <span className="text-[9px] text-base-content/30">
                                                                +{project.matches.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {feedData.length === 0 && (
                                        <div className="text-center py-8 text-base-content/40">
                                            <RiNotificationLine className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                            <p className="text-sm">No projects in this feed</p>
                                        </div>
                                    )}
                                </div>
                            </LockedOverlay>
                        ) : (
                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                                {feedData.map((project) => (
                                    <Link
                                        key={project.id}
                                        href={`/tor-page/${project.id}`}
                                        className="block p-3 bg-base-200/30 rounded-xl hover:bg-base-200/50 transition-colors group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-0.5">
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                    <RiBriefcaseLine className="h-4 w-4" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <p className="text-sm font-medium">
                                                            {project.title}
                                                            {project.isNew && (
                                                                <span className="ml-2 text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                                                    New
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-base-content/50 truncate flex items-center gap-1">
                                                            <RiBuildingLine className="h-3 w-3" />
                                                            {project.employer}
                                                            <span className="mx-1">•</span>
                                                            <RiMapPinLine className="h-3 w-3" />
                                                            {project.location}
                                                        </p>
                                                    </div>
                                                    <UrgencyBadge urgency={project.urgency} />
                                                </div>
                                                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px] text-base-content/40">
                                                    <span className="flex items-center gap-0.5">
                                                        <RiCalendarLine className="h-3 w-3" />
                                                        {project.deadline}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-0.5">
                                                        <RiTimeLine className="h-3 w-3" />
                                                        {project.postedAt}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{project.budget}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1 mt-1.5">
                                                    {project.matches.slice(0, 3).map((tag) => (
                                                        <span key={tag} className="badge badge-ghost badge-xs">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {project.matches.length > 3 && (
                                                        <span className="text-[9px] text-base-content/30">
                                                            +{project.matches.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                {feedData.length === 0 && (
                                    <div className="text-center py-8 text-base-content/40">
                                        <RiNotificationLine className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                        <p className="text-sm">No projects in this feed</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Footer */}
                        {feedData.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-base-200/50 text-center">
                                <Link
                                    href="/tor-list"
                                    className="text-xs text-primary hover:underline flex items-center justify-center gap-1"
                                >
                                    Browse all projects
                                    <RiArrowRightLine className="h-3 w-3" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}