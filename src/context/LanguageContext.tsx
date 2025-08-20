import { createContext, useContext, useState, ReactNode } from 'react';
import { useEffect } from 'react';
import { en, fr, es, ar, de, hi, pt, zh, ru, ja, ko, it, nl, pl, tr, cs } from '../localization';

export const languages = {
  en: { name: 'English', dir: 'ltr' },
  fr: { name: 'Français', dir: 'ltr' },
  es: { name: 'Español', dir: 'ltr' },
  ar: { name: 'العربية', dir: 'rtl' },
  de: { name: 'Deutsch', dir: 'ltr' },
  hi: { name: 'हिन्दी', dir: 'ltr' },
  pt: { name: 'Português', dir: 'ltr' },
  zh: { name: '中文', dir: 'ltr' },
  ru: { name: 'Русский', dir: 'ltr' },
  ja: { name: '日本語', dir: 'ltr' },
  ko: { name: '한국어', dir: 'ltr' },
  it: { name: 'Italiano', dir: 'ltr' },
  nl: { name: 'Nederlands', dir: 'ltr' },
  pl: { name: 'Polski', dir: 'ltr' },
  tr: { name: 'Türkçe', dir: 'ltr' },
  cs: { name: 'Čeština', dir: 'ltr' },
} as const;

export type Language = keyof typeof languages;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
  dir: 'ltr' | 'rtl';
}

const translations = { en, fr, es, ar, de, hi, pt, zh, ru, ja, ko, it, nl, pl, tr, cs };

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage in languages) {
      return savedLanguage as Language;
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = languages[language].dir;
  }, [language]);

  const t = (key: string, options?: { [key: string]: string | number }) => {
    const keys = key.split('.');
    console.log('t() lookup start:', { key, language, root: translations[language] });
    let result: any = translations[language];
    for (const k of keys) {
      console.log('t() segment lookup:', { segment: k, current: result });
      result = result?.[k];
      if (result === undefined) {
        console.log(`Translation key not found: ${key} for language: ${language}`);
        return key; // Return key if not found
      }
    }
    console.log(`t() lookup result for '${key}':`, result);

    if (options && typeof result === 'string') {
      return Object.entries(options).reduce((acc, [key, value]) => {
        return acc.replace(`{{${key}}}`, String(value));
      }, result);
    }

    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir: languages[language].dir }}>
      {children}
    </LanguageContext.Provider>
  );
};