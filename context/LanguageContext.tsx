import React, { createContext, useState, useMemo, type ReactNode } from 'react';
import { type Language, type LanguageContextType, type Translations } from '../types';
import { en } from '../i18n/en';
import { es } from '../i18n/es';
import { ca } from '../i18n/ca';
import { de } from '../i18n/de';
import { fr } from '../i18n/fr';
import { it } from '../i18n/it';

const translations: { [key in Language]: Translations } = { en, es, ca, de, fr, it };

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') {
        return 'es'; // Default for non-browser environments
    }

    // 1. Check for a saved language in localStorage
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang && translations[storedLang]) {
        return storedLang;
    }

    // 2. Auto-detect browser language
    const browserLang = navigator.language.split(/[-_]/)[0] as Language;
    if (translations[browserLang]) {
        return browserLang;
    }
    
    // 3. Fallback to a default language
    return 'es';
};


export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = useMemo(() => translations[language], [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};