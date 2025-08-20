import { useLanguage } from '../context/LanguageContext';
import { AcademicCapIcon, BookOpenIcon, GlobeAmericasIcon, SparklesIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { CategoryPerformance } from '../screens/AchievementsScreen';
import { getCategoryEmoji } from '../data/questions';

// Dynamic icon component
function CategoryIcon({ iconKey }: { iconKey: string }) {
  const className = "w-6 h-6 text-base-content/80";
  switch (iconKey) {
    case 'sparkles': return <SparklesIcon className={className} />;
    case 'academic': return <AcademicCapIcon className={className} />;
    case 'book': return <BookOpenIcon className={className} />;
    case 'globe': return <GlobeAmericasIcon className={className} />;
    case 'trophy': return <TrophyIcon className={className} />;
    default: return <TrophyIcon className={className} />;
  }
}

// Color based on accuracy percentage
const getAccuracyColor = (accuracy: number) => {
  if (accuracy >= 75) return 'text-success';
  if (accuracy >= 50) return 'text-warning';
  return 'text-error';
};

interface PerformanceChartProps {
  performanceData: CategoryPerformance[];
}

export default function PerformanceChart({ performanceData }: PerformanceChartProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-base-100 rounded-2xl p-6 mx-4 shadow-lg border-2 border-b-4 border-base-300">
      <div className="flex gap-4 mb-4 flex-wrap">
        {performanceData.map((category) => (
          <div key={category.name} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${category.color.bar} mr-2`} />
            <span className="text-sm font-medium text-base-content">{category.name}</span>
          </div>
        ))}
      </div>
      <div className="space-y-6">
        {performanceData.map((category) => {
          const percentage = (category.completed / category.total) * 100;
          const accuracy = (category.correct / category.completed) * 100 || 0;
          return (
            <div key={category.name} className="transition-transform duration-200 hover:scale-[1.02]">
              <div className="flex justify-between mb-2 items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${category.color.bg}/10 rounded-lg flex items-center justify-center`}>
                    <span className="text-xl leading-none select-none">
                      {getCategoryEmoji(category.name)}
                    </span>
                  </div>
                  <span className="text-base font-bold text-base-content">
                    {category.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-base-content/60">
                  {category.completed} / {category.total}
                </span>
              </div>
              <div
                className="h-4 bg-base-200 rounded-full relative overflow-hidden"
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${category.name} progress`}
              >
                <div
                  className={`h-4 ${category.color.bar} rounded-full transition-all duration-700`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex justify-end mt-1.5">
                <span className={`text-xs font-bold ${getAccuracyColor(accuracy)}`}>
                  {t('achievementsScreen.accuracy', { accuracy: Math.round(accuracy) })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}