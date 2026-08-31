'use client';

interface SearchHeaderProps {
  title: string;
  subtitle: string;
  onFilterClick: () => void;
  filterBtnText: string;
}

export function SearchHeader({ 
  title, 
  subtitle, 
  onFilterClick, 
  filterBtnText 
}: SearchHeaderProps) {
  return (
    <div className="border-b border-slate-200 dark:border-tormax-borderDark pb-4 flex flex-col md:flex-row justify-between md:items-end gap-4">
      <div>
        <h1 className="text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight">
          {title}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
          {subtitle}
        </p>
      </div>
      <button
        onClick={onFilterClick}
        className="px-4 py-2.5 bg-tormax-purple text-white text-xs font-bold rounded-xl hover:bg-tormax-purpleDeep flex items-center space-x-2 shadow-sm active:scale-95 transition-all cursor-pointer"
      >
        <span>{filterBtnText}</span>
      </button>
    </div>
  );
}