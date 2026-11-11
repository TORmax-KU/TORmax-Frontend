import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

// The standard page heading: optional eyebrow, title, supporting text and actions on the right.
export function PageHeader({ title, eyebrow, description, actions, className = '' }: PageHeaderProps) {
  return (
    <header className={`ui-page-header ${className}`}>
      <div className="min-w-0 space-y-2">
        {eyebrow && <div className="ui-eyebrow">{eyebrow}</div>}
        <h1 className="ui-title">{title}</h1>
        {description && <p className="ui-lede">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}
