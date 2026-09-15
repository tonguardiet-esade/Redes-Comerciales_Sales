import { useEffect, useRef, useState } from 'react';
import { useSettings } from '../context/SettingsContext';

type CursorMode = 'default' | 'link' | 'button' | 'image' | 'view';

const getCursorMode = (el: HTMLElement | null): CursorMode => {
  if (!el) return 'default';
  const target = el.closest('[data-cursor]') as HTMLElement | null;
  if (!target) {
    if (el.closest('button, a, [role="button"]')) return 'link';
    if (el.closest('img')) return 'image';
    return 'default';
  }
  const mode = target.dataset.cursor;
  if (mode === 'link' || mode === 'button' || mode === 'image' || mode === 'view') return mode;
  if (mode === 'pointer') return 'link';
  return 'default';
};

export const useMosaicCursor = () => {
  const { t } = useSettings();
  const auraRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const magnetic = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const auraPos = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);
  const mode = useRef<CursorMode>('default');
  const isDown = useRef(false);
  const raf = useRef(0);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReduced) return;

    setEnabled(true);
    document.body.classList.add('mosaic-cursor-active');

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      const nextMode = getCursorMode(e.target as HTMLElement);
      if (nextMode !== mode.current) {
        mode.current = nextMode;
        document.body.dataset.cursorMode = nextMode;
        if (labelRef.current) {
          labelRef.current.textContent =
            nextMode === 'view' || nextMode === 'image' ? t('cursor.view') : nextMode === 'link' ? t('cursor.go') : '';
        }
      }

      const hoverEl = (e.target as HTMLElement).closest('[data-cursor], a, button') as HTMLElement | null;
      if (hoverEl?.getBoundingClientRect) {
        const rect = hoverEl.getBoundingClientRect();
        magnetic.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      } else {
        magnetic.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onDown = () => {
      isDown.current = true;
      document.body.dataset.cursorClick = 'true';
    };

    const onUp = () => {
      isDown.current = false;
      delete document.body.dataset.cursorClick;
    };

    const tick = () => {
      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      const speed = Math.hypot(dx, dy);
      rotation.current += speed * 0.35;
      lastMouse.current = { ...mouse.current };

      const useMagnetic = mode.current === 'view' || mode.current === 'image';
      const ringTarget = useMagnetic ? magnetic.current : mouse.current;
      const ringLerp = useMagnetic ? 0.2 : 0.14;
      const auraLerp = 0.07;

      ringPos.current.x += (ringTarget.x - ringPos.current.x) * ringLerp;
      ringPos.current.y += (ringTarget.y - ringPos.current.y) * ringLerp;
      auraPos.current.x += (mouse.current.x - auraPos.current.x) * auraLerp;
      auraPos.current.y += (mouse.current.y - auraPos.current.y) * auraLerp;

      const scale =
        mode.current === 'image' ? 1.35
        : mode.current === 'view' ? 1.45
        : mode.current === 'link' ? 1.12
        : mode.current === 'button' ? 1.08
        : 1;
      const clickScale = isDown.current ? 0.88 : 1;
      const stretch = Math.min(speed * 0.04, 0.2);

      if (auraRef.current) {
        const auraScale = mode.current === 'default' ? 1.2 : 1.08;
        auraRef.current.style.transform = `translate3d(${auraPos.current.x}px, ${auraPos.current.y}px, 0) translate(-50%, -50%) scale(${scale * auraScale * clickScale})`;
        auraRef.current.style.opacity = `${0.28 + stretch * 0.5}`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) rotate(${rotation.current}deg) scale(${scale * clickScale}, ${scale * (1 + stretch * 0.15) * clickScale})`;
      }

      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) rotate(${45 - rotation.current * 0.35}deg) scale(${clickScale})`;
      }

      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, 30px)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf.current);
      document.body.classList.remove('mosaic-cursor-active');
      delete document.body.dataset.cursorMode;
      delete document.body.dataset.cursorClick;
    };
  }, [t]);

  return { enabled, auraRef, ringRef, coreRef, labelRef };
};
