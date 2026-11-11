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
      className={`ui-icon-btn h-8 w-8 ${saved ? 'text-accent bg-brand-tint hover:bg-brand-tint hover:text-accent' : 'hover:text-accent'}`}
    >
      {saved ? <RiBookmarkFill size={17} /> : <RiBookmarkLine size={17} />}
    </button>
  );
}
