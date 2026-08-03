import { ReactNode } from 'react';
import BottomNav from './BottomNav';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export default function Layout({ children, hideNav = false }: LayoutProps) {
  const { designTokens } = useTheme();

  return (
    <div
      className="min-h-screen bg-base-200 flex flex-col"
      style={{
        fontFamily: designTokens.typography.fontFamily,
        color: designTokens.colors.text,
        backgroundColor: designTokens.colors.background,
        transition: `all ${designTokens.transitions.duration} ${designTokens.transitions.timing}`,
      }}
    >
      <main
        className={`flex-1 min-w-0 w-full max-w-5xl mx-auto px-3 sm:px-4 md:px-6 ${
          hideNav ? 'pb-6 md:pb-8' : 'app-main'
        }`}
      >
        <div className="py-6 md:py-8">
          <div
            className="min-w-0 bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-sm p-4 sm:p-6 md:p-8 border border-base-100/20"
            style={{
              borderRadius: designTokens.borderRadius.xl,
              boxShadow: designTokens.shadows.card,
            }}
          >
            {children}
          </div>
        </div>
      </main>

      {!hideNav && (
        <div className="app-bottom-nav fixed bottom-0 left-0 right-0 z-40 w-full px-0 md:px-6 pointer-events-none">
          <div className="w-full max-w-2xl mx-auto pointer-events-auto md:rounded-2xl md:overflow-hidden md:shadow-lg md:border md:border-base-200">
            <BottomNav />
          </div>
        </div>
      )}
    </div>
  );
}
