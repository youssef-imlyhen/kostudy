import React, { useEffect } from 'react';
import { useAchievements } from '../hooks/useAchievements';
import { useLanguage } from '../context/LanguageContext';
import { TrophyIcon, ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface AchievementNotificationProps {
  onNotificationClose?: () => void;
}

// Duolingo-like badge with shine and tier accent
function Badge({
  icon,
  tier = 'bronze',
}: {
  icon: string;
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
}) {
  const tierColors: Record<string, string> = {
    bronze: 'from-amber-600 to-amber-500',
    silver: 'from-slate-400 to-slate-300',
    gold: 'from-yellow-400 to-yellow-300',
    platinum: 'from-cyan-300 to-blue-300',
  };
  const ringColors: Record<string, string> = {
    bronze: 'ring-amber-700/50',
    silver: 'ring-slate-400/50',
    gold: 'ring-yellow-500/50',
    platinum: 'ring-cyan-400/50',
  };

  return (
    <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${tierColors[tier]} shadow-duolingo ring-4 ${ringColors[tier]} flex items-center justify-center`}>
      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white/30 backdrop-blur-sm border border-white/40" />
      <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse-slow" />
      <span className="text-xl select-none">{icon}</span>
    </div>
  );
}

// Three-node path segment showing previous, current, next badge nodes
function PathSegment() {
  return (
    <div className="mt-3 px-2">
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-white/70" />
        <div className="h-1 flex-1 bg-gradient-to-r from-white/60 via-white/40 to-white/20 mx-1 rounded-full" />
        <div className="w-3 h-3 rounded-full bg-white shadow-inner ring-2 ring-white/60" />
        <div className="h-1 flex-1 bg-gradient-to-r from-white/20 via-white/40 to-white/60 mx-1 rounded-full" />
        <div className="w-2 h-2 rounded-full bg-white/40" />
      </div>
    </div>
  );
}

export default function AchievementNotification({ onNotificationClose }: AchievementNotificationProps) {
  const { newlyUnlockedAchievement, clearNewlyUnlockedAchievement } = useAchievements();
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    if (newlyUnlockedAchievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        clearNewlyUnlockedAchievement();
        if (onNotificationClose) onNotificationClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [newlyUnlockedAchievement, clearNewlyUnlockedAchievement, onNotificationClose]);

  if (!isVisible || !newlyUnlockedAchievement) return null;

  const tier = newlyUnlockedAchievement.tier;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
      {/* Celebration container */}
      <div className="relative bg-gradient-to-br from-duolingo-green to-secondary rounded-3xl shadow-xl p-4 max-w-sm border-2 border-b-4 border-white/20 animate-celebration overflow-hidden">
        {/* Subtle confetti dots */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute top-2 left-3 w-2 h-2 bg-white/80 rounded-full" />
          <div className="absolute top-6 left-16 w-1 h-1 bg-white/70 rounded-full" />
          <div className="absolute top-3 right-8 w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="absolute bottom-4 left-10 w-1 h-1 bg-white/60 rounded-full" />
          <div className="absolute bottom-3 right-6 w-2 h-2 bg-white/70 rounded-full" />
        </div>

        <div className="flex items-start relative">
          <div className="flex-shrink-0">
            <Badge icon={newlyUnlockedAchievement.icon} tier={tier} />
          </div>

          <div className="ml-3 flex-1">
            <p className="text-sm font-extrabold text-white flex items-center">
              <CheckCircleIcon className="w-4 h-4 mr-1 text-white/90" /> {t('achievementsScreen.unlocked')}
            </p>
            <p className="text-base font-black text-white mt-0.5">{t(newlyUnlockedAchievement.title)}</p>
            <p className="text-xs text-white/85 mt-1">{t(newlyUnlockedAchievement.description)}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full border border-white/20">
                +{newlyUnlockedAchievement.reward.points} {t('achievementsScreen.points')}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/80 border border-white/20 rounded-full px-2 py-0.5">{tier}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsVisible(false);
              clearNewlyUnlockedAchievement();
              if (onNotificationClose) onNotificationClose();
            }}
            className="flex-shrink-0 ml-2 text-white/70 hover:text-white"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Progress/path segment */}
        <PathSegment />

        {/* Actions */}
        <div className="mt-3 flex items-center justify-end gap-2">
          <a href="/achievements" className="inline-flex items-center text-xs font-bold text-white/95 hover:text-white">
            {t('dashboard.achievements')} <ChevronRightIcon className="w-4 h-4 ml-0.5" />
          </a>
        </div>

        {/* Auto-hide progress bar */}
        <div className="mt-3 w-full bg-white/20 rounded-full h-1">
          <div className="bg-white h-1 rounded-full animate-shrink" />
        </div>
      </div>
    </div>
  );
}