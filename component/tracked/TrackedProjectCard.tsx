'use client';

import Link from 'next/link';
import {
  RiBuilding4Line,
  RiCoinsLine,
  RiCalendarEventLine,
  RiTimeLine,
  RiExternalLinkLine,
  RiDeleteBinLine,
} from '@remixicon/react';
import { TrackedProject } from '@/interface/TrackProject';
import { StatusBadge } from './StatusBadge';

interface TrackedProjectCardProps {
  project: TrackedProject;
  lang: string;
  onUntrack: (id: string) => void;
}

export function TrackedProjectCard({ project, lang, onUntrack }: TrackedProjectCardProps) {
  return (
    <div className="bg-white dark:bg-[#1C1A24] rounded-2xl p-5 border border-slate-200 dark:border-[#2D2938] flex flex-col justify-between hover:border-[#5B3E96]/40 transition-all shadow-sm group">
      <div>
        {/* Top Badge Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#2D2938] text-[10px] font-bold text-slate-600 dark:text-slate-300 font-mono">
            {project.id}
          </span>

          <div className="flex items-center gap-2">
            <StatusBadge status={project.status} lang={lang} />

            <button
              onClick={() => onUntrack(project.id)}
              className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
              title={lang === 'EN' ? 'Remove from tracked' : 'ลบออกจากรายการติดตาม'}
            >
              <RiDeleteBinLine className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#5B3E96] dark:group-hover:text-[#9B82C1] transition-colors line-clamp-2">
          {lang === 'EN' ? project.title : project.titleTh}
        </h3>

        {/* Metadata */}
        <div className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <RiBuilding4Line className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="truncate">{project.agency}</span>
          </div>

          <div className="flex items-center gap-2">
            <RiCoinsLine className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">{project.budget}</span>
          </div>

          <div className="flex items-center gap-2">
            <RiCalendarEventLine className="h-4 w-4 text-slate-400 shrink-0" />
            <span>
              {lang === 'EN' ? 'Deadline: ' : 'วันสิ้นสุดเสนอราคา: '}
              <strong className="text-slate-700 dark:text-slate-300 font-mono">{project.submissionDeadline}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Footer Link & Saved Info */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#2D2938] flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <RiTimeLine className="h-3.5 w-3.5" />
          {lang === 'EN' ? `Tracked on ${project.trackedDate}` : `บันทึกเมื่อ ${project.trackedDate}`}
        </span>

        <Link
          href={`/tor/${project.id}`}
          className="inline-flex items-center gap-1 text-[#5B3E96] dark:text-[#9B82C1] font-bold hover:underline"
        >
          <span>{lang === 'EN' ? 'View TOR Details' : 'ดูรายละเอียด TOR'}</span>
          <RiExternalLinkLine className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}