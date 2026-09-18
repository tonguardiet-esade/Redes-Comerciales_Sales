import React, { useEffect, useState } from 'react';
import { useSettings } from '../../context/SettingsContext';

interface StickyCtaProps {
  onClick?: () => void;
  label?: string;
}

const StickyCta = ({ onClick, label }: StickyCtaProps) => {
  const { t } = useSettings();
  const [visible, setVisible] = useState(false);
  const ctaLabel = label ?? t('sticky.cta');

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-cta fixed bottom-4 md:bottom-6 left-4 right-4 md:left-auto md:right-[5.75rem] z-50 flex justify-center md:justify-end pointer-events-none">
      <button
        type="button"
        onClick={onClick}
        data-cursor="button"
        className="sticky-cta-btn pointer-events-auto w-full md:w-auto max-w-md px-6 py-3.5 min-h-[48px] bg-mosaic-cyan text-mosaic-black-500 font-medium text-sm rounded-full shadow-lg shadow-mosaic-cyan/25 hover:shadow-mosaic-cyan/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer mosaic-focus-ring"
      >
        {ctaLabel}
      </button>
    </div>
  );
};

export default StickyCta;
