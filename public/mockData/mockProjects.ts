import { Language } from "./Language";

export interface TrackingProject {
  id: string;
  name: string;
  status: 'Approved' | 'Applied' | 'Rejected' | 'Unavailable';
  date: string;
  trackingId: string;
  category: string;
}

export const mockTrackingProjects: Record<Language, TrackingProject[]> = {
  en: [
    { id: '1', name: 'AI-Powered Analytics Platform', status: 'Approved', date: '2024-01-15', trackingId: 'TOR-001', category: 'AI/ML' },
    { id: '2', name: 'Blockchain Identity Management', status: 'Applied', date: '2024-01-20', trackingId: 'TOR-002', category: 'Blockchain' },
    { id: '3', name: 'Smart City IoT Network', status: 'Rejected', date: '2024-01-10', trackingId: 'TOR-003', category: 'IoT' },
    { id: '4', name: 'Sustainable Energy Grid', status: 'Unavailable', date: '2024-01-05', trackingId: 'TOR-004', category: 'Energy' },
    { id: '5', name: 'Healthcare Data Platform', status: 'Approved', date: '2024-01-25', trackingId: 'TOR-005', category: 'Healthcare' },
    { id: '6', name: 'Autonomous Drone Fleet', status: 'Applied', date: '2024-01-18', trackingId: 'TOR-006', category: 'Robotics' },
  ],
  th: [
    { id: '1', name: 'แพลตฟอร์มการวิเคราะห์ด้วย AI', status: 'Approved', date: '2024-01-15', trackingId: 'TOR-001', category: 'AI/ML' },
    { id: '2', name: 'ระบบจัดการอัตลักษณ์ด้วยบล็อกเชน', status: 'Applied', date: '2024-01-20', trackingId: 'TOR-002', category: 'บล็อกเชน' },
    { id: '3', name: 'เครือข่าย IoT เมืองอัจฉริยะ', status: 'Rejected', date: '2024-01-10', trackingId: 'TOR-003', category: 'IoT' },
    { id: '4', name: 'โครงข่ายไฟฟ้าพลังงานยั่งยืน', status: 'Unavailable', date: '2024-01-05', trackingId: 'TOR-004', category: 'พลังงาน' },
    { id: '5', name: 'แพลตฟอร์มข้อมูลระบบสาธารณสุข', status: 'Approved', date: '2024-01-25', trackingId: 'TOR-005', category: 'สาธารณสุข' },
    { id: '6', name: 'ฝูงโดรนอัตโนมัติ', status: 'Applied', date: '2024-01-18', trackingId: 'TOR-006', category: 'หุ่นยนต์' },
  ]
};

export interface Project {
  id: string;
  title: string;
  employer: string;
  location: string;
  category: string;
  postedAt: string;
}

export const projects: Record<Language, Project[]> = {
  en: [
    { id: "1", title: "Digital Skills Training for Rural Youth", employer: "Tech Education Foundation", location: "Northern Region, Thailand", category: "Education", postedAt: "2 days ago" },
    { id: "2", title: "Sustainable Agriculture Initiative", employer: "Green Future Org", location: "Central Region, Thailand", category: "Agriculture", postedAt: "5 days ago" },
    { id: "3", title: "Community Health Worker Program", employer: "Health Access International", location: "Southern Region, Thailand", category: "Healthcare", postedAt: "1 week ago" },
    { id: "4", title: "Digital Literacy for Seniors", employer: "Elder Tech Foundation", location: "Bangkok, Thailand", category: "Education", postedAt: "2 weeks ago" },
  ],
  th: [
    { id: "1", title: "การฝึกอบรมทักษะดิจิทัลสำหรับเยาวชนในพื้นที่ชนบท", employer: "มูลนิธิเทคโนโลยีเพื่อการศึกษา", location: "ภาคเหนือ, ประเทศไทย", category: "การศึกษา", postedAt: "2 วันที่แล้ว" },
    { id: "2", title: "โครงการเกษตรกรรมยั่งยืน", employer: "องค์กร กรีน ฟิวเจอร์", location: "ภาคกลาง, ประเทศไทย", category: "เกษตรกรรม", postedAt: "5 วันที่แล้ว" },
    { id: "3", title: "โครงการอาสาสมัครสาธารณสุขชุมชน", employer: "เฮลท์ แอคเซส อินเตอร์เนชันแนล", location: "ภาคใต้, ประเทศไทย", category: "สาธารณสุข", postedAt: "1 สัปดาห์ที่แล้ว" },
    { id: "4", title: "การพัฒนาความรู้ด้านดิจิทัลสำหรับผู้สูงอายุ", employer: "มูลนิธิเอลเดอร์เทค", location: "กรุงเทพมหานคร, ประเทศไทย", category: "การศึกษา", postedAt: "2 สัปดาห์ที่แล้ว" },
  ]
};