import React from 'react';

interface ActionBarProps {
  children: React.ReactNode;
  className?: string;
}

export default function ActionBar({
  children,
  className = ""
}: ActionBarProps) {
  const baseClasses = `
    px-4 mb-4
  `;

  return (
    <div className={`${baseClasses} ${className}`}>
      <div className="flex gap-2 justify-center flex-wrap">
        {children}
      </div>
    </div>
  );
}