import type { RefObject } from 'react';
import MosaicSceneDirector from './MosaicSceneDirector';
import { useMosaicScrollDriver } from '../../hooks/useMosaicScrollDriver';

interface MosaicVisualFieldProps {
  scrollRootRef: RefObject<HTMLElement | null>;
}

const MosaicVisualField = ({ scrollRootRef }: MosaicVisualFieldProps) => {
  useMosaicScrollDriver(scrollRootRef);

  return <MosaicSceneDirector scrollRootRef={scrollRootRef} />;
};

export default MosaicVisualField;
