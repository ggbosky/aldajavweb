'use client';

import { motion } from 'framer-motion';
import { BRAND } from '@/lib/site';
import { HARD_CUT_EASE } from '@/components/motion/HardCutTransition';

const LETTERS = BRAND.name.split('');

/** Each letter lands as its own jump cut, 55 ms apart. */
const letterVariants = {
  hidden: { opacity: 0, y: '38%', skewY: 7, filter: 'blur(14px)' },
  visible: (index: number) => ({
    opacity: 1,
    y: '0%',
    skewY: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.26, delay: 0.12 + index * 0.055, ease: HARD_CUT_EASE },
  }),
} as const;

export default function Hero(): React.JSX.Element {
  return (
    <section className="hero" id="top">
      <div className="hero__inner">
        <motion.p
          className="hero__eyebrow mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          <span className="hero__slate">A001 / TAKE 01</span>
          {BRAND.role}
        </motion.p>

        <h1 className="hero__title" aria-label={BRAND.name}>
          {LETTERS.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              className="hero__letter"
              data-char={letter}
              custom={index}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              aria-hidden="true"
            >
              {letter}
            </motion.span>
          ))}
          <span className="hero__sweep" aria-hidden="true" />
        </h1>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.34, delay: 0.46, ease: HARD_CUT_EASE }}
        >
          {BRAND.tagline}
        </motion.p>

        <motion.p
          className="hero__intro"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: 0.58, ease: HARD_CUT_EASE }}
        >
          {BRAND.intro}
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: 0.7, ease: HARD_CUT_EASE }}
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

        <motion.dl
          className="hero__meta mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.85 }}
        >
          <div>
            <dt>Klienti</dt>
            <dd>FAČR · Hitrádio · Inside Media</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>Premiere Pro · After Effects</dd>
          </div>
          <div>
            <dt>Základna</dt>
            <dd>{BRAND.location}</dd>
          </div>
        </motion.dl>
      </div>

      <motion.div
        className="hero__scrub mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1 }}
      >
        <span>SCRUB</span>
        <i className="hero__scrub-line" />
      </motion.div>
    </section>
  );
}
