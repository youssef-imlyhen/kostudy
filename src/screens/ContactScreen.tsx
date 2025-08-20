import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import { EnvelopeIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function ContactScreen() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate API call
    setTimeout(() => {
      if (Math.random() > 0.2) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <div className="pt-4 pb-20">
      <Header title={t('contactScreen.title')} />

      <div className="px-4 mt-8">
        <div className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-sm">
          <div className="flex items-center mb-6">
            <EnvelopeIcon className="w-10 h-10 text-primary mr-4" />
            <h2 className="text-2xl font-bold">{t('contactScreen.getInTouch')}</h2>
          </div>

          <p className="text-base-content/80 mb-6">
            {t('contactScreen.description')}
          </p>

          {status === 'success' && (
            <div className="bg-success/20 p-4 rounded-2xl flex items-center mb-6">
              <CheckCircleIcon className="w-6 h-6 text-success mr-3" />
              <p className="text-success-content">{t('contactScreen.successMessage')}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-error/20 p-4 rounded-2xl flex items-center mb-6">
              <XCircleIcon className="w-6 h-6 text-error mr-3" />
              <p className="text-error-content">{t('contactScreen.errorMessage')}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                {t('contactScreen.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-base-200 text-base-content py-2 px-3 rounded-lg
                          focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                {t('contactScreen.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-base-200 text-base-content py-2 px-3 rounded-lg
                          focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                {t('contactScreen.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-base-200 text-base-content py-2 px-3 rounded-lg
                          focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full btn btn-primary py-3 rounded-2xl font-medium text-lg
                        hover:shadow-elevated active:translate-y-0.5 transition-all duration-150
                        border-b-4 border-primary-focus
                        disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? t('contactScreen.sending') : t('contactScreen.sendMessage')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
