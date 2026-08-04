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
  responsive = true,
}: ActionButtonProps) {
  const variantClasses = {
    primary: 'btn-primary text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'btn-secondary text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    accent: 'btn-accent text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    error: 'btn-error text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    ghost: 'btn-ghost',
  };
  const sizeClasses = { sm: 'btn-sm', md: 'btn-md', lg: 'btn-lg' };
  const canCollapseToIcon = responsive && Boolean(icon);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`btn rounded-2xl border-2 border-b-4 font-bold ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'btn-disabled' : ''} ${className}`}
    >
      {icon ? (
        <span aria-hidden="true" className={canCollapseToIcon ? 'sm:mr-2' : 'mr-2'}>
          {icon}
        </span>
      ) : null}
      <span className={canCollapseToIcon ? 'hidden sm:inline' : undefined}>{label}</span>
    </button>
  );
}
