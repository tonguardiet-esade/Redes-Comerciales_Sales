import React, { useRef } from 'react';
import SalesHeader from './mosaic/SalesHeader';
import SalesFooter from './mosaic/SalesFooter';
import MosaicVisualField from './mosaic/MosaicVisualField';
import StickyCta from './mosaic/StickyCta';
import MarketingSupportModal from './MarketingSupportModal';
import CustomCursor from './mosaic/CustomCursor';
import CookieConsent from './mosaic/CookieConsent';
import { useSettings } from '../context/SettingsContext';
import { useLenis } from '../hooks/useLenis';
import { useLandingScrollEffects } from '../hooks/useLandingScrollEffects';

interface LayoutProps {
  children: React.ReactNode;
  onOpenSupport: () => void;
  isSupportOpen: boolean;
  onCloseSupport: () => void;
}

const Layout = ({ children, onOpenSupport, isSupportOpen, onCloseSupport }: LayoutProps) => {
  const { t } = useSettings();
  const mainRef = useRef<HTMLElement>(null);
  useLenis();
  useLandingScrollEffects(mainRef);

  return (
    <div className="min-h-screen flex flex-col bg-mosaic-white-200 text-mosaic-black-500 transition-colors duration-400">
      <CustomCursor />

      <a href="#main-content" className="skip-to-content mosaic-focus-ring">
        {t('a11y.skipToContent')}
      </a>

      <SalesHeader />

      <main id="main-content" ref={mainRef} className="flex-grow relative" tabIndex={-1}>
        <MosaicVisualField scrollRootRef={mainRef} />
        <div className="relative z-10">{children}</div>
      </main>

      <StickyCta label={t('sticky.cta')} onClick={onOpenSupport} />
      <MarketingSupportModal isOpen={isSupportOpen} onClose={onCloseSupport} />
      <CookieConsent />
      <SalesFooter />
    </div>
  );
};

export default Layout;
