import React, { useState, useRef, useEffect } from 'react';
import { QuestionPack } from '../types';
import { ChevronDownIcon } from './icons';

interface DropdownOption {
    id: string;
    name: string;
    description: string;
    icon: React.FC;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  selected: DropdownOption | null;
  onSelect: (option: DropdownOption) => void;
  t?: (key: string) => string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, selected, onSelect, t }) => {
  // Fallback function for translations
  const translate = t || ((key: string) => {
    const fallbacks: Record<string, string> = {
      'sagaLearnScreen.adventureConfigurator.selectOption': 'Select an option...'
    };
    return fallbacks[key] || key;
  });

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full font-sans" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-white text-left transition-colors hover:border-gray-600"
      >
        <div className="flex items-center">
            {selected && selected.id !== 'none' && <selected.icon />}
            <span className={selected && selected.id !== 'none' ? "ml-3" : ""}>{selected ? selected.name : translate('sagaLearnScreen.adventureConfigurator.selectOption')}</span>
        </div>
        <ChevronDownIcon />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden animate-fade-in">
          <ul className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((option) => (
              <li
                key={option.id}
                onClick={() => handleSelect(option)}
                className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-700 transition-colors"
              >
                {option.id !== 'none' && <option.icon />}
                <div className={option.id !== 'none' ? 'ml-3' : ''}>
                    <p className="font-semibold text-white">{option.name}</p>
                    <p className="text-sm text-gray-400">{option.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
