'use client';

import { TrackedProject } from '@/interface/TrackProject';
import { TrackedProjectCard } from './TrackedProjectCard';

interface TrackedProjectGridProps {
  projects: TrackedProject[];
  lang: string;
  onUntrack: (id: string) => void;
}

export function TrackedProjectGrid({ projects, lang, onUntrack }: TrackedProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <TrackedProjectCard
          key={project.id}
          project={project}
          lang={lang}
          onUntrack={onUntrack}
        />
      ))}
    </div>
  );
}