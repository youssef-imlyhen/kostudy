import React from 'react';
import { TrueFalseQuestion } from '../../types/question';

interface Props {
  question: TrueFalseQuestion;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  showResult: boolean;
}

const TrueFalseDisplay: React.FC<Props> = ({ question, selectedAnswer, onAnswerSelect, showResult }) => {
  const options = [
    { label: 'True', value: 'true' },
    { label: 'False', value: 'false' },
  ];

  return (
    <div className="space-y-3">
      {question.imageUrl && <img src={question.imageUrl} alt="Question" className="w-full h-auto object-cover rounded-lg mb-4" />}
      {options.map(({ label, value }) => {
        const isSelected = selectedAnswer === value;
        const isCorrect = String(question.correctAnswer) === value;
        let optionClasses = `w-full p-4 rounded-2xl border-2 border-b-4 text-left transition-all duration-200
                           ${selectedAnswer ? 'cursor-default' : 'hover:bg-base-200 cursor-pointer'}`;

        if (showResult) {
          if (isCorrect) {
            optionClasses += ' bg-success text-success-content border-success';
          } else if (isSelected) {
            optionClasses += ' bg-error text-error-content border-error';
          } else {
            optionClasses += ' border-base-300 opacity-50';
          }
        } else {
          optionClasses += isSelected
            ? ' border-primary bg-primary/10'
            : ' border-base-300 hover:border-primary hover:bg-primary/5';
        }

        return (
          <button
            key={value}
            onClick={() => !showResult && onAnswerSelect(value)}
            className={optionClasses}
          >
            <div className="flex items-center">
              {showResult && isCorrect && (
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {showResult && isSelected && !isCorrect && (
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span>{label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default TrueFalseDisplay;