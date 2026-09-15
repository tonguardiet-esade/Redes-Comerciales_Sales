import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export const scrollToTop = (options?: { immediate?: boolean }) => {
  const immediate = options?.immediate ?? true;

  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: immediate ? 'auto' : 'smooth' });
  }

  requestAnimationFrame(() => ScrollTrigger.refresh());
};

export const useLenis = (enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', onRefresh);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onTick);
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [enabled]);
};
