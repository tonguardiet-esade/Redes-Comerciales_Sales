import React from 'react';
import { useSettings } from '../../context/SettingsContext';

interface ScrollIndicatorProps {
  onClick?: () => void;
}

const ScrollIndicator = ({ onClick }: ScrollIndicatorProps) => {
  const { t } = useSettings();

  return (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col items-start gap-2 cursor-pointer group"
    aria-label={t('common.scrollDownAria')}
  >
    <span className="mosaic-label text-mosaic-black-300 group-hover:text-mosaic-cyan transition-colors">
      {t('common.scrollDown')}
    </span>
    <div className="flex flex-col gap-0.5">
      <svg className="mosaic-scroll-chevron w-3 h-3 text-mosaic-cyan" viewBox="0 0 12 8" fill="none">
        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="mosaic-scroll-chevron w-3 h-3 text-mosaic-cyan" viewBox="0 0 12 8" fill="none">
        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  </button>
  );
};

export default ScrollIndicator;
