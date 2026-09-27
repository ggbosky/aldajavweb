'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BRAND } from '@/lib/site';
import { HARD_CUT_EASE } from '@/components/motion/HardCutTransition';

/**
 * The mark sits where the name used to run down the left — a third to a half of
 * the frame — with the tagline in italics under it and the two buttons below.
 * Nothing else: the portrait lives in "O mně" now.
 */
export default function Hero(): React.JSX.Element {
  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <motion.h1
          className="hero__mark"
          initial={{ opacity: 0, y: '6%', filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.1, ease: HARD_CUT_EASE }}
        >
          <Image src="/images/alda-napis.png" alt={BRAND.name} width={1960} height={365} priority />
        </motion.h1>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5, ease: HARD_CUT_EASE }}
        >
          {BRAND.tagline}
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.64, ease: HARD_CUT_EASE }}
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
