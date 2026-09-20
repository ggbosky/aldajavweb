'use client';

import { useMemo, useRef } from 'react';
import { useFrame, type ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';
import { playhead } from '@/lib/playhead';
import { BAR_COUNT, BAR_SPACING, fitDistance, waveformScale } from '@/lib/framing';

const COUNT = BAR_COUNT;
const SPACING = BAR_SPACING;
const BAR_WIDTH = 0.04;
const MAX_HEIGHT = 1.6;

const TEAL = new THREE.Color('#12e3c4');
const ORANGE = new THREE.Color('#ff5a1f');

export type DynamicWaveformProps = Omit<ThreeElements['group'], 'ref'>;

/**
 * A 150-instance audio waveform that doubles as the site's scroll playhead.
 * Bar height = base frequency × proximity to the playhead × live pulse × scrub jitter.
 */
export default function DynamicWaveform(props: DynamicWaveformProps): React.JSX.Element {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.InstancedMesh>(null);
  const mirrorRef = useRef<THREE.InstancedMesh>(null);
  const headRef = useRef<THREE.Mesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  /** Per-bar base amplitude — gives the array its "recorded audio" silhouette. */
  const frequencies = useMemo<Float32Array>(
    () => Float32Array.from({ length: COUNT }, () => Math.random() * 0.8 + 0.2),
    [],
  );
  /** Per-bar phase offset so the pulse never looks like a single sine sweep. */
  const phases = useMemo<Float32Array>(
    () => Float32Array.from({ length: COUNT }, () => Math.random() * Math.PI * 2),
    [],
  );

  useFrame((state, delta) => {
    const bars = barsRef.current;
    const glow = glowRef.current;
    const mirror = mirrorRef.current;
    if (!bars || !glow || !mirror) return;

    const time = state.clock.getElapsedTime();
    const head = playhead.smooth;
    const still = playhead.reducedMotion;
    const scrub = still ? 0 : THREE.MathUtils.clamp(playhead.velocity, -1.6, 1.6);

    for (let i = 0; i < COUNT; i++) {
      const n = i / (COUNT - 1);
      const x = (i - COUNT / 2) * SPACING;

      // Bars spike as the playhead passes over them — the "scrubbing" read-out.
      // At rest the array stays flat and even, so the hero copy is never fighting a
      // bright cluster; the spike resolves in over the first few percent of scroll.
      const distanceToPlayhead = Math.abs(n - head);
      const spike = Math.max(0.1, 1 - distanceToPlayhead * 5);
      const engaged = THREE.MathUtils.clamp(head * 6, 0, 1);
      const activity = THREE.MathUtils.lerp(0.4, spike, engaged);

      const pulse = still ? 1 : Math.sin(time * 4 + phases[i]! + n * 5) * 0.5 + 1;
      const jitter = 1 + Math.abs(scrub) * Math.sin(time * 24 + i * 1.7) * 0.4;
      const height = Math.max(0.04, frequencies[i]! * activity * pulse * jitter * MAX_HEIGHT);

      dummy.position.set(x, height / 2, 0);
      dummy.scale.set(BAR_WIDTH, height, BAR_WIDTH);
      dummy.updateMatrix();

      bars.setMatrixAt(i, dummy.matrix);
      mirror.setMatrixAt(i, dummy.matrix);

      // Wider, additive twin behind each bar fakes a bloom pass without postprocessing.
      dummy.scale.set(BAR_WIDTH * 3.4, height * 1.02, BAR_WIDTH * 3.4);
      dummy.updateMatrix();
      glow.setMatrixAt(i, dummy.matrix);

      const warmth = THREE.MathUtils.clamp(n * 0.3 + head * 0.55 + activity * 0.45, 0, 1);
      // Recede once the hero is gone — the waveform is scenery, never competition for the copy.
      const presence = 1 - head * 0.45;
      color.copy(TEAL).lerp(ORANGE, warmth).multiplyScalar((0.16 + activity * 1.05) * presence);
      bars.setColorAt(i, color);
      glow.setColorAt(i, color);
      mirror.setColorAt(i, color);
    }

    bars.instanceMatrix.needsUpdate = true;
    glow.instanceMatrix.needsUpdate = true;
    mirror.instanceMatrix.needsUpdate = true;
    if (bars.instanceColor) bars.instanceColor.needsUpdate = true;
    if (glow.instanceColor) glow.instanceColor.needsUpdate = true;
    if (mirror.instanceColor) mirror.instanceColor.needsUpdate = true;

    // The vertical playhead marker rides the same normalised progress value.
    if (headRef.current) {
      const headX = (head * (COUNT - 1) - COUNT / 2) * SPACING;
      headRef.current.position.x = THREE.MathUtils.damp(headRef.current.position.x, headX, 8, delta);
    }

    const group = groupRef.current;

    // Keep the bars the same apparent size whatever distance the rig had to back off to.
    if (group) {
      const camera = state.camera as THREE.PerspectiveCamera;
      const aspect = state.size.width / state.size.height;
      const scale = waveformScale(fitDistance(aspect, camera.fov));
      group.scale.setScalar(THREE.MathUtils.damp(group.scale.x, scale, 6, delta));
    }

    // Cinematic tilt: the whole array leans toward the cursor.
    if (group && !still) {
      const targetRotX = (playhead.pointerY * Math.PI) / 16;
      const targetRotY = (playhead.pointerX * Math.PI) / 14;
      group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetRotX, 4, delta);
      group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetRotY, 4, delta);
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <instancedMesh ref={barsRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={glowRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          toneMapped={false}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>

      {/* Mirrored array below the baseline — reads as a reflection on a studio desk. */}
      <group scale={[1, -0.55, 1]} position={[0, -0.06, 0]}>
        <instancedMesh ref={mirrorRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            toneMapped={false}
            transparent
            opacity={0.07}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </instancedMesh>
      </group>

      <mesh ref={headRef} position={[0, 0.9, -0.2]}>
        <planeGeometry args={[0.01, 6]} />
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
