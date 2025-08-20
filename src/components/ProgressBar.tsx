import { useTheme } from '../context/ThemeContext';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

export default function ProgressBar({
  progress,
  className = '',
  showPercentage = false,
  color = 'primary',
  size = 'md',
}: ProgressBarProps) {
  const { designTokens } = useTheme();
  const percentage = Math.min(Math.max(progress, 0), 100);

  // Determine height based on size
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  // Determine color class
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    success: 'bg-success',
    error: 'bg-error',
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div
        className={`${heightClasses[size]} bg-base-200 rounded-full overflow-hidden`}
        style={{
          borderRadius: designTokens.borderRadius.full,
          backgroundColor: designTokens.colors.surface,
        }}
      >
        <div
          className={`${heightClasses[size]} ${colorClasses[color]} transition-all duration-300`}
          style={{
            width: `${percentage}%`,
            borderRadius: designTokens.borderRadius.full,
            transition: `width ${designTokens.transitions.duration} ${designTokens.transitions.timing}`,
          }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showPercentage && (
        <div
          className="text-sm text-base-content text-right"
          style={{
            color: designTokens.colors.textMuted,
            fontFamily: designTokens.typography.fontFamily,
            fontWeight: designTokens.typography.fontWeight.medium,
          }}
        >
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}