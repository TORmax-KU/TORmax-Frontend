export function TORFacts({ budget, published, deadline, lang, inverse = false }: {
  budget: string;
  published: string;
  deadline: string;
  lang: 'th' | 'en';
  inverse?: boolean;
}) {
  const th = lang === 'th';
  const fields = [
    [th ? 'งบประมาณ' : 'Budget', budget],
    [th ? 'วันที่เผยแพร่ประกาศ' : 'Announcement publication date', published],
    [th ? 'กำหนดปิดรับข้อเสนอ' : 'Bid submission deadline', deadline],
  ];
  return <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {fields.map(([label, value]) => <div key={label} className="min-w-0">
      <dt className={`text-xs mb-1 ${inverse ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>{label}</dt>
      <dd className={`text-sm font-semibold break-words ${inverse ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>{value}</dd>
    </div>)}
  </dl>;
}
