import { Link } from 'react-router-dom';
import { Cog6ToothIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showSettings?: boolean;
  showThemeToggle?: boolean;
}

export default function Header({
  title,
  showBackButton = false,
  showSettings = true,
  showThemeToggle = true
}: HeaderProps) {
  const { t } = useLanguage();
  const { designTokens } = useTheme();

  return (
    <header
          className="relative z-10 bg-base-100 shadow-sm  px-4 py-2 mb-4"
          style={{
            transition: `background-color ${designTokens.transitions.duration} ${designTokens.transitions.timing}, color ${designTokens.transitions.duration} ${designTokens.transitions.timing}`,
          }}
        >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-2 h-12">
            {showBackButton && (
              <Link
                to=".."
                className="mr-3 inline-flex h-12 items-center text-base-content hover:text-primary"
                style={{
                  transition: `color ${designTokens.transitions.duration} ${designTokens.transitions.timing}`,
                }}
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
            )}
            <Link to="/" className="mr-2 inline-flex h-12 items-center" aria-label={t('homeScreen.welcome')}>
              <img
                src="/kostudy.png"
                alt="Kostudy logo"
                className="block w-6 h-6 object-contain rounded-md align-middle"
                style={{
                  transition: `opacity ${designTokens.transitions.duration} ${designTokens.transitions.timing}`,
                }}
              />
            </Link>
            <h1
              className="flex items-center h-12 mb-0 text-xl font-bold text-base-content leading-none"
              style={{
                fontFamily: designTokens.typography.fontFamily,
                fontWeight: designTokens.typography.fontWeight.bold,
                transition: `color ${designTokens.transitions.duration} ${designTokens.transitions.timing}`,
              }}
            >
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-2 h-12">
            {showThemeToggle && (
              <span className="inline-flex h-12 items-center">
                <ThemeToggle />
              </span>
            )}

            {showSettings && (
              <Link
                to="/settings"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full hover:bg-base-200 transition-colors"
                aria-label={t('settings')}
                style={{
                  transition: `background-color ${designTokens.transitions.duration} ${designTokens.transitions.timing}, color ${designTokens.transitions.duration} ${designTokens.transitions.timing}`,
                }}
              >
                <Cog6ToothIcon className="w-6 h-6 text-base-content align-middle" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}