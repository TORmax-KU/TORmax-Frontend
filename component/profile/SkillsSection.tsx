'use client';

import { useState } from 'react';
import { RiAddLine, RiCheckLine, RiCloseLine } from '@remixicon/react';

const SUGGESTED_SKILLS = [
  'Python',
  'C',
  'C++',
  'C#',
  'Assembly',
  'Java',
  'JavaScript',
  'TypeScript',
  'Go',
  'Rust',
  'PHP',
  'Ruby',
  'Kotlin',
  'Swift',
  'Dart',
  'R',
  'MATLAB',
  'Bash',
  'PowerShell',
  'React',
  'Node.js',
  'Docker',
  'Kubernetes',
  'Linux',
  'Windows',
  'AWS',
  'Azure',
  'MongoDB',
  'SQL',
  'Git',
];

const MAX_SKILLS = 30;

interface SkillsSectionProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  t: {
    skillsTitle: string;
    skillsDesc: string;
    selectedSkills: string;
    suggestedSkills: string;
    customSkill: string;
    customSkillPlaceholder: string;
    addSkill: string;
    removeSkill: string;
    skillsLimit: string;
  };
}

const normalizeSkill = (value: string) => value.trim().replace(/\s+/g, ' ');

export function SkillsSection({ skills, onChange, t }: SkillsSectionProps) {
  const [customSkill, setCustomSkill] = useState('');

  const hasSkill = (name: string) =>
    skills.some((skill) => skill.toLocaleLowerCase() === name.toLocaleLowerCase());

  const addSkill = (value: string) => {
    const name = normalizeSkill(value);
    if (!name || name.length > 60 || hasSkill(name) || skills.length >= MAX_SKILLS) return;

    onChange([...skills, name]);
    setCustomSkill('');
  };

  const removeSkill = (name: string) => {
    onChange(skills.filter((skill) => skill.toLocaleLowerCase() !== name.toLocaleLowerCase()));
  };

  const toggleSuggestedSkill = (name: string) => {
    if (hasSkill(name)) {
      removeSkill(name);
    } else {
      addSkill(name);
    }
  };

  return (
    <section className="bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark p-8 rounded-3xl space-y-6 shadow-sm">
      <div className="border-b border-slate-100 dark:border-tormax-borderDark pb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
            {t.skillsTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t.skillsDesc}</p>
        </div>
        <span className="shrink-0 self-start rounded-full bg-violet-50 dark:bg-violet-400/10 px-2.5 py-1 text-[11px] font-bold text-tormax-purple dark:text-tormax-lavender">
          {skills.length}/{MAX_SKILLS}
        </span>
      </div>

      {skills.length > 0 && (
        <div className="space-y-2.5">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.selectedSkills}</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.toLocaleLowerCase()}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#5B3E96] py-1.5 pl-3 pr-1.5 text-xs font-semibold text-white shadow-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  aria-label={`${t.removeSkill}: ${skill}`}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-violet-100 hover:bg-white/20 hover:text-white transition-colors"
                >
                  <RiCloseLine className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2.5">
        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.suggestedSkills}</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.map((skill) => {
            const selected = hasSkill(skill);
            return (
              <button
                key={skill}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleSuggestedSkill(skill)}
                disabled={!selected && skills.length >= MAX_SKILLS}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                  selected
                    ? 'border-violet-300 bg-violet-50 text-[#5B3E96] dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-200'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-violet-300 hover:bg-violet-50 hover:text-[#5B3E96] dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:border-violet-400/30 dark:hover:bg-violet-400/10'
                }`}
              >
                {selected ? <RiCheckLine className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2.5">
        <label htmlFor="customSkill" className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {t.customSkill}
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="customSkill"
            type="text"
            value={customSkill}
            maxLength={60}
            onChange={(event) => setCustomSkill(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                addSkill(customSkill);
              }
            }}
            placeholder={t.customSkillPlaceholder}
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/15 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100"
          />
          <button
            type="button"
            onClick={() => addSkill(customSkill)}
            disabled={!normalizeSkill(customSkill) || hasSkill(normalizeSkill(customSkill)) || skills.length >= MAX_SKILLS}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#5B3E96] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#4A2D7D] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RiAddLine className="h-4 w-4" aria-hidden="true" />
            {t.addSkill}
          </button>
        </div>
        <p className="text-[11px] text-slate-400">{t.skillsLimit}</p>
      </div>
    </section>
  );
}
