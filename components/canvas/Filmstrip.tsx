'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, type ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';
import { playhead } from '@/lib/playhead';
import {
  BAND_HEIGHT,
  FRAME_COUNT,
  FRAME_HEIGHT,
  FRAME_PITCH,
  FRAME_WIDTH,
  PERF_INSET,
  STRIP_TRAVEL,
  STRIP_WIDTH,
  fitDistance,
  frameOffset,
  stripScale,
} from '@/lib/framing';

const COUNT = FRAME_COUNT;
/** Perforations per frame, per row. Two reads as 35 mm without the instance count. */
const PERF_PER_FRAME = 2;
const PERF_COUNT = COUNT * PERF_PER_FRAME * 2;
const PERF_WIDTH = 0.15;
const PERF_HEIGHT = 0.1;
/** Image area sits above the bottom perforation row. */
const FRAME_Y = BAND_HEIGHT / 2;

const TEAL = new THREE.Color('#12e3c4');
const ORANGE = new THREE.Color('#ff5a1f');

/**
 * Luminance mask shared by every frame: a lit sky, a horizon and a darker foreground,
 * falling off at the edges. Tinted per instance, it reads as an exposed frame rather
 * than a flat rectangle — without shipping a single image asset.
 */
function createFrameTexture(): THREE.CanvasTexture {
  const width = 160;
  const height = 90;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#aeaeae');
    sky.addColorStop(0.5, '#4d4d4d');
    sky.addColorStop(0.58, '#2b2b2b');
    sky.addColorStop(0.61, '#ffffff');
    sky.addColorStop(0.64, '#262626');
    sky.addColorStop(1, '#0d0d0d');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    // Soft vignette so each frame has an edge instead of butting into the next.
    const vignette = ctx.createRadialGradient(
      width / 2,
      height / 2,
      height * 0.15,
      width / 2,
      height / 2,
      width * 0.62,
    );
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export type FilmstripProps = Omit<ThreeElements['group'], 'ref'>;

/**
 * A 22-frame film strip that doubles as the site's scroll playhead: the document
 * scroll pulls the strip through a fixed gate at screen centre, so scrolling *is*
 * scrubbing. Frames light up as they reach the gate; the perforations stay backlit.
 */
export default function Filmstrip(props: FilmstripProps): React.JSX.Element {
  const groupRef = useRef<THREE.Group>(null);
  const stripRef = useRef<THREE.Group>(null);
  const framesRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.InstancedMesh>(null);
  const mirrorRef = useRef<THREE.InstancedMesh>(null);
  const perfsRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const texture = useMemo(createFrameTexture, []);

  useEffect(() => () => texture.dispose(), [texture]);

  /** Per-frame base exposure — the strip is never evenly lit, like real stock. */
  const exposures = useMemo<Float32Array>(
    () => Float32Array.from({ length: COUNT }, () => Math.random() * 0.45 + 0.55),
    [],
  );
  /** Per-frame phase so the shimmer never resolves into one sine sweep. */
  const phases = useMemo<Float32Array>(
    () => Float32Array.from({ length: COUNT }, () => Math.random() * Math.PI * 2),
    [],
  );

  // Frames never change size, so the matrices are written once and only the
  // instance colours are touched per frame.
  useEffect(() => {
    const frames = framesRef.current;
    const glow = glowRef.current;
    const mirror = mirrorRef.current;
    const perfs = perfsRef.current;
    if (!frames || !glow || !mirror || !perfs) return;

    for (let i = 0; i < COUNT; i++) {
      const x = frameOffset(i);

      dummy.position.set(x, FRAME_Y, 0);
      dummy.scale.set(FRAME_WIDTH, FRAME_HEIGHT, 1);
      dummy.updateMatrix();
      frames.setMatrixAt(i, dummy.matrix);
      mirror.setMatrixAt(i, dummy.matrix);

      // Wider twin behind each frame fakes a bloom pass without postprocessing.
      dummy.scale.set(FRAME_WIDTH * 1.06, FRAME_HEIGHT * 1.22, 1);
      dummy.position.set(x, FRAME_Y, -0.04);
      dummy.updateMatrix();
      glow.setMatrixAt(i, dummy.matrix);
    }

    let perf = 0;
    for (let i = 0; i < COUNT; i++) {
      const x = frameOffset(i);
      for (let step = 0; step < PERF_PER_FRAME; step++) {
        const spread = (step - (PERF_PER_FRAME - 1) / 2) * FRAME_PITCH * 0.44;
        for (const y of [PERF_INSET, BAND_HEIGHT - PERF_INSET]) {
          dummy.position.set(x + spread, y, 0.02);
          dummy.scale.set(PERF_WIDTH, PERF_HEIGHT, 1);
          dummy.updateMatrix();
          perfs.setMatrixAt(perf, dummy.matrix);
          perf += 1;
        }
      }
    }

    frames.instanceMatrix.needsUpdate = true;
    glow.instanceMatrix.needsUpdate = true;
    mirror.instanceMatrix.needsUpdate = true;
    perfs.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  useFrame((state, delta) => {
    const strip = stripRef.current;
    const frames = framesRef.current;
    const glow = glowRef.current;
    const mirror = mirrorRef.current;
    if (!strip || !frames || !glow || !mirror) return;

    const time = state.clock.getElapsedTime();
    const head = playhead.smooth;
    const still = playhead.reducedMotion;
    const scrub = still ? 0 : THREE.MathUtils.clamp(playhead.velocity, -1.6, 1.6);

    // Scroll pulls the strip through the gate at world x = 0.
    const targetX = STRIP_TRAVEL / 2 - head * STRIP_TRAVEL;
    strip.position.x = THREE.MathUtils.damp(strip.position.x, targetX, 7, delta);

    // Film weave: the whole strip drifts in the gate, it never settles dead still.
    strip.position.y = still ? 0 : Math.sin(time * 1.6) * 0.016 + Math.sin(time * 7.3) * 0.005;

    for (let i = 0; i < COUNT; i++) {
      const n = i / (COUNT - 1);
      // Distance from this frame to the gate, in frames.
      const gap = Math.abs(frameOffset(i) + strip.position.x) / FRAME_PITCH;
      const inGate = Math.max(0, 1 - gap * 0.55);

      // At rest the strip stays evenly lit so the hero copy never fights a bright
      // cluster; the gate highlight resolves in over the first few percent of scroll.
      const engaged = THREE.MathUtils.clamp(head * 6, 0, 1);
      const activity = THREE.MathUtils.lerp(0.5, 0.34 + inGate, engaged);

      const shimmer = still ? 1 : Math.sin(time * 2.2 + phases[i]!) * 0.06 + 1;
      // Scrubbing fast makes the gate slip, the way a transport does under the hand.
      const flicker = 1 + Math.abs(scrub) * Math.sin(time * 26 + i * 1.7) * 0.22;
      const exposure = exposures[i]! * activity * shimmer * flicker;

      const warmth = THREE.MathUtils.clamp(n * 0.3 + head * 0.55 + inGate * 0.45, 0, 1);
      // Recede once the hero is gone — the strip is scenery, never competition.
      const presence = 1 - head * 0.45;

      color.copy(TEAL).lerp(ORANGE, warmth).multiplyScalar(exposure * presence);
      frames.setColorAt(i, color);
      mirror.setColorAt(i, color);

      color.multiplyScalar(0.55 + inGate * 0.8);
      glow.setColorAt(i, color);
    }

    if (frames.instanceColor) frames.instanceColor.needsUpdate = true;
    if (glow.instanceColor) glow.instanceColor.needsUpdate = true;
    if (mirror.instanceColor) mirror.instanceColor.needsUpdate = true;

    const group = groupRef.current;
    if (!group) return;

    // Keep roughly the same number of frames in shot whatever the viewport.
    const camera = state.camera as THREE.PerspectiveCamera;
    const aspect = state.size.width / state.size.height;
    const scale = stripScale(fitDistance(aspect, camera.fov));
    group.scale.setScalar(THREE.MathUtils.damp(group.scale.x, scale, 6, delta));

    // Cinematic tilt: the strip leans toward the cursor.
    if (!still) {
      const targetRotX = (playhead.pointerY * Math.PI) / 20;
      const targetRotY = (playhead.pointerX * Math.PI) / 16;
      group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetRotX, 4, delta);
      group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetRotY, 4, delta);
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <group ref={stripRef}>
        {/* Film base — the dark carrier the frames and perforations sit on. */}
        <mesh position={[0, BAND_HEIGHT / 2, -0.06]}>
          <planeGeometry args={[STRIP_WIDTH, BAND_HEIGHT]} />
          <meshBasicMaterial
            color="#05080e"
            toneMapped={false}
            transparent
            opacity={0.85}
            depthWrite={false}
          />
        </mesh>

        <instancedMesh ref={glowRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            toneMapped={false}
            transparent
            opacity={0.09}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </instancedMesh>

        <instancedMesh ref={framesRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={texture} toneMapped={false} transparent depthWrite={false} />
        </instancedMesh>

        {/* Backlit perforations — light through the sprocket holes. */}
        <instancedMesh ref={perfsRef} args={[undefined, undefined, PERF_COUNT]} frustumCulled={false}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#8fe9dc"
            toneMapped={false}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </instancedMesh>

        {/* Mirrored strip below the baseline — reads as a reflection on the bench. */}
        <group scale={[1, -0.55, 1]} position={[0, -0.05, 0]}>
          <instancedMesh ref={mirrorRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={texture}
              toneMapped={false}
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </instancedMesh>
        </group>
      </group>

      {/* The gate: a fixed playhead the strip runs through. */}
      <mesh position={[0, BAND_HEIGHT / 2, 0.1]}>
        <planeGeometry args={[0.012, BAND_HEIGHT * 2.6]} />
        <meshBasicMaterial
          color="#ffffff"
          toneMapped={false}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
