import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LockClosedIcon,
  // Additional icons for future categories
  BeakerIcon,
  BookmarkIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CloudIcon,
  DocumentTextIcon,
  FireIcon,
  FlagIcon,
  GiftIcon,
  GlobeAltIcon,
  HandRaisedIcon,
  MapIcon,
  PuzzlePieceIcon,
  StarIcon,
  TrophyIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { useQuiz } from '../context/QuizContext';
import { useQuestions } from '../hooks/useQuestions';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';

interface Progress {
  [key: string]: {
    [key: string]: {
      completed: number;
      correct: number;
    };
  };
}

// Pool of additional icons for future categories
const additionalIcons = [
  BeakerIcon,
  BookmarkIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CloudIcon,
  DocumentTextIcon,
  FireIcon,
  FlagIcon,
  GiftIcon,
  GlobeAltIcon,
  HandRaisedIcon,
  MapIcon,
  PuzzlePieceIcon,
  StarIcon,
  TrophyIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
];

// Get a consistent icon for a category
const getCategoryIcon = (categoryId: string) => {
  // Use a consistent random icon based on category name
  const hash = categoryId.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return additionalIcons[Math.abs(hash) % additionalIcons.length];
};

// Get icon for difficulty level
const getDifficultyIcon = (difficulty: string, categoryId: string) => {
  const difficultyIcons = {
    easy: StarIcon,
    medium: ShieldCheckIcon,
    hard: TrophyIcon,
  };
  return difficultyIcons[difficulty as keyof typeof difficultyIcons] || getCategoryIcon(categoryId);
};

interface Level {
  id: string;
  name: string;
  description: string;
  totalQuestions: number;
  completedQuestions: number;
  locked: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: any;
}

export default function CategoryScreen() {
  const navigate = useNavigate();
  const { categoryId = '' } = useParams();
  const { setCurrentQuiz } = useQuiz();
  const [progress] = useLocalStorage<Progress>('quizProgress', {});
  const { getQuestionsByCategory } = useQuestions();
  const { t } = useLanguage();

  // Get questions for this category
  const questions = getQuestionsByCategory(categoryId);
  if (!questions.length) {
    return <div>{t('categoryScreen.categoryNotFound')}</div>;
  }

  // Get category name (capitalize first letter)
  const categoryName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);

  // Generate levels based on difficulties present in questions
  const difficulties = [...new Set(questions.map(q => q.difficulty))];
  const levels: Level[] = difficulties.map(difficulty => {
    const questionsInLevel = questions.filter(q => q.difficulty === difficulty);
    const levelProgress = progress[categoryId]?.[difficulty] || { completed: 0, correct: 0 };

    return {
      id: `${categoryId}_${difficulty}`,
      name: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level`,
      description: t(`difficultyDescriptions.${difficulty}`),
      totalQuestions: questionsInLevel.length,
      completedQuestions: Math.min(levelProgress.completed, questionsInLevel.length),
      locked: false, // You can implement locking logic based on progress
      difficulty,
      icon: getDifficultyIcon(difficulty, categoryId),
    };
  });

  const handleStartLevel = (level: Level) => {
    if (level.locked) return;

    setCurrentQuiz({
      category: categoryId,
      difficulty: level.difficulty,
      progress: 0,
      score: 0,
      currentLevel: level.id,
    });
    navigate('/quiz');
  };

  return (
    <div className="pt-4 pb-20">
      <Header title={categoryName} />

      {/* Category Description */}
      <div className="px-4 mb-8">
        <p className="text-base-content/80">
          Test your knowledge of {categoryName.toLowerCase()} through various difficulty levels
        </p>
      </div>

      {/* Levels */}
      <div className="px-4 space-y-4">
        {levels.map((level) => {
          const progress = (level.completedQuestions / level.totalQuestions) * 100;

          return (
            <button
              key={level.id}
              onClick={() => handleStartLevel(level)}
              disabled={level.locked}
              className={`w-full bg-base-100 rounded-xl p-4 shadow-card
                       ${!level.locked && 'hover:shadow-elevated'}
                       transition-all relative
                       ${level.locked ? 'opacity-75' : ''}`}
            >
              {/* Lock Icon */}
              {level.locked && (
                <div className="absolute top-4 right-4">
                  <LockClosedIcon className="w-5 h-5 text-base-content/60" />
                </div>
              )}

              <div className="mb-4">
                <div className="flex items-center gap-2">
                  {React.createElement(level.icon, {
                    className: 'w-5 h-5 text-primary'
                  })}
                  <h3 className="font-semibold text-base-content text-lg sm:text-xl">{level.name}</h3>
                </div>
                <p className="text-sm text-base-content/70 mt-1">{level.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-base-content/80">
                    {level.completedQuestions}/{level.totalQuestions} Questions
                  </span>
                  <span className="text-base-content/80">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-base-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
