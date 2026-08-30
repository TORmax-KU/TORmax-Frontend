import { UserProfile } from "@/interface/UserProfile/UserProfile";

import { Language } from "../mockData/Language";

export const mockProfile: Record<Language, UserProfile> = {
  en: {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+66 8X-XXX-XXXX",
    location: "Bangkok, Thailand",
    avatar: "/avatar-placeholder.jpg",
    title: "Full Stack Developer & TOR Specialist",
    company: "TechSolutions Co., Ltd.",
    bio: "Passionate developer with 5+ years of experience in web development and blockchain technology. Specialized in TOR projects and decentralized applications.",
    experience: [
      {
        id: "1",
        title: "Senior Full Stack Developer",
        company: "TechSolutions Co., Ltd.",
        location: "Bangkok, Thailand",
        startDate: "2022-01",
        endDate: "Present",
        current: true,
        description: "Leading development of TOR-based applications and smart contracts."
      },
      {
        id: "2",
        title: "Blockchain Developer",
        company: "Crypto Innovations",
        location: "Remote",
        startDate: "2020-06",
        endDate: "2021-12",
        current: false,
        description: "Developed decentralized applications and TOR infrastructure."
      }
    ],
    education: [
      {
        id: "1",
        institution: "Chulalongkorn University",
        degree: "Bachelor of Engineering",
        field: "Computer Engineering",
        startDate: "2016-06",
        endDate: "2020-05",
        current: false
      }
    ],
    skills: [
      "React", "Next.js", "Node.js", "Python", "Docker", "Kubernetes",
      "AWS", "TypeScript", "Solidity", "GraphQL", "Tailwind CSS"
    ],
    torPreferences: {
      categories: ["Development", "Blockchain", "Smart Contracts", "DApps"],
      locations: ["Bangkok", "Remote"],
      remote: true,
      minBudget: 50000,
      maxBudget: 150000,
      availability: "Immediate",
      experienceLevel: "Senior",
      projectTypes: ["Full-time", "Contract", "Part-time"],
      languages: ["English", "Thai"]
    },
    documents: [
      {
        id: "1",
        name: "TOR-001_ProjectProposal.pdf",
        type: "Project Proposal",
        size: "2.4 MB",
        uploadedAt: "2024-01-15",
        status: "verified"
      },
      {
        id: "2",
        name: "Smart_Contract_Audit.pdf",
        type: "Audit Report",
        size: "1.8 MB",
        uploadedAt: "2024-01-10",
        status: "pending"
      }
    ],
    activity: [
      {
        id: "1",
        type: "project",
        title: "Submitted proposal for TOR-001",
        timestamp: "2024-01-15 14:30",
        status: "Under Review"
      },
      {
        id: "2",
        type: "document",
        title: "Updated portfolio documents",
        timestamp: "2024-01-14 10:15",
        status: "Completed"
      }
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      portfolio: "https://johndoe.dev"
    },
    statistics: {
      projectsCompleted: 12,
      successRate: 94,
      avgRating: 4.8,
      reviews: 37
    }
  },
  th: {
    id: "1",
    name: "จอห์น โด",
    email: "john.doe@example.com",
    phone: "+66 8X-XXX-XXXX",
    location: "กรุงเทพมหานคร, ประเทศไทย",
    avatar: "/avatar-placeholder.jpg",
    title: "นักพัฒนา Full Stack และผู้เชี่ยวชาญด้าน TOR",
    company: "บริษัท เทคโซลูชันส์ จำกัด",
    bio: "นักพัฒนาผู้หลงใหลในเทคโนโลยี มีประสบการณ์มากกว่า 5 ปี ในการพัฒนาเว็บและเทคโนโลยีบล็อกเชน เชี่ยวชาญโครงการ TOR และแอปพลิเคชันแบบกระจายศูนย์ (DApps)",
    experience: [
      {
        id: "1",
        title: "นักพัฒนา Full Stack ระดับอาวุโส",
        company: "บริษัท เทคโซลูชันส์ จำกัด",
        location: "กรุงเทพมหานคร, ประเทศไทย",
        startDate: "2022-01",
        endDate: "ปัจจุบัน",
        current: true,
        description: "นำการพัฒนาแอปพลิเคชันตามข้อกำหนด TOR และสัญญาอัจฉริยะ (Smart Contracts)"
      },
      {
        id: "2",
        title: "นักพัฒนาบล็อกเชน",
        company: "คริปโต อินโนเวชันส์",
        location: "ทำงานระยะไกล (Remote)",
        startDate: "2020-06",
        endDate: "2021-12",
        current: false,
        description: "พัฒนาแอปพลิเคชันแบบกระจายศูนย์และโครงสร้างพื้นฐาน TOR"
      }
    ],
    education: [
      {
        id: "1",
        institution: "จุฬาลงกรณ์มหาวิทยาลัย",
        degree: "วิศวกรรมศาสตรบัณฑิต",
        field: "วิศวกรรมคอมพิวเตอร์",
        startDate: "2016-06",
        endDate: "2020-05",
        current: false
      }
    ],
    skills: [
      "React", "Next.js", "Node.js", "Python", "Docker", "Kubernetes",
      "AWS", "TypeScript", "Solidity", "GraphQL", "Tailwind CSS"
    ],
    torPreferences: {
      categories: ["การพัฒนาซอฟต์แวร์", "บล็อกเชน", "สมาร์ทคอนแทรต", "DApps"],
      locations: ["กรุงเทพมหานคร", "ทำงานระยะไกล"],
      remote: true,
      minBudget: 50000,
      maxBudget: 150000,
      availability: "พร้อมเริ่มงานทันที",
      experienceLevel: "ระดับอาวุโส (Senior)",
      projectTypes: ["งานประจำ", "สัญญาจ้าง", "งานพาร์ทไทม์"],
      languages: ["อังกฤษ", "ไทย"]
    },
    documents: [
      {
        id: "1",
        name: "TOR-001_ProjectProposal.pdf",
        type: "ข้อเสนอโครงการ (Proposal)",
        size: "2.4 MB",
        uploadedAt: "2024-01-15",
        status: "verified"
      },
      {
        id: "2",
        name: "Smart_Contract_Audit.pdf",
        type: "รายงานการตรวจสอบ",
        size: "1.8 MB",
        uploadedAt: "2024-01-10",
        status: "pending"
      }
    ],
    activity: [
      {
        id: "1",
        type: "project",
        title: "ยื่นข้อเสนอสำหรับโครงการ TOR-001",
        timestamp: "2024-01-15 14:30",
        status: "กำลังพิจารณา"
      },
      {
        id: "2",
        type: "document",
        title: "อัปเดตเอกสารแฟ้มสะสมผลงาน",
        timestamp: "2024-01-14 10:15",
        status: "เสร็จสิ้น"
      }
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      portfolio: "https://johndoe.dev"
    },
    statistics: {
      projectsCompleted: 12,
      successRate: 94,
      avgRating: 4.8,
      reviews: 37
    }
  }
};