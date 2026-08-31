'use client';

interface SearchBadgeProps {
  query: string;
  resultCount: number;
  showingResultsPrefix: string;
  itemsFoundSuffix: string;
}

export function SearchBadge({ 
  query, 
  resultCount, 
  showingResultsPrefix, 
  itemsFoundSuffix 
}: SearchBadgeProps) {
  if (!query) return null;

  return (
    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
      {showingResultsPrefix}
      <span className="font-bold text-tormax-purple dark:text-tormax-lavender">"{query}"</span>
      <span> ({resultCount}{itemsFoundSuffix})</span>
    </div>
  );
}