import { formatMoney, PriceAnalysis, PriceFlag, priceCategoryLabel, priceFlagLabel } from '@/lib/projects';
import { panel, sectionTitle } from '@/component/ui';

// FR-09 / UC1: where this budget sits against comparable government TOR budgets (log scale,
// because IT budgets range from hundreds of thousands to hundreds of millions of baht).
export function PriceComparison({ analysis, budget, flag, lang }: { analysis?: PriceAnalysis | null; budget?: number; flag?: PriceFlag; lang: 'th' | 'en' }) {
  const th = lang === 'th';
  const title = <h2 className={sectionTitle}>{th ? 'เทียบงบประมาณกับ TOR ที่คล้ายกัน' : 'Budget vs. similar TORs'}</h2>;
  if (!analysis || !budget || !analysis.q1Budget || !analysis.q3Budget) {
    return <section className={panel}>{title}<p className="text-sm text-ink-3">{th ? 'ยังมีข้อมูล TOR ในหมวดเดียวกันไม่พอสำหรับเปรียบเทียบ' : 'Not enough comparable TOR budgets yet to compare.'}</p></section>;
  }
  const { q1Budget: q1, q3Budget: q3, medianBudget: median } = analysis;
  const low = Math.log10(Math.min(q1 / 4, budget / 1.5));
  const high = Math.log10(Math.max(q3 * 4, budget * 1.5));
  const x = (value: number) => `${((Math.log10(value) - low) / (high - low)) * 100}%`;
  const flagged = flag && flag !== 'Normal';
  const category = priceCategoryLabel(analysis.benchmarkCategory, lang);
  const ownCategory = analysis.category !== analysis.benchmarkCategory ? priceCategoryLabel(analysis.category, lang) : null;
  const explanation: Record<PriceFlag, [string, string]> = {
    Normal: ['งบประมาณอยู่ในช่วงปกติของหมวดนี้', 'This budget is within the usual spread for the category.'],
    Overpriced: ['งบประมาณสูงกว่าช่วงปกติของหมวดนี้มาก ควรตรวจสอบขอบเขตงาน', 'Well above the usual spread for the category — check the scope.'],
    Underpriced: ['งบประมาณต่ำกว่าช่วงปกติของหมวดนี้มาก ควรประเมินความคุ้มค่าก่อนยื่น', 'Well below the usual spread for the category — check it covers the work.'],
    ScopeMismatch: [`ขอบเขตงานกว้าง (${analysis.scopeSkills} ทักษะที่ต้องใช้) แต่งบอยู่ในกลุ่มต่ำสุดหนึ่งในสี่ของหมวด`, `Wide scope (${analysis.scopeSkills} required skills) on a bottom-quartile budget for the category.`],
  };

  return <section className={panel}>
    <div className="flex flex-wrap items-center justify-between gap-3">
      {title}
      <p className={`ui-badge ui-badge-dot ${flagged ? 'ui-badge-danger' : 'ui-badge-ok'}`}>{priceFlagLabel(flag, lang)}</p>
    </div>
    <p className="text-sm text-ink-2">{explanation[flag || 'Normal'][th ? 0 : 1]}</p>
    <div className="relative h-14" role="img" aria-label={th
      ? `งบประมาณ ${formatMoney(budget, lang)} เทียบกับช่วงปกติ ${formatMoney(q1, lang)} ถึง ${formatMoney(q3, lang)}`
      : `Budget ${formatMoney(budget, lang)} against a typical range of ${formatMoney(q1, lang)} to ${formatMoney(q3, lang)}`}>
      <div className="absolute top-6 h-1.5 w-full rounded-full bg-surface-3" />
      <div className="absolute top-6 h-1.5 rounded-full bg-brand-soft/45" style={{ left: x(q1), width: `calc(${x(q3)} - ${x(q1)})` }} />
      <div className="absolute top-[18px] h-[18px] w-px bg-ink-3" style={{ left: x(median) }} />
      <div className={`absolute top-[17px] -ml-2 h-4 w-4 rounded-full border-2 border-surface shadow-soft ${flagged ? 'bg-danger' : 'bg-ok'}`} style={{ left: x(budget) }} />
      <span className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium uppercase tracking-wide text-ink-3" style={{ left: x(median) }}>{th ? 'ค่ากลาง' : 'median'}</span>
    </div>
    <dl className="grid grid-cols-3 gap-3 border-t border-line pt-4 text-xs">
      <div><dt className="text-ink-3">{th ? 'งบนี้' : 'This budget'}</dt><dd className="mt-0.5 text-[13px] font-medium tabular-nums text-ink">{formatMoney(budget, lang)}</dd></div>
      <div><dt className="text-ink-3">{th ? 'ค่ากลาง' : 'Median'}</dt><dd className="mt-0.5 text-[13px] font-medium tabular-nums text-ink">{formatMoney(median, lang)}</dd></div>
      <div><dt className="text-ink-3">{th ? 'ช่วงปกติ (50% กลาง)' : 'Typical (middle 50%)'}</dt><dd className="mt-0.5 text-[13px] font-medium tabular-nums text-ink">{formatMoney(q1, lang)} – {formatMoney(q3, lang)}</dd></div>
    </dl>
    <p className="ui-meta">{th
      ? `เทียบกับ TOR ภาครัฐ ${analysis.sampleSize} โครงการในหมวด ${category}${ownCategory ? ` (หมวด ${ownCategory} มีข้อมูลไม่พอ)` : ''} • ${analysis.ratio} เท่าของค่ากลาง`
      : `Compared with ${analysis.sampleSize} government TORs in ${category}${ownCategory ? ` (not enough ${ownCategory} TORs yet)` : ''} • ${analysis.ratio}× the median`}</p>
  </section>;
}
