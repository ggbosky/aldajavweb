'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

/**
 * Three.js is ~0.5 MB of JS that the hero does not need in order to paint.
 * Load it only in the browser, and only once the first frame is on screen —
 * the kinetic type must land instantly, the waveform can arrive a beat later.
 */
const SceneCanvas = dynamic(() => import('@/components/canvas/SceneCanvas'), {
  ssr: false,
});

export default function SceneMount(): React.JSX.Element | null {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(cb, 300));
    const handle = idle(() => setReady(true));
    return () => {
      if (typeof handle === 'number') window.clearTimeout(handle);
    };
  }, []);

  if (!ready) return null;
  return <SceneCanvas />;
}
