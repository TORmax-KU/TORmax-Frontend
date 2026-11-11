'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RiArrowRightLine, RiBookmarkLine, RiDeleteBinLine, RiSearchLine } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { useBookmarks } from '@/lib/bookmarks';
import { availabilityLabel, Project, projectCard } from '@/lib/projects';
import { TORCard } from '@/component/searchfeed/TORCard';
import { TORCardSkeleton } from '@/component/TORCardSkeleton';
import { PageHeader } from '@/component/PageHeader';
import { ProjectLoadedState as Loaded } from '@/interface/ProjectLoadedState';
import fetchBookmarks from '@/utils/fetchBookmarks';

export default function BookmarksPage() {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';
  const { ids, loading, savedToAccount, removeBookmark } = useBookmarks();
  const [loaded, setLoaded] = useState<Record<string, Loaded>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const t = { source: th ? 'ที่มา' : 'Source', method: th ? 'วิธี' : 'Method', deadline: th ? 'ปิดรับ' : 'Closes', openSpec: th ? 'ดูรายละเอียด' : 'View details' };

  // Only fetch bookmarks that have not been loaded yet, so removing one does not reload the list.
  const pending = ids.filter(id => !(id in loaded));
  const pendingKey = pending.join(',');
  useEffect(() => {
    if (!pendingKey) return;
    let active = true;
    void fetchBookmarks(pendingKey.split(',')).then(entries => {
      if (active) setLoaded(prev => ({ ...prev, ...entries }));
    });
    return () => { active = false; };
  }, [pendingKey]);

  const retryFailed = () => setLoaded(prev => Object.fromEntries(Object.entries(prev).filter(([, value]) => value !== 'error')));
  const projects = ids.map(id => loaded[id]).filter((value): value is Project => typeof value === 'object');
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
  const filteredProjects = projects.filter(project => [
    project.title,
    project.agency,
    project._id,
    project.externalId,
    project.source,
    project.descriptions,
  ].some(value => value?.toLocaleLowerCase().includes(normalizedQuery)) && (
    statusFilter === 'all' || (project.availability || 'unverified') === statusFilter
  ));
  const missing = ids.filter(id => loaded[id] === 'missing');
  const failed = ids.some(id => loaded[id] === 'error');

  return (
    <main className="ui-page">
      <div className="space-y-6">
        <PageHeader
          title={th ? 'บุ๊กมาร์ก' : 'Bookmarks'}
          description={savedToAccount
            ? (th ? 'โครงการที่บันทึกไว้ในบัญชีของคุณ' : 'Projects saved to your account.')
            : (th ? 'บันทึกไว้ในเบราว์เซอร์นี้ เข้าสู่ระบบเพื่อใช้บุ๊กมาร์กได้ทุกอุปกรณ์' : 'Saved in this browser. Sign in to keep bookmarks across devices.')}
          actions={
            <Link href="/search-feed" className="ui-link group text-sm">
              {th ? 'ค้นหางานทั้งหมด' : 'Search opportunities'}<RiArrowRightLine size={16} className="transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          }
          className="pb-2"
        />

        {loading ? (
          <TORCardSkeleton count={3} label={th ? 'กำลังโหลด…' : 'Loading…'} className="space-y-3" />
        ) : ids.length === 0 ? (
          <div className="ui-empty py-16">
            <div className="ui-empty-icon"><RiBookmarkLine className="h-5 w-5" /></div>
            <h2 className="font-medium text-ink">{th ? 'ยังไม่มีบุ๊กมาร์ก' : 'No bookmarks yet'}</h2>
            <p className="text-sm text-ink-3 max-w-sm mx-auto">
              {th ? 'กดไอคอนบุ๊กมาร์กที่มุมขวาบนของการ์ด TOR เพื่อบันทึกโครงการไว้ที่นี่' : 'Tap the bookmark icon on the top right of any TOR card to save it here.'}
            </p>
          </div>
        ) : (
          <>
            {failed && (
              <div role="alert" className="ui-alert ui-alert-warn items-center justify-between">
                <span>{th ? 'โหลดบุ๊กมาร์กบางรายการไม่สำเร็จ' : 'Some bookmarks could not be loaded.'}</span>
                <button type="button" className="ui-btn ui-btn-ghost ui-btn-sm text-warn hover:text-warn" onClick={retryFailed}>{th ? 'ลองอีกครั้ง' : 'Retry'}</button>
              </div>
            )}
            {missing.map(id => (
              <div key={id} className="ui-card flex flex-wrap items-center justify-between gap-3 border-dashed px-4 py-3 text-sm">
                <span className="text-ink-3">{th ? 'โครงการนี้ถูกนำออกจากคลังแล้ว' : 'This project is no longer in the directory.'} <span className="font-mono text-xs text-ink-4">{id}</span></span>
                <button type="button" onClick={() => removeBookmark(id)} className="ui-btn ui-btn-danger-ghost ui-btn-sm">
                  <RiDeleteBinLine size={14} />{th ? 'นำออก' : 'Remove'}
                </button>
              </div>
            ))}
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
              <div className="relative">
                <RiSearchLine className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-4" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={event => setSearchQuery(event.target.value)}
                  placeholder={th ? 'ค้นหาบุ๊กมาร์กตามชื่อ หน่วยงาน หรือรหัส…' : 'Search bookmarks by title, agency, or ID…'}
                  aria-label={th ? 'ค้นหาบุ๊กมาร์ก' : 'Search bookmarks'}
                  className="ui-field pl-10"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <span className="sr-only">{th ? 'กรองตามสถานะ' : 'Filter by status'}</span>
                <select
                  value={statusFilter}
                  onChange={event => setStatusFilter(event.target.value)}
                  aria-label={th ? 'กรองตามสถานะ' : 'Filter by status'}
                  className="ui-field min-w-48"
                >
                  <option value="all">{th ? 'ทุกสถานะ' : 'All statuses'}</option>
                  {['open', 'draft', 'closed', 'awarded', 'cancelled', 'unverified'].map(status => (
                    <option key={status} value={status}>{availabilityLabel(status, activeLang)}</option>
                  ))}
                </select>
              </label>
            </div>
            {filteredProjects.length > 0 ? (
              <div className="space-y-3">
                {filteredProjects.map(project => <TORCard key={project._id} item={projectCard(project, activeLang)} t={t} />)}
              </div>
            ) : projects.length > 0 && (
              <div className="ui-empty">
                <p className="text-sm text-ink-3">{th ? 'ไม่พบบุ๊กมาร์กที่ตรงกัน' : 'No bookmarks match your search.'}</p>
              </div>
            )}
            {pending.length > 0 && <TORCardSkeleton count={Math.min(pending.length, 3)} label={th ? 'กำลังโหลด…' : 'Loading…'} className="space-y-3" />}
          </>
        )}
      </div>
    </main>
  );
}
