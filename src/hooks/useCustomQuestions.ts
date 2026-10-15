import { useLocalStorage } from './useLocalStorage';
import { Question } from '../types/question';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
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

  const addBulkQuestions = (questions: ParsedQuestion[], ids?: string[]) => {
    if (ids != undefined && questions.length != ids.length) {
      throw new Error("questions and ids must have the same length");
    }
    if (ids != undefined && ids.some(id => !uuidValidate(id))) {
      throw new TypeError("ids must be valid UUIDs");
    }

    const incomingQuestions = questions.map((q, idx) => ({...q, id: ids != undefined ? ids[idx] : uuidv4(), source: 'custom'} as Question));

    setCustomQuestions(prev => {
      if (!ids) {
        return [...prev, ...incomingQuestions];
      }

      const incomingMap = new Map(incomingQuestions.map(q => [q.id, q]));
      const prevIds = new Set(prev.map(q => q.id));
      // Update existing questions that match the referred IDs
      const updated = prev.map(q => incomingMap.has(q.id) ? incomingMap.get(q.id)! : q);
      // Append any incoming questions with IDs that didn't exist previously
      const toAdd = incomingQuestions.filter(q => !prevIds.has(q.id));
      return [...updated, ...toAdd];
    });
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