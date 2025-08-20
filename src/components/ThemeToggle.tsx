import { useTheme } from '../context/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const { theme, toggleTheme, designTokens } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        color: designTokens.colors.text,
        transition: `all ${designTokens.transitions.duration} ${designTokens.transitions.timing}`,
      }}
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6" style={{ strokeWidth: 1.5 }} />
      ) : (
        <SunIcon className="w-6 h-6" style={{ strokeWidth: 1.5 }} />
      )}
    </button>
  );
}