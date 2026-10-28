'use client';

import { RiBookmarkFill, RiBookmarkLine } from '@remixicon/react';
import { useBookmarks } from '@/lib/bookmarks';

export function BookmarkButton({ id, lang }: { id: string; lang: 'th' | 'en' }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(id);
  const label = saved
    ? (lang === 'th' ? 'นำออกจากบุ๊กมาร์ก' : 'Remove bookmark')
    : (lang === 'th' ? 'บุ๊กมาร์กโครงการนี้' : 'Bookmark this project');

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(id)}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
        saved
          ? 'text-tormax-purple dark:text-tormax-lavender bg-tormax-purple/10'
          : 'text-slate-400 hover:text-tormax-purple dark:hover:text-tormax-lavender hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      {saved ? <RiBookmarkFill size={18} /> : <RiBookmarkLine size={18} />}
    </button>
  );
}
