import { createContext, useContext } from 'react';

export interface QuizContextType {
  currentQuiz: {
    category?: string;
    difficulty?: string;
    progress?: number;
    score?: number;
    currentLevel?: string;
    playAllMode?: boolean;
    currentStreak?: number;
    maxStreak?: number;
  };
  setCurrentQuiz: (quiz: QuizContextType['currentQuiz']) => void;
}

export const QuizContext = createContext<QuizContextType | null>(null);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};