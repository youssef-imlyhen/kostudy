import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'error' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  responsive?: boolean;
}

export default function ActionButton({
  onClick,
  icon,
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  responsive = true
}: ActionButtonProps) {
  const variantClasses = {
    primary: 'btn-primary text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'btn-secondary text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    accent: 'btn-accent text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    error: 'btn-error text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    ghost: 'btn-ghost'
  };

  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg'
  };

  const baseClasses = 'btn rounded-2xl font-bold border-2 border-b-4';
  const disabledClasses = disabled ? 'btn-disabled' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${className}
      `}
    >
      {icon && <span className={label ? 'mr-2' : ''}>{icon}</span>}
      {responsive ? <span className="hidden sm:inline">{label}</span> : label}
    </button>
  );
}