'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
    RiBriefcaseLine,
    RiSearchLine,
    RiFilter3Line,
    RiBookmark3Fill,
    RiCalendarEventLine,
    RiCoinsLine,
    RiBuilding4Line,
    RiExternalLinkLine,
    RiTimeLine,
    RiAlertLine,
    RiDeleteBinLine,
    RiCheckLine,
} from '@remixicon/react';

interface TrackedProject {
    id: string;
    title: string;
    titleTh: string;
    agency: string;
    budget: string;
    submissionDeadline: string;
    status: 'active' | 'upcoming' | 'closed';
    category: string;
    trackedDate: string;
}

const MOCK_TRACKED: TrackedProject[] = [
    {
        id: 'TOR-2026-0891',
        title: 'Cloud Infrastructure Upgrade & Migration Project Phase 2',
        titleTh: 'โครงการปรับปรุงและย้ายระบบโครงสร้างพื้นฐานคลาวด์ ระยะที่ 2',
        agency: 'Ministry of Digital Economy and Society',
        budget: '฿45,000,000',
        submissionDeadline: '2026-09-15',
        status: 'active',
        category: 'IT & Cloud Infrastructure',
        trackedDate: '2026-08-20',
    },
    {
        id: 'TOR-2026-0742',
        title: 'AI-Powered Smart Traffic Management Platform',
        titleTh: 'แพลตฟอร์มบริหารจัดการจราจรอัจฉริยะด้วยระบบปัญญาประดิษฐ์',
        agency: 'Bangkok Metropolitan Administration',
        budget: '฿120,000,000',
        submissionDeadline: '2026-09-02',
        status: 'active',
        category: 'Software & AI Solutions',
        trackedDate: '2026-08-18',
    },
    {
        id: 'TOR-2026-0610',
        title: 'Cybersecurity Incident Response & SOC Operations Upgrade',
        titleTh: 'โครงการยกระดับศูนย์เฝ้าระวังความปลอดภัยทางไซเบอร์ (SOC)',
        agency: 'Bank of Thailand',
        budget: '฿28,500,000',
        submissionDeadline: '2026-08-28',
        status: 'upcoming',
        category: 'Cybersecurity',
        trackedDate: '2026-08-10',
    },
    {
        id: 'TOR-2026-0421',
        title: 'National Healthcare Data Integration Portal',
        titleTh: 'ระบบเชื่อมโยงข้อมูลสุขภาพแห่งชาติ',
        agency: 'Ministry of Public Health',
        budget: '฿85,000,000',
        submissionDeadline: '2026-08-12',
        status: 'closed',
        category: 'Software Development',
        trackedDate: '2026-07-25',
    },
];

export default function TrackedProjectsPage() {
    const { lang } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'upcoming' | 'closed'>('all');
    const [projects, setProjects] = useState<TrackedProject[]>(MOCK_TRACKED);

    const handleUntrack = (id: string) => {
        setProjects((prev) => prev.filter((p) => p.id !== id));
    };

    const filteredProjects = projects.filter((item) => {
        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.titleTh.includes(searchQuery) ||
            item.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = filterStatus === 'all' || item.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#121118] text-slate-900 dark:text-slate-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-[#2D2938] pb-6">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#5B3E96] dark:text-[#9B82C1] uppercase tracking-wider">
                            <RiBookmark3Fill className="h-4 w-4" />
                            <span>{lang === 'EN' ? 'Saved Workspace' : 'พื้นที่จัดเก็บส่วนตัว'}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black mt-1">
                            {lang === 'EN' ? 'Tracked Projects' : 'โครงการที่ติดตาม'}
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {lang === 'EN'
                                ? 'Monitor bidding timelines, status updates, and deadlines for saved TOR documents.'
                                : 'ติดตามกำหนดการ สถานะการประกวดราคา และเอกสาร TOR ที่คุณบันทึกไว้'}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/search-feed"
                            className="btn btn-sm bg-[#5B3E96] hover:bg-[#4A327B] text-white border-none font-semibold rounded-xl px-4"
                        >
                            <RiBriefcaseLine className="h-4 w-4" />
                            <span>{lang === 'EN' ? 'Browse Directory' : 'ค้นหาเอกสาร TOR'}</span>
                        </Link>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="relative md:col-span-8">
                        <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={lang === 'EN' ? 'Search by title, agency, or ID...' : 'ค้นหาด้วยชื่อโครงการ, หน่วยงาน หรือ รหัส...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#2D2938] bg-white dark:bg-[#1C1A24] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#5B3E96]"
                        />
                    </div>

                    <div className="md:col-span-4 flex items-center gap-2">
                        <RiFilter3Line className="h-4 w-4 text-slate-400 shrink-0" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-[#2D2938] bg-white dark:bg-[#1C1A24] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#5B3E96]"
                        >
                            <option value="all">{lang === 'EN' ? 'All Statuses' : 'ทุกสถานะ'}</option>
                            <option value="active">{lang === 'EN' ? 'Active Bidding' : 'เปิดรับข้อเสนอ'}</option>
                            <option value="upcoming">{lang === 'EN' ? 'Closing Soon' : 'ใกล้ครบกำหนด'}</option>
                            <option value="closed">{lang === 'EN' ? 'Closed' : 'ปิดรับแล้ว'}</option>
                        </select>
                    </div>
                </div>

                {/* Project Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="bg-white dark:bg-[#1C1A24] rounded-2xl p-12 border border-slate-200 dark:border-[#2D2938] text-center space-y-3">
                        <RiBookmark3Fill className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto" />
                        <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">
                            {lang === 'EN' ? 'No tracked projects found' : 'ไม่พบโครงการที่ติดตาม'}
                        </h3>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                            {lang === 'EN'
                                ? 'Try adjusting your search filter or bookmark projects from the TOR Directory.'
                                : 'ลองปรับเปลี่ยนคำค้นหา หรือกดบุ๊กมาร์กโครงการจากคลังเอกสาร TOR'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredProjects.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-[#1C1A24] rounded-2xl p-5 border border-slate-200 dark:border-[#2D2938] flex flex-col justify-between hover:border-[#5B3E96]/40 transition-all shadow-sm group"
                            >
                                <div>
                                    {/* Top Badge Row */}
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#2D2938] text-[10px] font-bold text-slate-600 dark:text-slate-300 font-mono">
                                            {item.id}
                                        </span>

                                        <div className="flex items-center gap-2">
                                            {item.status === 'active' && (
                                                <span className="badge badge-success badge-sm gap-1 text-[10px] text-white font-bold">
                                                    <RiCheckLine className="h-3 w-3" />
                                                    {lang === 'EN' ? 'Active' : 'เปิดรับ'}
                                                </span>
                                            )}
                                            {item.status === 'upcoming' && (
                                                <span className="badge badge-warning badge-sm gap-1 text-[10px] text-white font-bold">
                                                    <RiAlertLine className="h-3 w-3" />
                                                    {lang === 'EN' ? 'Closing Soon' : 'ใกล้ปิดรับ'}
                                                </span>
                                            )}
                                            {item.status === 'closed' && (
                                                <span className="badge badge-ghost badge-sm text-[10px] font-bold">
                                                    {lang === 'EN' ? 'Closed' : 'ปิดรับแล้ว'}
                                                </span>
                                            )}

                                            <button
                                                onClick={() => handleUntrack(item.id)}
                                                className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                                                title={lang === 'EN' ? 'Remove from tracked' : 'ลบออกจากรายการติดตาม'}
                                            >
                                                <RiDeleteBinLine className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#5B3E96] dark:group-hover:text-[#9B82C1] transition-colors line-clamp-2">
                                        {lang === 'EN' ? item.title : item.titleTh}
                                    </h3>

                                    {/* Metadata */}
                                    <div className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <RiBuilding4Line className="h-4 w-4 text-slate-400 shrink-0" />
                                            <span className="truncate">{item.agency}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <RiCoinsLine className="h-4 w-4 text-slate-400 shrink-0" />
                                            <span className="font-semibold text-slate-800 dark:text-slate-200">{item.budget}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <RiCalendarEventLine className="h-4 w-4 text-slate-400 shrink-0" />
                                            <span>
                                                {lang === 'EN' ? 'Deadline: ' : 'วันสิ้นสุดเสนอราคา: '}
                                                <strong className="text-slate-700 dark:text-slate-300 font-mono">{item.submissionDeadline}</strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Link & Saved Info */}
                                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#2D2938] flex items-center justify-between text-[11px] text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <RiTimeLine className="h-3.5 w-3.5" />
                                        {lang === 'EN' ? `Tracked on ${item.trackedDate}` : `บันทึกเมื่อ ${item.trackedDate}`}
                                    </span>

                                    <Link
                                        href={`/tor/${item.id}`}
                                        className="inline-flex items-center gap-1 text-[#5B3E96] dark:text-[#9B82C1] font-bold hover:underline"
                                    >
                                        <span>{lang === 'EN' ? 'View TOR Details' : 'ดูรายละเอียด TOR'}</span>
                                        <RiExternalLinkLine className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}