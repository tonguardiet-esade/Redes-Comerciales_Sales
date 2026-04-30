import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { useTheme } from '../hooks/useTheme';
import { type Language } from '../types';

const Logo: React.FC = () => {
    return (
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D93F34" />
                        <stop offset="100%" stopColor="#8A1F18" />
                    </linearGradient>
                </defs>
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" className="opacity-20 text-gray-400" />
                <path d="M20 10V22M11.3 27L20 22M28.7 27L20 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 dark:text-gray-600" />
                <circle cx="20" cy="10" r="3.5" fill="url(#logoGrad)" />
                <circle cx="11.3" cy="27" r="3.5" fill="url(#logoGrad)" />
                <circle cx="28.7" cy="27" r="3.5" fill="url(#logoGrad)" />
                <circle cx="20" cy="22" r="5.5" fill="#1A3B66" className="dark:fill-white" />
                <circle cx="20" cy="22" r="2.5" fill="white" className="dark:fill-[#1A3B66]" />
            </svg>
        </div>
        <div className="flex flex-col">
            <span className="text-xl font-bold text-[#1A3B66] dark:text-white leading-none tracking-tight">Redes Comerciales.Sales</span>
            <span className="text-[8.5px] font-bold text-gray-500 dark:text-gray-400 tracking-tighter uppercase mt-0.5">Sales Intelligence & Networking AI</span>
        </div>
      </div>
    );
};

interface HeaderProps {
  onOpenSupportModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSupportModal }) => {
  const { language, setLanguage, t } = useTranslations();
  const { theme, toggleTheme } = useTheme();
  const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
  
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string }[] = [
    { code: 'es', name: 'Español' },
    { code: 'ca', name: 'Català' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setLangDropdownOpen(false);
  };
  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const iconButtonClasses = "flex items-center justify-center p-2 w-10 h-10 rounded-full leading-none text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors";

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 border-b ${scrolled ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md border-gray-200 dark:border-white/20 shadow-md' : 'bg-white dark:bg-[#050505] border-gray-100 dark:border-white/10'}`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        <a href="/" aria-label="Redes Comerciales Home">
          <Logo />
        </a>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          
          <button onClick={toggleTheme} className={iconButtonClasses} aria-label={t.theme.toggle}>
            <span className="material-symbols-outlined text-xl">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>
          
          <div className="relative" ref={langDropdownRef}>
            <button 
              onClick={() => setLangDropdownOpen(prev => !prev)} 
              className="flex items-center justify-center h-10 px-3 rounded-full leading-none text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={t.header.languageTooltip}
            >
               <span className="material-symbols-outlined text-xl mr-1">language</span>
               <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#1E293B] rounded-md shadow-lg z-20 border dark:border-white/20 animate-fade-in-scale-fast">
                <div className="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 border-b dark:border-white/20">{t.header.languageTooltip}</div>
                <ul className="py-1">
                  {languages.map((lang) => (
                    <li key={lang.code}>
                      <button
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'font-bold text-[#10B981]' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-white/10`}
                      >
                        {lang.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button 
            onClick={onOpenSupportModal} 
            className="hidden md:flex items-center justify-center px-5 h-10 rounded-lg font-bold text-white bg-[#D93F34] hover:bg-[#c4362b] transition-all shadow-md hover:shadow-red-500/20"
          >
            Contacto
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;