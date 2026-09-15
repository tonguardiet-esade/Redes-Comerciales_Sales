export type SceneThemeMode = 'light' | 'dark';

export const SCENE_PALETTE = {
  light: {
    ambientColor: 0xffffff,
    ambientIntensity: 0.95,
    keyColor: 0xffffff,
    keyIntensity: 0.7,
    rimColor: 0x5ee0fc,
    rimIntensity: 0.35,
    glassColor: 0xffffff,
    glassOpacity: 0.5,
    wireOpacity: 0.2,
    glassWireOpacity: 0.35,
  },
  dark: {
    ambientColor: 0x4a6080,
    ambientIntensity: 0.55,
    keyColor: 0xaaccee,
    keyIntensity: 0.45,
    rimColor: 0x5ee0fc,
    rimIntensity: 0.5,
    glassColor: 0x5ee0fc,
    glassOpacity: 0.28,
    wireOpacity: 0.38,
    glassWireOpacity: 0.5,
  },
} as const;
