import { formatMoney, PriceAnalysis, PriceFlag, priceCategoryLabel, priceFlagLabel } from '@/lib/projects';

const panel = 'rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4';

// FR-09 / UC1: where this budget sits against comparable government TOR budgets (log scale,
// because IT budgets range from hundreds of thousands to hundreds of millions of baht).
export function PriceComparison({ analysis, budget, flag, lang }: { analysis?: PriceAnalysis | null; budget?: number; flag?: PriceFlag; lang: 'th' | 'en' }) {
  const th = lang === 'th';
  const title = <h2 className="text-lg font-bold text-slate-900 dark:text-white">{th ? 'เทียบงบประมาณกับ TOR ที่คล้ายกัน' : 'Budget vs. similar TORs'}</h2>;
  if (!analysis || !budget || !analysis.q1Budget || !analysis.q3Budget) {
    return <section className={panel}>{title}<p className="text-sm text-slate-500">{th ? 'ยังมีข้อมูล TOR ในหมวดเดียวกันไม่พอสำหรับเปรียบเทียบ' : 'Not enough comparable TOR budgets yet to compare.'}</p></section>;
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
    {title}
    <p className={`text-sm font-bold ${flagged ? 'text-rose-700 dark:text-rose-300' : 'text-emerald-700 dark:text-emerald-300'}`}>{priceFlagLabel(flag, lang)}</p>
    <p className="text-sm text-slate-600 dark:text-slate-300">{explanation[flag || 'Normal'][th ? 0 : 1]}</p>
    <div className="relative h-14" role="img" aria-label={th
      ? `งบประมาณ ${formatMoney(budget, lang)} เทียบกับช่วงปกติ ${formatMoney(q1, lang)} ถึง ${formatMoney(q3, lang)}`
      : `Budget ${formatMoney(budget, lang)} against a typical range of ${formatMoney(q1, lang)} to ${formatMoney(q3, lang)}`}>
      <div className="absolute top-6 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
      <div className="absolute top-6 h-2 rounded-full bg-violet-200 dark:bg-violet-900" style={{ left: x(q1), width: `calc(${x(q3)} - ${x(q1)})` }} />
      <div className="absolute top-4 h-6 w-0.5 bg-slate-500" style={{ left: x(median) }} />
      <div className={`absolute top-[18px] h-4 w-4 -ml-2 rounded-full border-2 border-white dark:border-slate-900 ${flagged ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ left: x(budget) }} />
      <span className="absolute top-0 -translate-x-1/2 text-[10px] text-slate-500 whitespace-nowrap" style={{ left: x(median) }}>{th ? 'ค่ากลาง' : 'median'}</span>
    </div>
    <dl className="grid grid-cols-3 gap-3 text-xs">
      <div><dt className="text-slate-500">{th ? 'งบนี้' : 'This budget'}</dt><dd className="font-semibold">{formatMoney(budget, lang)}</dd></div>
      <div><dt className="text-slate-500">{th ? 'ค่ากลาง' : 'Median'}</dt><dd className="font-semibold">{formatMoney(median, lang)}</dd></div>
      <div><dt className="text-slate-500">{th ? 'ช่วงปกติ (50% กลาง)' : 'Typical (middle 50%)'}</dt><dd className="font-semibold">{formatMoney(q1, lang)} – {formatMoney(q3, lang)}</dd></div>
    </dl>
    <p className="text-xs text-slate-500">{th
      ? `เทียบกับ TOR ภาครัฐ ${analysis.sampleSize} โครงการในหมวด ${category}${ownCategory ? ` (หมวด ${ownCategory} มีข้อมูลไม่พอ)` : ''} • ${analysis.ratio} เท่าของค่ากลาง`
      : `Compared with ${analysis.sampleSize} government TORs in ${category}${ownCategory ? ` (not enough ${ownCategory} TORs yet)` : ''} • ${analysis.ratio}× the median`}</p>
  </section>;
}
