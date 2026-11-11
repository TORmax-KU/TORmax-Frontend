export function TORFacts({ budget, published, deadline, lang, direct = false, variant = 'row' }: {
  budget: string;
  published: string;
  deadline: string;
  lang: 'th' | 'en';
  // Direct job postings: a budget range, a posting date and an application deadline.
  direct?: boolean;
  // "row": three columns from small screens up. "card": stacks in a listing card's side column on large screens.
  variant?: 'row' | 'card';
}) {
  const th = lang === 'th';
  const fields = direct ? [
    [th ? 'ช่วงงบประมาณ' : 'Budget range', budget],
    [th ? 'วันที่ประกาศ' : 'Posted', published],
    [th ? 'ปิดรับสมัคร' : 'Application deadline', deadline],
  ] : [
    [th ? 'งบประมาณ' : 'Budget', budget],
    [th ? 'วันที่เผยแพร่ประกาศ' : 'Announcement publication date', published],
    [th ? 'กำหนดปิดรับข้อเสนอ' : 'Bid submission deadline', deadline],
  ];
  return <dl className={`grid grid-cols-1 sm:grid-cols-3 ${variant === 'card' ? 'gap-3 lg:grid-cols-1' : 'gap-5 sm:gap-8'}`}>
    {fields.map(([label, value]) => <div key={label} className="min-w-0">
      <dt className="ui-meta mb-0.5">{label}</dt>
      <dd className="text-sm font-medium tabular-nums break-words text-ink">{value}</dd>
    </div>)}
  </dl>;
}
