'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RiArrowRightLine, RiBookmarkLine, RiDeleteBinLine } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { API_BASE_URL } from '@/lib/auth';
import { useBookmarks } from '@/lib/bookmarks';
import { Project, projectCard } from '@/lib/projects';
import { TORCard } from '@/component/searchfeed/TORCard';
import { TORCardSkeleton } from '@/component/TORCardSkeleton';

type Loaded = Project | 'missing' | 'error';

export default function BookmarksPage() {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';
  const { ids, loading, savedToAccount, removeBookmark } = useBookmarks();
  const [loaded, setLoaded] = useState<Record<string, Loaded>>({});
  const t = { source: th ? 'ที่มา' : 'Source', method: th ? 'วิธี' : 'Method', deadline: th ? 'ปิดรับ' : 'Closes', openSpec: th ? 'ดูรายละเอียด' : 'View details' };

  // Only fetch bookmarks that have not been loaded yet, so removing one does not reload the list.
  const pending = ids.filter(id => !(id in loaded));
  const pendingKey = pending.join(',');
  useEffect(() => {
    if (!pendingKey) return;
    const controller = new AbortController();
    async function load(id: string): Promise<[string, Loaded]> {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects/${encodeURIComponent(id)}`, { signal: controller.signal });
        if (response.status === 404) return [id, 'missing'];
        if (!response.ok) return [id, 'error'];
        return [id, await response.json()];
      } catch { return [id, 'error']; }
    }
    void Promise.all(pendingKey.split(',').map(load)).then(entries => {
      if (!controller.signal.aborted) setLoaded(prev => ({ ...prev, ...Object.fromEntries(entries) }));
    });
    return () => controller.abort();
  }, [pendingKey]);

  const retryFailed = () => setLoaded(prev => Object.fromEntries(Object.entries(prev).filter(([, value]) => value !== 'error')));
  const projects = ids.map(id => loaded[id]).filter((value): value is Project => typeof value === 'object');
  const missing = ids.filter(id => loaded[id] === 'missing');
  const failed = ids.some(id => loaded[id] === 'error');

  return (
    <main className="max-w-6xl mx-auto px-6 sm:px-8 py-10 w-full">
      <div className="space-y-6">
        <div className="border-b border-slate-200 dark:border-tormax-borderDark pb-4 flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <RiBookmarkLine className="h-7 w-7 text-tormax-purple dark:text-tormax-lavender" />
              {th ? 'บุ๊กมาร์ก' : 'Bookmarks'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {savedToAccount
                ? (th ? 'โครงการที่บันทึกไว้ในบัญชีของคุณ' : 'Projects saved to your account.')
                : (th ? 'บันทึกไว้ในเบราว์เซอร์นี้ เข้าสู่ระบบเพื่อใช้บุ๊กมาร์กได้ทุกอุปกรณ์' : 'Saved in this browser. Sign in to keep bookmarks across devices.')}
            </p>
          </div>
          <Link href="/search-feed" className="inline-flex items-center gap-1 text-sm font-bold text-tormax-purple dark:text-tormax-lavender">
            {th ? 'ค้นหางานทั้งหมด' : 'Search opportunities'}<RiArrowRightLine size={16} />
          </Link>
        </div>

        {loading ? (
          <TORCardSkeleton count={3} label={th ? 'กำลังโหลด…' : 'Loading…'} className="space-y-4" />
        ) : ids.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center space-y-2">
            <RiBookmarkLine className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <h2 className="font-semibold">{th ? 'ยังไม่มีบุ๊กมาร์ก' : 'No bookmarks yet'}</h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              {th ? 'กดไอคอนบุ๊กมาร์กที่มุมขวาบนของการ์ด TOR เพื่อบันทึกโครงการไว้ที่นี่' : 'Tap the bookmark icon on the top right of any TOR card to save it here.'}
            </p>
          </div>
        ) : (
          <>
            {failed && (
              <div role="alert" className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm flex items-center justify-between gap-3">
                <span>{th ? 'โหลดบุ๊กมาร์กบางรายการไม่สำเร็จ' : 'Some bookmarks could not be loaded.'}</span>
                <button type="button" className="underline font-semibold" onClick={retryFailed}>{th ? 'ลองอีกครั้ง' : 'Retry'}</button>
              </div>
            )}
            {missing.map(id => (
              <div key={id} className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-4 text-sm flex items-center justify-between gap-3">
                <span className="text-slate-500">{th ? 'โครงการนี้ถูกนำออกจากคลังแล้ว' : 'This project is no longer in the directory.'} <span className="font-mono text-xs">{id}</span></span>
                <button type="button" onClick={() => removeBookmark(id)} className="inline-flex items-center gap-1 text-rose-500 font-semibold hover:underline">
                  <RiDeleteBinLine size={14} />{th ? 'นำออก' : 'Remove'}
                </button>
              </div>
            ))}
            <div className="space-y-4">
              {projects.map(project => <TORCard key={project._id} item={projectCard(project, activeLang)} t={t} />)}
            </div>
            {pending.length > 0 && <TORCardSkeleton count={Math.min(pending.length, 3)} label={th ? 'กำลังโหลด…' : 'Loading…'} className="space-y-4" />}
          </>
        )}
      </div>
    </main>
  );
}
