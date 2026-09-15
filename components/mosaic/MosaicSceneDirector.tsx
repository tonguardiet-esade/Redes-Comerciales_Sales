import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SCENE_CHAPTERS,
  lerpCamera,
  lerpChapterState,
  type ChapterCamera,
  type ChapterObjectState,
  type SceneChapter,
} from '../../lib/sceneChapters';
import { mosaicScrollState } from '../../lib/mosaicScrollState';
import { SCENE_PALETTE, type SceneThemeMode } from '../../lib/sceneTheme';
import { useSettings } from '../../context/SettingsContext';

gsap.registerPlugin(ScrollTrigger);

interface MosaicSceneDirectorProps {
  scrollRootRef: RefObject<HTMLElement | null>;
}

const CYAN = 0x34b1d5;
const CYAN_LIGHT = 0x5ee0fc;
const CYAN_PALE = 0xb8e8f4;
const GREEN = 0x0fbd91;
const WHITE = 0xffffff;

type NetworkNodeDef = {
  px: number;
  py: number;
  pz: number;
  radius: number;
  color: number;
  opacity: number;
  glass?: boolean;
};

type NetworkEdgeDef = {
  a: number;
  b: number;
  revealAt: number;
};

type ObjectGroup = {
  group: THREE.Group;
  meshes: THREE.Mesh[];
  wireframes: THREE.LineSegments[];
  setOpacity: (o: number) => void;
};

type NetworkCluster = ObjectGroup & {
  hub: THREE.Mesh;
  setConnectionPhase: (phase: number) => void;
};

type BridgeLinkDef = {
  from: NetworkCluster;
  fromNode: number;
  to: NetworkCluster;
  toNode: number;
  revealAt: number;
  baseOpacity: number;
};

const offsetChapterState = (
  base: ChapterObjectState,
  dx: number,
  dy: number,
  dz: number,
  scaleMul = 1,
  opacityMul = 1
): ChapterObjectState => ({
  x: base.x + dx,
  y: base.y + dy,
  z: base.z + dz,
  rotX: base.rotX,
  rotY: base.rotY,
  rotZ: base.rotZ,
  scale: base.scale * scaleMul,
  opacity: base.opacity * opacityMul,
});

type SceneThemeHandles = {
  ambient: THREE.AmbientLight;
  key: THREE.DirectionalLight;
  rim: THREE.DirectionalLight;
  glassMeshes: THREE.MeshPhysicalMaterial[];
  solidMeshes: THREE.MeshPhysicalMaterial[];
  wireMaterials: THREE.LineBasicMaterial[];
};

const applySceneTheme = (handles: SceneThemeHandles, mode: SceneThemeMode) => {
  const palette = SCENE_PALETTE[mode];

  handles.ambient.color.setHex(palette.ambientColor);
  handles.ambient.intensity = palette.ambientIntensity;
  handles.key.color.setHex(palette.keyColor);
  handles.key.intensity = palette.keyIntensity;
  handles.rim.color.setHex(palette.rimColor);
  handles.rim.intensity = palette.rimIntensity;

  handles.glassMeshes.forEach((mat) => {
    mat.color.setHex(palette.glassColor);
    mat.userData.baseOpacity = palette.glassOpacity;
  });
  handles.solidMeshes.forEach((mat) => {
    if (!mat.emissive) mat.emissive = new THREE.Color();
    if (mode === 'dark') {
      mat.emissive.setHex(0x0a1520);
      mat.emissiveIntensity = 0.15;
    } else {
      mat.emissive.setHex(0x000000);
      mat.emissiveIntensity = 0;
    }
  });
  handles.wireMaterials.forEach((mat) => {
    const isGlass = mat.userData.isGlass as boolean;
    mat.color.setHex(mode === 'dark' ? CYAN_LIGHT : CYAN);
    mat.userData.baseOpacity = isGlass ? palette.glassWireOpacity : palette.wireOpacity;
  });
};

const MosaicSceneDirector = ({ scrollRootRef }: MosaicSceneDirectorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useSettings();
  const themeHandlesRef = useRef<SceneThemeHandles | null>(null);

  useEffect(() => {
    if (themeHandlesRef.current) {
      applySceneTheme(themeHandlesRef.current, theme);
    }
  }, [theme]);

  useEffect(() => {
    const root = scrollRootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const isMobile = window.innerWidth < 768;
    const disposables: Array<{ dispose: () => void }> = [];
    const glassMeshes: THREE.MeshPhysicalMaterial[] = [];
    const solidMeshes: THREE.MeshPhysicalMaterial[] = [];
    const wireMaterials: THREE.LineBasicMaterial[] = [];

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 80);
    camera.position.set(0, 2, 14);

    const ambient = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 0.7);
    key.position.set(10, 20, 14);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x5ee0fc, 0.35);
    rim.position.set(-8, 6, -6);
    scene.add(rim);

    const createNetworkCluster = (
      nodes: NetworkNodeDef[],
      edges: NetworkEdgeDef[],
      connectionBaseOpacity = 0.38
    ): NetworkCluster => {
      const group = new THREE.Group();
      const meshes: THREE.Mesh[] = [];
      const wireframes: THREE.LineSegments[] = [];
      const connectionLines: THREE.Line[] = [];
      const nodePositions: THREE.Vector3[] = [];
      let groupOpacity = 1;
      let connectionPhase = 0;

      const updateOpacities = () => {
        meshes.forEach((mesh) => {
          const mat = mesh.material as THREE.MeshPhysicalMaterial;
          mat.opacity = (mat.userData.baseOpacity as number) * groupOpacity;
        });
        connectionLines.forEach((line) => {
          const mat = line.material as THREE.LineBasicMaterial;
          const revealAt = mat.userData.revealAt as number;
          const reveal = Math.min(1, Math.max(0, (connectionPhase - revealAt) / 0.09));
          mat.opacity = (mat.userData.baseOpacity as number) * groupOpacity * reveal;
        });
      };

      nodes.forEach((node) => {
        const segments = isMobile ? 18 : 28;
        const geo = new THREE.SphereGeometry(node.radius, segments, segments);
        const mat = new THREE.MeshPhysicalMaterial({
          color: node.color,
          transparent: true,
          opacity: node.opacity,
          roughness: node.glass ? 0.06 : 0.22,
          metalness: node.glass ? 0.08 : 0.04,
          transmission: node.glass ? 0.58 : 0,
          thickness: node.glass ? 0.9 : 0,
          clearcoat: node.glass ? 0.35 : 0.15,
          clearcoatRoughness: 0.2,
        });
        mat.userData = { baseOpacity: node.opacity, isGlass: !!node.glass };
        if (node.glass) glassMeshes.push(mat);
        else solidMeshes.push(mat);

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(node.px, node.py, node.pz);
        meshes.push(mesh);
        group.add(mesh);
        nodePositions.push(mesh.position.clone());

        disposables.push({
          dispose: () => {
            geo.dispose();
            mat.dispose();
          },
        });
      });

      edges.forEach((edge) => {
        const points = [nodePositions[edge.a], nodePositions[edge.b]];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: CYAN_LIGHT,
          transparent: true,
          opacity: connectionBaseOpacity,
        });
        lineMat.userData = {
          baseOpacity: connectionBaseOpacity,
          isGlass: false,
          revealAt: edge.revealAt,
        };
        wireMaterials.push(lineMat);
        const line = new THREE.Line(geo, lineMat);
        connectionLines.push(line);
        group.add(line);

        disposables.push({
          dispose: () => {
            geo.dispose();
            lineMat.dispose();
          },
        });
      });

      return {
        group,
        meshes,
        hub: meshes[0],
        wireframes,
        setOpacity: (o: number) => {
          groupOpacity = o;
          updateOpacities();
        },
        setConnectionPhase: (phase: number) => {
          connectionPhase = phase;
          updateOpacities();
        },
      };
    };

    const createBridgeLinks = (links: BridgeLinkDef[]) => {
      const group = new THREE.Group();
      const bridgeLines: Array<{
        line: THREE.Line;
        mat: THREE.LineBasicMaterial;
        def: BridgeLinkDef;
      }> = [];

      links.forEach((def) => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(6);
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.LineBasicMaterial({
          color: CYAN_LIGHT,
          transparent: true,
          opacity: def.baseOpacity,
        });
        mat.userData = { baseOpacity: def.baseOpacity, isGlass: false };
        wireMaterials.push(mat);
        const line = new THREE.Line(geo, mat);
        bridgeLines.push({ line, mat, def });
        group.add(line);

        disposables.push({
          dispose: () => {
            geo.dispose();
            mat.dispose();
          },
        });
      });

      const tmpA = new THREE.Vector3();
      const tmpB = new THREE.Vector3();

      const update = (phase: number) => {
        bridgeLines.forEach(({ line, mat, def }) => {
          def.from.hub.getWorldPosition(tmpA);
          def.to.meshes[def.toNode]?.getWorldPosition(tmpB);
          const pos = line.geometry.attributes.position as THREE.BufferAttribute;
          pos.setXYZ(0, tmpA.x, tmpA.y, tmpA.z);
          pos.setXYZ(1, tmpB.x, tmpB.y, tmpB.z);
          pos.needsUpdate = true;

          const reveal = Math.min(1, Math.max(0, (phase - def.revealAt) / 0.1));
          const fromOpacity = (def.from.meshes[0].material as THREE.MeshPhysicalMaterial).opacity;
          const toOpacity = (def.to.meshes[def.toNode]?.material as THREE.MeshPhysicalMaterial)?.opacity ?? 0;
          const visibility = Math.min(fromOpacity, toOpacity) / 0.9;
          mat.opacity = (mat.userData.baseOpacity as number) * reveal * Math.max(0, visibility);
        });
      };

      return { group, update };
    };

    const primaryNodes: NetworkNodeDef[] = isMobile
      ? [
          { px: 0, py: 0, pz: 0, radius: 0.88, color: CYAN, opacity: 0.9, glass: true },
          { px: -1.9, py: 0.9, pz: 0.35, radius: 0.4, color: CYAN_LIGHT, opacity: 0.88 },
          { px: 1.7, py: 0.6, pz: -0.4, radius: 0.42, color: CYAN_LIGHT, opacity: 0.86 },
          { px: 0.2, py: -1.7, pz: 0.55, radius: 0.36, color: WHITE, opacity: 0.72, glass: true },
        ]
      : [
          { px: 0, py: 0, pz: 0, radius: 1.05, color: CYAN, opacity: 0.9, glass: true },
          { px: -2.4, py: 1.0, pz: 0.45, radius: 0.48, color: CYAN_LIGHT, opacity: 0.9 },
          { px: 2.2, py: 0.75, pz: -0.5, radius: 0.5, color: CYAN_LIGHT, opacity: 0.88 },
          { px: -1.2, py: -1.85, pz: 0.75, radius: 0.42, color: WHITE, opacity: 0.74, glass: true },
          { px: 2.05, py: -1.35, pz: 0.55, radius: 0.44, color: CYAN_PALE, opacity: 0.84 },
          { px: 0.35, py: 2.25, pz: -0.55, radius: 0.38, color: GREEN, opacity: 0.82 },
        ];

    const primaryEdges: NetworkEdgeDef[] = isMobile
      ? [
          { a: 0, b: 1, revealAt: 0 },
          { a: 0, b: 2, revealAt: 0.05 },
          { a: 0, b: 3, revealAt: 0.1 },
          { a: 1, b: 3, revealAt: 0.16 },
        ]
      : [
          { a: 0, b: 1, revealAt: 0 },
          { a: 0, b: 2, revealAt: 0.04 },
          { a: 0, b: 3, revealAt: 0.08 },
          { a: 0, b: 4, revealAt: 0.11 },
          { a: 1, b: 3, revealAt: 0.15 },
          { a: 2, b: 4, revealAt: 0.19 },
          { a: 0, b: 5, revealAt: 0.23 },
          { a: 2, b: 5, revealAt: 0.28 },
        ];

    const secondaryNodes: NetworkNodeDef[] = isMobile
      ? [
          { px: 0, py: 0, pz: 0, radius: 0.58, color: CYAN_LIGHT, opacity: 0.88 },
          { px: 1.35, py: 0.45, pz: -0.45, radius: 0.4, color: CYAN, opacity: 0.84 },
        ]
      : [
          { px: 0, py: 0, pz: 0, radius: 0.66, color: CYAN_LIGHT, opacity: 0.9 },
          { px: 1.65, py: 0.55, pz: -0.55, radius: 0.46, color: CYAN, opacity: 0.86 },
          { px: -1.35, py: -0.85, pz: 0.5, radius: 0.4, color: WHITE, opacity: 0.62, glass: true },
        ];

    const secondaryEdges: NetworkEdgeDef[] = isMobile
      ? [{ a: 0, b: 1, revealAt: 0.12 }]
      : [
          { a: 0, b: 1, revealAt: 0.1 },
          { a: 0, b: 2, revealAt: 0.15 },
          { a: 1, b: 2, revealAt: 0.24 },
        ];

    const accentNodes: NetworkNodeDef[] = isMobile
      ? [
          { px: 0, py: 0, pz: 0, radius: 1.1, color: CYAN, opacity: 0.2, glass: true },
          { px: 1.6, py: 0.9, pz: -0.7, radius: 0.3, color: GREEN, opacity: 0.48 },
        ]
      : [
          { px: 0, py: 0, pz: 0, radius: 1.35, color: CYAN, opacity: 0.22, glass: true },
          { px: 2.15, py: 1.15, pz: -0.95, radius: 0.32, color: GREEN, opacity: 0.5 },
          { px: -1.75, py: -0.65, pz: 0.75, radius: 0.28, color: CYAN_LIGHT, opacity: 0.42 },
        ];

    const accentEdges: NetworkEdgeDef[] = isMobile
      ? [{ a: 0, b: 1, revealAt: 0.32 }]
      : [
          { a: 0, b: 1, revealAt: 0.3 },
          { a: 0, b: 2, revealAt: 0.36 },
        ];

    const satelliteNodes: NetworkNodeDef[] = isMobile
      ? [
          { px: 0, py: 0, pz: 0, radius: 0.5, color: CYAN_PALE, opacity: 0.8 },
          { px: -1.1, py: 0.7, pz: 0.3, radius: 0.32, color: WHITE, opacity: 0.65, glass: true },
        ]
      : [
          { px: 0, py: 0, pz: 0, radius: 0.58, color: CYAN_PALE, opacity: 0.84 },
          { px: -1.25, py: 0.75, pz: 0.35, radius: 0.36, color: WHITE, opacity: 0.68, glass: true },
          { px: 1.15, py: -0.55, pz: -0.4, radius: 0.34, color: CYAN_LIGHT, opacity: 0.8 },
        ];

    const satelliteEdges: NetworkEdgeDef[] = isMobile
      ? [{ a: 0, b: 1, revealAt: 0.14 }]
      : [
          { a: 0, b: 1, revealAt: 0.12 },
          { a: 0, b: 2, revealAt: 0.17 },
          { a: 1, b: 2, revealAt: 0.22 },
        ];

    const orbitNodes: NetworkNodeDef[] = isMobile
      ? [
          { px: 0, py: 0, pz: 0, radius: 0.45, color: GREEN, opacity: 0.75 },
          { px: 0.95, py: -0.55, pz: 0.25, radius: 0.28, color: CYAN_LIGHT, opacity: 0.7 },
        ]
      : [
          { px: 0, py: 0, pz: 0, radius: 0.52, color: GREEN, opacity: 0.78 },
          { px: 1.1, py: -0.6, pz: 0.3, radius: 0.3, color: CYAN_LIGHT, opacity: 0.72 },
          { px: -0.85, py: 0.85, pz: -0.35, radius: 0.26, color: CYAN, opacity: 0.65 },
        ];

    const orbitEdges: NetworkEdgeDef[] = isMobile
      ? [{ a: 0, b: 1, revealAt: 0.2 }]
      : [
          { a: 0, b: 1, revealAt: 0.18 },
          { a: 0, b: 2, revealAt: 0.24 },
          { a: 1, b: 2, revealAt: 0.3 },
        ];

    const primary = createNetworkCluster(primaryNodes, primaryEdges, 0.42);
    const secondary = createNetworkCluster(secondaryNodes, secondaryEdges, 0.34);
    const accent = createNetworkCluster(accentNodes, accentEdges, 0.28);
    const satellite = createNetworkCluster(satelliteNodes, satelliteEdges, 0.3);
    const orbit = createNetworkCluster(orbitNodes, orbitEdges, 0.26);

    const bridgeLinks = createBridgeLinks(
      isMobile
        ? [
            { from: primary, fromNode: 0, to: secondary, toNode: 0, revealAt: 0.05, baseOpacity: 0.28 },
            { from: primary, fromNode: 0, to: satellite, toNode: 0, revealAt: 0.12, baseOpacity: 0.24 },
            { from: secondary, fromNode: 0, to: orbit, toNode: 0, revealAt: 0.2, baseOpacity: 0.22 },
          ]
        : [
            { from: primary, fromNode: 0, to: secondary, toNode: 0, revealAt: 0.04, baseOpacity: 0.32 },
            { from: primary, fromNode: 0, to: satellite, toNode: 0, revealAt: 0.1, baseOpacity: 0.28 },
            { from: primary, fromNode: 2, to: orbit, toNode: 0, revealAt: 0.16, baseOpacity: 0.26 },
            { from: secondary, fromNode: 1, to: satellite, toNode: 2, revealAt: 0.2, baseOpacity: 0.24 },
            { from: secondary, fromNode: 0, to: orbit, toNode: 1, revealAt: 0.24, baseOpacity: 0.22 },
            { from: accent, fromNode: 0, to: orbit, toNode: 0, revealAt: 0.28, baseOpacity: 0.2 },
            { from: satellite, fromNode: 0, to: accent, toNode: 1, revealAt: 0.32, baseOpacity: 0.18 },
            { from: primary, fromNode: 5, to: accent, toNode: 1, revealAt: 0.26, baseOpacity: 0.22 },
          ]
    );

    scene.add(
      primary.group,
      secondary.group,
      accent.group,
      satellite.group,
      orbit.group,
      bridgeLinks.group
    );

    themeHandlesRef.current = {
      ambient,
      key,
      rim,
      glassMeshes,
      solidMeshes,
      wireMaterials,
    };
    applySceneTheme(themeHandlesRef.current, theme);

    const state = {
      chapterProgress: 0,
      primary: SCENE_CHAPTERS[0].primary,
      secondary: SCENE_CHAPTERS[0].secondary,
      accent: SCENE_CHAPTERS[0].accent,
      camera: SCENE_CHAPTERS[0].camera,
    };

    const applyObjectState = (obj: ObjectGroup, s: ChapterObjectState) => {
      obj.group.position.set(s.x, s.y, s.z);
      obj.group.rotation.set(s.rotX, s.rotY, s.rotZ);
      obj.group.scale.setScalar(s.scale);
      obj.setOpacity(s.opacity);
    };

    const chapterIndex = (id: SceneChapter) => SCENE_CHAPTERS.findIndex((c) => c.id === id);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          mosaicScrollState.progress = self.progress;
          const p = self.progress;
          const scaled = p * (SCENE_CHAPTERS.length - 1);
          const idx = Math.min(Math.floor(scaled), SCENE_CHAPTERS.length - 2);
          const localT = scaled - idx;
          const a = SCENE_CHAPTERS[idx];
          const b = SCENE_CHAPTERS[idx + 1];

          state.primary = lerpChapterState(a.primary, b.primary, localT);
          state.secondary = lerpChapterState(a.secondary, b.secondary, localT);
          state.accent = lerpChapterState(a.accent, b.accent, localT);
          state.camera = lerpCamera(a.camera, b.camera, localT);
          state.chapterProgress = p;
        },
      });

      root.querySelectorAll<HTMLElement>('[data-scroll-scene]').forEach((el) => {
        const id = el.dataset.scrollScene as SceneChapter | undefined;
        if (!id) return;
        const idx = chapterIndex(id);
        if (idx < 0) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            mosaicScrollState.zones[id] = 1;
          },
          onLeave: () => {
            mosaicScrollState.zones[id] = 0;
          },
          onEnterBack: () => {
            mosaicScrollState.zones[id] = 1;
          },
          onLeaveBack: () => {
            mosaicScrollState.zones[id] = 0;
          },
        });
      });
    }, root);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let frameId = 0;
    const render = () => {
      frameId = requestAnimationFrame(render);

      applyObjectState(primary, state.primary);
      applyObjectState(secondary, state.secondary);
      applyObjectState(accent, state.accent);
      applyObjectState(
        satellite,
        offsetChapterState(state.secondary, isMobile ? -2.8 : -4.2, -1.1, 1.6, 0.84, 0.72)
      );
      applyObjectState(
        orbit,
        offsetChapterState(state.accent, isMobile ? 2.4 : 3.6, -1.8, -1.4, 0.78, 0.68)
      );

      const connectionPhase = state.chapterProgress;
      primary.setConnectionPhase(connectionPhase);
      secondary.setConnectionPhase(connectionPhase);
      accent.setConnectionPhase(connectionPhase);
      satellite.setConnectionPhase(connectionPhase);
      orbit.setConnectionPhase(connectionPhase);
      bridgeLinks.update(connectionPhase);

      const cam = state.camera;
      camera.position.set(
        cam.x + mouse.x * 0.35,
        cam.y + mouse.y * 0.25,
        cam.z
      );
      camera.lookAt(
        cam.lookX + mouse.x * 0.2,
        cam.lookY + mouse.y * 0.15,
        cam.lookZ
      );

      renderer.render(scene, camera);
    };
    render();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      themeHandlesRef.current = null;
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      ctx.revert();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [scrollRootRef]);

  return (
    <>
      <canvas ref={canvasRef} className="mosaic-scene-canvas" aria-hidden="true" />
      <div className="mosaic-scene-vignette" aria-hidden="true" />
    </>
  );
};

export default MosaicSceneDirector;
