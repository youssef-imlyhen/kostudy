// The type of question, which will determine how it's rendered and graded.
export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-in-the-blank';

// Base interface with properties common to all question types.
export interface QuestionBase {
  id: string;
  type: QuestionType;
  category: string;
  question: string;
  imageUrl?: string; // Optional image for the question
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  source?: 'default' | 'custom'; // Optional property to track question origin
}

// Specific interface for Multiple Choice questions.
export interface MultipleChoiceQuestion extends QuestionBase {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: string | string[]; // Can be a single answer or multiple
}

// Specific interface for True/False questions.
export interface TrueFalseQuestion extends QuestionBase {
  type: 'true-false';
  correctAnswer: boolean; // Use boolean for clarity
}

// Specific interface for Fill-in-the-Blank questions.
export interface FillInTheBlankQuestion extends QuestionBase {
  type: 'fill-in-the-blank';
  correctAnswer: string; // The exact string to match
}

// A union of all possible question types.
export type Question = MultipleChoiceQuestion | TrueFalseQuestion | FillInTheBlankQuestion;