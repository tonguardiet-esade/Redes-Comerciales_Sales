export type MosaicScrollZone =
  | 'hero'
  | 'manifesto'
  | 'projects'
  | 'tech'
  | 'methodology'
  | 'metrics'
  | 'footer';

export const mosaicScrollState = {
  progress: 0,
  velocity: 0,
  zones: {} as Partial<Record<MosaicScrollZone, number>>,
};
