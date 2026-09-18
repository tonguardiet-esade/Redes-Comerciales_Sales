import React, { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import logo from '../../img/logo.svg';
import { useSettings } from '../../context/SettingsContext';
import { EXTERNAL_LINKS } from '../../config/externalLinks';
import WhatsAppButton from './WhatsAppButton';
import { type Language } from '../../types';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'ca', label: 'CA' },
  { code: 'en', label: 'EN' },
];

const LOCALE_MAP: Record<Language, string> = {
  es: 'es-ES',
  ca: 'ca-ES',
  en: 'en-GB',
};

const SalesHeader = () => {
  const { lang, setLang, theme, toggleTheme, t } = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!langRef.current?.contains(event.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [langOpen]);

  const timeStr = new Date().toLocaleTimeString(LOCALE_MAP[lang], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const currentLangLabel = LANGUAGES.find((l) => l.code === lang)?.label ?? 'ES';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-mosaic-white-200/95 backdrop-blur-sm border-b border-mosaic-white-300/60' : 'bg-transparent'
        }`}
      >
        <div className="mosaic-container h-16 md:h-20 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 cursor-pointer mosaic-focus-ring rounded-sm"
            aria-label={t('nav.home')}
          >
            <img src={logo} alt="" className="w-8 h-8" aria-hidden="true" />
            <div className="hidden sm:flex flex-col items-start">
              <span className="mosaic-label text-mosaic-black-500 leading-none">Redes Comerciales</span>
              <span className="mosaic-label text-mosaic-cyan text-[9px] leading-none mt-0.5">Sales</span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8" aria-label={t('a11y.mainNav')}>
            <button type="button" onClick={() => scrollToSection('tools')} className="mosaic-label text-mosaic-black-300 hover:text-mosaic-cyan transition-colors cursor-pointer mosaic-focus-ring rounded-sm px-1">
              {t('nav.tools')}
            </button>
            <a href={EXTERNAL_LINKS.web} target="_blank" rel="noreferrer" className="mosaic-label text-mosaic-red hover:opacity-80 mosaic-focus-ring rounded-sm px-1">
              {t('nav.web')}
            </a>
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative hidden md:block" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="mosaic-label text-mosaic-black-300 hover:text-mosaic-cyan transition-colors cursor-pointer mosaic-focus-ring rounded-sm px-1"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label={`${t('a11y.mainNav')}: ${currentLangLabel}`}
              >
                {currentLangLabel}
              </button>
              {langOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 top-full mt-2 bg-mosaic-white-100 border border-mosaic-white-300 py-2 min-w-[80px] shadow-lg z-50"
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      role="option"
                      aria-selected={lang === l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`block w-full text-left px-4 py-1.5 mosaic-label cursor-pointer hover:text-mosaic-cyan mosaic-focus-ring ${
                        lang === l.code ? 'text-mosaic-cyan' : 'text-mosaic-black-300'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="hidden md:flex items-center justify-center text-mosaic-black-300 hover:text-mosaic-cyan transition-colors cursor-pointer mosaic-focus-ring rounded-sm p-1"
              aria-label={theme === 'dark' ? t('theme.toggleToLight') : t('theme.toggleToDark')}
              aria-pressed={theme === 'dark'}
              title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>

            <span className="mosaic-label text-mosaic-black-300 hidden md:inline" aria-hidden="true">
              {lang} {timeStr}
            </span>

            <WhatsAppButton variant="nav-mobile" />
            <WhatsAppButton variant="nav" />

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer mosaic-focus-ring rounded-sm"
              aria-label={t('a11y.openMenu')}
              aria-expanded={menuOpen}
            >
              <span className="block w-5 h-[1.5px] bg-mosaic-black-500" />
              <span className="block w-5 h-[1.5px] bg-mosaic-black-500" />
              <span className="block w-3 h-[1.5px] bg-mosaic-black-500 ml-auto" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-mosaic-white-200 flex flex-col" role="dialog" aria-modal="true">
          <div className="mosaic-container flex justify-between items-center h-16">
            <span className="mosaic-label text-mosaic-black-500">{t('nav.menu')}</span>
            <button type="button" onClick={() => setMenuOpen(false)} className="mosaic-label text-mosaic-black-300 cursor-pointer mosaic-focus-ring rounded-sm px-2 py-1">
              {t('nav.close')}
            </button>
          </div>
          <nav className="flex-1 mosaic-container flex flex-col justify-center gap-8 py-12">
            <button type="button" onClick={() => scrollToSection('tools')} className="mosaic-h2 text-left cursor-pointer hover:text-mosaic-cyan transition-colors mosaic-focus-ring rounded-sm">
              {t('nav.tools')}
            </button>
            <a href={EXTERNAL_LINKS.web} target="_blank" rel="noreferrer" className="mosaic-h2 text-mosaic-red hover:opacity-80 mosaic-focus-ring rounded-sm">
              {t('nav.web')}
            </a>
            <div className="flex gap-4 pt-4 items-center flex-wrap">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={`mosaic-label px-1 py-1 cursor-pointer transition-colors mosaic-focus-ring ${
                    lang === l.code ? 'text-mosaic-cyan' : 'text-mosaic-black-300 hover:text-mosaic-cyan'
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-center text-mosaic-black-300 hover:text-mosaic-cyan transition-colors cursor-pointer mosaic-focus-ring p-1"
                aria-label={theme === 'dark' ? t('theme.toggleToLight') : t('theme.toggleToDark')}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                ) : (
                  <Moon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                )}
              </button>
              <span className="mosaic-label text-mosaic-black-300">{lang} {timeStr}</span>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default SalesHeader;
