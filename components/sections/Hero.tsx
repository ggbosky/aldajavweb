'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BRAND, SOCIALS } from '@/lib/site';
import { HARD_CUT_EASE } from '@/components/motion/HardCutTransition';

/*
 * One sequence: the mark lands first, then the role line, then the tagline
 * word by word, then the buttons. Each step starts where the previous ends.
 */
const MARK_AT = 0.1;
const ROLE_AT = 0.85;
const TAGLINE_AT = 1.3;
const WORD_STEP = 0.12;
const WORDS = BRAND.tagline.split(' ');
/** Until the videos are on the page, the work lives on his Instagram. */
const WORK_HREF = SOCIALS.find((social) => social.label === 'Instagram')?.href ?? '#kontakt';

const ACTIONS_AT = TAGLINE_AT + WORDS.length * WORD_STEP + 0.2;

/** The mark, the role, the tagline and the two buttons on the plain black page. */
export default function Hero(): React.JSX.Element {
  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <motion.h1
          className="hero__mark"
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(16px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: MARK_AT, ease: HARD_CUT_EASE }}
        >
          <Image src="/images/alda-napis.png" alt={BRAND.name} width={1960} height={365} priority />
        </motion.h1>

        <motion.p
          className="hero__role mono"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: ROLE_AT, ease: HARD_CUT_EASE }}
        >
          {BRAND.role}
        </motion.p>

        {/* Screen readers get the sentence whole; the words are split only for the eye. */}
        <p className="hero__tagline" aria-label={BRAND.tagline}>
          {WORDS.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="hero__word"
              aria-hidden="true"
              initial={{ opacity: 0, y: '0.4em', filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: '0em', filter: 'blur(0px)' }}
              transition={{
                duration: 0.4,
                delay: TAGLINE_AT + index * WORD_STEP,
                ease: HARD_CUT_EASE,
              }}
            >
              {word}
            </motion.span>
          ))}
        </p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: ACTIONS_AT, ease: HARD_CUT_EASE }}
        >
          <a
            className="btn btn--primary"
            href={WORK_HREF}
            target="_blank"
            rel="noreferrer noopener"
          >
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
