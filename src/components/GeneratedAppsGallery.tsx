import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useGeneratedApps } from '../hooks/useGeneratedApps';
import { GeneratedApp } from '../types/aiGenerator';
import AppPreview from './AppPreview';
import {
  PlayIcon,
  TrashIcon,
  CalendarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const GeneratedAppsGallery: React.FC = () => {
  const { t } = useLanguage();
  const { apps, deleteApp } = useGeneratedApps();
  const [selectedApp, setSelectedApp] = useState<GeneratedApp | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'game':
        return '🎮';
      case 'lesson':
        return '📚';
      case 'simulation':
        return '🔬';
      case 'tool':
        return '🛠️';
      default:
        return '✨';
    }
  };

  const handleDelete = (id: string) => {
    deleteApp(id);
    setShowDeleteConfirm(null);
    if (selectedApp?.id === id) {
      setSelectedApp(null);
    }
  };

  const handlePreview = (app: GeneratedApp) => {
    setSelectedApp(app);
  };

  if (apps.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎨</div>
        <h3 className="text-xl font-semibold text-base-content/70 mb-2">
          {t('aiGenerator.gallery.empty.title')}
        </h3>
        <p className="text-base-content/50">
          {t('aiGenerator.gallery.empty.description')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <div key={app.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{getCategoryIcon(app.category)}</span>
                  <div>
                    <h3 className="card-title text-base font-semibold line-clamp-1">
                      {app.name}
                    </h3>
                    {app.category && (
                      <div className="badge badge-sm badge-outline mt-1">
                        {app.category}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              {app.description && (
                <p className="text-sm text-base-content/70 line-clamp-2 mb-3">
                  {app.description}
                </p>
              )}

              {/* Metadata */}
              <div className="flex items-center text-xs text-base-content/60 mb-4">
                <CalendarIcon className="w-3 h-3 mr-1" />
                {formatDate(app.createdAt)}
              </div>

              {/* Actions */}
              <div className="card-actions justify-end">
                <button
                  onClick={() => handlePreview(app)}
                  className="btn btn-sm btn-primary"
                >
                  <PlayIcon className="w-4 h-4 mr-1" />
                  {t('aiGenerator.gallery.preview')}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(app.id)}
                  className="btn btn-sm btn-ghost text-error hover:bg-error/10"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* App Preview Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-base-200">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getCategoryIcon(selectedApp.category)}</span>
                <div>
                  <h3 className="text-lg font-semibold">{selectedApp.name}</h3>
                  {selectedApp.description && (
                    <p className="text-sm text-base-content/70">{selectedApp.description}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="btn btn-sm btn-ghost btn-circle"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4" style={{ height: 'calc(90vh - 120px)' }}>
              <AppPreview htmlContent={selectedApp.htmlContent} />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {t('aiGenerator.gallery.deleteConfirm.title')}
              </h3>
              <p className="text-base-content/70 mb-6">
                {t('aiGenerator.gallery.deleteConfirm.message')}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="btn btn-ghost"
                >
                  {t('aiGenerator.gallery.deleteConfirm.cancel')}
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="btn btn-error"
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  {t('aiGenerator.gallery.deleteConfirm.delete')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratedAppsGallery;