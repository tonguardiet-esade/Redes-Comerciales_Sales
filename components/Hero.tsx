import React from 'react';
import { Check } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';
import ScrollIndicator from './mosaic/ScrollIndicator';

const Hero: React.FC = () => {
  const { t } = useTranslations();

  const bullets = [t.hero.bullet1, t.hero.bullet2, t.hero.bullet3];

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="mosaic-container">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mosaic-label text-mosaic-cyan mb-6 scroll-reveal-line">
            Redes Comerciales.Sales
          </p>

          <h1 className="mosaic-h1-hero text-mosaic-black-500 mb-8 scroll-reveal-heading">
            <span className="block">{t.hero.titlePrefix}</span>
            <span className="text-mosaic-cyan">{t.hero.titleSuffix}</span>
          </h1>

          <p className="mosaic-body-lg text-mosaic-black-300 max-w-2xl mx-auto mb-10 scroll-reveal-body">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            {bullets.map((bullet, i) => (
              <div key={i} className="flex items-center gap-3 scroll-reveal-line">
                <div className="w-6 h-6 rounded-full border-2 border-mosaic-cyan flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-mosaic-cyan" strokeWidth={3} />
                </div>
                <span className="mosaic-body text-mosaic-black-400 font-medium">{bullet}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 scroll-reveal-body">
            <a
              href="https://docs.google.com/document/d/1OPd5lOdrmdgav90nInqiugNnNQbcsU6_sw_lPn_4Hk0/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
            >
              <button
                type="button"
                className="w-full sm:w-auto px-10 py-4 bg-mosaic-inverse text-mosaic-on-dark-100 mosaic-label hover:brightness-110 transition-all cursor-pointer mosaic-focus-ring"
              >
                {t.hero.cta}
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="mosaic-container mt-16">
        <ScrollIndicator onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })} />
      </div>
    </section>
  );
};

export default Hero;
