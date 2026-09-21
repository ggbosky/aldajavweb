'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import * as THREE from 'three';
import Filmstrip from '@/components/canvas/Filmstrip';
import { fitDistance } from '@/lib/framing';
import { playhead, startPlayhead } from '@/lib/playhead';

/**
 * Frames the strip regardless of viewport aspect, then adds a slow parallax
 * dolly: the camera pulls back as the sequence plays out.
 */
function CameraRig(): null {
  useFrame((state, delta) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const head = playhead.smooth;
    const aspect = state.size.width / state.size.height;
    const halfFov = THREE.MathUtils.degToRad(camera.fov) / 2;
    const baseZ = fitDistance(aspect, camera.fov);

    const targetX = playhead.pointerX * 0.5;
    const targetY = playhead.pointerY * 0.28 + head * 0.5;
    const targetZ = baseZ + head * 3.2;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.5, delta);

    // Aim so the strip always lands in the lower third, whatever the aspect
    // ratio: the copy gets the top, the scene gets the floor.
    const visibleHeight = 2 * camera.position.z * Math.tan(halfFov);
    camera.lookAt(0, visibleHeight * 0.35, 0);
    camera.updateProjectionMatrix();
  });
  return null;
}

/** Sparse dust motes for depth — cheap, single draw call. */
function Dust({ count = 220 }: { count?: number }): React.JSX.Element {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo<Float32Array>(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      array[i * 3] = (Math.random() - 0.5) * 34;
      array[i * 3 + 1] = Math.random() * 14 - 2;
      array[i * 3 + 2] = (Math.random() - 0.5) * 16 - 3;
    }
    return array;
  }, [count]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points || playhead.reducedMotion) return;
    const time = state.clock.getElapsedTime();
    points.rotation.y = time * 0.014;
    points.position.y = Math.sin(time * 0.2) * 0.2;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#7fdfd0"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

/**
 * Fixed, full-viewport canvas rendered behind every DOM layer.
 * Pointer events stay with the DOM; the scene tracks the cursor through the
 * shared playhead store, so it reacts everywhere without stealing clicks.
 */
export default function SceneCanvas(): React.JSX.Element | null {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return startPlayhead();
  }, []);

  if (!mounted) return null;

  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 16], fov: 32, near: 0.1, far: 90 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <fog attach="fog" args={['#000000', 14, 44]} />
        <CameraRig />
        <Dust />
        <Filmstrip position={[0, 0, 0]} />
        <AdaptiveDpr pixelated={false} />
        <Preload all />
      </Canvas>
      <div className="scene__vignette" />
    </div>
  );
}
