import Header from '../components/Header';
import { useLanguage } from '../context/LanguageContext';
import AIGenerator from '../components/AIGenerator';

const AIGeneratorScreen = () => {
  const { t } = useLanguage();

  return (
    <div className="pb-20">
      <Header title={t('aiGeneratorScreen.title')} />
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-base-content mb-2">
              {t('aiGeneratorScreen.subtitle')}
            </h2>
            <p className="text-base-content/70">
              {t('aiGeneratorScreen.description')}
            </p>
          </div>
          
          <AIGenerator />
        </div>
      </div>
    </div>
  );
};

export default AIGeneratorScreen;