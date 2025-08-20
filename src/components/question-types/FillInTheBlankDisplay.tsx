import React, { useState } from 'react';
import { FillInTheBlankQuestion } from '../../types/question';

interface Props {
  question: FillInTheBlankQuestion;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  showResult: boolean;
}

const FillInTheBlankDisplay: React.FC<Props> = ({ question, selectedAnswer, onAnswerSelect, showResult }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAnswerSelect(inputValue.trim());
    }
  };

  const isCorrect = selectedAnswer?.toLowerCase() === question.correctAnswer.toLowerCase();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {question.imageUrl && <img src={question.imageUrl} alt="Question" className="w-full h-auto object-cover rounded-lg mb-4" />}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={showResult}
        className={`w-full px-4 py-3 rounded-2xl border-2 border-b-4 transition-all duration-200
                  ${showResult ? (isCorrect ? 'border-success' : 'border-error') : 'border-base-300 focus:border-primary'}`}
        placeholder="Type your answer..."
      />
      <button
        type="submit"
        disabled={showResult || !inputValue.trim()}
        className="btn btn-primary rounded-2xl font-bold border-2 border-b-4 w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default FillInTheBlankDisplay;