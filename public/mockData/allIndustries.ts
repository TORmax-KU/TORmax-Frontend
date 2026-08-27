import { Language } from "./Language";

export const allIndustries: Record<Language, string[]> = {
    en: [
        "Technology", "Healthcare", "Finance", "Education",
        "Retail & E-commerce", "Manufacturing", "Construction",
        "Energy & Utilities", "Transportation & Logistics",
        "Media & Entertainment", "Non-Profit", "Government",
        "Real Estate", "Agriculture", "Hospitality",
        "Professional Services", "Telecommunications",
        "Aerospace & Defense", "Automotive", "Food & Beverage"
    ],
    th: [
        "เทคโนโลยี", "การแพทย์และสาธารณสุข", "การเงินและการธนาคาร", "การศึกษา",
        "ค้าปลีกและอีคอมเมิร์ซ", "การผลิต", "การก่อสร้าง",
        "พลังงานและสาธารณูปโภค", "การขนส่งและโลจิสติกส์",
        "สื่อและความบันเทิง", "องค์กรไม่แสวงหากำไร", "หน่วยงานภาครัฐ",
        "อสังหาริมทรัพย์", "เกษตรกรรม", "การบริการและโรงแรม",
        "บริการวิชาชีพ", "โทรคมนาคม",
        "การบินและยุทโธปกรณ์", "ยานยนต์", "อาหารและเครื่องดื่ม"
    ]
};