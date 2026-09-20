'use client';

import { useEffect, useRef } from 'react';
import { formatTimecode, playhead, startPlayhead } from '@/lib/playhead';

const SECTIONS: ReadonlyArray<{ at: number; label: string }> = [
  { at: 0, label: 'HERO / COLD OPEN' },
  { at: 0.1, label: 'SEQ 01 / TIMELINE' },
  { at: 0.58, label: 'SEQ 02 / ARSENAL' },
  { at: 0.76, label: 'SEQ 03 / PROCES' },
  { at: 0.9, label: 'SEQ 04 / KONTAKT' },
];

function labelFor(progress: number): string {
  let current = SECTIONS[0]!.label;
  for (const section of SECTIONS) {
    if (progress >= section.at) current = section.label;
  }
  return current;
}

/**
 * Fixed broadcast-style read-out. Updates the DOM directly from the shared rAF
 * loop so a 60 fps timecode never triggers a React render.
 */
export default function TimecodeHUD(): React.JSX.Element {
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stop = startPlayhead();
    let frame = 0;
    let lastLabel = '';

    const tick = (): void => {
      const progress = playhead.progress;
      if (timecodeRef.current) timecodeRef.current.textContent = formatTimecode(progress);
      if (percentRef.current) percentRef.current.textContent = `${Math.round(progress * 100)}%`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(progress, 0.004)})`;
      const next = labelFor(progress);
      if (labelRef.current && next !== lastLabel) {
        labelRef.current.textContent = next;
        lastLabel = next;
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      stop();
    };
  }, []);

  return (
    <div className="hud" aria-hidden="true">
      <div className="hud__row">
        <span className="hud__rec">
          <i className="hud__dot" />
          REC
        </span>
        <span className="hud__tc" ref={timecodeRef}>
          00:00:00:00
        </span>
      </div>
      <div className="hud__row hud__row--meta">
        <span ref={labelRef}>HERO / COLD OPEN</span>
        <span className="hud__sep">·</span>
        <span>25 FPS</span>
        <span className="hud__sep">·</span>
        <span ref={percentRef}>0%</span>
      </div>
      <div className="hud__track">
        <div className="hud__fill" ref={barRef} />
      </div>
    </div>
  );
}
