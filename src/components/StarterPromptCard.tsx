import { StarterPrompt } from '../types/aiGenerator';

interface StarterPromptCardProps {
  prompt: StarterPrompt;
  isSelected: boolean;
  onSelect: () => void;
}

const StarterPromptCard: React.FC<StarterPromptCardProps> = ({
  prompt,
  isSelected,
  onSelect
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'game':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'lesson':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'simulation':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'tool':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`card cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected 
          ? 'ring-2 ring-primary bg-primary/5' 
          : 'hover:bg-base-200/50'
      }`}
    >
      <div className="card-body p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="text-3xl">{prompt.icon}</div>
          <div className={`badge badge-sm ${getCategoryColor(prompt.category)}`}>
            {prompt.category}
          </div>
        </div>
        
        <h3 className="card-title text-base font-semibold mb-2">
          {prompt.title}
        </h3>
        
        <p className="text-sm text-base-content/70 line-clamp-3">
          {prompt.description}
        </p>
        
        {isSelected && (
          <div className="mt-3 pt-3 border-t border-base-200">
            <div className="flex items-center text-primary text-sm">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Selected
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StarterPromptCard;