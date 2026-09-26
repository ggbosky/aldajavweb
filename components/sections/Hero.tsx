'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BRAND } from '@/lib/site';
import { HARD_CUT_EASE } from '@/components/motion/HardCutTransition';

/**
 * Nothing but the wordmark, one line and two buttons. The mark is the whole
 * composition, so it gets a third to a half of the frame and everything else
 * hangs under it.
 */
export default function Hero(): React.JSX.Element {
  return (
    <section className="hero" id="top">
      <div className="hero__inner">
        <motion.div
          className="hero__mark"
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(14px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: HARD_CUT_EASE }}
        >
          <Image
            src="/images/alda-napis.png"
            alt={BRAND.name}
            width={1960}
            height={365}
            priority
          />
        </motion.div>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: HARD_CUT_EASE }}
        >
          {BRAND.tagline}
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.62, ease: HARD_CUT_EASE }}
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
