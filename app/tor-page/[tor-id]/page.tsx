'use client';

import { useParams } from 'next/navigation';
import { DatabaseTORDetail } from '@/component/tordetail/DatabaseTORDetail';
import { useApp } from '@/context/AppContext';
import { torpagei18n } from '@/public/mockData/i18n/torpage';
import { TORNotFound } from '@/component/tordetail/TORNotFound';

export default function TORDetailPage() {
  const params = useParams<{ 'tor-id': string }>();
  const { lang } = useApp();
  const t = torpagei18n[lang?.toLowerCase() === 'th' ? 'th' : 'en'];
  const id = params['tor-id'];
  return /^[a-f\d]{24}$/i.test(id)
    ? <DatabaseTORDetail id={id} />
    : <TORNotFound notFound={t.notFound} backToDirectory={t.backToDirectory} />;
}
