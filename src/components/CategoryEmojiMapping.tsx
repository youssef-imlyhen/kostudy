import React, { useState } from 'react';
import { useCategoryEmojis } from '../hooks/useCategoryEmojis';
import { useLanguage } from '../context/LanguageContext';

interface CategoryEmojiMappingProps {
  onCategorySelect?: (category: string) => void;
}

const CategoryEmojiMapping: React.FC<CategoryEmojiMappingProps> = ({ onCategorySelect }) => {
  const { t } = useLanguage();
  const { emojis } = useCategoryEmojis();
  const [searchTerm, setSearchTerm] = useState('');

  // Convert emojis object to array and filter by search term
  const emojiEntries = Object.entries(emojis).filter(([category]) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">{t('categoryEmojiMapping.title')}</h3>
      
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={t('categoryEmojiMapping.searchPlaceholder')}
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Emoji Mapping List */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {emojiEntries.length > 0 ? (
          emojiEntries.map(([category, emoji]) => (
            <div
              key={category}
              className="flex items-center justify-between p-2 hover:bg-base-200 rounded cursor-pointer"
              onClick={() => onCategorySelect && onCategorySelect(category)}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="flex-grow ml-2">{category}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-base-content/70">{t('categoryEmojiMapping.noCategoriesFound')}</p>
        )}
      </div>
    </div>
  );
};

export default CategoryEmojiMapping;