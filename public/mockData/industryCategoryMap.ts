import { Language } from "./Language";

export const industryCategoryMap: Record<Language, Record<string, string[]>> = {
  en: {
    "Technology": ["Web Development", "Mobile Development", "AI & Machine Learning", "Data Science & Analytics", "Cloud Computing", "DevOps & Infrastructure", "Cybersecurity", "Blockchain & Web3", "IoT & Embedded Systems", "AR/VR & Metaverse", "Game Development"],
    "Healthcare": ["Medical Research", "Healthcare Administration", "Biotechnology"],
    "Finance": ["Finance & Accounting", "Business Consulting"],
    "Education": ["Academic Research", "Curriculum Development", "Educational Technology"],
    "Retail & E-commerce": ["Digital Marketing", "UI/UX Design", "Content Marketing"],
    "Manufacturing": ["Project Management", "Supply Chain Management"],
    "Construction": ["Civil Engineering", "Architecture", "Construction Management"],
    "Media & Entertainment": ["Video Production", "Animation & Motion Graphics", "Music Production", "Film Production"],
    "Non-Profit": ["Non-Profit Management", "Community Development", "Social Work"],
    "Government": ["Public Administration", "Policy Research"],
    "Real Estate": ["Real Estate", "Property Management"],
    "Professional Services": ["Business Consulting", "Legal Services", "Project Management"],
  },
  th: {
    "เทคโนโลยี": ["การพัฒนาเว็บไซต์", "การพัฒนาแอปพลิเคชันมือถือ", "ปัญญาประดิษฐ์และแมชชีนเลิร์นนิง", "วิทยาการข้อมูลและการวิเคราะห์", "ระบบคลาวด์คอมพิวติ้ง", "DevOps และโครงสร้างพื้นฐานระบบ", "ความปลอดภัยทางไซเบอร์", "บล็อกเชนและ Web3", "อินเทอร์เน็ตของสรรพสิ่ง (IoT) และระบบฝังตัว", "AR/VR และเมตาเวิร์ส", "การพัฒนาเกม"],
    "การแพทย์และสาธารณสุข": ["การวิจัยทางการแพทย์", "การบริหารจัดการสาธารณสุข", "เทคโนโลยีชีวภาพ"],
    "การเงินและการธนาคาร": ["การเงินและการบัญชี", "การให้คำปรึกษาทางธุรกิจ"],
    "การศึกษา": ["การวิจัยทางวิชาการ", "การพัฒนาหลักสูตร", "เทคโนโลยีทางการศึกษา"],
    "ค้าปลีกและอีคอมเมิร์ซ": ["การตลาดดิจิทัล", "การออกแบบ UI/UX", "การตลาดผ่านเนื้อหา (Content Marketing)"],
    "การผลิต": ["การบริหารจัดการโครงการ", "การจัดการห่วงโซ่อุปทาน"],
    "การก่อสร้าง": ["วิศวกรรมโยธา", "สถาปัตยกรรม", "การบริหารงานก่อสร้าง"],
    "สื่อและความบันเทิง": ["การผลิตวิดีโอ", "แอนิเมชันและโมชันกราฟิก", "การผลิตดนตรี", "การผลิตภาพยนตร์"],
    "องค์กรไม่แสวงหากำไร": ["การบริหารจัดการองค์กรไม่แสวงหากำไร", "การพัฒนาชุมชน", "สังคมสงเคราะห์"],
    "หน่วยงานภาครัฐ": ["รัฐประศาสนศาสตร์", "การวิจัยเชิงนโยบาย"],
    "อสังหาริมทรัพย์": ["อสังหาริมทรัพย์", "การบริหารจัดการอสังหาริมทรัพย์"],
    "บริการวิชาชีพ": ["การให้คำปรึกษาทางธุรกิจ", "บริการด้านกฎหมาย", "การบริหารจัดการโครงการ"],
  }
};