import React, { useEffect, useId, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useSettings } from '../../context/SettingsContext';

interface MosaicModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  align?: 'center' | 'right';
}

const maxWidthClass = {
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
};

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const MosaicModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg',
  align = 'center',
}: MosaicModalProps) => {
  const { t } = useSettings();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => !(el as HTMLButtonElement).disabled && !el.hasAttribute('disabled'));

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    const focusTimer = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    }, 0);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 z-[100] flex ${
            align === 'right' ? 'justify-end' : 'items-center justify-center p-4 md:p-6'
          }`}
        >
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 mosaic-overlay backdrop-blur-sm cursor-default"
            onClick={onClose}
            aria-label={t('common.close')}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            initial={{ opacity: 0, y: align === 'right' ? 0 : 20, x: align === 'right' ? 40 : 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: align === 'right' ? 0 : 20, x: align === 'right' ? 40 : 0 }}
            className={`relative bg-mosaic-white-100 border border-mosaic-white-300 shadow-2xl flex flex-col overflow-hidden ${
              align === 'right'
                ? 'w-full max-w-md h-full border-l border-mosaic-white-300'
                : `w-full ${maxWidthClass[maxWidth]} max-h-[90vh]`
            }`}
          >
            {(title || subtitle) && (
              <div className="p-6 md:p-8 border-b border-mosaic-white-300 flex justify-between items-start gap-4 shrink-0">
                <div>
                  {title && <h2 id={titleId} className="mosaic-h4">{title}</h2>}
                  {subtitle && <p className="mosaic-label text-mosaic-black-300 mt-2">{subtitle}</p>}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center border border-mosaic-white-300 text-mosaic-black-300 hover:text-mosaic-cyan hover:border-mosaic-cyan transition-colors shrink-0 mosaic-focus-ring"
                  aria-label={t('common.close')}
                >
                  ✕
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto custom-scrollbar">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MosaicModal;
