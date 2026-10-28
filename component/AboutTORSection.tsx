'use client';

import Link from 'next/link';
import {
  RiAddLine,
  RiArrowRightLine,
  RiCalendarCheckLine,
  RiFileTextLine,
  RiLightbulbFlashLine,
  RiMoneyDollarCircleLine,
  RiScales3Line,
  RiSearchEyeLine,
  RiShieldCheckLine,
  RiTaskLine,
  RiUserStarLine,
} from '@remixicon/react';

const contents = [
  { icon: RiTaskLine, title: 'ขอบเขตของงาน', text: 'สิ่งที่หน่วยงานต้องการให้พัฒนา ส่งมอบ หรือดำเนินการ รวมถึงปัญหาที่ต้องการแก้ไข' },
  { icon: RiFileTextLine, title: 'สิ่งที่ต้องส่งมอบ', text: 'ผลงานที่จับต้องได้ เช่น โมดูลซอฟต์แวร์ เอกสาร การฝึกอบรม และงวดงานการติดตั้ง' },
  { icon: RiUserStarLine, title: 'คุณสมบัติผู้ยื่นข้อเสนอ', text: 'ผู้ที่มีสิทธิ์ยื่นข้อเสนอ: การจดทะเบียน ผลงานที่ผ่านมา ใบรับรอง และบุคลากรที่กำหนด' },
  { icon: RiMoneyDollarCircleLine, title: 'งบประมาณและราคากลาง', text: 'วงเงินงบประมาณที่ได้รับอนุมัติ และราคากลางที่หน่วยงานใช้พิจารณาข้อเสนอ' },
  { icon: RiCalendarCheckLine, title: 'ระยะเวลาและการชำระเงิน', text: 'ระยะเวลาสัญญา งวดการส่งมอบ งวดการจ่ายเงิน การรับประกัน และค่าปรับ' },
  { icon: RiScales3Line, title: 'เกณฑ์การพิจารณา', text: 'วิธีให้คะแนนข้อเสนอ — ราคาต่ำสุด หรือการถ่วงน้ำหนักระหว่างราคาและคุณภาพทางเทคนิค' },
];

const steps = [
  { title: 'ร่าง TOR', text: 'หน่วยงานเผยแพร่ร่างเพื่อรับฟังความคิดเห็น ให้ผู้ประกอบการชี้จุดที่ไม่ชัดเจนหรือกีดกัน' },
  { title: 'ประกาศ', text: 'ประกาศ TOR ฉบับจริงและเชิญชวนยื่นข้อเสนอ พร้อมกำหนดวันปิดรับ' },
  { title: 'ยื่นข้อเสนอ', text: 'ผู้ประกอบการจัดทำข้อเสนอด้านเทคนิคและราคา แล้วยื่นก่อนวันปิดรับ' },
  { title: 'พิจารณา', text: 'คณะกรรมการตรวจสอบคุณสมบัติ ให้คะแนนข้อเสนอ และประกาศผู้ชนะ' },
  { title: 'ทำสัญญา', text: 'ผู้ชนะลงนามในสัญญาและส่งมอบงานตามที่ระบุใน TOR' },
];

const faqs = [
  { q: 'TOR ย่อมาจากอะไร?', a: 'TOR ย่อมาจาก "Terms of Reference" หรือขอบเขตของงาน ในการจัดซื้อจัดจ้างภาครัฐของไทย คือเอกสารทางการที่กำหนดความต้องการของโครงการที่หน่วยงานต้องการจัดซื้อหรือจัดจ้าง' },
  { q: 'ทำไมต้องอ่าน TOR อย่างละเอียด?', a: 'TOR คือกติกาของการยื่นข้อเสนอ หากข้อเสนอขาดคุณสมบัติหรือเอกสารที่บังคับแม้เพียงข้อเดียว ก็อาจถูกตัดสิทธิ์ได้ ไม่ว่าราคาจะดีเพียงใด' },
  { q: 'TOR เปลี่ยนแปลงได้หลังประกาศหรือไม่?', a: 'ได้ ร่าง TOR มักถูกปรับแก้หลังรับฟังความคิดเห็น และหน่วยงานอาจออกคำชี้แจงหรือแก้ไขเพิ่มเติมก่อนวันปิดรับ ควรตรวจสอบฉบับล่าสุดเสมอ' },
  { q: 'TORmax ช่วยอะไรได้บ้าง?', a: 'TORmax รวบรวม TOR ด้านไอทีและซอฟต์แวร์จากแหล่งข้อมูลสาธารณะ ตรวจสอบวันปิดรับและเอกสาร และสรุปทักษะ สิ่งที่ต้องส่งมอบ และคุณสมบัติ เพื่อให้คุณตัดสินใจได้รวดเร็วว่าโครงการเหมาะกับคุณหรือไม่' },
];

export function AboutTORSection() {
  return (
    <section id="about-tor" aria-labelledby="about-tor-heading" className="mt-20 space-y-14">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--tormax-purple-deep)] via-[var(--tormax-purple)] to-indigo-500 p-8 sm:p-12 text-white shadow-xl">
        <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div aria-hidden className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <RiLightbulbFlashLine size={14} /> ความรู้พื้นฐาน
          </span>
          <h2 id="about-tor-heading" className="mt-4 text-3xl sm:text-4xl font-black tracking-tight">
            TOR คืออะไร?
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/90">
            <strong>TOR (Terms of Reference)</strong> หรือขอบเขตของงาน คือเอกสารที่หน่วยงานรัฐหรือรัฐวิสาหกิจเผยแพร่
            เมื่อต้องการจัดซื้อจัดจ้างโครงการ โดยระบุอย่างชัดเจนว่าผู้ซื้อต้องการอะไร ใครมีสิทธิ์ยื่นข้อเสนอ
            วงเงินที่วางแผนไว้ และวิธีพิจารณาข้อเสนอ สำหรับผู้ประกอบการ TOR คือจุดเริ่มต้นของการยื่นข้อเสนอทุกครั้ง
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold">ใน TOR มีอะไรบ้าง</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">หัวข้อสำคัญที่ควรอ่านก่อนตัดสินใจยื่นข้อเสนอ</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {contents.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-tormax-purple hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-tormax-purple dark:bg-violet-500/15 dark:text-tormax-lavender transition group-hover:bg-tormax-purple group-hover:text-white">
                <Icon size={22} />
              </div>
              <h4 className="mt-4 font-bold">{title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold">วงจรชีวิตของ TOR</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">ตั้งแต่ร่างแรกจนถึงการลงนามในสัญญา</p>
        <ol className="mt-6 grid gap-4 md:grid-cols-5">
          {steps.map(({ title, text }, i) => (
            <li key={title} className="relative rounded-2xl bg-slate-50 dark:bg-slate-900/60 p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tormax-purple text-sm font-black text-white">
                {i + 1}
              </span>
              <h4 className="mt-3 font-bold">{title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{text}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h3 className="text-xl font-bold">คำถามที่พบบ่อย</h3>
          <div className="mt-6 space-y-3">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 open:border-tormax-purple"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {q}
                  <RiAddLine size={20} className="shrink-0 text-tormax-purple dark:text-tormax-lavender transition group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{a}</p>
              </details>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-2 rounded-3xl border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 p-7 self-start">
          <div className="flex items-center gap-2 text-tormax-purple dark:text-tormax-lavender">
            <RiShieldCheckLine size={22} />
            <h3 className="text-lg font-bold">ตรวจสอบก่อนยื่นข้อเสนอ</h3>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
            {[
              'คุณมีคุณสมบัติครบตามที่บังคับทุกข้อ',
              'ทีมของคุณมีทักษะและใบรับรองตามที่กำหนด',
              'ราคากลางครอบคลุมต้นทุนของคุณ',
              'คุณส่งมอบงานได้ทันตามกำหนดเวลา',
              'เตรียมเอกสารครบถ้วนก่อนวันปิดรับ',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tormax-purple" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/search-feed"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-tormax-purple px-5 py-3 text-sm font-bold text-white transition hover:bg-tormax-purpleDeep"
          >
            <RiSearchEyeLine size={18} /> สำรวจ TOR <RiArrowRightLine size={16} />
          </Link>
        </aside>
      </div>
    </section>
  );
}
