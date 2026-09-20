'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/** Snappy bezier — fast in, no float. Reads as a cut, not a fade. */
export const HARD_CUT_EASE = [0.25, 1, 0.5, 1] as const;

export type HardCutTransitionProps = {
  children: ReactNode;
  /** Seconds of delay before the cut lands. */
  delay?: number;
  className?: string;
  /** Slight vertical entry offset, in pixels. */
  from?: number;
};

export default function HardCutTransition({
  children,
  delay = 0,
  className,
  from = 18,
}: HardCutTransitionProps): React.JSX.Element {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.97, y: from, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.3, delay, ease: HARD_CUT_EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Parent for staggered reveals — pair with `cutChild`. */
export const cutParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.05 },
  },
};

/** Child variant for staggered reveals — same hard-cut timing. */
export const cutChild: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.32, ease: HARD_CUT_EASE },
  },
};
