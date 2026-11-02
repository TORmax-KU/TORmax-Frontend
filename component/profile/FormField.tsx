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
    <div className="space-y-2">
      <label htmlFor={id} className="font-bold block text-slate-700 dark:text-slate-300">
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
        className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-[#090D16] border ${error ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-tormax-borderDark'} font-semibold text-slate-900 dark:text-slate-100 caret-slate-900 dark:caret-white focus:outline-none focus:ring-2 focus:ring-tormax-purple ${className}`}
      />
      {error && <p id={`${id}-error`} className="text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
