import React, { useEffect, useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import {
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_OPEN_EVENT,
} from '../../lib/cookieConsent';
import { initAnalytics } from '../../lib/analytics';
import MosaicButton from './MosaicButton';

const CookieConsent = () => {
  const { t } = useSettings();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => setVisible(true);
    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpen);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    initAnalytics();
    setVisible(false);
  };

  useEffect(() => {
    if (localStorage.getItem(COOKIE_CONSENT_KEY)) {
      initAnalytics();
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-0 left-0 right-0 z-[70] p-4 md:p-6"
    >
      <div className="mosaic-container">
        <div className="max-w-4xl mx-auto border border-mosaic-white-300 bg-mosaic-white-100 shadow-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <p id="cookie-consent-title" className="mosaic-label text-mosaic-cyan mb-2">
              {t('cookies.banner.title')}
            </p>
            <p id="cookie-consent-desc" className="mosaic-body text-sm text-mosaic-black-300">
              {t('cookies.banner.text')}{' '}
              <button type="button" onClick={() => window.dispatchEvent(new Event('open-cookie-policy'))} className="text-mosaic-cyan hover:underline cursor-pointer">
                {t('cookies.banner.link')}
              </button>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <MosaicButton type="button" onClick={accept} fullWidth={false} className="px-6 whitespace-nowrap">
              {t('cookies.banner.accept')}
            </MosaicButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
