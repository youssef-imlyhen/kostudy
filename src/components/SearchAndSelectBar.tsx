import ActionButton from './ActionButton';
import { TrashIcon } from '@heroicons/react/24/outline';

interface SearchAndSelectBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isAllSelected: boolean;
  onSelectAll: () => void;
  selectedCount: number;
  onDeleteSelected: () => void;
  totalItems: number;
  placeholder?: string;
}

export default function SearchAndSelectBar({
  searchTerm,
  onSearchChange,
  isAllSelected,
  onSelectAll,
  selectedCount,
  onDeleteSelected,
  totalItems,
  placeholder = "Search..."
}: SearchAndSelectBarProps) {
  return (
    <div className="px-4 mb-4 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-4">
      <div className="flex-grow">
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input input-bordered w-full pl-10 pr-4 py-2 hover:shadow-lg transition-shadow duration-300 rounded-2xl border-2 border-b-4"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="checkbox"
            checked={isAllSelected}
            onChange={onSelectAll}
            disabled={totalItems === 0}
            id="select-all-checkbox"
          />
          <label htmlFor="select-all-checkbox" className="ml-2 cursor-pointer text-sm font-medium text-base-content hover:text-primary transition-colors duration-200">Select All</label>
        </div>
        {selectedCount > 0 && (
          <ActionButton
            onClick={onDeleteSelected}
            icon={<TrashIcon className="w-5 h-5" />}
            label={`Delete (${selectedCount})`}
            variant="error"
            size="sm"
            responsive={false}
            className="ml-4 transform hover:scale-105 transition-transform duration-200"
          />
        )}
      </div>
    </div>
  );
}