'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FormField } from '@/component/profile/FormField';
import { SkillsSection } from '@/component/profile/SkillsSection';
import { FormSection } from '@/component/profile/FormSection';
import { PRICE_CATEGORIES, Project } from '@/lib/projects';
import { fromBangkokLocalInput, PostingInput, PostingValidationError, toBangkokLocalInput } from '@/lib/postings';

interface FormState {
  title: string;
  description: string;
  category: string;
  agency: string;
  skills: string[];
  budgetMin: string;
  budget: string;
  deadline: string; // datetime-local, Thailand time
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  sourceUrl: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

// API error keys -> form fields.
const API_FIELDS: Record<string, keyof FormState> = {
  title: 'title', description: 'description', category: 'category', agency: 'agency', skillNames: 'skills',
  budgetMin: 'budgetMin', budget: 'budget', deadline: 'deadline', sourceUrl: 'sourceUrl',
  'contact.name': 'contactName', 'contact.email': 'contactEmail', 'contact.phone': 'contactPhone',
};

function initialState(project?: Project, defaults?: { agency?: string; contactName?: string; contactEmail?: string; contactPhone?: string }): FormState {
  const skills = (project?.requiredSkills || []).flatMap(skill => typeof skill === 'string' ? [] : [skill.name]);
  return {
    title: project?.title || '',
    description: project?.description || '',
    category: project?.category && PRICE_CATEGORIES[project.category] ? project.category : '',
    agency: project?.agency ?? defaults?.agency ?? '',
    skills: skills.length ? skills : project?.sourceSkillNames || [],
    budgetMin: project?.budgetMin != null ? String(project.budgetMin) : '',
    budget: project?.budget != null ? String(project.budget) : '',
    deadline: toBangkokLocalInput(project?.deadline),
    contactName: project?.contact?.name ?? defaults?.contactName ?? '',
    contactEmail: project?.contact?.email ?? defaults?.contactEmail ?? '',
    contactPhone: project?.contact?.phone ?? defaults?.contactPhone ?? '',
    sourceUrl: project?.sourceUrl || '',
  };
}

// Mirrors the API rules so most mistakes are caught before submitting (UC4 E1).
function validate(form: FormState, th: boolean, requireFutureDeadline: boolean): Errors {
  const errors: Errors = {};
  const say = (thText: string, enText: string) => (th ? thText : enText);
  if (form.title.trim().length < 5) errors.title = say('กรอกชื่องานอย่างน้อย 5 ตัวอักษร', 'Enter a title of at least 5 characters');
  if (form.description.trim().length < 20) errors.description = say('อธิบายขอบเขตงานอย่างน้อย 20 ตัวอักษร', 'Describe the scope in at least 20 characters');
  if (!form.category) errors.category = say('เลือกหมวดหมู่งาน', 'Choose a category');
  if (!form.skills.length) errors.skills = say('เพิ่มทักษะที่ต้องใช้อย่างน้อย 1 รายการ', 'Add at least one required skill');
  const max = Number(form.budget);
  const min = form.budgetMin.trim() === '' ? null : Number(form.budgetMin);
  if (form.budget.trim() === '' || !Number.isFinite(max) || max <= 0) errors.budget = say('กรอกงบประมาณสูงสุดที่มากกว่า 0', 'Enter a maximum budget above 0');
  if (min !== null && (!Number.isFinite(min) || min < 0)) errors.budgetMin = say('งบขั้นต่ำต้องไม่ติดลบ', 'Minimum budget cannot be negative');
  else if (min !== null && !errors.budget && min > max) errors.budgetMin = say('งบขั้นต่ำต้องไม่เกินงบสูงสุด', 'Minimum cannot exceed the maximum');
  const deadline = fromBangkokLocalInput(form.deadline);
  if (!deadline) errors.deadline = say('เลือกวันและเวลาปิดรับสมัคร', 'Choose an application deadline');
  else if (requireFutureDeadline && Date.parse(deadline) <= Date.now()) errors.deadline = say('วันปิดรับต้องเป็นอนาคต', 'Deadline must be in the future');
  if (!form.contactName.trim()) errors.contactName = say('กรอกชื่อผู้ติดต่อ', 'Enter a contact name');
  if (!form.contactEmail.trim() && !form.contactPhone.trim()) errors.contactEmail = say('กรอกอีเมลหรือเบอร์โทรอย่างน้อยหนึ่งช่องทาง', 'Give an email or phone number');
  else if (form.contactEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail.trim())) errors.contactEmail = say('อีเมลไม่ถูกต้อง', 'Enter a valid email');
  if (form.sourceUrl.trim() && !/^https:\/\//i.test(form.sourceUrl.trim())) errors.sourceUrl = say('ลิงก์ต้องขึ้นต้นด้วย https://', 'Link must start with https://');
  return errors;
}

function toInput(form: FormState): PostingInput {
  return {
    title: form.title.trim(),
    description: form.description.trim(),
    category: form.category,
    agency: form.agency.trim(),
    skillNames: form.skills,
    budgetMin: form.budgetMin.trim() === '' ? null : Number(form.budgetMin),
    budget: Number(form.budget),
    deadline: fromBangkokLocalInput(form.deadline),
    contact: { name: form.contactName.trim(), email: form.contactEmail.trim(), phone: form.contactPhone.trim() },
    sourceUrl: form.sourceUrl.trim(),
  };
}

interface PostingFormProps {
  lang: 'th' | 'en';
  project?: Project;
  defaults?: { agency?: string; contactName?: string; contactEmail?: string; contactPhone?: string };
  submitLabel: string;
  onSubmit: (input: PostingInput) => Promise<void>;
}

export function PostingForm({ lang, project, defaults, submitLabel, onSubmit }: PostingFormProps) {
  const th = lang === 'th';
  const [form, setForm] = useState<FormState>(() => initialState(project, defaults));
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const originalDeadline = toBangkokLocalInput(project?.deadline);

  const set = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(current => ({ ...current, [field]: event.target.value }));
    setErrors(current => ({ ...current, [field]: undefined }));
  };

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    // An unchanged deadline on an existing posting may already have passed.
    const found = validate(form, th, !project || form.deadline !== originalDeadline);
    setErrors(found);
    setFormError('');
    if (Object.keys(found).length) {
      setFormError(th ? 'กรุณาแก้ไขช่องที่ไฮไลต์' : 'Please fix the highlighted fields.');
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setSaving(true);
    try {
      const input = toInput(form);
      // Leaving the deadline untouched must not re-send it, or the API would require it to be in the future.
      if (project && form.deadline === originalDeadline) delete (input as Partial<PostingInput>).deadline;
      await onSubmit(input);
    } catch (error) {
      if (error instanceof PostingValidationError) {
        const mapped: Errors = {};
        for (const [key, message] of Object.entries(error.fields)) mapped[API_FIELDS[key] || 'title'] = message;
        setErrors(mapped);
        setFormError(th ? 'กรุณาแก้ไขช่องที่ไฮไลต์' : 'Please fix the highlighted fields.');
      } else {
        setFormError(error instanceof Error ? error.message : (th ? 'บันทึกไม่สำเร็จ' : 'Could not save.'));
      }
    } finally {
      setSaving(false);
    }
  }

  const label = 'ui-label';
  const errorText = (id: string, error?: string) => error ? <p id={`${id}-error`} className="ui-error-text">{error}</p> : null;

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <FormSection title={th ? 'รายละเอียดงาน' : 'Project details'} description={th ? 'บอกผู้ให้บริการว่าต้องการอะไร' : 'Tell vendors what you need built.'}>
        <div className="space-y-5">
          <FormField id="title" label={th ? 'ชื่องาน *' : 'Title *'} value={form.title} onChange={set('title')} error={errors.title} />
          <div className="space-y-1.5">
            <label htmlFor="description" className={label}>{th ? 'ขอบเขตงาน *' : 'Scope of work *'}</label>
            <textarea id="description" rows={7} value={form.description} onChange={set('description')} maxLength={10000}
              aria-invalid={errors.description ? true : undefined} aria-describedby={errors.description ? 'description-error' : undefined}
              placeholder={th ? 'วัตถุประสงค์ งานที่ต้องส่งมอบ ระยะเวลา และข้อจำกัดสำคัญ' : 'Purpose, deliverables, timeline and key constraints'}
              className="ui-field" />
            {errorText('description', errors.description)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="category" className={label}>{th ? 'หมวดหมู่ *' : 'Category *'}</label>
              <select id="category" value={form.category} onChange={set('category')} aria-invalid={errors.category ? true : undefined} aria-describedby={errors.category ? 'category-error' : undefined} className="ui-field">
                <option value="">{th ? 'เลือกหมวดหมู่' : 'Choose a category'}</option>
                {Object.entries(PRICE_CATEGORIES).filter(([key]) => key !== 'all-it').map(([key, labels]) => <option key={key} value={key}>{labels[th ? 0 : 1]}</option>)}
              </select>
              <p className="ui-hint">{th ? 'ใช้เทียบงบประมาณกับ TOR ภาครัฐในหมวดเดียวกัน' : 'Used to compare your budget with government TORs in the same category.'}</p>
              {errorText('category', errors.category)}
            </div>
            <FormField id="agency" label={th ? 'องค์กร / บริษัท' : 'Organization'} value={form.agency} onChange={set('agency')} error={errors.agency} />
          </div>
        </div>
      </FormSection>

      <div id="skills" tabIndex={-1} className={errors.skills ? 'rounded-panel ring-2 ring-danger/60 ring-offset-2 ring-offset-canvas' : 'rounded-panel'}>
        <SkillsSection skills={form.skills} onChange={skills => { setForm(current => ({ ...current, skills })); setErrors(current => ({ ...current, skills: undefined })); }} t={{
          skillsTitle: th ? 'ทักษะและเทคโนโลยีที่ต้องใช้ *' : 'Required skills & stack *',
          skillsDesc: th ? 'ผู้ให้บริการที่มีทักษะตรงจะได้รับแจ้งเตือนทันที' : 'Vendors with matching skills are notified as soon as you publish.',
          selectedSkills: th ? 'ทักษะที่เลือก' : 'Selected',
          suggestedSkills: th ? 'ทักษะแนะนำ' : 'Suggestions',
          customSkill: th ? 'เพิ่มทักษะอื่น' : 'Add another skill',
          customSkillPlaceholder: th ? 'เช่น PostgreSQL' : 'e.g. PostgreSQL',
          addSkill: th ? 'เพิ่ม' : 'Add',
          removeSkill: th ? 'ลบ' : 'Remove',
          skillsLimit: th ? 'สูงสุด 30 ทักษะ' : 'Up to 30 skills',
        }} />
      </div>
      {errors.skills && <p className="ui-error-text -mt-2 px-1">{errors.skills}</p>}

      <FormSection title={th ? 'งบประมาณและกำหนดเวลา' : 'Budget & deadline'} description={th ? 'งบเป็นบาท เวลาเป็นเวลาไทย (GMT+7)' : 'Budget in THB. Times are Thailand time (GMT+7).'}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FormField id="budgetMin" label={th ? 'งบขั้นต่ำ (ไม่บังคับ)' : 'Minimum budget (optional)'} type="number" min={0} value={form.budgetMin} onChange={set('budgetMin')} error={errors.budgetMin} />
          <FormField id="budget" label={th ? 'งบสูงสุด *' : 'Maximum budget *'} type="number" min={0} value={form.budget} onChange={set('budget')} error={errors.budget} />
          <FormField id="deadline" label={th ? 'ปิดรับสมัคร *' : 'Application deadline *'} type="datetime-local" value={form.deadline} onChange={set('deadline')} error={errors.deadline} />
        </div>
      </FormSection>

      <FormSection title={th ? 'ช่องทางติดต่อ' : 'Contact details'} description={th ? 'แสดงในหน้างานเพื่อให้ผู้ให้บริการติดต่อสอบถามได้' : 'Shown on the posting so vendors can ask questions before applying.'}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FormField id="contactName" label={th ? 'ชื่อผู้ติดต่อ *' : 'Contact name *'} value={form.contactName} onChange={set('contactName')} error={errors.contactName} />
          <FormField id="contactEmail" label={th ? 'อีเมล' : 'Email'} type="email" value={form.contactEmail} onChange={set('contactEmail')} error={errors.contactEmail} />
          <FormField id="contactPhone" label={th ? 'โทรศัพท์' : 'Phone'} type="tel" value={form.contactPhone} onChange={set('contactPhone')} error={errors.contactPhone} />
        </div>
        <FormField id="sourceUrl" label={th ? 'ลิงก์รายละเอียดเพิ่มเติม (ไม่บังคับ)' : 'Link to more details (optional)'} type="url" value={form.sourceUrl} onChange={set('sourceUrl')} error={errors.sourceUrl} />
      </FormSection>

      {formError && <p role="alert" className="ui-alert ui-alert-danger">{formError}</p>}
      <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
        <Link href="/postings" className="ui-btn ui-btn-secondary">{th ? 'ยกเลิก' : 'Cancel'}</Link>
        <button type="submit" disabled={saving} className="ui-btn ui-btn-primary px-6">
          {saving && <span className="ui-spinner h-3.5 w-3.5" aria-hidden />}
          {saving ? (th ? 'กำลังบันทึก…' : 'Saving…') : submitLabel}
        </button>
      </div>
    </form>
  );
}
