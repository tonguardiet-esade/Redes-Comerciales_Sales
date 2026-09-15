import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mosaicScrollState, type MosaicScrollZone } from '../lib/mosaicScrollState';

gsap.registerPlugin(ScrollTrigger);

export const useMosaicScrollDriver = (pageRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let lastProgress = 0;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: page,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          mosaicScrollState.progress = self.progress;
          mosaicScrollState.velocity = self.progress - lastProgress;
          lastProgress = self.progress;
        },
      });

      page.querySelectorAll<HTMLElement>('[data-scroll-zone]').forEach((section) => {
        const zone = section.dataset.scrollZone as MosaicScrollZone | undefined;
        if (!zone) return;

        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            mosaicScrollState.zones[zone] = self.progress;
          },
        });
      });
    }, page);

    return () => ctx.revert();
  }, [pageRef]);
};
