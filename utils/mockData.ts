import { Language } from '@/public/mockData/Language';
import { TORItem, UserProfile, SystemLog, TORRequirement } from '@/types';

export const initialProfile: Record<Language, UserProfile> = {
    en: {
        companyName: 'Thai Tech Solutions Ltd.',
        taxId: '0105562994801',
        registeredCapital: '15,000,000',
        yearsInBusiness: '8',
        contactName: 'Tanawat Techasopon',
        contactEmail: 'tanawat@thaitechsolutions.co.th',
        contactPhone: '02-589-1020',
        iso27001: true,
        iso9001: true,
        iso20000: false,
        nbtcLicense: false,
        dailyDigestEmail: true,
        smsAlerts: true,
        matchThreshold: 80,
        trackedKeywords: 'Software, Cloud, Cybersecurity, Infrastructure, Network, AI',
        preferredAgencies: [
            'Ministry of Digital Economy and Society (MDES)',
            "Comptroller General's Department",
            'State Railway of Thailand'
        ]
    },
    th: {
        companyName: 'บริษัท ไทย เทค โซลูชั่นส์ จำกัด',
        taxId: '0105562994801',
        registeredCapital: '15,000,000',
        yearsInBusiness: '8',
        contactName: 'ธนวัฒน์ เตชะโสภณ',
        contactEmail: 'tanawat@thaitechsolutions.co.th',
        contactPhone: '02-589-1020',
        iso27001: true,
        iso9001: true,
        iso20000: false,
        nbtcLicense: false,
        dailyDigestEmail: true,
        smsAlerts: true,
        matchThreshold: 80,
        trackedKeywords: 'ซอฟต์แวร์, คลาวด์, ความปลอดภัยทางไซเบอร์, โครงสร้างพื้นฐาน, เครือข่าย, ปัญญาประดิษฐ์',
        preferredAgencies: [
            'กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม (MDES)',
            'กรมบัญชีกลาง',
            'การรถไฟแห่งประเทศไทย'
        ]
    }
};

export const initialTORs: Record<Language, TORItem[]> = {
    en: [
        {
            id: 'TOR-6703954',
            price: '฿ 18,500,000 THB',
            rawPrice: 18500000,
            sourcePortal: 'Central Public e-GP Portal',
            name: 'Development and Maintenance of National Health Data Exchange System',
            employer: 'Ministry of Digital Economy and Society (MDES)',
            tags: ['Software', 'Cloud', 'Cybersecurity'],
            matchScore: 96,
            deadline: '12 Days Remaining',
            desc: 'Ingestion and synchronization of regional hospital electronic medical records into a unified HL7 FHIR standard database under strict Ministry cybersecurity standards.',
            method: 'e-Bidding',
            requirements: [
                { text: 'Registered capital of at least ฿10,000,000 THB with Thai DBD', pass: true },
                { text: 'ISO 27001 or ISO 20000 active certification', pass: true },
                { text: 'Minimum 2 completed government software contracts exceeding ฿5,000,000 THB in past 3 years', pass: true },
                { text: 'On-site support engineers with CISSP or AWS Certified Solutions Architect', pass: false }
            ],
            feasibility: { budgetFit: 95, securityFit: 100, techStack: 90, timelineFit: 80, localPresence: 100 }
        },
        {
            id: 'TOR-6704102',
            price: '฿ 45,000,000 THB',
            rawPrice: 45000000,
            sourcePortal: 'State Enterprise Portal (SRT)',
            name: 'Supply and Installation of Fiber Optic Backbone Network Phase 4',
            employer: 'State Railway of Thailand',
            tags: ['Infrastructure', 'Hardware'],
            matchScore: 62,
            deadline: '8 Days Remaining',
            desc: 'Installation of underground optical fiber cable along 240 kilometers of southern railway routes including station router switching gear.',
            method: 'e-Market',
            requirements: [
                { text: 'Class 1 Telecommunications License from NBTC', pass: false },
                { text: 'ISO 9001 Quality Management Certification', pass: true },
                { text: 'Previous railway or high-voltage linear infrastructure installation experience', pass: false }
            ],
            feasibility: { budgetFit: 60, securityFit: 70, techStack: 50, timelineFit: 60, localPresence: 100 }
        },
        {
            id: 'TOR-6704889',
            price: '฿ 8,200,000 THB',
            rawPrice: 8200000,
            sourcePortal: 'Open Procurement Data API',
            name: 'Centralized Security Information & Event Management (SIEM) Upgrade',
            employer: "Comptroller General's Department",
            tags: ['Cybersecurity', 'Software'],
            matchScore: 91,
            deadline: '19 Days Remaining',
            desc: 'Enterprise license expansion for automated threat detection, log retention, and 24/7 SOC integration compliant with Thai PDPA laws.',
            method: 'e-Bidding',
            requirements: [
                { text: 'Authorized partner status with tier-1 SIEM vendor', pass: true },
                { text: 'ISO 27001 Certified SOC Facilities', pass: true },
                { text: 'Tax audit compliance clearing past 3 fiscal years', pass: true }
            ],
            feasibility: { budgetFit: 100, securityFit: 100, techStack: 95, timelineFit: 85, localPresence: 100 }
        }
    ],
    th: [
        {
            id: 'TOR-6703954',
            price: '฿ 18,500,000 บาท',
            rawPrice: 18500000,
            sourcePortal: 'ระบบจัดซื้อจัดจ้างภาครัฐ (e-GP)',
            name: 'โครงการพัฒนาและบำรุงรักษาระบบแลกเปลี่ยนข้อมูลสุขภาพระดับชาติ',
            employer: 'กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม (MDES)',
            tags: ['ซอฟต์แวร์', 'คลาวด์', 'ความปลอดภัยทางไซเบอร์'],
            matchScore: 96,
            deadline: 'เหลือเวลาอีก 12 วัน',
            desc: 'การเชื่อมโยงและซิงค์ข้อมูลประวัติการรักษาพยาบาลอิเล็กทรอนิกส์จากโรงพยาบาลภูมิภาค เข้าสู่ฐานข้อมูลมาตรฐาน HL7 FHIR ภายใต้มาตรฐานความปลอดภัยทางไซเบอร์ของกระทรวงฯ',
            method: 'ประกวดราคาอิเล็กทรอนิกส์ (e-Bidding)',
            requirements: [
                { text: 'ทุนจดทะเบียนไม่น้อยกว่า 10,000,000 บาท กับกรมพัฒนาธุรกิจการค้า', pass: true },
                { text: 'ได้รับการรับรองมาตรฐาน ISO 27001 หรือ ISO 20000', pass: true },
                { text: 'มีผลงานพัฒนาซอฟต์แวร์กับหน่วยงานภาครัฐมูลค่าไม่น้อยกว่า 5,000,000 บาท อย่างน้อย 2 สัญญาในรอบ 3 ปี', pass: true },
                { text: 'มีวิศวกรประจำโครงการที่ได้รับประกาศนียบัตร CISSP หรือ AWS Certified Solutions Architect', pass: false }
            ],
            feasibility: { budgetFit: 95, securityFit: 100, techStack: 90, timelineFit: 80, localPresence: 100 }
        },
        {
            id: 'TOR-6704102',
            price: '฿ 45,000,000 บาท',
            rawPrice: 45000000,
            sourcePortal: 'พอร์ทัลจัดซื้อจัดจ้าง รฟท.',
            name: 'โครงการจัดหาและติดตั้งเครือข่ายสายใยแก้วนำแสงโครงข่ายหลัก ระยะที่ 4',
            employer: 'การรถไฟแห่งประเทศไทย',
            tags: ['โครงสร้างพื้นฐาน', 'ฮาร์ดแวร์'],
            matchScore: 62,
            deadline: 'เหลือเวลาอีก 8 วัน',
            desc: 'การติดตั้งสายเคเบิลใยแก้วนำแสงใต้ดินตามเส้นทางรถไฟสายใต้ระยะทาง 240 กิโลเมตร พร้อมอุปกรณ์ Router และ Switch ประจำสถานี',
            method: 'ตลาดอิเล็กทรอนิกส์ (e-Market)',
            requirements: [
                { text: 'ใบอนุญาตประกอบกิจการโทรคมนาคม แบบที่ 1 จาก กสทช.', pass: false },
                { text: 'ได้รับการรับรองระบบบริหารงานคุณภาพ ISO 9001', pass: true },
                { text: 'มีประสบการณ์ติดตั้งโครงสร้างพื้นฐานทางยาวสำหรับระบบรถไฟหรือระบบไฟฟ้าแรงสูง', pass: false }
            ],
            feasibility: { budgetFit: 60, securityFit: 70, techStack: 50, timelineFit: 60, localPresence: 100 }
        },
        {
            id: 'TOR-6704889',
            price: '฿ 8,200,000 บาท',
            rawPrice: 8200000,
            sourcePortal: 'Open Procurement Data API',
            name: 'โครงการอัปเกรดระบบบริหารจัดการข้อมูลความมั่นคงปลอดภัยสารสนเทศ (SIEM)',
            employer: 'กรมบัญชีกลาง',
            tags: ['ความปลอดภัยทางไซเบอร์', 'ซอฟต์แวร์'],
            matchScore: 91,
            deadline: 'เหลือเวลาอีก 19 วัน',
            desc: 'การขยายสิทธิ์การใช้งานซอฟต์แวร์ระดับองค์กรสำหรับการตรวจจับภัยคุกคามอัตโนมัติ การเก็บรักษาข้อมูลจราจรทางคอมพิวเตอร์ และการเชื่อมต่อศูนย์ SOC 24/7 ที่สอดคล้องกับ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)',
            method: 'ประกวดราคาอิเล็กทรอนิกส์ (e-Bidding)',
            requirements: [
                { text: 'เป็นตัวแทนจำหน่ายที่ได้รับการแต่งตั้งอย่างเป็นทางการจากผู้ผลิต SIEM ชั้นนำ', pass: true },
                { text: 'ศูนย์ปฏิบัติการตรวจจับการบุกรุก (SOC) ได้รับการรับรอง ISO 27001', pass: true },
                { text: 'มีหลักฐานการเสียภาษีถูกต้องครบถ้วนย้อนหลัง 3 ปีงบประมาณ', pass: true }
            ],
            feasibility: { budgetFit: 100, securityFit: 100, techStack: 95, timelineFit: 85, localPresence: 100 }
        }
    ]
};

export const initialLogs: Record<Language, SystemLog[]> = {
    en: [
        { time: '17:15:02', type: 'SYNC', msg: 'Polled 14 items from Central Public e-GP Portal API (HTTP 200 OK)' },
        { time: '16:40:11', type: 'VECTOR', msg: "Re-calculated capability vector for tenant 'Thai Tech Solutions Ltd.'" },
        { time: '15:22:00', type: 'ALERT', msg: 'Dispatched 480 Daily Digest notifications via Email & Webhook' },
        { time: '12:05:44', type: 'SYNC', msg: 'Polled 6 items from State Railway Bidding API' }
    ],
    th: [
        { time: '17:15:02', type: 'SYNC', msg: 'ดึงข้อมูล 14 รายการจาก Central Public e-GP Portal API (HTTP 200 OK)' },
        { time: '16:40:11', type: 'VECTOR', msg: "คำนวณเวกเตอร์ความสามารถใหม่สำหรับ 'บริษัท ไทย เทค โซลูชั่นส์ จำกัด'" },
        { time: '15:22:00', type: 'ALERT', msg: 'ส่งการแจ้งเตือนสรุปรายวัน 480 รายการผ่าน อีเมล & เว็บฮุก' },
        { time: '12:05:44', type: 'SYNC', msg: 'ดึงข้อมูล 6 รายการจาก State Railway Bidding API' }
    ]
};

export function calculatePassRate(requirements: TORRequirement[]): { count: number; percentage: number } {
    const count = requirements.filter(r => r.pass).length;
    const percentage = Math.round((count / requirements.length) * 100);
    return { count, percentage };
}