'use client';

import { RiCheckLine, RiAlertLine } from '@remixicon/react';

interface StatusBadgeProps {
  status: 'active' | 'upcoming' | 'closed';
  lang: string;
}

export function StatusBadge({ status, lang }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          className: 'badge badge-success badge-sm gap-1 text-[10px] text-white font-bold',
          icon: <RiCheckLine className="h-3 w-3" />,
          label: lang === 'EN' ? 'Active' : 'เปิดรับ',
        };
      case 'upcoming':
        return {
          className: 'badge badge-warning badge-sm gap-1 text-[10px] text-white font-bold',
          icon: <RiAlertLine className="h-3 w-3" />,
          label: lang === 'EN' ? 'Closing Soon' : 'ใกล้ปิดรับ',
        };
      case 'closed':
        return {
          className: 'badge badge-ghost badge-sm text-[10px] font-bold',
          icon: null,
          label: lang === 'EN' ? 'Closed' : 'ปิดรับแล้ว',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={config.className}>
      {config.icon}
      {config.label}
    </span>
  );
}