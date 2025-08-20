import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'interactive';
  padding?: 'default' | 'compact';
  className?: string;
}

export default function Card({
  children,
  variant = 'default',
  padding = 'default',
  className = '',
}: CardProps) {
  const baseClasses = 'bg-base-100 rounded-2xl shadow-lg transition-all duration-300';

  const variantClasses = {
    default: 'border-2 border-b-4 border-base-300',
    interactive: 'border-2 border-b-4 border-base-300 hover:border-primary hover:shadow-xl hover:-translate-y-1 cursor-pointer',
  };

  const paddingClasses = {
    default: 'p-6',
    compact: 'p-4',
  };

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}