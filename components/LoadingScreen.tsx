import React from 'react';

const ProgressBar: React.FC = () => (
    <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-primary-500 w-1/2 animate-indeterminate-progress"></div>
    </div>
);

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#050505]">
      <div className="relative w-20 h-20 mb-8 animate-pulse">
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                  <linearGradient id="loadLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D93F34" />
                      <stop offset="100%" stopColor="#8A1F18" />
                  </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="18" stroke="#D93F34" strokeWidth="0.5" strokeDasharray="4 2" className="opacity-20" />
              <path d="M20 10V22M11.3 27L20 22M28.7 27L20 22" stroke="#D93F34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="10" r="3.5" fill="url(#loadLogoGrad)" />
              <circle cx="11.3" cy="27" r="3.5" fill="url(#loadLogoGrad)" />
              <circle cx="28.7" cy="27" r="3.5" fill="url(#loadLogoGrad)" />
              <circle cx="20" cy="22" r="5.5" fill="#1A3B66" />
              <circle cx="20" cy="22" r="2.5" fill="white" />
          </svg>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-[#1A3B66] dark:text-white">Redes Comerciales.Sales</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Transformando la red comercial con IA</p>
      </div>
      <ProgressBar />
    </div>
  );
};

export default LoadingScreen;