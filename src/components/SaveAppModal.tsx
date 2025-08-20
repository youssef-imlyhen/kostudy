import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { XMarkIcon, BookmarkIcon } from '@heroicons/react/24/outline';

interface SaveAppModalProps {
  onSave: (name: string, description: string) => void;
  onCancel: () => void;
  suggestedName?: string;
}

const SaveAppModal: React.FC<SaveAppModalProps> = ({
  onSave,
  onCancel,
  suggestedName = ''
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState(suggestedName);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSave(name.trim(), description.trim());
    } catch (error) {
      console.error('Error saving app:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-200">
          <div className="flex items-center">
            <BookmarkIcon className="w-6 h-6 text-primary mr-2" />
            <h3 className="text-lg font-semibold">
              {t('aiGenerator.saveModal.title')}
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="btn btn-sm btn-ghost btn-circle"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* App Name */}
          <div>
            <label htmlFor="appName" className="block text-sm font-medium mb-2">
              {t('aiGenerator.saveModal.nameLabel')} *
            </label>
            <input
              id="appName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              placeholder={t('aiGenerator.saveModal.namePlaceholder')}
              required
              maxLength={100}
              autoFocus
            />
            <div className="text-xs text-base-content/60 mt-1">
              {name.length}/100 {t('aiGenerator.saveModal.characters')}
            </div>
          </div>

          {/* App Description */}
          <div>
            <label htmlFor="appDescription" className="block text-sm font-medium mb-2">
              {t('aiGenerator.saveModal.descriptionLabel')}
            </label>
            <textarea
              id="appDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder={t('aiGenerator.saveModal.descriptionPlaceholder')}
              rows={3}
              maxLength={500}
            />
            <div className="text-xs text-base-content/60 mt-1">
              {description.length}/500 {t('aiGenerator.saveModal.characters')}
            </div>
          </div>

          {/* Info */}
          <div className="bg-info/10 border border-info/20 rounded-lg p-3">
            <div className="text-sm text-info-content">
              <strong>{t('aiGenerator.saveModal.infoTitle')}</strong>
              <div className="mt-1 text-xs">
                {t('aiGenerator.saveModal.infoText')}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-ghost"
              disabled={isSubmitting}
            >
              {t('aiGenerator.saveModal.cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  {t('aiGenerator.saveModal.saving')}
                </>
              ) : (
                <>
                  <BookmarkIcon className="w-4 h-4 mr-2" />
                  {t('aiGenerator.saveModal.save')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveAppModal;