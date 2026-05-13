import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const Hero: React.FC = () => {
  const { t } = useTranslations();

  return (
    <section className="py-12 lg:py-32 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-block px-3 py-1 bg-red-50 dark:bg-red-950/30 text-[#D93F34] dark:text-red-400 text-xs font-bold rounded-md mb-6 uppercase tracking-wider">
             Redes Comerciales.Sales
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-[#1A3B66] dark:text-white leading-[1.1] mb-8">
            <span className="block">{t.hero.titlePrefix}</span>
            <span className="text-[#D93F34]">{t.hero.titleSuffix}</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12 text-[#1A3B66] dark:text-slate-200">
             <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-[#D93F34] dark:border-red-500 flex items-center justify-center">
                   <span className="material-symbols-outlined text-[14px] font-bold text-[#D93F34] dark:text-red-500">check</span>
                </div>
                <span className="font-semibold text-lg">Más ventas sin ampliar equipo interno</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-[#D93F34] dark:border-red-500 flex items-center justify-center">
                   <span className="material-symbols-outlined text-[14px] font-bold text-[#D93F34] dark:text-red-500">check</span>
                </div>
                <span className="font-semibold text-lg">Partners activos y alineados</span>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://docs.google.com/document/d/1OPd5lOdrmdgav90nInqiugNnNQbcsU6_sw_lPn_4Hk0/" target="_blank" rel="noopener noreferrer">
              <button className="w-full sm:w-auto px-10 py-4 bg-[#D93F34] hover:bg-[#c4362b] text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-[#D93F34]/20">
                {t.hero.cta}
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;