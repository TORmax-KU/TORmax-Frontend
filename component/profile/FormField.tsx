'use client';

interface FormFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}

export function FormField({ 
  id, 
  label, 
  value, 
  onChange, 
  type = 'text',
  className = ''
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
        className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-tormax-canvasDark border border-slate-200 dark:border-tormax-borderDark font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tormax-purple ${className}`}
      />
    </div>
  );
}