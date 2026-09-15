import React from 'react';

interface MosaicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

const MosaicButton = ({
  variant = 'primary',
  fullWidth = true,
  className = '',
  children,
  ...props
}: MosaicButtonProps) => (
  <button
    data-cursor="button"
    className={`${fullWidth ? 'w-full' : ''} py-4 mosaic-label mosaic-focus-ring transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
      variant === 'primary'
        ? 'bg-mosaic-inverse text-mosaic-on-dark-100 hover:brightness-110'
        : 'bg-mosaic-white-200 text-mosaic-black-500 border border-mosaic-white-300 hover:border-mosaic-cyan hover:text-mosaic-cyan'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default MosaicButton;
