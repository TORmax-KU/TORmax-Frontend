'use client';

interface SkillsTagsProps {
  tags: string[];
  t: {
    requiredSkills: string;
  };
}

export function SkillsTags({ tags, t }: SkillsTagsProps) {
  return (
    <div className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-6 rounded-2xl space-y-3 shadow-sm">
      <h3 className="text-xs font-bold uppercase tracking-wider text-tormax-purple dark:text-tormax-lavender">
        {t.requiredSkills}
      </h3>
      <div className="flex flex-wrap gap-1.5 pt-1">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}