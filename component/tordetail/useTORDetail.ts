'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { initialTORs, initialProfile } from '@/utils/mockData';
import { Language } from '@/public/mockData/Language';

export function useTORDetail(activeLang: Language) {
  const router = useRouter();
  const routeParams = useParams();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const targetId = routeParams?.['tor-id'] as string;
  const availableTORs = initialTORs[activeLang] || initialTORs.en;
  const tor = availableTORs.find((item) => item.id === targetId);
  const activeProfile = initialProfile[activeLang] || initialProfile.en;

  const userProfile = {
    companyName: activeProfile.companyName,
    taxId: activeProfile.taxId,
    dunsNumber: '65-432-8901',
    primaryContact: activeProfile.contactName,
    email: activeProfile.contactEmail,
    phone: activeProfile.contactPhone,
    bankAccount: activeLang === 'th' ? 'ธนาคารกรุงเทพ #102-3-48192-0' : 'Bangkok Bank #102-3-48192-0',
  };

  const passCount = tor?.requirements?.filter((r) => r.pass).length ?? 0;
  const totalReqs = tor?.requirements?.length ?? 1;
  const passPct = Math.round((passCount / totalReqs) * 100);

  const projectDeliverables = tor?.deliverables || (
    activeLang === 'th' ? [
      'เอกสารการออกแบบสถาปัตยกรรมระบบและแผนการดำเนินงานโครงสร้างพื้นฐาน',
      'การเชื่อมต่อ ไมโครเซอร์วิส ความพร้อมใช้งานสูง และการตั้งค่าระบบท่อส่งข้อมูล',
      'การตรวจสอบความปลอดภัย ISO/IEC 27001 และการทดสอบการเจาะระบบอัตโนมัติ',
      'การทดสอบการยอมรับของผู้ใช้ (UAT) และการส่งมอบการฝึกอบรมผู้ดูแลระบบ',
      'บริการบำรุงรักษาตาม SLA 24/7 ตลอดระยะเวลาการรับประกัน 12 เดือน'
    ] : [
      'System Architecture Design & Infrastructure Roadmap Document',
      'High-Availability Microservices Integration & Data Pipeline Setup',
      'ISO/IEC 27001 Security Audit & Automated Compliance Penetration Test',
      'User Acceptance Testing (UAT) & Administrative Training Handover',
      '24/7 SLA Maintenance Support during 12-Month Post-Launch Guarantee',
    ]
  );

  const tags = tor?.tags || ['GovTech', 'Software', 'Cloud'];

  return {
    router,
    tor,
    userProfile,
    passCount,
    totalReqs,
    passPct,
    projectDeliverables,
    tags,
    showSubmitModal,
    setShowSubmitModal,
  };
}