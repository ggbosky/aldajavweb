'use client';

import { useCallback, useEffect, useRef } from 'react';
import { CASE_STUDIES } from '@/lib/site';
import { playhead, startPlayhead } from '@/lib/playhead';

/**
 * Bottom transport: a scrub bar with a marker per case study.
 * Markers are real navigation — they scroll the document to that clip.
 */
export default function TransportBar(): React.JSX.Element {
  const headRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stop = startPlayhead();
    let frame = 0;

    const tick = (): void => {
      const pct = playhead.progress * 100;
      if (headRef.current) headRef.current.style.left = `${pct}%`;
      if (fillRef.current) fillRef.current.style.width = `${pct}%`;
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      stop();
    };
  }, []);

  const jumpTo = useCallback((id: string) => {
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <nav className="transport" aria-label="Timeline navigace">
      <span className="transport__state">
        <i className="transport__play" />
        PLAY
      </span>

      <div className="transport__track">
        <div className="transport__fill" ref={fillRef} />
        <div className="transport__head" ref={headRef} />
        {CASE_STUDIES.map((study) => (
          <button
            key={study.id}
            type="button"
            className={`transport__marker transport__marker--${study.accent}`}
            style={{ left: `${study.mark * 100}%` }}
            onClick={() => jumpTo(study.id)}
          >
            <span className="transport__marker-label">{study.client}</span>
          </button>
        ))}
      </div>

      <a className="transport__cta" href="#kontakt">
        Napsat
      </a>
    </nav>
  );
}
