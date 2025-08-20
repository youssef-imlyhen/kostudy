import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Mistakes, getTotalUniqueMistakes } from '../utils/mistakes';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { username, setUsername } = useUser();
  const [mistakes] = useLocalStorage<Mistakes>('quizMistakes', {});
  const totalMistakes = getTotalUniqueMistakes(mistakes);

  const [nameInput, setNameInput] = useState(username || '');

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setUsername(nameInput.trim());
    }
  };

  const handleStart = () => {
    if (username) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="pt-4 pb-20">
      <Header title={t('homeScreen.welcome')} />

      <div className="px-4 mt-8">
        <div className="flex justify-center mb-6">
          <img src="/kostudy.png" alt="Kostudy logo" className="w-20 h-20 rounded-xl shadow-md" />
        </div>
        <div className="bg-base-100 rounded-xl p-6 shadow-md">
          {username ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{t('homeScreen.welcomeBack')}, {username}!</h2>
              <p className="text-base-content/80 mb-6">{t('homeScreen.readyToLearn')}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-primary/10 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-primary">{totalMistakes}</div>
                  <div className="text-sm text-primary/80">{t('homeScreen.toReview')}</div>
                </div>
                <div className="bg-accent/10 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-accent">12</div>
                  <div className="text-sm text-accent/80">{t('homeScreen.categories')}</div>
                </div>
              </div>

              <button
                onClick={handleStart}
                className="w-full bg-primary text-primary-content py-3 rounded-xl font-medium
                          hover:bg-primary-focus transition-colors"
              >
                {t('homeScreen.continueLearning')}
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{t('homeScreen.welcome')}</h2>
              <p className="text-base-content/80 mb-6">{t('homeScreen.enterName')}</p>

              <form onSubmit={handleNameSubmit} className="mb-8">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder={t('homeScreen.namePlaceholder')}
                  className="w-full bg-base-200 text-base-content py-3 px-4 rounded-xl mb-4
                            focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-content py-3 rounded-xl font-medium
                            hover:bg-primary-focus transition-colors"
                >
                  {t('homeScreen.startLearning')}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}