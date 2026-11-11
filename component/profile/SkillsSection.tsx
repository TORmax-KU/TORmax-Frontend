'use client';

import { useState } from 'react';
import { RiAddLine, RiCheckLine, RiCloseLine } from '@remixicon/react';
import { FormSection } from './FormSection';

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
    <FormSection
      title={t.skillsTitle}
      description={t.skillsDesc}
      aside={
        <span className="ui-badge ui-badge-brand shrink-0 self-start tabular-nums">
          {skills.length}/{MAX_SKILLS}
        </span>
      }
    >
      {skills.length > 0 && (
        <div className="space-y-2.5">
          <p className="ui-label">{t.selectedSkills}</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill.toLocaleLowerCase()}
                className="ui-reveal inline-flex h-8 items-center gap-1 rounded-full bg-brand pl-3 pr-1 text-[13px] font-medium text-on-brand"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  aria-label={`${t.removeSkill}: ${skill}`}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white/75 hover:bg-white/15 hover:text-white transition-colors"
                >
                  <RiCloseLine className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2.5">
        <p className="ui-label">{t.suggestedSkills}</p>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_SKILLS.map((skill) => {
            const selected = hasSkill(skill);
            return (
              <button
                key={skill}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleSuggestedSkill(skill)}
                disabled={!selected && skills.length >= MAX_SKILLS}
                className={`inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border px-3 text-[13px] font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${
                  selected
                    ? 'border-brand-soft/60 bg-brand-tint text-accent'
                    : 'border-line bg-surface text-ink-2 hover:border-line-strong hover:bg-surface-2 hover:text-ink'
                }`}
              >
                {selected ? <RiCheckLine className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="customSkill" className="ui-label">
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
            className="ui-field min-w-0 flex-1"
          />
          <button
            type="button"
            onClick={() => addSkill(customSkill)}
            disabled={!normalizeSkill(customSkill) || hasSkill(normalizeSkill(customSkill)) || skills.length >= MAX_SKILLS}
            className="ui-btn ui-btn-primary"
          >
            <RiAddLine className="h-4 w-4" aria-hidden="true" />
            {t.addSkill}
          </button>
        </div>
        <p className="ui-hint">{t.skillsLimit}</p>
      </div>
    </FormSection>
  );
}
