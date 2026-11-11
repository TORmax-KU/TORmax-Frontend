'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { BudgetFit, getProjectMatch, ProjectMatch } from '@/lib/matches';
import { panel, sectionTitle } from '@/component/ui';

// UC1 step 5 / US8: how the signed-in vendor's skills and budget range fit this TOR.
export function MatchPanel({ projectId, lang }: { projectId: string; lang: 'th' | 'en' }) {
  const th = lang === 'th';
  const { user, isLoading } = useAuth();
  const userId = user?._id;
  const isVendor = user?.role === 'Vendor';
  // Refetch when the profile's matching inputs change, so edits show without a reload.
  const profileKey = user ? JSON.stringify([user.proficiency, user.matchThreshold, user.minBudget, user.maxBudget]) : '';
  const key = `${userId}:${projectId}:${profileKey}`;
  const [result, setResult] = useState<{ key: string; match?: ProjectMatch; error?: boolean }>();

  useEffect(() => {
    if (!userId || !isVendor) return;
    const controller = new AbortController();
    const requestKey = `${userId}:${projectId}:${profileKey}`;
    async function load() {
      try {
        const match = await getProjectMatch(projectId, controller.signal);
        if (!controller.signal.aborted) setResult({ key: requestKey, match });
      } catch {
        if (!controller.signal.aborted) setResult({ key: requestKey, error: true });
      }
    }
    void load();
    return () => controller.abort();
  }, [userId, isVendor, projectId, profileKey]);

  const title = <h2 className={sectionTitle}>{th ? 'ความตรงกับโปรไฟล์ของคุณ' : 'Your match'}</h2>;

  if (isLoading || (user && !isVendor)) return null;
  if (!user) return <section className={panel}>{title}
    <p className="text-sm text-ink-3">{th ? 'เข้าสู่ระบบเพื่อดูว่าทักษะของคุณตรงกับ TOR นี้แค่ไหน' : 'Sign in to see how your skills fit this TOR.'}</p>
    <Link href="/login" className="ui-btn ui-btn-secondary ui-btn-sm">{th ? 'เข้าสู่ระบบ' : 'Sign in'}</Link>
  </section>;
  if (result?.key !== key) return <section className={panel} aria-busy>{title}<p role="status" className="flex items-center gap-2 text-sm text-ink-3"><span className="ui-spinner h-3.5 w-3.5 text-brand-soft" aria-hidden />{th ? 'กำลังตรวจสอบ…' : 'Checking your match…'}</p></section>;
  if (!result.match) return <section className={panel}>{title}<p className="text-sm text-ink-3">{th ? 'ตรวจสอบความตรงกันไม่สำเร็จ' : 'Could not check your match.'}</p></section>;

  const match = result.match;
  const editProfile = <Link href="/profile" className="ui-link text-sm">{th ? 'แก้ไขทักษะและเกณฑ์' : 'Edit skills and criteria'}</Link>;

  if (match.matchPercentage === null) {
    const why = match.unmappedSkillNames.length
      ? (th ? `ทักษะบางรายการยังไม่อยู่ในระบบ: ${match.unmappedSkillNames.join(', ')}` : `Some required skills are not in our catalog yet: ${match.unmappedSkillNames.join(', ')}`)
      : (th ? 'คะแนนจะแสดงเมื่อ AI วิเคราะห์ TOR เสร็จและระบุทักษะที่ต้องใช้' : 'A score appears once AI has analyzed this TOR and listed its required skills.');
    return <section className={panel}>{title}<p className="text-sm font-medium text-ink">{th ? 'ยังคำนวณความตรงกันไม่ได้' : 'Match score not available yet'}</p><p className="text-sm text-ink-3">{why}</p></section>;
  }

  const percent = Math.round(match.matchPercentage);
  const budgetText: Record<BudgetFit, string> = th
    ? { within: 'งบประมาณอยู่ในช่วงที่คุณตั้งไว้', below: 'งบประมาณต่ำกว่าขั้นต่ำที่คุณตั้งไว้', above: 'งบประมาณสูงกว่าเพดานที่คุณตั้งไว้', unknown: 'TOR ไม่ระบุงบประมาณ' }
    : { within: 'Budget is within your range', below: 'Budget is below your minimum', above: 'Budget is above your maximum', unknown: 'This TOR does not state a budget' };
  const chips = (skills: { _id: string; name: string }[], tone: string) => <div className="flex flex-wrap gap-1.5">{skills.map(skill => <span key={skill._id} className={`ui-chip ${tone}`}>{skill.name}</span>)}</div>;

  return <section className={panel}>
    {title}
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className={`text-4xl font-semibold tracking-tight tabular-nums ${match.isMatch ? 'text-ok' : 'text-ink'}`}>{percent}%</p>
        <p className="ui-meta">{th ? `เกณฑ์ของคุณ ${match.matchThreshold}%` : `Your threshold ${match.matchThreshold}%`}</p>
      </div>
      <div className="relative mt-3 h-1.5 w-full rounded-full bg-surface-3" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label={th ? 'ทักษะที่ตรงกัน' : 'Skills matched'}>
        <div className={`h-full rounded-full transition-[width] duration-500 ease-soft ${match.isMatch ? 'bg-ok' : 'bg-brand'}`} style={{ width: `${percent}%` }} />
        <div className="absolute -top-1 h-3.5 w-0.5 rounded-full bg-ink-3" style={{ left: `${match.matchThreshold}%` }} aria-hidden />
      </div>
      <p className="ui-meta mt-2.5">{th ? `มีทักษะ ${match.matchedSkills.length} จาก ${match.requiredCount} รายการที่ TOR กำหนด` : `You have ${match.matchedSkills.length} of ${match.requiredCount} required skills`}</p>
    </div>
    <p className={`text-sm font-medium ${match.isMatch ? 'text-ok' : 'text-ink-2'}`}>
      {match.isMatch ? (th ? 'ตรงกับเกณฑ์ของคุณ — คุณจะได้รับแจ้งเตือนเมื่อสถานะเปลี่ยน' : 'Meets your criteria — you’ll be alerted if its status changes') : (th ? 'ยังไม่ตรงกับเกณฑ์ของคุณ' : 'Does not meet your criteria')}
    </p>
    {match.matchedSkills.length > 0 && <div className="space-y-2"><p className="ui-meta">{th ? 'ทักษะที่คุณมี' : 'Skills you have'}</p>{chips(match.matchedSkills, 'bg-ok-tint text-ok')}</div>}
    {match.missingSkills.length > 0 && <div className="space-y-2"><p className="ui-meta">{th ? 'ทักษะที่ขาด' : 'Skills you’re missing'}</p>{chips(match.missingSkills, '')}</div>}
    <p className={`text-sm ${['below', 'above'].includes(match.budgetFit) ? 'text-warn' : 'text-ink-2'}`}>{budgetText[match.budgetFit]}</p>
    {editProfile}
  </section>;
}
