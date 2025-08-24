import { Link } from 'react-router-dom';
import { FireIcon } from '@heroicons/react/24/outline';
import { useQuestions } from '../hooks/useQuestions';
import { useLanguage } from '../context/LanguageContext';
import {
  BookOpenIcon,
  AcademicCapIcon,
  GlobeAmericasIcon,
} from '@heroicons/react/24/solid';
import Header from '../components/Header';
import Card from '../components/Card';
import CategoryCard from '../components/CategoryCard';

const categoryIcons: Record<string, any> = {
  youtube_growth: FireIcon,
  youtube_monetization: BookOpenIcon,
  youtube_content: AcademicCapIcon,
  youtube_analytics: GlobeAmericasIcon,
};

export default function CategoriesScreen() {
  const { t } = useLanguage();
  const { getCategories, getQuestionsCountByCategory } = useQuestions();
  // Get categories from questions data
  const questionCounts = getQuestionsCountByCategory();
  const categories = getCategories().map((categoryId) => {
    const readableName = categoryId
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const finalDescription = `Questions about ${readableName}`;

    return {
      id: categoryId,
      description: finalDescription,
      locked: false, // You can implement logic for locked categories later
      questionCount: questionCounts[categoryId] || 0,
      icon: categoryIcons[categoryId] || BookOpenIcon,
    };
  });

  return (
    <div className="pt-4 pb-20">
      <Header title={t('categoriesScreen.title')} />

      {/* Categories Grid */}
      <div className="pb-4">
        {/* Play All Card */}
        <div className="mb-4">
          <Link to="/play-all" className="block">
            <Card variant="interactive" className="group bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse-slow" />
              </div>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl">
                  <FireIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-base-content text-lg sm:text-xl">{t('dashboard.playAll')}</h3>
                  <p className="text-base-content/80 mt-1 text-sm sm:text-base">
                    {t('dashboard.playAllDesc')}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
        
        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Category Cards */}
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.id.charAt(0).toUpperCase() + category.id.slice(1).replace(/_/g, ' ')}
              description={category.description}
              questionCount={category.questionCount}
              locked={category.locked}
              size="small"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
