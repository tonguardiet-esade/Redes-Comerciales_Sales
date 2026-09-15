import React from 'react';
import logo from '../../img/logo.svg';
import { useSettings } from '../../context/SettingsContext';
import { EXTERNAL_LINKS, webLegalUrl } from '../../config/externalLinks';
import { openCookieConsent } from '../../lib/cookieConsent';
import { useTranslations } from '../../hooks/useTranslations';

const SalesFooter = () => {
  const { t } = useSettings();
  const { t: ts } = useTranslations();

  const toolLinks = [
    { id: 'commercialStrategies', label: ts.featureCards.commercialStrategies.title },
    { id: 'aiMarketing', label: ts.featureCards.aiMarketing.title },
    { id: 'virtualEvents', label: ts.featureCards.virtualEvents.title },
    { id: 'commercialAutomation', label: ts.featureCards.commercialAutomation.title },
    { id: 'salesAcademy', label: ts.featureCards.salesAcademy.title },
    { id: 'dataRoom', label: ts.featureCards.dataRoom.title },
  ];

  const legalLinks = [
    { label: t('footer.legalNotice'), href: webLegalUrl('/aviso-legal') },
    { label: t('footer.cookies'), href: webLegalUrl('/politica-cookies') },
    { label: t('footer.privacy'), href: webLegalUrl('/politica-privacidad') },
  ];

  const scrollToTools = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  const linkClass =
    'mosaic-body text-sm text-mosaic-on-dark-400 hover:text-mosaic-cyan transition-colors mosaic-focus-ring rounded-sm';

  return (
    <footer className="mosaic-footer-shell text-mosaic-on-dark-400" style={{ paddingTop: 'var(--spacer-lg)' }}>
      <div className="mosaic-container pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <img src={logo} alt="" className="w-8 h-8 brightness-0 invert opacity-80" aria-hidden="true" />
              <span className="mosaic-label text-mosaic-on-dark-100">Redes Comerciales.Sales</span>
            </div>
            <p className="mosaic-body text-mosaic-on-dark-500 text-sm max-w-xs mb-6">{t('footer.tagline')}</p>
            <p className="mosaic-label text-mosaic-on-dark-500 text-[10px]">{ts.footer.version}</p>
          </div>

          <div className="md:col-span-3">
            <p className="mosaic-label text-mosaic-on-dark-500 mb-6">{t('footer.tools')}</p>
            <ul className="space-y-3">
              {toolLinks.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={scrollToTools}
                    className={`${linkClass} cursor-pointer text-left`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <a href={EXTERNAL_LINKS.web} target="_blank" rel="noreferrer" className={linkClass}>
                  {t('nav.web')}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mosaic-label text-mosaic-on-dark-500 mb-6">{t('footer.legal')}</p>
            <ul className="space-y-3">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer" className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openCookieConsent}
                  className={`${linkClass} cursor-pointer text-left`}
                >
                  {t('cookies.manage')}
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="mosaic-label text-mosaic-on-dark-500 mb-4">{t('footer.explore')}</p>
            <a
              href={EXTERNAL_LINKS.web}
              target="_blank"
              rel="noreferrer"
              className="mosaic-link text-mosaic-cyan mosaic-focus-ring rounded-sm"
            >
              <span>{t('nav.web')}</span>
              <span className="mosaic-link-icon">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
              </span>
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-mosaic-inverse-soft">
          <p className="mosaic-label text-mosaic-on-dark-500 text-center text-[10px]">
            &copy; {new Date().getFullYear()} {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SalesFooter;
