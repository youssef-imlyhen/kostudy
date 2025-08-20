import { useLocation, Link } from 'react-router-dom';
import {
  HomeIcon, TrophyIcon, BookOpenIcon, CircleStackIcon, ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid, TrophyIcon as TrophyIconSolid,
  BookOpenIcon as BookOpenIconSolid, CircleStackIcon as CircleStackIconSolid,
  ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextIconSolid
} from '@heroicons/react/24/solid';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function BottomNav() {
  const location = useLocation();
  const { t } = useLanguage();
  const { designTokens } = useTheme();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', icon: HomeIcon, activeIcon: HomeIconSolid, label: t('nav.dashboard') },
    { path: '/achievements', icon: TrophyIcon, activeIcon: TrophyIconSolid, label: t('nav.achievements') },
    { path: '/categories', icon: BookOpenIcon, activeIcon: BookOpenIconSolid, label: t('nav.categories') },
    { path: '/questions', icon: CircleStackIcon, activeIcon: CircleStackIconSolid, label: t('nav.questions') },
    { path: '/chat', icon: ChatBubbleBottomCenterTextIcon, activeIcon: ChatBubbleBottomCenterTextIconSolid, label: t('nav.chat') }
  ];

  return (
    <nav
      className="bg-base-100/90 backdrop-blur-md border-t border-base-200 w-full"
      style={{
        borderTop: `1px solid ${designTokens.colors.surface}`,
        transition: `all ${designTokens.transitions.duration} ${designTokens.transitions.timing}`,
      }}
    >
      <div className="flex justify-around items-center h-16 px-2 max-w-4xl mx-auto w-full">
        {navItems.map(({ path, icon: Icon, activeIcon: ActiveIcon, label }) => {
          const isActive = currentPath === path ||
                          (path !== '/' && currentPath.startsWith(path));
          const IconComponent = isActive ? ActiveIcon : Icon;

          return (
            <Link
              key={path}
              to={path}
              className={`group relative flex flex-col items-center justify-center w-full h-full transition-all duration-200 ${
                isActive ? 'text-primary' : 'text-base-content/70 hover:text-base-content'
              }`}
              aria-current={isActive ? 'page' : undefined}
              style={{
                color: isActive ? designTokens.colors.primary : designTokens.colors.textMuted,
                fontFamily: designTokens.typography.fontFamily,
              }}
            >
              <div
                className={`absolute -top-1 h-1 w-8 rounded-full transition-all duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundColor: designTokens.colors.primary,
                }}
              />
              <div
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 transform ${
                  isActive
                    ? 'scale-105 bg-primary/10'
                    : 'scale-100 hover:scale-105 hover:bg-base-200/50'
                }`}
              >
                <IconComponent className="w-6 h-6 mx-auto transition-transform duration-200" />
                <span
                  className={`text-xs mt-1 transition-all duration-200 ${
                    isActive ? 'font-semibold' : 'font-normal'
                  }`}
                  style={{
                    fontWeight: isActive ? designTokens.typography.fontWeight.semibold : designTokens.typography.fontWeight.regular,
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