import { useEffect, useState } from 'react';

export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
};

export const getScrollBehavior = (reduced = false): ScrollBehavior =>
  reduced ? 'auto' : 'smooth';
