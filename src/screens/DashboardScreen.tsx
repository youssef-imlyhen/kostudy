import { Link } from 'react-router-dom';
import {
  FireIcon,
  ArrowPathIcon,
  BookOpenIcon,
  TrophyIcon,
  ChatBubbleLeftRightIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { getCategories, getQuestionsCountByCategory } from '../data/questions';
import { useLanguage } from '../context/LanguageContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Mistakes, getTotalUniqueMistakes } from '../utils/mistakes';
import Header from '../components/Header';
import Card from '../components/Card';
import CategoryCard from '../components/CategoryCard';

const MAX_CATEGORIES_DISPLAYED = 4;

export default function DashboardScreen() {
  const { t } = useLanguage();
  const [mistakes] = useLocalStorage<Mistakes>('quizMistakes', {});
  const totalMistakes = getTotalUniqueMistakes(mistakes);

  const questionCounts = getQuestionsCountByCategory();
  const allCategories = getCategories().map((categoryId) => {
    const readableName = categoryId
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      id: categoryId,
      name: readableName,
      // Always use direct English description without localization lookup
      description: `Questions about ${readableName}`,
      questionCount: questionCounts[categoryId] || 0,
      icon: BookOpenIcon,
    };
  });

  const displayedCategories = allCategories.slice(0, MAX_CATEGORIES_DISPLAYED);

  return (
    <div className="pb-24">
      <Header title={t('dashboard.title')} />
      
      <div className="pt-4">

        {/* Main Content */}
        <div className="px-4 space-y-8 mt-6">
          {/* Learning Section */}
          <section className="section-header">

            
            <div className="grid grid-cols-1 gap-4">
              {/* Play All Card */}
              <Link to="/play-all">
                <Card variant="interactive" className="group">
                  <div className="flex items-center">
                    <div className="p-3 bg-primary/10 rounded-xl mr-4">
                      <FireIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">{t('dashboard.playAll')}</h3>
                      <p className="text-sm text-base-content/70 mt-1">{t('dashboard.playAllDesc')}</p>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-base-content/40 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
              
              <div className="section-header-content">
              <h2 className="section-header-title text-lg sm:text-xl">{t('dashboard.learningPath')}</h2>
            </div>
              {/* Categories Grid */}
              <div className="grid grid-cols-2 gap-4">
                {displayedCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    description={category.description}
                    questionCount={category.questionCount}
                  />
                ))}
              </div>
              
              {/* Browse All Link */}
              <div className="mt-4">
                <Link to="/categories" className="section-header-action">
                  <div className="flex items-center">
                    {t('dashboard.browseAll')}
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* Practice Section */}
          <section className="section-header">
            <h2 className="section-header-title mb-4 text-lg sm:text-xl">{t('dashboard.practice')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Achievements */}
              <Link to="/achievements">
                <Card variant="interactive" className="flex items-center">
                  <div className="p-3 bg-yellow-500/10 rounded-xl mr-4">
                    <TrophyIcon className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">{t('dashboard.achievements')}</h3>
                    <p className="text-sm text-base-content/70 mt-1">{t('dashboard.achievementsDesc')}</p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-base-content/40 group-hover:translate-x-1 transition-transform" />
                </Card>
              </Link>
              
              {/* Mistakes */}
              {totalMistakes > 0 && (
                <Link to="/mistakes">
                  <Card variant="interactive" className="flex items-center">
                    <div className="p-3 bg-error/10 rounded-xl mr-4">
                      <ArrowPathIcon className="w-6 h-6 text-error" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">{t('dashboard.reviewMistakes')}</h3>
                      <p className="text-sm text-base-content/70 mt-1">
                        {totalMistakes} {t('dashboard.questionsToPractice')}
                      </p>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-base-content/40 group-hover:translate-x-1 transition-transform" />
                  </Card>
                </Link>
              )}
            </div>
          </section>

          {/* Community & Tools */}
          <section className="section-header">
            <h2 className="section-header-title mb-4 text-lg sm:text-xl">{t('dashboard.communityTools')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* AI Chat */}
              <Link to="/chat">
                <Card variant="interactive" className="flex items-center">
                  <div className="p-3 bg-accent/10 rounded-xl mr-4">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">{t('dashboard.aiAssistant')}</h3>
                    <p className="text-sm text-base-content/70 mt-1">{t('dashboard.aiAssistantDesc')}</p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-base-content/40 group-hover:translate-x-1 transition-transform" />
                </Card>
              </Link>
              
              {/* SagaLearn */}
              <Link to="/sagalearn">
                <Card variant="interactive" className="flex items-center">
                  <div className="p-3 bg-purple-500/10 rounded-xl mr-4">
                    <SparklesIcon className="w-6 h-6 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">{t('dashboard.sagaLearn')}</h3>
                    <p className="text-sm text-base-content/70 mt-1">{t('dashboard.sagaLearnDesc')}</p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-base-content/40 group-hover:translate-x-1 transition-transform" />
                </Card>
              </Link>
              
              {/* AI App Studio */}
              <Link to="/ai-generator">
                <Card variant="interactive" className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl mr-4">
                    <CpuChipIcon className="w-6 h-6 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">{t('dashboard.aiAppStudio')}</h3>
                    <p className="text-sm text-base-content/70 mt-1">{t('dashboard.aiAppStudioDesc')}</p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-base-content/40 group-hover:translate-x-1 transition-transform" />
                </Card>
              </Link>

              {/* Custom Questions */}
              <Link to="/questions">
                <Card variant="interactive" className="flex items-center">
                  <div className="p-3 bg-info/10 rounded-xl mr-4">
                    <WrenchScrewdriverIcon className="w-6 h-6 text-info" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">{t('dashboard.customQuestions')}</h3>
                    <p className="text-sm text-base-content/70 mt-1">{t('dashboard.customQuestionsDesc')}</p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-base-content/40 group-hover:translate-x-1 transition-transform" />
                </Card>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
