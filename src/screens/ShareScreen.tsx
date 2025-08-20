import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function ShareScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [shareMethod, setShareMethod] = useState('');
  const [shareStatus, setShareStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleShare = (method: string) => {
    setShareMethod(method);
    // Simulate share operation
    setTimeout(() => {
      if (Math.random() > 0.2) {
        setShareStatus('success');
      } else {
        setShareStatus('error');
      }
    }, 1000);
  };

  const shareMethods = [
    { id: 'whatsapp', name: 'WhatsApp', icon: '📱' },
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
    { id: 'email', name: 'Email', icon: '✉️' },
    { id: 'link', name: t('shareScreen.copyLink'), icon: '🔗' },
  ];

  return (
    <div className="pt-4 pb-20">
      <Header title={t('shareScreen.title')} />

      <div className="px-4 mt-8">
        <div className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{t('shareScreen.inviteFriends')}</h2>
          <p className="text-base-content/80 mb-6">{t('shareScreen.helpGrow')}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {shareMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handleShare(method.id)}
                className="bg-primary/10 p-4 rounded-2xl flex flex-col items-center
                          hover:bg-primary/20 transition-colors border border-base-300"
              >
                <span className="text-2xl mb-2">{method.icon}</span>
                <span className="text-sm">{method.name}</span>
              </button>
            ))}
          </div>

          {shareStatus === 'success' && (
            <div className="bg-success/20 p-4 rounded-2xl flex items-center mb-4">
              <CheckCircleIcon className="w-6 h-6 text-success mr-3" />
              <div>
                <p className="font-medium">{t('shareScreen.successTitle')}</p>
                <p className="text-sm text-success-content/80">
                  {t('shareScreen.successMessage', { method: shareMethod })}
                </p>
              </div>
            </div>
          )}

          {shareStatus === 'error' && (
            <div className="bg-error/20 p-4 rounded-2xl flex items-center mb-4">
              <XCircleIcon className="w-6 h-6 text-error mr-3" />
              <div>
                <p className="font-medium">{t('shareScreen.errorTitle')}</p>
                <p className="text-sm text-error-content/80">
                  {t('shareScreen.errorMessage', { method: shareMethod })}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full btn btn-primary py-3 rounded-2xl font-medium text-lg
                      hover:shadow-elevated active:translate-y-0.5 transition-all duration-150
                      border-b-4 border-primary-focus"
          >
            {t('shareScreen.backToDashboard')}
          </button>
        </div>
      </div>
    </div>
  );
}
