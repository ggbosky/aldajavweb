'use client';

import { useEffect, useRef } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { cutChild, cutParent } from '@/components/motion/HardCutTransition';
import { STATS, type Stat } from '@/lib/site';

/**
 * Counts from zero up to the value the first time it scrolls into view. The
 * final number is what renders on the server, so the page reads correctly
 * without JavaScript and under reduced motion; the count writes straight to
 * the DOM, so it never re-renders React.
 */
function Counter({ stat }: { stat: Stat }): React.JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const format = (n: number): string => `${stat.prefix ?? ''}${Math.round(n)}${stat.suffix ?? ''}`;

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!inView) {
      node.textContent = format(0);
      return;
    }
    const controls = animate(0, stat.value, {
      duration: stat.value > 100 ? 1.8 : 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => {
        node.textContent = format(n);
      },
    });
    return () => controls.stop();
    // `format` only reads `stat`, which never changes for a given counter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, stat]);

  return (
    <span ref={ref} className="stats__value">
      {format(stat.value)}
    </span>
  );
}

export default function StatsStrip(): React.JSX.Element {
  return (
    <motion.section
      className="stats"
      variants={cutParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      aria-label="Čísla"
    >
      {STATS.map((stat) => (
        <motion.div key={stat.label} className="stats__item" variants={cutChild}>
          <Counter stat={stat} />
          <span className="stats__label">{stat.label}</span>
        </motion.div>
      ))}
    </motion.section>
  );
}
