'use client';

import Link from 'next/link';
import {
  RiAddLine,
  RiArrowRightLine,
  RiCalendarCheckLine,
  RiCheckLine,
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
    <section id="about-tor" aria-labelledby="about-tor-heading" className="mt-24 space-y-20 sm:mt-32">
      {/* Introduction */}
      <div className="grid gap-8 rounded-panel border border-line bg-surface p-8 sm:p-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <div className="space-y-4">
          <span className="ui-eyebrow">
            <RiLightbulbFlashLine size={14} /> ความรู้พื้นฐาน
          </span>
          <h2 id="about-tor-heading" className="ui-display text-4xl sm:text-5xl">
            TOR คืออะไร?
          </h2>
        </div>
        <p className="self-end text-base leading-[1.8] text-ink-2 sm:text-[17px]">
          <strong className="font-semibold text-ink">TOR (Terms of Reference)</strong> หรือขอบเขตของงาน คือเอกสารที่หน่วยงานรัฐหรือรัฐวิสาหกิจเผยแพร่
          เมื่อต้องการจัดซื้อจัดจ้างโครงการ โดยระบุอย่างชัดเจนว่าผู้ซื้อต้องการอะไร ใครมีสิทธิ์ยื่นข้อเสนอ
          วงเงินที่วางแผนไว้ และวิธีพิจารณาข้อเสนอ สำหรับผู้ประกอบการ TOR คือจุดเริ่มต้นของการยื่นข้อเสนอทุกครั้ง
        </p>
      </div>

      {/* What a TOR contains */}
      <div>
        <h3 className="ui-section-title text-xl">ใน TOR มีอะไรบ้าง</h3>
        <p className="mt-1.5 text-sm text-ink-3">หัวข้อสำคัญที่ควรอ่านก่อนตัดสินใจยื่นข้อเสนอ</p>
        <div className="mt-8 grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {contents.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group bg-surface p-6 sm:p-7 transition-colors duration-200 hover:bg-surface-2/60">
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand-tint text-accent">
                <Icon size={20} />
              </div>
              <h4 className="mt-5 font-semibold text-ink">{title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lifecycle */}
      <div>
        <h3 className="ui-section-title text-xl">วงจรชีวิตของ TOR</h3>
        <p className="mt-1.5 text-sm text-ink-3">ตั้งแต่ร่างแรกจนถึงการลงนามในสัญญา</p>
        <ol className="mt-8 grid gap-6 md:grid-cols-5 md:gap-5">
          {steps.map(({ title, text }, i) => (
            <li key={title} className="relative flex gap-4 md:block">
              {i < steps.length - 1 && <>
                <span aria-hidden className="absolute left-4 top-9 -bottom-6 w-px bg-line-strong md:hidden" />
                <span aria-hidden className="absolute left-10 right-0 top-4 hidden h-px bg-line-strong md:block" />
              </>}
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-[13px] font-semibold tabular-nums text-accent">
                {i + 1}
              </span>
              <div className="md:mt-4">
                <h4 className="font-semibold text-ink">{title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-ink-3">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* FAQ & checklist */}
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-3">
          <h3 className="ui-section-title text-xl">คำถามที่พบบ่อย</h3>
          <div className="mt-6 divide-y divide-line rounded-card border border-line bg-surface">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-ink transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  {q}
                  <RiAddLine size={18} className="shrink-0 text-ink-3 transition-transform duration-200 group-open:rotate-45 group-open:text-accent" />
                </summary>
                <p className="ui-reveal px-5 pb-5 -mt-1 text-sm leading-relaxed text-ink-3">{a}</p>
              </details>
            ))}
          </div>
        </div>

        <aside className="self-start rounded-card border border-line bg-surface p-7 lg:col-span-2 lg:mt-12">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-tint text-accent"><RiShieldCheckLine size={18} /></span>
            <h3 className="ui-section-title">ตรวจสอบก่อนยื่นข้อเสนอ</h3>
          </div>
          <ul className="mt-5 space-y-3 text-sm text-ink-2">
            {[
              'คุณมีคุณสมบัติครบตามที่บังคับทุกข้อ',
              'ทีมของคุณมีทักษะและใบรับรองตามที่กำหนด',
              'ราคากลางครอบคลุมต้นทุนของคุณ',
              'คุณส่งมอบงานได้ทันตามกำหนดเวลา',
              'เตรียมเอกสารครบถ้วนก่อนวันปิดรับ',
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <RiCheckLine size={16} className="mt-0.5 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/search-feed" className="ui-btn ui-btn-primary mt-7">
            <RiSearchEyeLine size={17} /> สำรวจ TOR <RiArrowRightLine size={16} />
          </Link>
        </aside>
      </div>
    </section>
  );
}
