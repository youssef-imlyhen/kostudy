import { useNavigate } from 'react-router-dom';
import { TrophyIcon, GlobeAmericasIcon, SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getCategories, getQuestionsByCategory } from '../data/questions';
import { Mistakes, getTotalUniqueMistakes } from '../utils/mistakes';
import { useAchievements } from '../hooks/useAchievements';
import { ACHIEVEMENT_TIER_KEYS, Achievement } from '../types/achievement';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import PerformanceChart from '../components/PerformanceChart';
import EmptyState from '../components/EmptyState';
import { achievements as achievementCatalog } from '../data/achievements';

interface Progress {
  [key: string]: {
    [key: string]: {
      completed: number;
      correct: number;
    };
  };
}

export interface CategoryColor {
  bg: string;
  text: string;
  bar: string;
  icon: string;
}

export interface CategoryPerformance {
  name:string;
  color: CategoryColor;
  completed: number;
  total: number;
  correct: number;
}

// Consistent styling for categories to avoid the "all green" issue
const categoryStyles: CategoryColor[] = [
  { bg: 'bg-primary', text: 'text-primary', bar: 'bg-primary', icon: 'sparkles' },
  { bg: 'bg-secondary', text: 'text-secondary', bar: 'bg-secondary', icon: 'book' },
  { bg: 'bg-accent', text: 'text-accent', bar: 'bg-accent', icon: 'academic' },
  { bg: 'bg-info', text: 'text-info', bar: 'bg-info', icon: 'globe' },
  { bg: 'bg-warning', text: 'text-warning', bar: 'bg-warning', icon: 'trophy' },
  { bg: 'bg-error', text: 'text-error', bar: 'bg-error', icon: 'trophy' },
];

const getCategoryStyle = (index: number): CategoryColor => {
  return categoryStyles[index % categoryStyles.length];
};


function AchievementPath({
  all,
  unlockedMap,
  t,
}: {
  all: Achievement[];
  unlockedMap: Record<string, boolean>;
  t: (key: string) => string;
}) {
  // Visual path: vertical progression with nodes and connectors
  return (
    <div className="mt-6 px-4">
      <div className="bg-base-100 rounded-2xl p-6 shadow-lg border-2 border-b-4 border-base-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-base-content">Achievement Path</h3>
          <div className="text-sm text-base-content/60">
            {Object.keys(unlockedMap).length} / {all.length} unlocked
          </div>
        </div>
        
        {/* Vertical Achievement Path */}
        <div className="relative">
          {/* Background path line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-base-300 via-base-200 to-base-300 rounded-full" />
          
          {/* Achievement nodes */}
          <div className="space-y-8">
            {all.map((achievement, idx) => {
              const isUnlocked = !!unlockedMap[achievement.id];
              const isNext = !isUnlocked && (idx === 0 || !!unlockedMap[all[idx - 1]?.id]);
              const isPrevious = idx > 0 && !!unlockedMap[all[idx - 1]?.id];
              
              return (
                <div key={achievement.id} className="relative flex items-center">
                  {/* Connection line to previous achievement */}
                  {idx > 0 && (
                    <div className={`absolute left-8 -top-4 w-1 h-4 ${
                      isUnlocked || isPrevious
                        ? 'bg-gradient-to-b from-primary to-success'
                        : 'bg-base-300'
                    } rounded-full`} />
                  )}
                  
                  {/* Achievement badge */}
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-primary to-success ring-4 ring-primary/20 shadow-lg transform scale-110'
                        : isNext
                        ? 'bg-gradient-to-br from-warning/80 to-warning ring-4 ring-warning/30 shadow-md animate-pulse'
                        : 'bg-base-300 ring-2 ring-base-200 shadow-sm'
                    }`}>
                      <span className={`text-2xl select-none transition-all duration-300 ${
                        isUnlocked ? 'opacity-100 drop-shadow-sm' : 'opacity-60'
                      }`}>
                        {achievement.icon}
                      </span>
                    </div>
                    
                    {/* Unlock indicator */}
                    {isUnlocked && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center ring-2 ring-white shadow-lg">
                        <CheckCircleIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    {/* Next indicator */}
                    {isNext && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-warning rounded-full animate-ping" />
                    )}
                  </div>
                  
                  {/* Achievement info */}
                  <div className="ml-6 flex-1">
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      isUnlocked
                        ? 'bg-success/10 border-success/30 shadow-sm'
                        : isNext
                        ? 'bg-warning/10 border-warning/30 shadow-sm'
                        : 'bg-base-200/50 border-base-300'
                    }`}>
                      <h4 className={`font-bold text-sm mb-1 ${
                        isUnlocked ? 'text-success' : isNext ? 'text-warning' : 'text-base-content/60'
                      }`}>
                        {t(achievement.title)}
                      </h4>
                      <p className={`text-xs ${
                        isUnlocked ? 'text-base-content' : 'text-base-content/50'
                      }`}>
                        {t(achievement.description)}
                      </p>
                      
                      {/* Achievement tier and points */}
                      <div className="flex items-center justify-between mt-2">
                        <span className={`badge badge-sm ${
                          isUnlocked ? 'badge-success' : isNext ? 'badge-warning' : 'badge-ghost'
                        }`}>
                          {t(ACHIEVEMENT_TIER_KEYS[achievement.tier])}
                        </span>
                        <span className={`text-xs font-medium ${
                          isUnlocked ? 'text-success' : 'text-base-content/40'
                        }`}>
                          +{achievement.reward.points} pts
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Path completion indicator */}
          {Object.keys(unlockedMap).length === all.length && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-success text-white rounded-full shadow-lg">
                <TrophyIcon className="w-5 h-5 mr-2" />
                <span className="font-bold text-sm">Path Complete!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AchievementsScreen() {
  const navigate = useNavigate();
  const { username } = useUser();
  const { t } = useLanguage();
  const { getAchievementStats, getUnlockedAchievements } = useAchievements();
  const [progress] = useLocalStorage<Progress>('quizProgress', {});
  const [mistakes] = useLocalStorage<Mistakes>('quizMistakes', {});
  // Calculate performance data
  // Calculate performance data
  const categories = getCategories();
  const performanceData: CategoryPerformance[] = categories.map((categoryId, index) => {
    const questions = getQuestionsByCategory(categoryId);
    const total = questions.length;
    const categoryProgress = progress[categoryId] || {};
    const completedRaw = Object.values(categoryProgress).reduce(
      (sum, diff) => sum + diff.completed, 0
    );
    const correctRaw = Object.values(categoryProgress).reduce(
      (sum, diff) => sum + diff.correct, 0
    );
    const completed = Math.min(completedRaw, total);
    const correct = Math.min(correctRaw, completed);
    const color = getCategoryStyle(index);
    return {
      name: categoryId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      color,
      completed,
      total,
      correct,
    };
  }).filter(category => category.total > 0);

  const totalCompleted = performanceData.reduce((sum, cat) => sum + cat.completed, 0);
  const totalCorrect = performanceData.reduce((sum, cat) => sum + cat.correct, 0);
  const totalMistakes = getTotalUniqueMistakes(mistakes);
  const achievementStats = getAchievementStats();

  // Build unlocked map for path visualization
  const unlockedMap = Object.fromEntries(
    getUnlockedAchievements().map(a => [a.id, true] as const)
  );

  return (
    <div className="pb-20">
      <Header title={t('achievementsScreen.title')} />

      {/* Profile Section */}
      <div className="flex items-center justify-between px-4 mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-medium">
              {username?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <span className="ml-3 font-medium text-base-content">{username}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 px-4 mb-8">
        <StatCard
          icon={<SparklesIcon className="w-6 h-6" />}
          label={t('achievementsScreen.points')}
          value={achievementStats.points}
          color="accent"
        />
        <StatCard
          icon={<TrophyIcon className="w-6 h-6" />}
          label={t('achievementsScreen.correctAnswers')}
          value={`${Math.round((totalCorrect / totalCompleted) * 100 || 0)}%`}
          color="success"
        />
        <StatCard
          icon={<GlobeAmericasIcon className="w-6 h-6" />}
          label={t('achievementsScreen.completed')}
          value={`${achievementStats.percentage}%`}
          color="info"
        />
      </div>

      {/* Performance Chart */}
      {performanceData.length > 0 ? (
        <PerformanceChart performanceData={performanceData} />
      ) : (
        <EmptyState
          title="achievementsScreen.noPerformance"
          message="achievementsScreen.noPerformance"
          buttonText="dashboard.startQuiz"
          navigateTo="/"
        />
      )}

      {/* Achievements Section */}
      <div className="px-4 mt-8">
        <h2 className="text-xl font-bold text-base-content mb-4">{t('achievementsScreen.title')}</h2>
        
        {/* Achievement Stats */}
        <div className="bg-base-100 rounded-2xl p-4 shadow-lg mb-6 border-2 border-b-4 border-base-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-base-content/70">{t('achievementsScreen.unlocked')}</p>
              <p className="text-2xl font-bold text-primary">{achievementStats.unlocked} / {achievementStats.total}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-base-content/70">{t('achievementsScreen.progress')}</p>
              <p className="text-2xl font-bold text-accent">{achievementStats.percentage}%</p>
            </div>
          </div>
        </div>

        {/* Achievement Path - replaces the old achievements grid */}
        <AchievementPath all={achievementCatalog} unlockedMap={unlockedMap} t={t} />
      </div>

      {/* Practice Mistakes Button */}
      {totalMistakes > 0 && (
        <div className="px-4 mt-6">
          <button
            onClick={() => navigate('/mistakes')}
            className="btn btn-primary rounded-2xl font-bold border-2 border-b-4 w-full"
          >
            {t('achievementsScreen.practiceMistakes', { count: totalMistakes })}
          </button>
        </div>
      )}
    </div>
  );
}
