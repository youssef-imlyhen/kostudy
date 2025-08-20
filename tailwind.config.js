import { config } from './src/config.ts';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: config.primaryColor,
        secondary: '#FFC107',
        secondaryHover: '#FFB300',
        accent: '#1E88E5',
        accentHover: '#1976D2',
        success: config.primaryColor,
        successHover: '#4CAF50',
        warning: '#FF9800',
        warningHover: '#FB8C00',
        error: '#F44336',
        errorHover: '#E53935',
        info: '#2196F3',
        infoHover: '#1E88E5',
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        'duolingo-green': '#58cc02',
        'duolingo-dark-green': '#46a302',
        'brilliant-purple': '#6a0dad',
        'brilliant-blue': '#0066cc',
      },
      spacing: {
        '4.5': '1.125rem', // 18px
        '18': '4.5rem',    // 72px
        '96': '24rem',     // 384px
        '128': '32rem',    // 512px
      },
      borderRadius: {
        'xs': '0.25rem',   // 4px
        'sm': '0.375rem',  // 6px
        'md': '0.5rem',    // 8px
        'lg': '0.75rem',   // 12px
        'xl': '1rem',      // 16px
        '2xl': '1.5rem',   // 24px
        '3xl': '2rem',     // 32px
        '4xl': '3rem',     // 48px
        'full': '9999px',
        'card': '1.5rem',  // 24px for cards
        'button': '0.75rem', // 12px for buttons
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'lg': '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)',
        'xl': '0 10px 15px rgba(0, 0, 0, 0.1)',
        '2xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
        'card': '0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'elevated': '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)',
        'duolingo': '0 4px 0 0 rgba(0, 0, 0, 0.2)',
        'brilliant': '0 10px 15px -3px rgba(106, 13, 173, 0.1), 0 4px 6px -2px rgba(106, 13, 173, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        mono: ['Roboto Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',   // 12px
        'sm': '0.875rem',  // 14px
        'base': '1rem',    // 16px
        'lg': '1.125rem',  // 18px
        'xl': '1.25rem',   // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
        '5xl': '3rem',     // 48px
        '6xl': '3.75rem',  // 60px
        '7xl': '4.5rem',   // 72px
        '8xl': '6rem',     // 96px
        '9xl': '8rem',     // 128px
      },
      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      transitionDuration: {
        'DEFAULT': '200ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shrink': {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
        'celebration': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'shrink': 'shrink 5s linear forwards',
        'celebration': 'celebration 1s ease-in-out',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: config.primaryColor,
          'primary-hover': '#4CAF50',
          secondary: '#FFC107',
          'secondary-hover': '#FFB300',
          accent: '#1E88E5',
          'accent-hover': '#1976D2',
          neutral: '#4b5563',
          'base-100': "#ffffff",
          'base-200': "#f9fafb",
          'base-300': "#f2f2f2",
          'base-content': "#1f2937",
          success: config.primaryColor,
          warning: '#FF9800',
          error: '#F44336',
          info: '#2196F3',
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: config.primaryColor,
          'primary-hover': '#4CAF50',
          secondary: '#FFC107',
          'secondary-hover': '#FFB300',
          accent: '#1E88E5',
          'accent-hover': '#1976D2',
          'base-100': "#1a1a1a",
          'base-200': "#262626",
          'base-300': "#333333",
          'base-content': "#e0e0e0",
          success: config.primaryColor,
          warning: '#FF9800',
          error: '#F44336',
          info: '#2196F3',
        },
      },
    ],
  },
}
