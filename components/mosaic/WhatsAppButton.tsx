import { useSettings } from '../../context/SettingsContext';
import { ANALYTICS_EVENTS, trackEvent } from '../../lib/analytics';
import { getWhatsAppUrl } from '../../lib/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';

type WhatsAppVariant = 'float' | 'nav' | 'nav-mobile' | 'block';

interface WhatsAppButtonProps {
  variant: WhatsAppVariant;
  labelKey?: 'whatsapp.nav' | 'whatsapp.cta';
  className?: string;
}

const PILL_BASE =
  'inline-flex items-center justify-center gap-2 bg-[#25D366] text-white border border-[#25D366] font-semibold no-underline transition-[transform,background,box-shadow] duration-200 hover:bg-[#1ebe57] hover:border-[#1ebe57] hover:text-white mosaic-focus-ring';

const FLOAT_CLASSES = [
  'fixed z-[80] inline-flex items-center justify-center',
  'right-4 bottom-28 sm:right-5 sm:bottom-5',
  'w-14 h-14 sm:w-[3.75rem] sm:h-[3.75rem]',
  'p-2 text-white',
  'rounded-full bg-[#25D366]',
  'shadow-[0_10px_28px_rgba(37,211,102,0.35)]',
  'transition-[transform,box-shadow] duration-200',
  'hover:-translate-y-0.5 hover:scale-[1.04]',
  'hover:shadow-[0_14px_32px_rgba(37,211,102,0.42)]',
  'mosaic-focus-ring',
].join(' ');

const PILL_VARIANT_CLASSES: Record<Exclude<WhatsAppVariant, 'float'>, string> = {
  nav: 'hidden min-[1100px]:inline-flex px-3.5 py-2 text-xs rounded-full',
  'nav-mobile': 'inline-flex min-[1100px]:hidden px-3 py-1.5 text-xs rounded-full',
  block: 'w-full py-3 px-4 rounded-md',
};

const ICON_SIZE: Record<WhatsAppVariant, number> = {
  float: 28,
  nav: 16,
  'nav-mobile': 18,
  block: 18,
};

const WhatsAppButton = ({
  variant,
  labelKey = 'whatsapp.nav',
  className = '',
}: WhatsAppButtonProps) => {
  const { lang, t } = useSettings();
  const href = getWhatsAppUrl(lang);
  const isFloat = variant === 'float';

  const handleClick = () => {
    trackEvent(ANALYTICS_EVENTS.ctaClick, { location: `whatsapp_${variant}` });
  };

  const icon = <WhatsAppIcon size={ICON_SIZE[variant]} />;

  if (isFloat) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`${FLOAT_CLASSES} ${className}`}
        aria-label={t('whatsapp.aria')}
      >
        {icon}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${PILL_BASE} ${PILL_VARIANT_CLASSES[variant]} ${className}`}
      aria-label={t('whatsapp.aria')}
    >
      {icon}
      <span>{t(labelKey)}</span>
    </a>
  );
};

export default WhatsAppButton;
