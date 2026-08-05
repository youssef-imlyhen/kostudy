import { Question } from '../types/question';
import ActionButton from './ActionButton';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface QuestionCardProps {
  question: Question;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function QuestionCard({
  question,
  isSelected,
  onSelect,
  onEdit,
  onDelete
}: QuestionCardProps) {
  const baseClasses = `
    p-4 bg-base-100 rounded-2xl shadow-lg flex items-start
    hover:bg-base-200 transition-all duration-300 ease-in-out
    border-2 border-b-4 border-base-300 transform hover:-translate-y-1
  `;
  
  const selectedClasses = isSelected ? 'ring-2 ring-primary border-primary' : '';

  return (
    <div className={`${baseClasses} ${selectedClasses}`}>
      <input
        type="checkbox"
        className="checkbox checkbox-primary mr-4 mt-1"
        checked={isSelected}
        onChange={() => onSelect(question.id)}
      />
      <div className="flex-grow">
        <p className="font-semibold text-base-content text-sm sm:text-base">{question.question}</p>
        <div className="flex flex-wrap gap-2 items-center mt-2 text-sm text-base-content/80">
          <span className="badge badge-ghost">{question.category}</span>
          <span className="badge badge-outline">{question.difficulty}</span>
        </div>
        <div className="flex justify-end items-center mt-3 space-x-2 border-t border-base-200/50 pt-3">
          <ActionButton
            onClick={() => onEdit(question.id)}
            icon={<PencilIcon className="w-4 h-4" />}
            label="Edit"
            variant="ghost"
            size="sm"
            responsive={false}
          />
          <ActionButton
            onClick={() => onDelete(question.id)}
            icon={<TrashIcon className="w-4 h-4" />}
            label="Delete"
            variant="ghost"
            size="sm"
            responsive={false}
          />
        </div>
      </div>
    </div>
  );
}