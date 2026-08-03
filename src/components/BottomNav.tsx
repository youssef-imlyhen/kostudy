import { useLocation, Link } from 'react-router-dom';
import {
  HomeIcon,
  TrophyIcon,
  BookOpenIcon,
  ArrowPathIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  TrophyIcon as TrophyIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  ArrowPathIcon as ArrowPathIconSolid,
  ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextIconSolid,
} from '@heroicons/react/24/solid';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function BottomNav() {
  const location = useLocation();
  const { t } = useLanguage();
  const { designTokens } = useTheme();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/dashboard', icon: HomeIcon, activeIcon: HomeIconSolid, label: t('nav.dashboard') },
    { path: '/achievements', icon: TrophyIcon, activeIcon: TrophyIconSolid, label: t('nav.achievements') },
    { path: '/categories', icon: BookOpenIcon, activeIcon: BookOpenIconSolid, label: t('nav.categories') },
    { path: '/mistakes', icon: ArrowPathIcon, activeIcon: ArrowPathIconSolid, label: t('nav.mistakes') },
    {
      path: '/chat',
      icon: ChatBubbleBottomCenterTextIcon,
      activeIcon: ChatBubbleBottomCenterTextIconSolid,
      label: t('nav.chat'),
    },
  ];

  return (
    <nav
      aria-label="Primary navigation"
      className="app-bottom-nav-surface bg-base-100/90 backdrop-blur-md border-t border-base-200 w-full"
      style={{
        borderTop: `1px solid ${designTokens.colors.surface}`,
        transition: `all ${designTokens.transitions.duration} ${designTokens.transitions.timing}`,
      }}
    >
      <div className="app-bottom-nav-content flex justify-around items-center px-2 max-w-4xl mx-auto w-full">
        {navItems.map(({ path, icon: Icon, activeIcon: ActiveIcon, label }) => {
          const isActive = currentPath === path || currentPath.startsWith(`${path}/`);
          const IconComponent = isActive ? ActiveIcon : Icon;

          return (
            <Link
              key={path}
              to={path}
              className={`group relative flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center self-stretch rounded-lg px-1 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
                isActive ? 'text-primary' : 'text-base-content/70 hover:text-base-content'
              }`}
              aria-current={isActive ? 'page' : undefined}
              style={{
                color: isActive ? designTokens.colors.primary : designTokens.colors.textMuted,
                fontFamily: designTokens.typography.fontFamily,
              }}
            >
              <div
                aria-hidden="true"
                className={`absolute -top-1 h-1 w-8 rounded-full transition-all duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundColor: designTokens.colors.primary }}
              />
              <div
                className={`flex min-w-0 max-w-full flex-col items-center justify-center rounded-lg p-1.5 transition-all duration-200 transform ${
                  isActive
                    ? 'scale-105 bg-primary/10'
                    : 'scale-100 hover:scale-105 hover:bg-base-200/50'
                }`}
              >
                <IconComponent className="w-6 h-6 mx-auto transition-transform duration-200" />
                <span
                  className={`mt-1 max-w-full truncate px-0.5 text-[10px] transition-all duration-200 sm:text-xs ${
                    isActive ? 'font-semibold' : 'font-normal'
                  }`}
                  style={{
                    fontWeight: isActive
                      ? designTokens.typography.fontWeight.semibold
                      : designTokens.typography.fontWeight.regular,
                  }}
                >
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
