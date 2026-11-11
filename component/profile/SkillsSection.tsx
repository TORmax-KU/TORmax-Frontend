'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL, BACKGROUND_HEADERS } from '@/lib/auth';
import { RiAddLine, RiCheckLine, RiCloseLine } from '@remixicon/react';
import { FormSection } from './FormSection';

interface SkillGroup { category: string; skills: string[] }

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
  const [groups, setGroups] = useState<SkillGroup[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE_URL}/api/skills/recommendations`, {
      signal: controller.signal, headers: BACKGROUND_HEADERS,
    }).then(async response => {
      if (!response.ok) throw new Error('Unable to load skills');
      const data: unknown = await response.json();
      if (!Array.isArray(data) || !data.every(group =>
        typeof group?.category === 'string' && Array.isArray(group.skills) &&
        group.skills.every((name: unknown) => typeof name === 'string'))) {
        throw new Error('Invalid skill recommendations');
      }
      if (!controller.signal.aborted) { setGroups(data); setLoadError(false); }
    }).catch(() => { if (!controller.signal.aborted) setLoadError(true); });
    return () => controller.abort();
  }, [retry]);

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
        {loadError && <p className="ui-hint" role="status">
          Unable to load suggestions. <button type="button" className="underline" onClick={() => setRetry(value => value + 1)}>Retry</button>
        </p>}
        {!loadError && groups.length === 0 && <p className="ui-hint" role="status">Loading suggestions...</p>}
        {groups.map(group => <fieldset key={group.category} className="space-y-2 rounded-xl border border-line p-3">
          <legend className="px-1 text-xs font-semibold text-ink-2">{group.category}</legend>
          <div className="flex flex-wrap gap-1.5">
          {group.skills.map((skill) => {
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
        </fieldset>)}
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
