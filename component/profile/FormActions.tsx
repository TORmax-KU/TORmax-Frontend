'use client';

import { useRouter } from 'next/navigation';

interface FormActionsProps {
  onCancel?: () => void;
  cancelText: string;
  saveText: string;
}

export function FormActions({ 
  onCancel, 
  cancelText, 
  saveText 
}: FormActionsProps) {
  const router = useRouter();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push('/home');
    }
  };

  return (
    <div className="flex justify-end gap-4 pt-4">
      <button
        type="button"
        onClick={handleCancel}
        className="px-6 py-3 border border-slate-300 dark:border-tormax-borderDark font-bold text-xs text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      >
        {cancelText}
      </button>
      <button
        type="submit"
        className="px-8 py-3 bg-tormax-purple hover:bg-tormax-purpleDeep text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
      >
        {saveText}
      </button>
    </div>
  );
}