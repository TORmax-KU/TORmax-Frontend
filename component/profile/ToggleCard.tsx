'use client';

interface ToggleCardProps {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ToggleCard({ 
  id, 
  title, 
  description, 
  checked, 
  onChange 
}: ToggleCardProps) {
  return (
    <label className="p-4 rounded-2xl border border-slate-200 dark:border-tormax-borderDark flex items-center justify-between cursor-pointer bg-slate-50 dark:bg-tormax-canvasDark hover:border-tormax-purple transition-colors">
      <div>
        <div className="font-bold text-slate-900 dark:text-slate-100">{title}</div>
        <div className="text-[11px] text-slate-500">{description}</div>
      </div>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-tormax-purple cursor-pointer"
      />
    </label>
  );
}