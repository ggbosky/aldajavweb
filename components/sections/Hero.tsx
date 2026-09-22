'use client';

import { motion } from 'framer-motion';
import { BRAND } from '@/lib/site';
import { HARD_CUT_EASE } from '@/components/motion/HardCutTransition';

/** Each word gets its own line; the cut delay keeps running across the break. */
const LINES = BRAND.nameLines.map((word, index, all) => ({
  word,
  offset: all.slice(0, index).reduce((total, previous) => total + previous.length, 0),
}));

/** Each letter lands as its own jump cut, 45 ms apart. */
const letterVariants = {
  hidden: { opacity: 0, y: '30%', filter: 'blur(12px)' },
  visible: (index: number) => ({
    opacity: 1,
    y: '0%',
    filter: 'blur(0px)',
    transition: { duration: 0.28, delay: 0.1 + index * 0.045, ease: HARD_CUT_EASE },
  }),
} as const;

/**
 * Asymmetric: the name runs down the left, the portrait sits off to the right and
 * bleeds into the page. Nothing here tracks the cursor — the frame holds still.
 */
export default function Hero(): React.JSX.Element {
  return (
    <section className="hero" id="top">
      <motion.div
        className="hero__portrait"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: HARD_CUT_EASE }}
        aria-hidden="true"
      >
        <div className="hero__portrait-image" />
      </motion.div>

      <div className="hero__copy">
        <h1 className="hero__title" aria-label={BRAND.name}>
          {LINES.map(({ word, offset }) => (
            <span className="hero__line" key={word} aria-hidden="true">
              {word.split('').map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  className="hero__letter"
                  custom={offset + index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.62, ease: HARD_CUT_EASE }}
        >
          {BRAND.tagline}
        </motion.p>

        <motion.p
          className="hero__intro"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.72, ease: HARD_CUT_EASE }}
        >
          {BRAND.intro}
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.82, ease: HARD_CUT_EASE }}
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
    </section>
  );
}
