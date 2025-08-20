import React from 'react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  responsive?: boolean;
}

export default function TabButton({
  isActive,
  onClick,
  icon,
  label,
  responsive = true
}: TabButtonProps) {
  const baseClasses = `
    tab tab-lg flex-1 transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100
    rounded-2xl font-bold border-2 border-b-4
  `;
  
  const activeClasses = `
    tab-active !bg-primary !text-primary-content
    shadow-lg transform translate-y-[-2px]
  `;
  
  const inactiveClasses = `
    hover:bg-base-200/80 transform hover:-translate-y-0.5
  `;
  
  // For responsive buttons, show full label on larger screens and abbreviated on smaller screens
  const renderLabel = () => {
    if (!responsive) return label;
    
    // Split label into full and abbreviated versions
    const abbreviated = label.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
    
    return (
      <>
        <span className="hidden xs:inline">{label}</span>
        <span className="xs:hidden">{abbreviated || label.charAt(0)}</span>
      </>
    );
  };

  return (
    <a 
      className={`
        ${baseClasses}
        ${isActive ? activeClasses : inactiveClasses}
      `}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {renderLabel()}
    </a>
  );
}