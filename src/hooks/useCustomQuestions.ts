import { useLocalStorage } from './useLocalStorage';
import { Question } from '../types/question';
import { v4 as uuidv4 } from 'uuid';
import { ParsedQuestion } from '../utils/import';

const CUSTOM_QUESTIONS_KEY = 'customQuizQuestions';

export const useCustomQuestions = () => {
  const [customQuestions, setCustomQuestions] = useLocalStorage<Question[]>(CUSTOM_QUESTIONS_KEY, []);

  const addQuestion = (question: Omit<Question, 'id' | 'source'>) => {
    const newQuestion = { ...question, id: uuidv4(), source: 'custom' } as Question;
    setCustomQuestions([...customQuestions, newQuestion]);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    const updatedQuestions = customQuestions.map(q =>
      q.id === updatedQuestion.id ? { ...updatedQuestion, source: 'custom' as const } : q
    );
    setCustomQuestions(updatedQuestions);
  };

  const deleteQuestion = (questionId: string) => {
    const filteredQuestions = customQuestions.filter(q => q.id !== questionId);
    setCustomQuestions([...filteredQuestions]);
  };

  const addBulkQuestions = (questions: ParsedQuestion[]) => {
    const newQuestions = questions.map(q => ({ ...q, id: uuidv4(), source: 'custom' } as Question));
    setCustomQuestions([...customQuestions, ...newQuestions]);
  };

  const bulkDeleteQuestions = (questionIds: string[]) => {
    const filteredQuestions = customQuestions.filter(q => !questionIds.includes(q.id));
    setCustomQuestions(filteredQuestions);
  };

  return {
    customQuestions,
    setCustomQuestions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addBulkQuestions,
    bulkDeleteQuestions,
  };
};