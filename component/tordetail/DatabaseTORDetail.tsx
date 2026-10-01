'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { API_BASE_URL } from '@/lib/auth';
import { Project, projectCard } from '@/lib/projects';
import { torpagei18n } from '@/public/mockData/i18n/torpage';
import { TORHeader } from './TORHeader';
import { ProjectSummary } from './ProjectSummary';
import { SkillsTags } from './SkillsTags';

export function DatabaseTORDetail({ id }: { id: string }) {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';
  const t = torpagei18n[activeLang];
  const [retry, setRetry] = useState(0);
  const [result, setResult] = useState<{ key: string; project?: Project; error?: number }>();
  const key = `${id}:${retry}`;
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects/${encodeURIComponent(id)}`, { signal: controller.signal });
        if (!response.ok) { if (!controller.signal.aborted) setResult({ key, error: response.status }); return; }
        const project: Project = await response.json();
        if (!controller.signal.aborted) setResult({ key, project });
      } catch { if (!controller.signal.aborted) setResult({ key, error: 500 }); }
    }
    void load();
    return () => controller.abort();
  }, [id, key]);
  if (result?.key !== key) return <p role="status" className="p-10 text-center">{th ? 'กำลังโหลด TOR...' : 'Loading TOR...'}</p>;
  if (!result.project) return <div role="alert" className="p-10 text-center space-y-4"><p>{result.error === 404 ? t.notFound : th ? 'โหลด TOR ไม่สำเร็จ' : 'Could not load TOR.'}</p><button className="underline mr-4" onClick={() => setRetry(value => value + 1)}>{th ? 'ลองอีกครั้ง' : 'Retry'}</button><Link className="underline" href="/search-feed">{t.backToDirectory}</Link></div>;
  const project = result.project;
  const tor = projectCard(project, activeLang);
  const sourceUrl = project.sourceUrl && /^https?:\/\//i.test(project.sourceUrl) ? project.sourceUrl : null;
  return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
    <TORHeader {...tor} id={tor.displayId} backToDirectory={t.backToDirectory} />
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-6">
      <ProjectSummary desc={tor.desc} method={tor.method} deadline={tor.deadline} t={t} />
      {tor.tags.length > 0 ? <SkillsTags tags={tor.tags} t={t} /> : <p className="text-sm text-slate-500">{project.aiAnalysis?.noMandatorySkillsReason || (th ? 'ยังไม่มีข้อมูลทักษะที่จำเป็น' : 'No required skills available yet.')}</p>}
      {sourceUrl && <a className="inline-block px-5 py-3 bg-tormax-purple text-white rounded-xl" href={sourceUrl} target="_blank" rel="noopener noreferrer">{th ? 'เปิดประกาศ TOR ต้นฉบับ ↗' : 'Open original TOR announcement ↗'}</a>}
    </main>
  </div>;
}
