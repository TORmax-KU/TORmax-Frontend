'use client';

import { useState } from 'react';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourcePortal: string;
  id: string;
  userProfile: {
    companyName: string;
    taxId: string;
    dunsNumber: string;
    primaryContact: string;
    email: string;
    phone: string;
    bankAccount: string;
  };
  t: {
    modalTitle: string;
    targetPortal: string;
    modalDesc: string;
    companyName: string;
    taxId: string;
    dunsNumber: string;
    primaryContact: string;
    contactEmail: string;
    bankAccount: string;
    copied: string;
    copy: string;
    proceedPortal: string;
    proceedSuffix: string;
    close: string;
  };
}

export function SubmissionModal({ 
  isOpen, 
  onClose, 
  sourcePortal, 
  id,
  userProfile,
  t 
}: SubmissionModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fields = [
    { label: t.companyName, key: 'companyName', val: userProfile.companyName },
    { label: t.taxId, key: 'taxId', val: userProfile.taxId },
    { label: t.dunsNumber, key: 'dunsNumber', val: userProfile.dunsNumber },
    { label: t.primaryContact, key: 'primaryContact', val: userProfile.primaryContact },
    { label: t.contactEmail, key: 'email', val: userProfile.email },
    { label: t.bankAccount, key: 'bankAccount', val: userProfile.bankAccount },
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden space-y-5 p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {t.modalTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {t.targetPortal} <strong>{sourcePortal}</strong> ({id})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.modalDesc}
        </p>

        {/* Quick Copy Data Grid */}
        <div className="space-y-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          {fields.map((field) => (
            <div
              key={field.key}
              className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60 last:border-0"
            >
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  {field.label}
                </span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {field.val}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(field.val, field.key)}
                className="text-[11px] text-tormax-purple dark:text-tormax-lavender hover:underline font-bold px-2 py-1 rounded bg-tormax-purple/10 border border-tormax-purple/20 cursor-pointer"
              >
                {copiedField === field.key ? t.copied : t.copy}
              </button>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <a
            href="https://www.gprocurement.go.th"
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-3 bg-tormax-purple hover:bg-tormax-purpleDeep text-white text-xs font-bold rounded-xl text-center shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.proceedPortal} {sourcePortal} {t.proceedSuffix}</span>
            <span>↗</span>
          </a>
          <button
            onClick={onClose}
            className="py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}