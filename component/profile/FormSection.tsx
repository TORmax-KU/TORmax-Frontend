import type { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  aside?: ReactNode;
  children: ReactNode;
}

// A titled group of form fields, used by the profile and posting forms.
export function FormSection({ title, description, aside, children }: FormSectionProps) {
  return (
    <section className="ui-section">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h2 className="ui-section-title">{title}</h2>
          {description && <p className="ui-hint text-[13px]">{description}</p>}
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}
