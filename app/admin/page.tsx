'use client';

import { useState } from 'react';
import { RiShieldUserLine } from '@remixicon/react';
import { useApp } from '@/context/AppContext';
import { PageHeader } from '@/component/PageHeader';
import { AdminGate } from '@/component/admin/AdminGate';
import { Segmented } from '@/component/admin/shared';
import { ReportsTab } from '@/component/admin/ReportsTab';
import { PostsTab } from '@/component/admin/PostsTab';
import { UsersTab } from '@/component/admin/UsersTab';
import { ClassificationTab } from '@/component/admin/ClassificationTab';
import { LogTab } from '@/component/admin/LogTab';

type Tab = 'reports' | 'posts' | 'users' | 'classification' | 'log';

// US9 / US10 / UC5: the admin console — review reported postings, remove violations (which
// disables the publisher), manage accounts, and handle misclassified government TORs.
export default function AdminPage() {
  const { lang } = useApp();
  const activeLang = lang?.toLowerCase() === 'th' ? 'th' : 'en';
  const th = activeLang === 'th';
  const [tab, setTab] = useState<Tab>('reports');

  const tabs: Array<[Tab, string]> = [
    ['reports', th ? 'ประกาศที่ถูกรายงาน' : 'Reported postings'],
    ['posts', th ? 'ประกาศทั้งหมด' : 'All postings'],
    ['users', th ? 'บัญชีผู้ใช้' : 'Accounts'],
    ['classification', th ? 'TOR จัดประเภทผิด' : 'Misclassified TORs'],
    ['log', th ? 'ประวัติการดูแล' : 'Moderation log'],
  ];

  return (
    <div className="ui-page max-w-5xl space-y-6">
      <PageHeader
        className="pb-2"
        eyebrow={<><RiShieldUserLine className="h-3.5 w-3.5" /><span>{th ? 'ระบบจัดการ' : 'Admin Portal'}</span></>}
        title={th ? 'ดูแลเนื้อหาและบัญชี' : 'Moderation'}
        description={th ? 'ตรวจสอบประกาศที่ถูกรายงาน การลบประกาศที่ผิดนโยบายจะระงับบัญชีผู้ประกาศโดยอัตโนมัติ' : 'Review reported postings. Removing a posting that breaks policy automatically disables the publisher’s account.'}
      />
      <AdminGate lang={activeLang}>
        <div className="space-y-5">
          <div className="overflow-x-auto pb-1">
            <Segmented label={th ? 'ส่วนของระบบจัดการ' : 'Admin sections'} value={tab} onChange={setTab} options={tabs} />
          </div>
          {tab === 'reports' && <ReportsTab lang={activeLang} />}
          {tab === 'posts' && <PostsTab lang={activeLang} />}
          {tab === 'users' && <UsersTab lang={activeLang} />}
          {tab === 'classification' && <ClassificationTab lang={activeLang} />}
          {tab === 'log' && <LogTab lang={activeLang} />}
        </div>
      </AdminGate>
    </div>
  );
}
