import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export const useTextReveal = (triggerOnScroll = true) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const split = new SplitType(el, { types: 'lines', lineClass: 'line-reveal-wrap' });

    const lines = el.querySelectorAll('.line-reveal-wrap');
    lines.forEach((line) => {
      const inner = document.createElement('span');
      inner.className = 'line-reveal-inner';
      inner.innerHTML = line.innerHTML;
      line.innerHTML = '';
      line.appendChild(inner);
    });

    const inners = el.querySelectorAll('.line-reveal-inner');

    if (triggerOnScroll) {
      gsap.fromTo(
        inners,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    } else {
      gsap.fromTo(inners, { yPercent: 100 }, {
        yPercent: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.3,
      });
    }

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [triggerOnScroll]);

  return ref;
};
