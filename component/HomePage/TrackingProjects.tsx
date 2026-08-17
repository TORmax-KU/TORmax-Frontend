'use client';

import Link from "next/link";
import { useState, useMemo } from "react";
import {
    RiArrowRightLine,
    RiSearchLine,
    RiFilter3Line,
    RiTimeLine,
    RiCheckLine,
    RiCloseLine,
    RiQuestionLine
} from "@remixicon/react";
import { mockTrackingProjects, TrackingProject } from "@/public/mockData/mockProjects";

const ITEMS_PER_PAGE = 3;

export default function TrackingProjects() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState(1);

    const getStatusBadge = (status: TrackingProject['status']) => {
        const config = {
            'Approved': { color: 'badge-success', icon: <RiCheckLine className="h-3 w-3" /> },
            'Applied': { color: 'badge-warning', icon: <RiTimeLine className="h-3 w-3" /> },
            'Rejected': { color: 'badge-error', icon: <RiCloseLine className="h-3 w-3" /> },
            'Unavailable': { color: 'badge-ghost', icon: <RiQuestionLine className="h-3 w-3" /> },
        };
        return config[status] || config['Unavailable'];
    };

    // Filter projects
    const filteredProjects = useMemo(() => {
        return mockTrackingProjects.filter(project => {
            const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.trackingId.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus === 'All' || project.status === filterStatus;
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, filterStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProjects = filteredProjects.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [searchTerm, filterStatus]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const statusCounts = mockTrackingProjects.reduce((acc, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Generate page numbers
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-base-content flex items-center gap-3">
                        📋 Tracked Projects
                        <span className="text-sm font-normal text-base-content/50 bg-base-200 px-3 py-1 rounded-full">
                            {mockTrackingProjects.length} total
                        </span>
                    </h1>
                    <p className="text-sm text-base-content/60 mt-1">
                        Monitor and manage your tracked TOR projects
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-primary btn-sm gap-2">
                        <RiArrowRightLine className="h-4 w-4" />
                        New Project
                    </button>
                    <button className="btn btn-ghost btn-sm gap-2">
                        <RiFilter3Line className="h-4 w-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="stat bg-base-100 shadow-lg rounded-box p-4">
                    <div className="stat-figure text-success">
                        <RiCheckLine className="h-6 w-6" />
                    </div>
                    <div className="stat-title text-xs">Approved</div>
                    <div className="stat-value text-success text-2xl">{statusCounts['Approved'] || 0}</div>
                </div>
                <div className="stat bg-base-100 shadow-lg rounded-box p-4">
                    <div className="stat-figure text-warning">
                        <RiTimeLine className="h-6 w-6" />
                    </div>
                    <div className="stat-title text-xs">Applied</div>
                    <div className="stat-value text-warning text-2xl">{statusCounts['Applied'] || 0}</div>
                </div>
                <div className="stat bg-base-100 shadow-lg rounded-box p-4">
                    <div className="stat-figure text-error">
                        <RiCloseLine className="h-6 w-6" />
                    </div>
                    <div className="stat-title text-xs">Rejected</div>
                    <div className="stat-value text-error text-2xl">{statusCounts['Rejected'] || 0}</div>
                </div>
                <div className="stat bg-base-100 shadow-lg rounded-box p-4">
                    <div className="stat-figure text-base-content/40">
                        <RiQuestionLine className="h-6 w-6" />
                    </div>
                    <div className="stat-title text-xs">Unavailable</div>
                    <div className="stat-value text-base-content/40 text-2xl">{statusCounts['Unavailable'] || 0}</div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
                    <input
                        type="text"
                        placeholder="Search projects by name or ID..."
                        className="input input-bordered w-full pl-10"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <select
                    className="select select-bordered w-full sm:w-48"
                    value={filterStatus}
                    onChange={(e) => {
                        setFilterStatus(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="All">All Status</option>
                    <option value="Approved">✅ Approved</option>
                    <option value="Applied">⏳ Applied</option>
                    <option value="Rejected">❌ Rejected</option>
                    <option value="Unavailable">❓ Unavailable</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-base-100 shadow-lg rounded-box overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="bg-base-200/50">
                                <th className="text-xs uppercase tracking-wider">Project</th>
                                <th className="text-xs uppercase tracking-wider hidden md:table-cell">ID</th>
                                <th className="text-xs uppercase tracking-wider hidden lg:table-cell">Category</th>
                                <th className="text-xs uppercase tracking-wider">Status</th>
                                <th className="text-xs uppercase tracking-wider hidden sm:table-cell">Date</th>
                                <th className="text-xs uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProjects.length > 0 ? (
                                currentProjects.map((project) => {
                                    const badge = getStatusBadge(project.status);
                                    return (
                                        <tr key={project.id} className="hover:bg-base-200/50 transition-colors">
                                            <td>
                                                <Link
                                                    href={`/tor-page/${project.id}`}
                                                    className="font-medium hover:text-primary transition-colors flex items-center gap-2 group"
                                                >
                                                    {project.name}
                                                    <RiArrowRightLine className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                                </Link>
                                            </td>
                                            <td className="hidden md:table-cell font-mono text-sm text-base-content/60">
                                                {project.trackingId}
                                            </td>
                                            <td className="hidden lg:table-cell">
                                                <span className="badge badge-ghost badge-sm">
                                                    {project.category}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${badge.color} gap-1.5 px-3 py-2`}>
                                                    {badge.icon}
                                                    {project.status}
                                                </span>
                                            </td>
                                            <td className="hidden sm:table-cell text-sm text-base-content/60">
                                                {project.date}
                                            </td>
                                            <td className="text-right">
                                                <Link
                                                    href={`/tor-page/${project.id}`}
                                                    className="btn btn-ghost btn-xs gap-1"
                                                >
                                                    View
                                                    <RiArrowRightLine className="h-3 w-3" />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-base-content/40">
                                        <div className="flex flex-col items-center gap-2">
                                            <RiSearchLine className="h-8 w-8" />
                                            <p>No projects found matching your criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer with Pagination */}
                <div className="px-6 py-3 border-t border-base-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-base-content/50">
                    <span>
                        Showing {filteredProjects.length > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
                    </span>
                    
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center gap-1">
                            {/* Previous Button */}
                            <button
                                className="btn btn-ghost btn-xs"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                ‹
                            </button>

                            {/* Page Numbers */}
                            {getPageNumbers().map((page, index) => (
                                typeof page === 'number' ? (
                                    <button
                                        key={index}
                                        className={`btn btn-xs ${currentPage === page ? 'btn-primary' : 'btn-ghost'}`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                ) : (
                                    <span key={index} className="px-1 text-base-content/30">
                                        {page}
                                    </span>
                                )
                            ))}

                            {/* Next Button */}
                            <button
                                className="btn btn-ghost btn-xs"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                ›
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}