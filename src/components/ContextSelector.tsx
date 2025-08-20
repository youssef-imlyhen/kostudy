import { ContextSelection } from '../types/aiGenerator';
import { useLanguage } from '../context/LanguageContext';

interface ContextSelectorProps {
  context: ContextSelection;
  onChange: (context: ContextSelection) => void;
  availableCategories: string[];
}

const ContextSelector: React.FC<ContextSelectorProps> = ({
  context,
  onChange,
  availableCategories
}) => {
  const { t } = useLanguage();

  const handleCategoryToggle = (includeCategories: boolean) => {
    onChange({
      ...context,
      includeCategories,
      selectedCategories: includeCategories ? [] : undefined
    });
  };

  const handleMistakesToggle = (includeMistakes: boolean) => {
    onChange({
      ...context,
      includeMistakes
    });
  };

  const handleCategorySelect = (category: string, selected: boolean) => {
    const currentSelected = context.selectedCategories || [];
    const newSelected = selected
      ? [...currentSelected, category]
      : currentSelected.filter(c => c !== category);
    
    onChange({
      ...context,
      selectedCategories: newSelected
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('aiGenerator.context.title')}</h3>
      <p className="text-sm text-base-content/70">
        {t('aiGenerator.context.description')}
      </p>

      {/* Include Categories Toggle */}
      <div className="form-control">
        <label className="label cursor-pointer justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-primary mr-3"
            checked={context.includeCategories}
            onChange={(e) => handleCategoryToggle(e.target.checked)}
          />
          <div>
            <span className="label-text font-medium">
              {t('aiGenerator.context.includeCategories')}
            </span>
            <div className="text-xs text-base-content/60">
              {t('aiGenerator.context.includeCategoriesDesc')}
            </div>
          </div>
        </label>
      </div>

      {/* Category Selection */}
      {context.includeCategories && availableCategories.length > 0 && (
        <div className="ml-6 space-y-2">
          <div className="text-sm font-medium text-base-content/80">
            {t('aiGenerator.context.selectCategories')}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
            {availableCategories.map((category) => (
              <label key={category} className="label cursor-pointer justify-start">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary mr-2"
                  checked={context.selectedCategories?.includes(category) || false}
                  onChange={(e) => handleCategorySelect(category, e.target.checked)}
                />
                <span className="label-text text-sm">{category}</span>
              </label>
            ))}
          </div>
          {context.selectedCategories && context.selectedCategories.length > 0 && (
            <div className="text-xs text-primary">
              {t('aiGenerator.context.selectedCount', { 
                count: context.selectedCategories.length 
              })}
            </div>
          )}
        </div>
      )}

      {/* Include Mistakes Toggle */}
      <div className="form-control">
        <label className="label cursor-pointer justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-primary mr-3"
            checked={context.includeMistakes}
            onChange={(e) => handleMistakesToggle(e.target.checked)}
          />
          <div>
            <span className="label-text font-medium">
              {t('aiGenerator.context.includeMistakes')}
            </span>
            <div className="text-xs text-base-content/60">
              {t('aiGenerator.context.includeMistakesDesc')}
            </div>
          </div>
        </label>
      </div>

      {/* Context Summary */}
      {(context.includeCategories || context.includeMistakes) && (
        <div className="bg-base-200 p-3 rounded-lg">
          <div className="text-sm font-medium mb-1">
            {t('aiGenerator.context.summary')}
          </div>
          <div className="text-xs text-base-content/70 space-y-1">
            {context.includeCategories && (
              <div>
                • {context.selectedCategories && context.selectedCategories.length > 0
                  ? t('aiGenerator.context.summaryCategories', { 
                      categories: context.selectedCategories.join(', ') 
                    })
                  : t('aiGenerator.context.summaryAllCategories')
                }
              </div>
            )}
            {context.includeMistakes && (
              <div>• {t('aiGenerator.context.summaryMistakes')}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextSelector;