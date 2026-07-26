import { useNavigate, useLocation } from 'react-router-dom';
import { TrophyIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Question } from '../types/question';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import soundManager from '../utils/soundManager';
import { Mistake, Mistakes, getUniqueMistakes } from '../utils/mistakes';

interface LocationState {
  score?: number;
  total?: number;
  answers?: { [key: string]: string | string[] };
  questions?: Question[];
  playAllMode?: boolean;
  finalStreak?: number;
  maxStreak?: number;
  lastQuestion?: Question;
  lastAnswer?: string | string[];
  incorrectQuestionIds?: string[];
}

export default function ResultsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentQuiz } = useQuiz();
  const { t } = useLanguage();
  const [, setMistakes] = useLocalStorage<Mistakes>('quizMistakes', {});
  const mistakesSaved = useRef(false);
  const [soundEnabled] = useLocalStorage<boolean>('soundEnabled', true);
  const state = location.state as LocationState;

  useEffect(() => {
    if (!state || (!state.playAllMode && (state.score === undefined || state.total === undefined || !state.answers || !state.questions))) {
      navigate('/categories');
    }
  }, [state, navigate]);

  useEffect(() => {
    if (soundEnabled && state && !state.playAllMode) {
      const percentage = state.total ? Math.round((state.score || 0) / state.total * 100) : 0;
      if (percentage >= 70) soundManager.play('levelComplete');
    } else if (soundEnabled && state && state.playAllMode) {
      soundManager.play('levelComplete');
    }
  }, [soundEnabled, state]);

  useEffect(() => {
    if (!state?.playAllMode || !state.lastQuestion || !state.lastAnswer || mistakesSaved.current) return;
    const mistake: Mistake = {
      questionId: state.lastQuestion.id,
      category: state.lastQuestion.category,
      difficulty: state.lastQuestion.difficulty,
      selectedAnswer: state.lastAnswer,
      timestamp: Date.now(),
    };
    setMistakes((previous) => {
      const categoryMistakes = previous[mistake.category] || [];
      return { ...previous, [mistake.category]: getUniqueMistakes([...categoryMistakes, mistake]) };
    });
    mistakesSaved.current = true;
  }, [state?.playAllMode, state?.lastQuestion, state?.lastAnswer, setMistakes]);

  if (!state || (!state.playAllMode && (state.score === undefined || state.total === undefined || !state.answers || !state.questions))) return null;

  if (state.playAllMode) {
    const { finalStreak = 0, maxStreak = 0 } = state;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 -mt-16">
        <Header title={t('resultsScreen.title')} />
        <div className="mb-4"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"><TrophyIcon className="h-12 w-12 text-primary" /></div></div>
        <h1 className="mb-4 text-center text-2xl font-bold text-base-content">{t('resultsScreen.streakOver')}</h1>
        <div className="mb-8 w-full max-w-sm space-y-6">
          <div className="flex flex-col items-center space-y-2"><span className="text-4xl font-bold text-primary">{finalStreak}</span><span className="text-base-content/80">{t('resultsScreen.questionsAnsweredCorrectly')}</span></div>
          {maxStreak === finalStreak && maxStreak > 0 && <div className="rounded-2xl border-2 border-b-4 border-accent bg-accent/10 p-4 text-center"><span className="font-bold text-accent">🎉 {t('resultsScreen.newPersonalBest')} 🎉</span></div>}
          <div className="rounded-2xl border-2 border-b-4 border-base-300 bg-base-100 p-4 text-center"><span className="text-base-content/80">{t('resultsScreen.personalBest')}: </span><span className="font-bold text-base-content">{maxStreak}</span></div>
        </div>
        <div className="w-full max-w-sm space-y-4"><button onClick={() => navigate('/play-all')} className="btn btn-primary w-full rounded-2xl border-2 border-b-4 font-bold">{t('resultsScreen.tryAgain')}</button><button onClick={() => navigate('/categories')} className="btn btn-ghost w-full rounded-2xl border-2 border-b-4 font-bold">{t('resultsScreen.backToCategories')}</button></div>
      </div>
    );
  }

  const { score = 0, total = 0, answers = {}, questions = [], incorrectQuestionIds = [] } = state;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const wrongAnswers = total - score;
  const rightAnswers = score;

  useEffect(() => {
    const category = currentQuiz?.category;
    if (!category || mistakesSaved.current) return;
    const currentMistakes = questions
      .filter((question) => incorrectQuestionIds.includes(question.id))
      .map((question) => ({ questionId: question.id, category: question.category, difficulty: question.difficulty, selectedAnswer: answers[question.id] || '', timestamp: Date.now() }));
    if (currentMistakes.length > 0) {
      setMistakes((previous) => {
        const categoryMistakes = previous[category] || [];
        return { ...previous, [category]: getUniqueMistakes([...categoryMistakes, ...currentMistakes]) };
      });
    }
    mistakesSaved.current = true;
  }, [currentQuiz?.category, questions, answers, setMistakes, incorrectQuestionIds]);

  const handleNextLevel = () => {
    const category = currentQuiz?.category;
    navigate(category ? `/categories/${category}` : '/categories');
  };

  const difficulty = currentQuiz?.difficulty || 'unknown';
  const difficultyDisplay = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 -mt-16">
      <Header title={t('resultsScreen.title')} />
      <div className="mb-4"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"><TrophyIcon className="h-12 w-12 text-primary" /></div></div>
      <h1 className="mb-4 text-center text-2xl font-bold text-base-content">{t('resultsScreen.levelComplete', { level: difficultyDisplay })}</h1>
      <p className="mb-8 max-w-xs text-center text-base-content/80">{percentage >= 70 ? t('resultsScreen.greatJob') : t('resultsScreen.keepPracticing')}</p>
      <div className="mb-8 w-full max-w-sm space-y-4">
        <div className="grid grid-cols-2 gap-4"><div className="flex items-center justify-center rounded-2xl border-2 border-b-4 border-error bg-error/20 p-4"><XMarkIcon className="mr-2 h-5 w-5 text-error" /><span className="font-bold text-error">{t('resultsScreen.incorrectAnswers', { count: wrongAnswers })}</span></div><div className="flex items-center justify-center rounded-2xl border-2 border-b-4 border-success bg-success/20 p-4"><CheckIcon className="mr-2 h-5 w-5 text-success" /><span className="font-bold text-success">{t('resultsScreen.correctAnswers', { count: rightAnswers })}</span></div></div>
        <div className="h-4 overflow-hidden rounded-full bg-base-200"><div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} /></div>
        <div className="text-center text-base-content/80">{t('resultsScreen.score')}: {percentage}%</div>
      </div>
      {wrongAnswers > 0 && <div className="mb-4 w-full max-w-sm rounded-2xl border border-warning/20 bg-warning/10 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-warning">{t('resultsScreen.nextBestStep')}</p><p className="mt-1 text-sm text-base-content/80">{t('resultsScreen.reviewWhileFresh', { count: wrongAnswers })}</p></div>}
      <div className="w-full max-w-sm space-y-3">{wrongAnswers > 0 ? <><button onClick={() => navigate('/mistakes')} className="btn btn-primary w-full rounded-2xl border-2 border-b-4 font-bold">{t('resultsScreen.reviewMissedNow', { count: wrongAnswers })}</button><button onClick={handleNextLevel} className="btn btn-ghost w-full rounded-2xl border-2 border-b-4 font-bold">{t('resultsScreen.continue')}</button></> : <button onClick={handleNextLevel} className="btn btn-primary w-full rounded-2xl border-2 border-b-4 font-bold">{t('resultsScreen.continue')}</button>}</div>
    </div>
  );
}
