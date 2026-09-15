import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Language } from '../types';
import { landingEs } from '../lib/i18n/landingEs';
import { landingEn } from '../lib/i18n/landingEn';
import { landingCa } from '../lib/i18n/landingCa';

type Theme = 'light' | 'dark';
type MosaicLang = 'es' | 'en' | 'ca';

interface SettingsContextType {
  lang: Language;
  theme: Theme;
  setLang: (lang: Language) => void;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const mosaicTranslations: Record<MosaicLang, Record<string, string>> = {
  es: { ...landingEs },
  en: { ...landingEn },
  ca: { ...landingCa },
};

const salesUiStrings: Record<Language, Record<string, string>> = {
  es: {
    'nav.home': 'Inicio',
    'nav.tools': 'Herramientas',
    'nav.contact': 'Contacto',
    'nav.web': 'Web principal',
    'nav.platform': 'Plataforma',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar',
    'footer.rights': 'Redes Comerciales.Sales. Todos los derechos reservados.',
    'footer.tagline': 'Sales Intelligence & Networking AI — herramientas inteligentes para impulsar tu máquina de ventas.',
    'footer.tools': 'Herramientas',
    'footer.explore': 'Ecosistema',
    'footer.legal': 'Legal',
    'footer.legalNotice': 'Aviso legal',
    'footer.cookies': 'Política de cookies',
    'footer.privacy': 'Política de privacidad',
    'sticky.cta': 'Solicitar soporte',
    'support.marketing': 'Soporte de marketing',
    'support.subject': 'Asunto',
    'support.inquiry': 'Consulta',
    'support.placeholder_subject': '¿En qué podemos ayudarte?',
    'support.placeholder_inquiry': 'Describe tu consulta de marketing o ventas...',
    'support.send': 'Enviar consulta',
    'support.success': 'Consulta enviada correctamente. Nuestro equipo contactará contigo pronto.',
    'support.sending': 'Enviando...',
    'support.subtitle': 'Canal de atención directa',
  },
  en: {
    'nav.home': 'Home',
    'nav.tools': 'Tools',
    'nav.contact': 'Contact',
    'nav.web': 'Main website',
    'nav.platform': 'Platform',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'footer.rights': 'Redes Comerciales.Sales. All rights reserved.',
    'footer.tagline': 'Sales Intelligence & Networking AI — smart tools to power your sales engine.',
    'footer.tools': 'Tools',
    'footer.explore': 'Ecosystem',
    'footer.legal': 'Legal',
    'footer.legalNotice': 'Legal notice',
    'footer.cookies': 'Cookie policy',
    'footer.privacy': 'Privacy policy',
    'sticky.cta': 'Request support',
    'support.marketing': 'Marketing support',
    'support.subject': 'Subject',
    'support.inquiry': 'Inquiry',
    'support.placeholder_subject': 'How can we help?',
    'support.placeholder_inquiry': 'Describe your marketing or sales inquiry...',
    'support.send': 'Send inquiry',
    'support.success': 'Inquiry sent successfully. Our team will contact you soon.',
    'support.sending': 'Sending...',
    'support.subtitle': 'Direct support channel',
  },
  ca: {
    'nav.home': 'Inici',
    'nav.tools': 'Eines',
    'nav.contact': 'Contacte',
    'nav.web': 'Web principal',
    'nav.platform': 'Plataforma',
    'nav.menu': 'Menú',
    'nav.close': 'Tancar',
    'footer.rights': 'Redes Comerciales.Sales. Tots els drets reservats.',
    'footer.tagline': 'Sales Intelligence & Networking AI — eines inteligents per impulsar la teva màquina de vendes.',
    'footer.tools': 'Eines',
    'footer.explore': 'Ecosistema',
    'footer.legal': 'Legal',
    'footer.legalNotice': 'Avís legal',
    'footer.cookies': 'Política de cookies',
    'footer.privacy': 'Política de privacitat',
    'sticky.cta': 'Sol·licitar suport',
    'support.marketing': 'Suport de màrqueting',
    'support.subject': 'Assumpte',
    'support.inquiry': 'Consulta',
    'support.placeholder_subject': 'En què et podem ajudar?',
    'support.placeholder_inquiry': 'Descriu la teva consulta de màrqueting o vendes...',
    'support.send': 'Enviar consulta',
    'support.success': 'Consulta enviada correctament. El nostre equip contactarà amb tu aviat.',
    'support.sending': 'Enviant...',
    'support.subtitle': 'Canal d\'atenció directa',
  },
};

const SUPPORTED_LANGS: Language[] = ['es', 'en', 'ca'];

const normalizeLang = (value: string | null | undefined): Language => {
  if (value === 'ca' || value === 'en' || value === 'es') return value;
  if (value === 'fr' || value === 'de' || value === 'it') return 'en';
  return 'es';
};

const getInitialLang = (): Language => {
  const stored = normalizeLang(localStorage.getItem('language'));
  if (SUPPORTED_LANGS.includes(stored)) return stored;
  const browser = normalizeLang(navigator.language.split(/[-_]/)[0]);
  if (SUPPORTED_LANGS.includes(browser)) return browser;
  return 'es';
};

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem('gw_theme') as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};

const applyThemeClass = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children?: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(getInitialLang);
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('gw_theme', theme);
    applyThemeClass(theme);
  }, [theme]);

  const setLang = (l: Language) => setLangState(l);
  const toggleTheme = () => setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));

  const t = (key: string) => {
    const mosaicLang: MosaicLang = lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : 'es';
    return (
      salesUiStrings[lang]?.[key] ||
      mosaicTranslations[mosaicLang]?.[key] ||
      mosaicTranslations.es[key] ||
      salesUiStrings.es[key] ||
      key
    );
  };

  return (
    <SettingsContext.Provider value={{ lang, theme, setLang, toggleTheme, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
