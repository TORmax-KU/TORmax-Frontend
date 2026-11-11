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
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`ui-field ${className}`}
      />
      {error && <p id={`${id}-error`} className="ui-error-text">{error}</p>}
    </div>
  );
}
