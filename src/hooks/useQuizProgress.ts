import { useState, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import { Question } from '../types/question';

interface QuizProgress {
  answeredQuestions: {
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
    timestamp: number;
  }[];
  currentQuestionIndex: number;
  score: number;
  completed: boolean;
}

interface QuizStats {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
}

export interface QuizProgressState extends QuizProgress {
  stats: QuizStats;
}

interface UseQuizProgressProps {
  questions: Question[];
  categoryId?: string;
  difficulty?: string;
}

export function useQuizProgress({ questions, categoryId, difficulty }: UseQuizProgressProps) {
  const quizKey = `quiz-progress-${categoryId || 'random'}-${difficulty || 'all'}`;

  const [storedProgress, setStoredProgress] = useLocalStorage<QuizProgress>(quizKey, {
    answeredQuestions: [],
    currentQuestionIndex: 0,
    score: 0,
    completed: false,
  });

  const [progress, setProgress] = useState<QuizProgress>(storedProgress);

  const calculateStats = useCallback((): QuizStats => {
    const totalAnswered = progress.answeredQuestions.length;
    const correctAnswers = progress.answeredQuestions.filter(a => a.isCorrect).length;
    
    return {
      totalQuestions: questions.length,
      correctAnswers,
      wrongAnswers: totalAnswered - correctAnswers,
      percentage: totalAnswered ? (correctAnswers / totalAnswered) * 100 : 0,
    };
  }, [progress.answeredQuestions, questions.length]);

  const answerQuestion = useCallback((answer: string) => {
    const currentQuestion = questions[progress.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    const newProgress = {
      ...progress,
      answeredQuestions: [
        ...progress.answeredQuestions,
        {
          questionId: currentQuestion.id,
          selectedAnswer: answer,
          isCorrect,
          timestamp: Date.now(),
        },
      ],
      score: progress.score + (isCorrect ? 1 : 0),
      currentQuestionIndex: progress.currentQuestionIndex + 1,
      completed: progress.currentQuestionIndex + 1 >= questions.length,
    };

    setProgress(newProgress);
    setStoredProgress(newProgress);

    return isCorrect;
  }, [progress, questions, setStoredProgress]);

  const resetQuiz = useCallback(() => {
    const newProgress = {
      answeredQuestions: [],
      currentQuestionIndex: 0,
      score: 0,
      completed: false,
    };

    setProgress(newProgress);
    setStoredProgress(newProgress);
  }, [setStoredProgress]);

  const getCurrentQuestion = useCallback((): Question | null => {
    if (progress.currentQuestionIndex >= questions.length) {
      return null;
    }
    return questions[progress.currentQuestionIndex];
  }, [progress.currentQuestionIndex, questions]);

  return {
    currentQuestion: getCurrentQuestion(),
    currentQuestionIndex: progress.currentQuestionIndex,
    answeredQuestions: progress.answeredQuestions,
    score: progress.score,
    completed: progress.completed,
    stats: calculateStats(),
    answerQuestion,
    resetQuiz,
  };
}

export default useQuizProgress;