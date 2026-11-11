'use client';

import { RiCloseLine, RiSearchLine } from '@remixicon/react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  const handleClear = () => onChange('');

  return (
    <div className="relative flex-1">
      <RiSearchLine size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-4" />
      <input
        type="text"
        aria-label={placeholder}
        maxLength={300}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="ui-field h-12 pl-11 pr-11 text-[15px] rounded-xl"
      />
      {value && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          className="ui-icon-btn absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
        >
          <RiCloseLine size={16} />
        </button>
      )}
    </div>
  );
}
