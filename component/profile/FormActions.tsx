'use client';

import { useRouter } from 'next/navigation';

interface FormActionsProps {
  onCancel?: () => void;
  cancelText: string;
  saveText: string;
  disabled?: boolean;
}

export function FormActions({
  onCancel,
  cancelText,
  saveText,
  disabled = false,
}: FormActionsProps) {
  const router = useRouter();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex justify-end gap-2 pt-2">
      <button
        type="button"
        onClick={handleCancel}
        className="ui-btn ui-btn-secondary"
      >
        {cancelText}
      </button>
      <button
        type="submit"
        disabled={disabled}
        className="ui-btn ui-btn-primary px-6"
      >
        {saveText}
      </button>
    </div>
  );
}
