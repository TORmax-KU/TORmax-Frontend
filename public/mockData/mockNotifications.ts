import { Language } from "./Language";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  link?: string;
}

export const mockNotifications: Record<Language, Notification[]> = {
  en: [
    {
      id: '1',
      title: 'New Project Match',
      message: 'A new TOR project matching your skills has been posted',
      type: 'success',
      timestamp: '2 minutes ago',
      read: false,
      link: '/tor-page/1'
    },
    {
      id: '2',
      title: 'Application Update',
      message: 'Your application for "Smart Contract Audit" has been reviewed',
      type: 'info',
      timestamp: '1 hour ago',
      read: false,
      link: '/applications'
    },
    {
      id: '3',
      title: 'Project Deadline Approaching',
      message: 'Digital Skills Training project deadline is in 3 days',
      type: 'warning',
      timestamp: '3 hours ago',
      read: true,
      link: '/tor-page/2'
    },
    {
      id: '4',
      title: 'New Message from Employer',
      message: 'Tech Education Foundation sent you a message about your proposal',
      type: 'info',
      timestamp: '5 hours ago',
      read: true,
      link: '/messages'
    },
    {
      id: '5',
      title: 'Login Breach',
      message: 'You logged in on a new unrecognized location',
      type: 'error',
      timestamp: '1 day ago',
      read: true,
      link: '/settings'
    },
    {
      id: '6',
      title: 'Profile Complete',
      message: 'Your profile is now 100% complete! Add your portfolio to stand out',
      type: 'success',
      timestamp: '2 days ago',
      read: true,
      link: '/profile'
    }
  ],
  th: [
    {
      id: '1',
      title: 'พบโครงการที่ตรงกับคุณ',
      message: 'มีการลงประกาศโครงการ TORใหม่ ที่ตรงกับทักษะของคุณ',
      type: 'success',
      timestamp: '2 นาทีที่แล้ว',
      read: false,
      link: '/tor-page/1'
    },
    {
      id: '2',
      title: 'อัปเดตการสมัครงาน',
      message: 'ใบสมัครของคุณสำหรับ "Smart Contract Audit" ได้รับการตรวจสอบแล้ว',
      type: 'info',
      timestamp: '1 ชั่วโมงที่แล้ว',
      read: false,
      link: '/applications'
    },
    {
      id: '3',
      title: 'ใกล้ครบกำหนดส่งโครงการ',
      message: 'โครงการการฝึกอบรมทักษะดิจิทัลจะครบกำหนดภายใน 3 วัน',
      type: 'warning',
      timestamp: '3 ชั่วโมงที่แล้ว',
      read: true,
      link: '/tor-page/2'
    },
    {
      id: '4',
      title: 'ข้อความใหม่จากผู้ว่าจ้าง',
      message: 'Tech Education Foundation ส่งข้อความถึงคุณเกี่ยวกับข้อเสนอของคุณ',
      type: 'info',
      timestamp: '5 ชั่วโมงที่แล้ว',
      read: true,
      link: '/messages'
    },
    {
      id: '5',
      title: 'การเข้าสู่ระบบที่น่าสงสัย',
      message: 'มีการเข้าสู่ระบบของคุณจากตำแหน่งที่ไม่รู้จัก',
      type: 'error',
      timestamp: '1 วันที่แล้ว',
      read: true,
      link: '/settings'
    },
    {
      id: '6',
      title: 'โปรไฟล์สมบูรณ์แล้ว',
      message: 'โปรไฟล์ของคุณสมบูรณ์ 100% แล้ว! เพิ่มผลงานเพื่อสร้างความโดดเด่น',
      type: 'success',
      timestamp: '2 วันที่แล้ว',
      read: true,
      link: '/profile'
    }
  ]
};