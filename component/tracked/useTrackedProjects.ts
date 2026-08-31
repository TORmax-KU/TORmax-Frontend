'use client';

import { useState } from 'react';
import { TrackedProject } from '@/interface/TrackProject';
import { MOCK_TRACKED } from '@/utils/mockData';

export function useTrackedProjects() {
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

  return {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    projects,
    filteredProjects,
    handleUntrack,
  };
}