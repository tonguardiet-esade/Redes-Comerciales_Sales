import React, { createContext, useMemo, type ReactNode } from 'react';
import { type Language, type LanguageContextType, type Translations } from '../types';
import { en } from '../i18n/en';
import { es } from '../i18n/es';
import { ca } from '../i18n/ca';
import { useSettings } from './SettingsContext';

const translations: { [key in Language]: Translations } = { en, es, ca };

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { lang, setLang } = useSettings();
  const t = useMemo(() => translations[lang], [lang]);

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language: lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
