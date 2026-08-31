'use client';

import { useApp } from '@/context/AppContext';
import { TrackedHeader } from '@/component/tracked/TrackedHeader';
import { TrackedSearchFilters } from '../../component/tracked/TrackedSearchFilters';
import { useTrackedProjects } from '../../component/tracked/useTrackedProjects';
import { EmptyState } from '../../component/tracked/EmptyState';
import { TrackedProjectGrid } from '../../component/tracked/TrackedProjectGrid';

export default function TrackedProjectsPage() {
    const { lang } = useApp();

    const {
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        filteredProjects,
        handleUntrack,
    } = useTrackedProjects();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#121118] text-slate-900 dark:text-slate-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <TrackedHeader
                    lang={lang}
                    browseText={lang === 'EN' ? 'Browse Directory' : 'ค้นหาเอกสาร TOR'}
                />

                <TrackedSearchFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    filterStatus={filterStatus}
                    onFilterChange={setFilterStatus}
                    lang={lang}
                    searchPlaceholder={
                        lang === 'EN'
                            ? 'Search by title, agency, or ID...'
                            : 'ค้นหาด้วยชื่อโครงการ, หน่วยงาน หรือ รหัส...'
                    }
                />

                {filteredProjects.length === 0 ? (
                    <EmptyState lang={lang} />
                ) : (
                    <TrackedProjectGrid
                        projects={filteredProjects}
                        lang={lang}
                        onUntrack={handleUntrack}
                    />
                )}
            </div>
        </div>
    );
}