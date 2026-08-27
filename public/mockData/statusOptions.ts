import { Language } from "./Language";

export const statusOptions: Record<Language, string[]> = {
  en: ["Open", "In Progress", "Review", "Completed", "On Hold", "Cancelled", "Draft"],
  th: ["เปิดรับสมัคร", "กำลังดำเนินการ", "อยู่ระหว่างการตรวจทาน", "เสร็จสิ้น", "ระงับชั่วคราว", "ยกเลิก", "ฉบับร่าง"]
};