import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAchievements } from '../hooks/useAchievements';
import { getCategories, categoryEmojis } from '../data/questions';
import { Mistakes, getUniqueMistakes } from '../utils/mistakes';
import Header from '../components/Header';

interface MistakeStats {
  totalMistakes: number;
  mistakesByCategory: {
    [key: string]: number;
  };
  score: number;
}

function calculateStats(mistakes: Mistakes): MistakeStats {
  // Get all mistakes and filter unique ones
  const allMistakes = Object.values(mistakes).flat();
  const uniqueMistakes = getUniqueMistakes(allMistakes);
  const totalMistakes = uniqueMistakes.length;

  // Calculate mistakes by category using unique mistakes
  const mistakesByCategory = uniqueMistakes.reduce((acc, mistake) => {
    acc[mistake.category] = (acc[mistake.category] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  // Calculate score based on unique mistakes
  // Base score of 1000, minus 10 points per unique mistake
  const score = Math.max(0, 1000 - (totalMistakes * 10));

  return {
    totalMistakes,
    mistakesByCategory,
    score,
  };
}

export default function MistakesScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {} = useUser();
  const [mistakes] = useLocalStorage<Mistakes>('quizMistakes', {});
  const { updateProgress } = useAchievements();

  // Calculate stats
  const stats = calculateStats(mistakes);

  // Get all available categories and add mistake counts
  const categories = getCategories().map(categoryId => ({
    id: categoryId,
    name: `${categoryEmojis[categoryId] || '❓'} ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}`,
    description: t('mistakesScreen.reviewMistakesInCategory', { category: categoryId }),
    wrongCount: stats.mistakesByCategory[categoryId] || 0,
  })).filter(category => category.wrongCount > 0);

  const handlePlayMistakes = (categoryId?: string) => {
    const mistakesForCategory = categoryId
      ? mistakes[categoryId] || []
      : Object.values(mistakes).flat();

    if (mistakesForCategory.length === 0) {
      return;
    }

    // Filter out duplicate mistakes, keeping only the most recent ones
    const uniqueMistakes = getUniqueMistakes(mistakesForCategory);

    // Update achievement progress for mistakes reviewed
    updateProgress({ mistakesReviewed: uniqueMistakes.length });

    // Store selected mistakes in session storage for quiz
    sessionStorage.setItem('currentMistakes', JSON.stringify(uniqueMistakes));
    navigate(categoryId
      ? `/quiz?mode=mistakes&category=${categoryId}`
      : '/quiz?mode=mistakes'
    );
  };

  return (
    <div className="pt-4 pb-20">
      <Header title={t('mistakesScreen.title')} />

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 px-4 mb-8">
        <div className="card border border-base-300 bg-base-100 shadow-sm hover:shadow-elevated transition-shadow rounded-2xl p-4">
          <div className="flex flex-col items-center">
            <span className="text-sm text-base-content/70">{t('mistakesScreen.score')}</span>
            <span className="font-bold text-2xl text-primary">{stats.score}</span>
          </div>
        </div>

        <div className="card border border-base-300 bg-base-100 shadow-sm hover:shadow-elevated transition-shadow rounded-2xl p-4">
          <div className="flex flex-col items-center">
            <span className="text-sm text-base-content/70">{t('mistakesScreen.categories')}</span>
            <span className="font-bold text-2xl text-primary">{categories.length}</span>
          </div>
        </div>

        <div className="card border border-base-300 bg-base-100 shadow-sm hover:shadow-elevated transition-shadow rounded-2xl p-4">
          <div className="flex flex-col items-center">
            <span className="text-sm text-base-content/70">{t('mistakesScreen.total')}</span>
            <span className="font-bold text-2xl text-primary">{stats.totalMistakes}</span>
          </div>
        </div>
      </div>

      {/* Play Now Section */}
      {stats.totalMistakes > 0 && (
        <div className="px-4 mb-8">
          <button
            onClick={() => handlePlayMistakes()}
            className="btn btn-primary w-full py-4 rounded-2xl font-medium text-lg mb-2
                     hover:shadow-elevated active:translate-y-0.5 transition-all duration-150
                     border-b-4 border-primary-focus"
          >
            {t('mistakesScreen.practiceAllMistakes')}
          </button>
          <div className="text-center text-base-content/80">
            {stats.totalMistakes} {t('mistakesScreen.wrongAnswers')}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 ? (
        <div className="px-4 space-y-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handlePlayMistakes(category.id)}
              className="card w-full border border-base-300 bg-base-100 shadow-sm hover:shadow-elevated
                       transition-all rounded-2xl p-4 text-left"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-base-content">{category.name}</h3>
                  <p className="text-sm text-base-content/70 mt-1">{category.description}</p>
                </div>
                <div className="bg-error/20 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-error">{category.wrongCount}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="px-4 text-center text-base-content/80">
          <p>{t('mistakesScreen.noMistakes')}</p>
        </div>
      )}
    </div>
  );
}
