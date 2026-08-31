'use client';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  const handleClear = () => onChange('');

  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 pr-10 rounded-xl bg-white dark:bg-tormax-surfaceDark border border-slate-200 dark:border-tormax-borderDark text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-tormax-purple shadow-2xs"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold cursor-pointer"
        >
          ✕
        </button>
      )}
    </div>
  );
}