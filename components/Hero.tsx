import React from 'react';
import { Check } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';
import ScrollIndicator from './mosaic/ScrollIndicator';
import { EXTERNAL_LINKS } from '../config/externalLinks';

const Hero: React.FC = () => {
  const { t } = useTranslations();

  const bullets = [t.hero.bullet1, t.hero.bullet2, t.hero.bullet3];

  const scrollToTools = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="mosaic-container">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mosaic-label text-mosaic-cyan mb-6 scroll-reveal-line">
            {t.hero.eyebrow}
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

          <div className="scroll-reveal-body">
            <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4">
              <a
                href="https://docs.google.com/document/d/1OPd5lOdrmdgav90nInqiugNnNQbcsU6_sw_lPn_4Hk0/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="button"
                className="flex w-full sm:w-auto"
              >
                <button
                  type="button"
                  className="w-full sm:w-auto px-10 py-4 bg-mosaic-inverse text-mosaic-on-dark-100 mosaic-label hover:brightness-110 transition-all cursor-pointer mosaic-focus-ring"
                >
                  {t.hero.cta}
                </button>
              </a>
              <button
                type="button"
                onClick={scrollToTools}
                data-cursor="button"
                className="w-full sm:w-auto px-10 py-4 border border-mosaic-black-300 text-mosaic-black-500 mosaic-label hover:border-mosaic-cyan hover:text-mosaic-cyan transition-all cursor-pointer mosaic-focus-ring"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>
            <p className="mosaic-body text-sm text-mosaic-black-300 mt-2 max-w-md mx-auto">
              {t.hero.ctaMicrocopy}
            </p>
          </div>

          <div className="mt-12 max-w-2xl mx-auto scroll-reveal-body">
            <p className="mosaic-body text-mosaic-black-300 mb-4">{t.hero.positioning}</p>
            <a
              href={EXTERNAL_LINKS.web}
              target="_blank"
              rel="noopener noreferrer"
              className="mosaic-link text-mosaic-cyan mosaic-focus-ring rounded-sm inline-flex items-center gap-1"
            >
              <span>{t.hero.ecosystemLink}</span>
              <span className="mosaic-link-icon">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" fill="none" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="mosaic-container mt-16">
        <ScrollIndicator onClick={scrollToTools} />
      </div>
    </section>
  );
};

export default Hero;
