import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function AboutScreen() {
  const { t } = useLanguage();

  return (
    <div className="pt-4 pb-20">
      <Header title={t('aboutScreen.title')} />

      <div className="px-4 mt-8">
        <div className="bg-base-100 rounded-2xl p-6 border border-base-300 shadow-sm">
          <div className="flex items-center mb-6">
            <InformationCircleIcon className="w-10 h-10 text-primary mr-4" />
            <h2 className="text-2xl font-bold">{t('aboutScreen.aboutApp')}</h2>
          </div>

          <p className="text-base-content/80 mb-4">
            {t('aboutScreen.description1')}
          </p>
          <p className="text-base-content/80 mb-4">
            {t('aboutScreen.description2')}
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">{t('aboutScreen.features')}</h3>
            <ul className="list-disc list-inside text-base-content/80 space-y-2">
              <li>{t('aboutScreen.feature1')}</li>
              <li>{t('aboutScreen.feature2')}</li>
              <li>{t('aboutScreen.feature3')}</li>
              <li>{t('aboutScreen.feature4')}</li>
              <li>{t('aboutScreen.feature5')}</li>
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">{t('aboutScreen.contact')}</h3>
            <p className="text-base-content/80">
              {t('aboutScreen.contactInfo')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
