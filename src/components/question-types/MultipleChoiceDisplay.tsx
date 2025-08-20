import React from 'react';
import { MultipleChoiceQuestion } from '../../types/question';

interface Props {
  question: MultipleChoiceQuestion;
  selectedAnswer: string | string[] | null;
  onAnswerSelect: (answer: string | string[]) => void;
  showResult: boolean;
  onSubmit?: () => void;
}

const MultipleChoiceDisplay: React.FC<Props> = ({ question, selectedAnswer, onAnswerSelect, showResult, onSubmit }) => {
  const isMultiSelect = Array.isArray(question.correctAnswer);

  const handleSelect = (option: string) => {
    if (showResult) return;

    if (isMultiSelect) {
      const newSelection = Array.isArray(selectedAnswer) ? [...selectedAnswer] : [];
      const index = newSelection.indexOf(option);
      if (index > -1) {
        newSelection.splice(index, 1);
      } else {
        newSelection.push(option);
      }
      onAnswerSelect(newSelection);
    } else {
      onAnswerSelect(option);
    }
  };

  const isOptionImage = (option: string) => {
    return option.startsWith('http') && (option.endsWith('.jpg') || option.endsWith('.png') || option.endsWith('.gif'));
  };

  return (
    <div className={`grid gap-3 ${isMultiSelect ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {question.options.map((option) => {
        const isSelected = Array.isArray(selectedAnswer) ? selectedAnswer.includes(option) : selectedAnswer === option;
        const isCorrect = Array.isArray(question.correctAnswer) ? question.correctAnswer.includes(option) : question.correctAnswer === option;
        
        let optionClasses = `w-full p-4 rounded-2xl border-2 border-b-4 text-left transition-all duration-200
                           ${showResult ? 'cursor-default' : 'hover:bg-base-200 cursor-pointer'}`;

       if (showResult) {
         if (isCorrect) {
           optionClasses += ' bg-success text-success-content border-success';
         } else if (isSelected) {
           optionClasses += ' bg-error text-error-content border-error';
         } else {
           optionClasses += ' bg-base-100 border-base-300 opacity-60';
         }
       } else {
         optionClasses += isSelected
           ? ' border-primary bg-primary/10'
           : ' border-base-300 hover:border-primary hover:bg-primary/5';
       }

        return (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={optionClasses}
          >
            <div className="flex items-center">
              {isMultiSelect && (
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  className="checkbox checkbox-primary mr-3"
                />
              )}
              {isOptionImage(option) ? (
                <img src={option} alt="Option" className="w-full h-auto object-cover rounded-lg" />
              ) : (
                <span>{option}</span>
              )}
            </div>
          </button>
        );
      })}
      {isMultiSelect && (
        <button
          onClick={onSubmit}
          className="btn btn-primary rounded-2xl font-bold border-2 border-b-4 col-span-2 mt-4"
          disabled={showResult || !selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default MultipleChoiceDisplay;