import React, { useId } from 'react';

interface MosaicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}

const MosaicInput = ({ label, error, errorMessage, className = '', id, ...props }: MosaicInputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = errorMessage ? `${inputId}-error` : undefined;

  return (
  <div>
    <label htmlFor={inputId} className="mosaic-label text-mosaic-black-300 block mb-2">{label}</label>
    <input
      id={inputId}
      aria-invalid={error || undefined}
      aria-describedby={errorId}
      className={`block w-full px-4 py-3 bg-mosaic-white-200 border text-mosaic-black-500 mosaic-body text-sm mosaic-focus-ring transition-colors focus:border-mosaic-cyan hover:border-mosaic-cyan/40 ${
        error ? 'border-red-400 focus:border-red-400' : 'border-mosaic-white-300'
      } ${className}`}
      {...props}
    />
    {error && errorMessage && (
      <p id={errorId} className="mt-1.5 text-xs text-red-500" role="alert">{errorMessage}</p>
    )}
  </div>
  );
};

export default MosaicInput;
