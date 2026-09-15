import React from 'react';
import { useMosaicCursor } from '../../hooks/useMosaicCursor';

const CustomCursor = () => {
  const { enabled, auraRef, ringRef, coreRef, labelRef } = useMosaicCursor();

  if (!enabled) return null;

  return (
    <>
      <div ref={auraRef} className="mosaic-cursor-aura" aria-hidden="true" />
      <div ref={ringRef} className="mosaic-cursor-ring" aria-hidden="true">
        <span className="mosaic-cursor-orbit" />
        <span className="mosaic-cursor-orbit mosaic-cursor-orbit--reverse" />
      </div>
      <div ref={coreRef} className="mosaic-cursor-core" aria-hidden="true" />
      <span ref={labelRef} className="mosaic-cursor-label" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
