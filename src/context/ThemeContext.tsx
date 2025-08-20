import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { config } from '../config';

interface DesignTokens {
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    cardPadding: string;
    sectionMargin: string;
    elementGap: string;
  };
  typography: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    body: string;
    caption: string;
    fontFamily: string;
    lineHeight: {
      body: number;
      heading: number;
      compact: number;
    };
    fontWeight: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  colors: {
    // Primary palette
    primary: string;
    primaryHover: string;
    primaryContent: string;
    
    // Secondary palette
    secondary: string;
    secondaryHover: string;
    secondaryContent: string;
    
    // Accent colors
    accent: string;
    accentHover: string;
    accentContent: string;
    
    // Backgrounds
    background: string;
    surface: string;
    
    // Text colors
    text: string;
    textMuted: string;
    textSubtle: string;
    
    // Status colors
    success: string;
    successHover: string;
    warning: string;
    warningHover: string;
    error: string;
    errorHover: string;
    info: string;
    infoHover: string;
    
    // Border colors
    border: string;
    borderHover: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    card: string;
    elevated: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    full: string;
    card: string;
    button: string;
  };
  transitions: {
    duration: string;
    timing: string;
  };
}

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
  designTokens: DesignTokens;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or config
    return localStorage.getItem('theme') || config.theme;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const generateDesignTokens = (): DesignTokens => {
    return {
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
        '3xl': '48px',
        cardPadding: '24px',
        sectionMargin: '32px',
        elementGap: '16px',
      },
      typography: {
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.75rem',
        h4: '1.5rem',
        body: '1rem',
        caption: '0.875rem',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
        lineHeight: {
          body: 1.5,
          heading: 1.2,
          compact: 1.1,
        },
        fontWeight: {
          regular: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
      },
      colors: {
        // Primary palette
        primary: config.primaryColor,
        primaryHover: theme === 'dark' ? '#059669' : '#047857',
        primaryContent: theme === 'dark' ? '#ffffff' : '#ffffff',
        
        // Secondary palette
        secondary: '#f59e0b',
        secondaryHover: theme === 'dark' ? '#d97706' : '#b45309',
        secondaryContent: theme === 'dark' ? '#ffffff' : '#ffffff',
        
        // Accent colors
        accent: '#ec4899',
        accentHover: theme === 'dark' ? '#db2777' : '#be185d',
        accentContent: theme === 'dark' ? '#ffffff' : '#ffffff',
        
        // Backgrounds
        background: theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
        surface: theme === 'dark' ? '#262626' : '#ffffff',
        
        // Text colors
        text: theme === 'dark' ? '#e0e0e0' : '#333333',
        textMuted: theme === 'dark' ? '#aaaaaa' : '#666666',
        textSubtle: theme === 'dark' ? '#777777' : '#999999',
        
        // Status colors
        success: '#4caf50',
        successHover: theme === 'dark' ? '#388e3c' : '#2e7d32',
        warning: '#ff9800',
        warningHover: theme === 'dark' ? '#ef6c00' : '#e65100',
        error: '#f44336',
        errorHover: theme === 'dark' ? '#d32f2f' : '#b71c1c',
        info: '#3b82f6',
        infoHover: theme === 'dark' ? '#2563eb' : '#1d4ed8',
        
        // Border colors
        border: theme === 'dark' ? '#3f3f3f' : '#e0e0e0',
        borderHover: theme === 'dark' ? '#555555' : '#cccccc',
      },
      shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
        card: '0 4px 12px rgba(0, 0, 0, 0.08)',
        elevated: '0 8px 20px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
        card: '16px',
        button: '12px',
      },
      transitions: {
        duration: '0.2s',
        timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    };
  };

  const designTokens = generateDesignTokens();

  const value = {
    theme,
    setTheme,
    toggleTheme: toggleTheme,
    designTokens,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Force recompilation