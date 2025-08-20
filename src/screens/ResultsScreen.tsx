import { useNavigate, useLocation } from 'react-router-dom';
import { TrophyIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Question } from '../types/question';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/LanguageContext';
import { useAchievements } from '../hooks/useAchievements';
import Header from '../components/Header';
import soundManager from '../utils/soundManager';
import { useLocalStorage as useLocalStorageHook } from '../hooks/useLocalStorage';

interface LocationState {
  score?: number;
  total?: number;
  answers?: { [key: string]: string };
  questions?: Question[];
  playAllMode?: boolean;
  finalStreak?: number;
  maxStreak?: number;
  lastQuestion?: Question;
  lastAnswer?: string;
  incorrectQuestionIds?: string[];
}

interface Mistake {
  questionId: string;
  category: string;
  difficulty: string;
  selectedAnswer: string;
  timestamp: number;
}

interface Mistakes {
  [key: string]: Mistake[];
}

export default function ResultsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentQuiz } = useQuiz();
  const { t } = useLanguage();
  const { updateProgress } = useAchievements();
  const [, setMistakes] = useLocalStorage<Mistakes>('quizMistakes', {});
  const mistakesSaved = useRef(false);
  const [soundEnabled] = useLocalStorageHook<boolean>('soundEnabled', true);

  const state = location.state as LocationState;

  useEffect(() => {
    // If state is missing, or if it's not playAllMode and is missing regular quiz data, navigate away.
    if (!state || (!state.playAllMode && (state.score === undefined || state.total === undefined || !state.answers || !state.questions))) {
      navigate('/categories');
    }
  }, [state, navigate]);

  // Play sound effect when results screen loads
  useEffect(() => {
    if (soundEnabled && state && !state.playAllMode) {
      const percentage = state.total ? Math.round((state.score || 0) / state.total * 100) : 0;
      if (percentage >= 70) {
        soundManager.play('levelComplete');
      }
    } else if (soundEnabled && state && state.playAllMode) {
      soundManager.play('levelComplete');
    }
  }, [soundEnabled, state]);

  // Render nothing if the state is invalid, the effect will handle the redirect.
  if (!state || (!state.playAllMode && (state.score === undefined || state.total === undefined || !state.answers || !state.questions))) {
    return null;
  }

  // Handle play-all mode results
  if (state.playAllMode) {
    const { finalStreak = 0, maxStreak = 0, lastQuestion, lastAnswer } = state;

    // Save last mistake if available
    useEffect(() => {
      if (!lastQuestion || !lastAnswer || mistakesSaved.current) return;

      const mistake = {
        questionId: lastQuestion.id,
        category: lastQuestion.category,
        difficulty: lastQuestion.difficulty,
        selectedAnswer: lastAnswer,
        timestamp: Date.now(),
      };

      setMistakes(prev => {
        const categoryMistakes = prev[lastQuestion.category] || [];
        return {
          ...prev,
          [lastQuestion.category]: [...categoryMistakes, mistake]
        };
      });

      mistakesSaved.current = true;
    }, [lastQuestion, lastAnswer, setMistakes]);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 -mt-16">
        <Header title={t('resultsScreen.title')} />

        {/* Trophy Icon */}
        <div className="mb-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <TrophyIcon className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-base-content text-center mb-4">
          {t('resultsScreen.streakOver')}
        </h1>

        {/* Results */}
        <div className="w-full max-w-sm space-y-6 mb-8">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-4xl font-bold text-primary">{finalStreak}</span>
            <span className="text-base-content/80">{t('resultsScreen.questionsAnsweredCorrectly')}</span>
          </div>

          {maxStreak === finalStreak && maxStreak > 0 && (
            <div className="bg-accent/10 rounded-2xl p-4 text-center border-2 border-b-4 border-accent">
              <span className="text-accent font-bold">
                🎉 {t('resultsScreen.newPersonalBest')} 🎉
              </span>
            </div>
          )}

          <div className="bg-base-100 rounded-2xl p-4 text-center border-2 border-b-4 border-base-300">
            <span className="text-base-content/80">{t('resultsScreen.personalBest')}: </span>
            <span className="text-base-content font-bold">{maxStreak}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={() => navigate('/play-all')}
            className="btn btn-primary rounded-2xl font-bold border-2 border-b-4 w-full"
          >
            {t('resultsScreen.tryAgain')}
          </button>
          <button
            onClick={() => navigate('/categories')}
            className="btn btn-ghost rounded-2xl font-bold border-2 border-b-4 w-full"
          >
            {t('resultsScreen.backToCategories')}
          </button>
        </div>
      </div>
    );
  }

  // Handle regular quiz results
  const {
    score = 0,
    total = 0,
    answers = {},
    questions = [],
    incorrectQuestionIds = [] // Get incorrect IDs from state
  } = state;
  const percentage = Math.round((score / total) * 100);
  const wrongAnswers = total - score;
  const rightAnswers = score;
  const isPerfectScore = percentage === 100 && total >= 10;

  // Save mistakes for review - only questions that were incorrect during the quiz
  useEffect(() => {
    const category = currentQuiz?.category;
    if (!category || mistakesSaved.current) return;

    const currentMistakes = questions
      .filter(q => incorrectQuestionIds.includes(q.id)) // Only include questions that were incorrect during the quiz
      .map(q => ({
        questionId: q.id,
        category: q.category,
        difficulty: q.difficulty,
        selectedAnswer: answers[q.id] || '',
        timestamp: Date.now(),
      }));

    if (currentMistakes.length > 0) {
      setMistakes(prev => {
        const categoryMistakes = prev[category] || [];
        return {
          ...prev,
          [category]: [...categoryMistakes, ...currentMistakes]
        };
      });
    }

    mistakesSaved.current = true;

    // Update achievement progress
    updateProgress({
      questionsAnswered: total,
      correctAnswers: rightAnswers,
      category: currentQuiz?.category,
      isPerfectScore: isPerfectScore,
      streak: currentQuiz?.currentStreak
    });
  }, [currentQuiz?.category, currentQuiz?.currentStreak, questions, answers, setMistakes, incorrectQuestionIds, total, rightAnswers, isPerfectScore, updateProgress]);

  const handleNextLevel = () => {
    const category = currentQuiz?.category;
    if (!category) {
      navigate('/categories');
      return;
    }
    navigate(`/categories/${category}`);
  };

  const difficulty = currentQuiz?.difficulty || 'unknown';
  const difficultyDisplay = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 -mt-16">
      <Header title={t('resultsScreen.title')} />

      {/* Trophy Icon */}
      <div className="mb-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <TrophyIcon className="w-12 h-12 text-primary" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-base-content text-center mb-4">
        {t('resultsScreen.levelComplete', { level: difficultyDisplay })}
      </h1>

      {/* Message */}
      <p className="text-base-content/80 text-center mb-8 max-w-xs">
        {percentage >= 70
          ? t('resultsScreen.greatJob')
          : t('resultsScreen.keepPracticing')}
      </p>

      {/* Results Container */}
      <div className="w-full max-w-sm space-y-4 mb-8">
        {/* Wrong/Right Answers */}
        <div className="grid grid-cols-2 gap-4">
          {/* Wrong Answers */}
          <div className="bg-error/20 rounded-2xl p-4 flex items-center justify-center border-2 border-b-4 border-error">
            <XMarkIcon className="w-5 h-5 text-error mr-2" />
            <span className="text-error font-bold">
              {t('resultsScreen.incorrectAnswers', { count: wrongAnswers })}
            </span>
          </div>

          {/* Right Answers */}
          <div className="bg-success/20 rounded-2xl p-4 flex items-center justify-center border-2 border-b-4 border-success">
            <CheckIcon className="w-5 h-5 text-success mr-2" />
            <span className="text-success font-bold">
              {t('resultsScreen.correctAnswers', { count: rightAnswers })}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-base-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-primary h-full rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Score Percentage */}
        <div className="text-center text-base-content/80">
          {t('resultsScreen.score')}: {percentage}%
        </div>
      </div>

      {/* Next Level Button */}
      <button
        onClick={handleNextLevel}
        className="btn btn-primary rounded-2xl font-bold border-2 border-b-4 w-full max-w-sm"
      >
        {t('resultsScreen.continue')}
      </button>

      {/* Review Mistakes Link */}
      {wrongAnswers > 0 && (
        <button
          onClick={() => navigate('/mistakes')}
          className="btn btn-ghost rounded-2xl font-bold border-2 border-b-4 mt-4"
        >
          {t('resultsScreen.reviewMistakes')}
        </button>
      )}
    </div>
  );
}
