'use client';

interface FormFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  readOnly?: boolean;
  hint?: string;
}

export function FormField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  className = '',
  min,
  max,
  step,
  error,
  readOnly = false,
  hint,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="ui-label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        readOnly={readOnly}
        aria-invalid={error ? true : undefined}
        aria-describedby={[error ? `${id}-error` : '', hint ? `${id}-hint` : ''].filter(Boolean).join(' ') || undefined}
        className={`ui-field ${className}`}
      />
      {error && <p id={`${id}-error`} className="ui-error-text">{error}</p>}
      {hint && <p id={`${id}-hint`} className="ui-hint">{hint}</p>}
    </div>
  );
}
