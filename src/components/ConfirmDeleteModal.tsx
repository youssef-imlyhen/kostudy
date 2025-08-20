import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm Delete',
  cancelText = 'Cancel',
}) => {
  const { designTokens } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        className="bg-base-100 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border-2 border-b-4 border-base-300"
      >
        <div className="p-6">
          <h3
            className="text-xl font-bold mb-4"
            style={{
              color: designTokens.colors.text,
              fontFamily: designTokens.typography.fontFamily,
              fontWeight: designTokens.typography.fontWeight.bold,
            }}
          >
            {title}
          </h3>
          <p
            className="mb-6"
            style={{
              color: designTokens.colors.textMuted,
              fontFamily: designTokens.typography.fontFamily,
              lineHeight: designTokens.typography.lineHeight.body,
            }}
          >
            {message}
          </p>
        </div>
        <div className="bg-base-200 px-6 py-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="btn btn-ghost rounded-2xl"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="btn btn-error rounded-2xl border-b-4 border-error-focus
                      hover:shadow-elevated active:translate-y-0.5 transition-all duration-150"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;