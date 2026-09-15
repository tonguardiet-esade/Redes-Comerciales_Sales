import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    const obj = { value: 0 };
    const tween = gsap.to(obj, {
      value: 100,
      duration: 1.1,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.round(obj.value)),
      onComplete: () => {
        gsap.to('.mosaic-loader', {
          opacity: 0,
          duration: 0.5,
          delay: 0.2,
          onComplete,
        });
      },
    });
    return () => { tween.kill(); };
  }, [onComplete]);

  return (
    <div className="mosaic-loader fixed inset-0 z-[200] flex items-center justify-center bg-mosaic-white-200">
      <div className="flex flex-col items-center gap-6 w-full max-w-[200px] px-6">
        <span className="mosaic-label text-mosaic-black-500">{progress} %</span>
        <div className="w-full h-[2px] bg-mosaic-white-300 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-mosaic-black-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
