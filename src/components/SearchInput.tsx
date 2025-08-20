import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = ""
}: SearchInputProps) {
  const baseClasses = `
    input input-bordered w-full pl-10 pr-4 py-2
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-primary/50
    rounded-2xl hover:shadow-lg border-2 border-b-4
  `;

  return (
    <div className={`relative ${className}`}>
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={baseClasses}
      />
    </div>
  );
}