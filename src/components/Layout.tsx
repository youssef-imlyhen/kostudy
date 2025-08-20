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
      {/* Main content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 pb-24 md:pb-8">
        <div className="py-6 md:py-8">
          <div
            className="bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 md:p-8 border border-base-100/20"
            style={{
              borderRadius: designTokens.borderRadius.xl,
              boxShadow: designTokens.shadows.card,
            }}
          >
            {children}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      {!hideNav && (
        <div className="fixed bottom-0 left-0 right-0 w-full max-w-4xl mx-auto">
          <BottomNav />
        </div>
      )}
    </div>
  );
}