import React from 'react';
import { Link } from 'react-router-dom';
import { LockClosedIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Card from './Card';
import { getCategoryColor } from '../data/questions';
import { useCategoryEmojis } from '../hooks/useCategoryEmojis';

interface CategoryCardProps {
  id: string;
  name?: string;
  title?: string;
  description: string;
  questionCount: number;
  locked?: boolean;
  size?: 'small' | 'large';
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  title,
  description,
  questionCount,
  locked = false,
  size = 'large'
}) => {
  const { getEmoji } = useCategoryEmojis();
  
  // Determine the display title
  const displayTitle = title || name || id.charAt(0).toUpperCase() + id.slice(1).replace(/_/g, ' ');
  
  // Determine text sizes based on size prop
  const titleSize = size === 'small' ? 'text-sm sm:text-base' : 'text-base sm:text-lg';
  const badgeSize = size === 'small' ? 'text-xs sm:text-sm' : 'text-sm';
  
  return (
    <Link to={`/categories/${id}`} className="block">
      <Card
        variant="interactive"
        className={`group flex flex-col ${locked ? 'opacity-75' : ''}`}
      >
        <div className="flex flex-col items-center mb-3">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${getCategoryColor(id)}`}>
            <span className="text-2xl">{getEmoji(id)}</span>
          </div>
          <h3 className={`font-bold text-base-content group-hover:text-primary transition-colors text-center ${titleSize}`}>
            {displayTitle}
          </h3>
        </div>
        
        {locked && (
          <div className="absolute top-2 right-2">
            <LockClosedIcon className="w-5 h-5 text-base-content/40" />
          </div>
        )}
        
        <p className="text-sm text-base-content/70 mb-3 flex-grow">{description}</p>
        <div className="flex justify-between items-center">
          <span className={`badge badge-primary badge-outline whitespace-nowrap ${badgeSize} px-1.5 sm:px-2 leading-none`}>
            <span className="sm:hidden">{questionCount} Q</span>
            <span className="hidden sm:inline">{questionCount} questions</span>
          </span>
          <ChevronRightIcon className="w-5 h-5 text-base-content/40 group-hover:translate-x-1 transition-transform" />
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;