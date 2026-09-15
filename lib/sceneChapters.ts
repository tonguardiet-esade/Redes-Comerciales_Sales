export type SceneChapter =
  | 'hero'
  | 'manifesto'
  | 'projects'
  | 'tech'
  | 'methodology'
  | 'metrics'
  | 'footer';

export type ChapterCamera = {
  x: number;
  y: number;
  z: number;
  lookX: number;
  lookY: number;
  lookZ: number;
};

export type ChapterObjectState = {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  opacity: number;
};

export type ChapterKeyframe = {
  id: SceneChapter;
  camera: ChapterCamera;
  primary: ChapterObjectState;
  secondary: ChapterObjectState;
  accent: ChapterObjectState;
};

/** Key poses — scroll timeline interpolates between these */
export const SCENE_CHAPTERS: ChapterKeyframe[] = [
  {
    id: 'hero',
    camera: { x: 0, y: 2, z: 14, lookX: -2, lookY: 0, lookZ: 0 },
    primary: { x: 5.5, y: 0.5, z: -2, rotX: -0.35, rotY: 0.45, rotZ: 0.08, scale: 1.35, opacity: 1 },
    secondary: { x: 8, y: 2, z: -6, rotX: 0.2, rotY: -0.3, rotZ: 0, scale: 0.6, opacity: 0 },
    accent: { x: -7, y: -1, z: -8, rotX: 0, rotY: 0.5, rotZ: 0, scale: 0.5, opacity: 0 },
  },
  {
    id: 'manifesto',
    camera: { x: -1.5, y: 1.5, z: 16, lookX: 0, lookY: 0, lookZ: -2 },
    primary: { x: 2, y: -0.5, z: -4, rotX: -0.55, rotY: 1.1, rotZ: 0.12, scale: 1.05, opacity: 0.92 },
    secondary: { x: 7, y: 1, z: -5, rotX: 0.3, rotY: 0.8, rotZ: -0.1, scale: 0.85, opacity: 0.75 },
    accent: { x: -6, y: 0, z: -7, rotX: 0.1, rotY: 1.2, rotZ: 0, scale: 0.7, opacity: 0.5 },
  },
  {
    id: 'projects',
    camera: { x: 2, y: 0.5, z: 13, lookX: -1, lookY: 0, lookZ: 0 },
    primary: { x: -4, y: 0, z: -3, rotX: -0.4, rotY: 1.65, rotZ: 0.15, scale: 0.95, opacity: 0.88 },
    secondary: { x: 6, y: -1, z: -1, rotX: 0.5, rotY: 2.2, rotZ: 0.2, scale: 1.1, opacity: 0.95 },
    accent: { x: 9, y: 2.5, z: -6, rotX: -0.2, rotY: 1.8, rotZ: 0, scale: 0.55, opacity: 0.4 },
  },
  {
    id: 'tech',
    camera: { x: 0, y: 3, z: 15, lookX: 1, lookY: -0.5, lookZ: -3 },
    primary: { x: 5, y: 1, z: -5, rotX: -0.7, rotY: 2.35, rotZ: 0.1, scale: 1.15, opacity: 0.85 },
    secondary: { x: -5.5, y: -0.5, z: -4, rotX: 0.4, rotY: 2.8, rotZ: -0.15, scale: 0.9, opacity: 0.8 },
    accent: { x: 0, y: 3, z: -9, rotX: 0.6, rotY: 2.5, rotZ: 0.3, scale: 1.4, opacity: 0.25 },
  },
  {
    id: 'methodology',
    camera: { x: -2, y: 2, z: 17, lookX: 2, lookY: 0, lookZ: -1 },
    primary: { x: 4, y: -1.5, z: -6, rotX: -0.45, rotY: 3.05, rotZ: 0.2, scale: 0.88, opacity: 0.78 },
    secondary: { x: -4, y: 1.5, z: -5, rotX: 0.25, rotY: 3.4, rotZ: -0.1, scale: 0.75, opacity: 0.7 },
    accent: { x: 7, y: 0, z: -8, rotX: 0, rotY: 3.2, rotZ: 0, scale: 0.45, opacity: 0.35 },
  },
  {
    id: 'metrics',
    camera: { x: 1, y: 1, z: 18, lookX: 0, lookY: 0, lookZ: -4 },
    primary: { x: 6, y: 0, z: -7, rotX: -0.3, rotY: 3.75, rotZ: 0.1, scale: 0.72, opacity: 0.65 },
    secondary: { x: -5, y: -1, z: -6, rotX: 0.15, rotY: 4.1, rotZ: 0, scale: 0.6, opacity: 0.55 },
    accent: { x: 0, y: 2, z: -10, rotX: 0.5, rotY: 3.9, rotZ: 0.2, scale: 1.2, opacity: 0.15 },
  },
  {
    id: 'footer',
    camera: { x: 0, y: 2.5, z: 20, lookX: 0, lookY: 0, lookZ: -5 },
    primary: { x: 8, y: -2, z: -9, rotX: -0.2, rotY: 4.4, rotZ: 0, scale: 0.5, opacity: 0.22 },
    secondary: { x: -7, y: 1, z: -8, rotX: 0.1, rotY: 4.6, rotZ: 0, scale: 0.4, opacity: 0.16 },
    accent: { x: 0, y: 0, z: -12, rotX: 0, rotY: 4.5, rotZ: 0, scale: 0.8, opacity: 0.05 },
  },
];

export const lerpChapterState = (
  a: ChapterObjectState,
  b: ChapterObjectState,
  t: number
): ChapterObjectState => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  z: a.z + (b.z - a.z) * t,
  rotX: a.rotX + (b.rotX - a.rotX) * t,
  rotY: a.rotY + (b.rotY - a.rotY) * t,
  rotZ: a.rotZ + (b.rotZ - a.rotZ) * t,
  scale: a.scale + (b.scale - a.scale) * t,
  opacity: a.opacity + (b.opacity - a.opacity) * t,
});

export const lerpCamera = (a: ChapterCamera, b: ChapterCamera, t: number): ChapterCamera => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  z: a.z + (b.z - a.z) * t,
  lookX: a.lookX + (b.lookX - a.lookX) * t,
  lookY: a.lookY + (b.lookY - a.lookY) * t,
  lookZ: a.lookZ + (b.lookZ - a.lookZ) * t,
});
