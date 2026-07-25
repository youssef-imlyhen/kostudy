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
import { Mistakes, getTotalUniqueMistakes, getUniqueMistakes } from '../utils/mistakes';
import { useAchievements } from '../hooks/useAchievements';
import { LearningState, getDueQuestionIds } from '../utils/learningState';
import Header from '../components/Header';
import Card from '../components/Card';
import CategoryCard from '../components/CategoryCard';

const MAX_CATEGORIES_DISPLAYED = 4;

export default function DashboardScreen() {
  const { t } = useLanguage();
  const [mistakes] = useLocalStorage<Mistakes>('quizMistakes', {});
  const { progress } = useAchievements();
  const [learningState] = useLocalStorage<LearningState>('questionLearningState', {});
  const dueReviews = getDueQuestionIds(learningState).length;
  const totalMistakes = getTotalUniqueMistakes(mistakes);
  const uniqueMistakes = getUniqueMistakes(Object.values(mistakes).flat());
  const accuracy = progress.questionsAnswered > 0
    ? Math.round((progress.correctAnswers / progress.questionsAnswered) * 100)
    : 0;
  const hasActivity = progress.questionsAnswered > 0;
  const reviewMinutes = Math.max(3, Math.ceil(Math.min(totalMistakes, 12) * 0.75));
  const mistakesByCategory = uniqueMistakes.reduce<Record<string, number>>((counts, mistake) => {
    counts[mistake.category] = (counts[mistake.category] || 0) + 1;
    return counts;
  }, {});
  const weakestCategoryId = Object.entries(mistakesByCategory)
    .sort(([, a], [, b]) => b - a)[0]?.[0];
  const weakestCategory = weakestCategoryId
    ? weakestCategoryId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : '';

  const questionCounts = getQuestionsCountByCategory();
  const allCategories = getCategories().map((categoryId) => {
    const readableName = categoryId
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      id: categoryId,
      name: readableName,
      description: t('dashboard.categoryDescription', { category: readableName }),
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
              <div className="section-header-content">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">{t('dashboard.studyNext')}</p>
                  <h2 className="section-header-title text-lg sm:text-xl mt-1">{totalMistakes > 0 ? t('dashboard.strengthenWeakSpots') : dueReviews > 0 ? t('dashboard.refreshMemory') : t('dashboard.keepMomentum')}</h2>
                </div>
              </div>
              {totalMistakes > 0 ? (
                <Link to="/mistakes">
                  <Card variant="interactive" className="group border border-error/20 bg-error/5">
                    <div className="flex items-center">
                      <div className="p-3 bg-error/10 rounded-xl mr-4">
                        <ArrowPathIcon className="w-6 h-6 text-error" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">{t('dashboard.reviewMistakes')}</h3>
                        <p className="text-sm text-base-content/70 mt-1">
                          {t('dashboard.reviewPlan', { count: totalMistakes, minutes: reviewMinutes })}
                          {weakestCategory ? ` · ${t('dashboard.weakestArea', { category: weakestCategory })}` : ''}
                        </p>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-base-content/40 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              ) : dueReviews > 0 ? (
                <Link to="/quiz?mode=review">
                  <Card variant="interactive" className="group border border-primary/20 bg-primary/5">
                    <div className="flex items-center">
                      <div className="p-3 bg-primary/10 rounded-xl mr-4">
                        <ArrowPathIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">{t('dashboard.scheduledReview')}</h3>
                        <p className="text-sm text-base-content/70 mt-1">{t('dashboard.dueReviewPlan', { count: dueReviews })}</p>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-base-content/40 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              ) : (
                <Link to="/play-all">
                  <Card variant="interactive" className="group">
                    <div className="flex items-center">
                      <div className="p-3 bg-primary/10 rounded-xl mr-4">
                        <FireIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">{t('dashboard.playAll')}</h3>
                        <p className="text-sm text-base-content/70 mt-1">{hasActivity ? t('dashboard.mixedPracticePlan') : t('dashboard.firstSessionDesc')}</p>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-base-content/40 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              )}

              {hasActivity && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  <div className="rounded-xl bg-base-200/70 p-3 text-center">
                    <div className="text-lg sm:text-xl font-bold text-base-content">{progress.questionsAnswered}</div>
                    <div className="text-xs text-base-content/60 mt-1">{t('dashboard.answered')}</div>
                  </div>
                  <div className="rounded-xl bg-base-200/70 p-3 text-center">
                    <div className="text-lg sm:text-xl font-bold text-base-content">{accuracy}%</div>
                    <div className="text-xs text-base-content/60 mt-1">{t('dashboard.accuracy')}</div>
                  </div>
                  <div className="rounded-xl bg-base-200/70 p-3 text-center">
                    <div className="text-lg sm:text-xl font-bold text-base-content">{progress.maxStreak}</div>
                    <div className="text-xs text-base-content/60 mt-1">{t('dashboard.bestStreak')}</div>
                  </div>
                  <div className="rounded-xl bg-base-200/70 p-3 text-center">
                    <div className="text-lg sm:text-xl font-bold text-base-content">{dueReviews}</div>
                    <div className="text-xs text-base-content/60 mt-1">{t('dashboard.due')}</div>
                  </div>
                </div>
              )}

              <div className="section-header-content">
              <h2 className="section-header-title text-lg sm:text-xl">{t('dashboard.learningPath')}</h2>
            </div>
              {/* Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              
              {totalMistakes > 0 && (
                <Link to="/play-all">
                  <Card variant="interactive" className="flex items-center">
                    <div className="p-3 bg-primary/10 rounded-xl mr-4">
                      <FireIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">{t('dashboard.playAll')}</h3>
                      <p className="text-sm text-base-content/70 mt-1">{t('dashboard.playAllDesc')}</p>
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
