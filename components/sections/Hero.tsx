'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BRAND } from '@/lib/site';
import { HARD_CUT_EASE } from '@/components/motion/HardCutTransition';

/**
 * The portrait is the hero. A radial mask feathers its square edges into the
 * page, so the blue key light reads as the only thing lit in a dark room, and a
 * spring-damped tilt gives it depth as the cursor moves.
 */
export default function Hero(): React.JSX.Element {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(pointerY, { damping: 50, stiffness: 400 });

  const rotateY = useTransform(smoothX, [-1, 1], [-5, 5]);
  const rotateX = useTransform(smoothY, [-1, 1], [5, -5]);
  // The copy drifts against the portrait, which is what sells the depth.
  const copyX = useTransform(smoothX, [-1, 1], [14, -14]);
  const copyY = useTransform(smoothY, [-1, 1], [8, -8]);

  useEffect(() => {
    // A coarse pointer has no hover position to track, and reduced motion asks
    // us not to move anything — in both cases the rig simply stays centred.
    const fine = window.matchMedia('(pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || calm.matches) return;

    const handleMove = (event: PointerEvent): void => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [pointerX, pointerY]);

  return (
    <section className="hero" id="top">
      <motion.div
        className="hero__portrait"
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: HARD_CUT_EASE }}
        aria-hidden="true"
      >
        <div className="hero__portrait-image" />
      </motion.div>

      <motion.div className="hero__copy" style={{ x: copyX, y: copyY }}>
        <h1 className="hero__title">
          <motion.span
            className="hero__title-line"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: HARD_CUT_EASE }}
          >
            {BRAND.name}
          </motion.span>
        </h1>

        <div className="hero__foot">
        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: HARD_CUT_EASE }}
        >
          {BRAND.tagline}
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: HARD_CUT_EASE }}
        >
          <a className="btn btn--primary" href="#prace">
            Přehrát práci
            <span className="btn__glyph" aria-hidden="true">
              ▶
            </span>
          </a>
          <a className="btn btn--ghost" href="#kontakt">
            Poptat střih
          </a>
        </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
