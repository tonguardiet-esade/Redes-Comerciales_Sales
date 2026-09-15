import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ParsedMetric = {
  prefix: string;
  target: number;
  suffix: string;
  hasDecimal: boolean;
};

const parseMetricValue = (raw: string): ParsedMetric | null => {
  const trimmed = raw.trim();
  const match = trimmed.match(/^([+\-]?\s*(?:[$€]\s*)?)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, numStr, suffix] = match;
  const target = parseFloat(numStr.replace(',', '.'));
  if (Number.isNaN(target)) return null;

  return {
    prefix,
    target,
    suffix,
    hasDecimal: /[.,]/.test(numStr),
  };
};

const formatMetricValue = (parsed: ParsedMetric, value: number) => {
  const display = parsed.hasDecimal ? value.toFixed(1) : Math.round(value).toString();
  return `${parsed.prefix}${display}${parsed.suffix}`;
};

const wrapWords = (el: HTMLElement) => {
  if (el.dataset.split === 'true') return;
  const text = el.textContent ?? '';
  el.innerHTML = text
    .split(/(\s+)/)
    .map((part) => (part.trim() ? `<span class="mosaic-word inline-block">${part}</span>` : part))
    .join('');
  el.dataset.split = 'true';
};

export const useLandingScrollEffects = (rootRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('.mosaic-split-heading').forEach((heading) => {
        wrapWords(heading);
        const words = heading.querySelectorAll('.mosaic-word');
        gsap.from(words, {
          y: '110%',
          opacity: 0,
          rotateZ: 2,
          duration: 1,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        });
      });

      gsap.utils.toArray<HTMLElement>('.scroll-reveal-heading').forEach((el) => {
        gsap.from(el, {
          y: 100,
          clipPath: 'inset(100% 0 0 0)',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      gsap.utils.toArray<HTMLElement>('.scroll-reveal-line').forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: line, start: 'top 90%' },
        });
      });

      gsap.utils.toArray<HTMLElement>('.scroll-reveal-body').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      const manifesto = root.querySelector('#manifesto');
      if (manifesto) {
        gsap.utils.toArray<HTMLElement>('.scroll-comparison-passive').forEach((el) => {
          gsap.from(el, {
            x: -70,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          });
        });

        gsap.utils.toArray<HTMLElement>('.scroll-comparison-active').forEach((el) => {
          gsap.from(el, {
            x: 70,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          });
        });

        gsap.utils.toArray<HTMLElement>('.scroll-comparison-item').forEach((item, i) => {
          gsap.from(item, {
            y: 28,
            opacity: 0,
            duration: 0.75,
            delay: (i % 3) * 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 94%' },
          });
        });
      }

      gsap.utils.toArray<HTMLElement>('.scroll-project-card').forEach((card, i) => {
        gsap.from(card, {
          y: 120,
          opacity: 0,
          scale: 0.94,
          duration: 1.1,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 92%' },
        });

        const img = card.querySelector('.scroll-parallax-img');
        if (img) {
          gsap.from(img, {
            scale: 1.08,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 92%' },
          });
        }
      });

      gsap.utils.toArray<HTMLElement>('.scroll-tech-card').forEach((card, i) => {
        gsap.from(card, {
          y: 70,
          opacity: 0,
          x: i % 2 === 0 ? -30 : 30,
          duration: 0.9,
          delay: i * 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 92%' },
        });
      });

      gsap.utils.toArray<HTMLElement>('.scroll-solution-pillar').forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%' },
        });
      });

      gsap.utils.toArray<HTMLElement>('.scroll-method-step').forEach((step, i) => {
        gsap.from(step, {
          x: i % 2 === 0 ? -80 : 80,
          y: 50,
          opacity: 0,
          duration: 1,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 90%' },
        });
      });

      gsap.utils.toArray<HTMLElement>('.scroll-benefit-row').forEach((row, i) => {
        gsap.from(row, {
          x: -60,
          opacity: 0,
          duration: 0.85,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: row, start: 'top 92%' },
        });
      });

      gsap.utils.toArray<HTMLElement>('.scroll-diff-card').forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });

      gsap.utils.toArray<HTMLElement>('.scroll-metric').forEach((metric) => {
        const valueEl = metric.querySelector('.scroll-metric-val');
        if (!valueEl) return;

        const finalText = (valueEl.textContent ?? '').trim();
        const parsed = parseMetricValue(finalText);
        if (!parsed) return;

        const proxy = { val: 0 };

        gsap.fromTo(
          proxy,
          { val: 0 },
          {
            val: parsed.target,
            duration: 1.6,
            ease: 'power2.out',
            immediateRender: false,
            onUpdate: () => {
              valueEl.textContent = formatMetricValue(parsed, proxy.val);
            },
            onComplete: () => {
              valueEl.textContent = finalText;
            },
            scrollTrigger: {
              trigger: metric,
              start: 'top 88%',
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      const modelBlock = root.querySelector('.scroll-model-block');
      if (modelBlock) {
        gsap.from(modelBlock, {
          scale: 0.9,
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: modelBlock, start: 'top 85%' },
        });
      }

      gsap.utils.toArray<HTMLElement>('.scroll-horizontal-shift').forEach((el) => {
        const getMaxShift = (maxPx = 120) => {
          const container = el.closest('.mosaic-container');
          const pad = container
            ? parseFloat(getComputedStyle(container).paddingLeft) || 16
            : 16;
          const currentX = Number(gsap.getProperty(el, 'x')) || 0;
          const naturalLeft = el.getBoundingClientRect().left - currentX;
          return -Math.min(maxPx, Math.max(0, naturalLeft - pad));
        };

        gsap.to(el, {
          x: () => getMaxShift(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });
      });

      const parallaxSections = gsap.utils.toArray<HTMLElement>('.scroll-parallax-bg');
      parallaxSections.forEach((section) => {
        const bg = section.querySelector('.parallax-bg-inner');
        if (!bg) return;

        gsap.to(bg, {
          y: 80,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });
    }, root);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [rootRef]);
};
