'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BRAND } from '@/lib/site';
import { HARD_CUT_EASE } from '@/components/motion/HardCutTransition';

const FPS = 25;

/** HH:MM:SS:FF at 25 fps, the way a camera or an NLE reads it out. */
function formatTimecode(frames: number): string {
  const ff = frames % FPS;
  const totalSeconds = Math.floor(frames / FPS);
  const pad = (value: number): string => String(value).padStart(2, '0');
  return `${pad(Math.floor(totalSeconds / 3600))}:${pad(Math.floor(totalSeconds / 60) % 60)}:${pad(totalSeconds % 60)}:${pad(ff)}`;
}

/**
 * A running timecode. It writes straight to the DOM from one rAF loop, so the
 * 25 updates a second never re-render React. Frozen under reduced motion.
 */
function Timecode(): React.JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number): void => {
      if (ref.current) {
        ref.current.textContent = formatTimecode(Math.floor(((now - start) / 1000) * FPS));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <span ref={ref}>{formatTimecode(0)}</span>;
}

/**
 * The mark, centred, with the tagline in italics under it and the two buttons.
 * Around it the frame reads as a camera viewfinder: corner marks, REC, a running
 * timecode and the recording format — furniture, not content, so it stays quiet.
 */
export default function Hero(): React.JSX.Element {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />

      <motion.div
        className="viewfinder"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: HARD_CUT_EASE }}
      >
        <span className="viewfinder__corner viewfinder__corner--tl" />
        <span className="viewfinder__corner viewfinder__corner--tr" />
        <span className="viewfinder__corner viewfinder__corner--bl" />
        <span className="viewfinder__corner viewfinder__corner--br" />

        <span className="viewfinder__readout viewfinder__readout--tl mono">
          <i className="viewfinder__rec" /> REC
        </span>
        <span className="viewfinder__readout viewfinder__readout--tr mono">
          <Timecode />
        </span>
        <span className="viewfinder__readout viewfinder__readout--bl mono">4K · 25P</span>
        <span className="viewfinder__readout viewfinder__readout--br mono">9:16 · 16:9</span>
      </motion.div>

      <div className="hero__copy">
        <motion.h1
          className="hero__mark"
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(16px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.1, ease: HARD_CUT_EASE }}
        >
          <Image src="/images/alda-napis.png" alt={BRAND.name} width={1960} height={365} priority />
        </motion.h1>

        <motion.p
          className="hero__role mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          {BRAND.role}
        </motion.p>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55, ease: HARD_CUT_EASE }}
        >
          {BRAND.tagline}
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.68, ease: HARD_CUT_EASE }}
        >
          <a className="btn btn--primary" href="#prace">
            Ukázka práce
            <span className="btn__glyph" aria-hidden="true">
              ▶
            </span>
          </a>
          <a className="btn btn--ghost" href="#kontakt">
            Pojďme si napsat
          </a>
        </motion.div>
      </div>

      <a className="hero__scroll mono" href="#o-mne" aria-label="Posunout na O mně">
        <span className="hero__scroll-line" aria-hidden="true" />
        Scroll
      </a>
    </section>
  );
}
