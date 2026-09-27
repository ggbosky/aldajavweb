'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BRAND } from '@/lib/site';
import { HARD_CUT_EASE } from '@/components/motion/HardCutTransition';

/**
 * The mark, centred, with the role and the tagline in italics under it and the
 * two buttons, on the plain black page.
 */
export default function Hero(): React.JSX.Element {
  return (
    <section className="hero" id="top">
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

    </section>
  );
}
