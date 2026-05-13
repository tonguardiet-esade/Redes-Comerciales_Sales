
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { type LanguageContextType } from '../types';

export const useTranslations = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within a LanguageProvider');
  }
  return context;
};
