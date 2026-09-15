import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MosaikTransitionProps {
  active: boolean;
  onComplete?: () => void;
}

const GRID = 8;

const MosaikTransition = ({ active, onComplete }: MosaikTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    const boxes = ref.current.querySelectorAll('.mosaic-transition-box');
    gsap.fromTo(
      boxes,
      { scale: 1, opacity: 1 },
      {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: { amount: 0.4, from: 'center', grid: [GRID, GRID] },
        ease: 'power3.inOut',
        onComplete,
      }
    );
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[150] pointer-events-none flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      <div
        className="grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${GRID}, 1fr)`,
          width: '120vmax',
          height: '120vmax',
        }}
      >
        {Array.from({ length: GRID * GRID }).map((_, i) => (
          <div
            key={i}
            className="mosaic-transition-box bg-mosaic-white-200 border border-mosaic-white-300/50"
            style={{ aspectRatio: '1' }}
          />
        ))}
      </div>
    </div>
  );
};

export default MosaikTransition;
