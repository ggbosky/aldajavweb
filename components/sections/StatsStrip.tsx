'use client';

import { motion } from 'framer-motion';
import { cutChild, cutParent } from '@/components/motion/HardCutTransition';
import { STATS } from '@/lib/site';

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
          <span className="stats__value">{stat.value}</span>
          <span className="stats__label">{stat.label}</span>
          <span className="stats__note mono">{stat.note}</span>
        </motion.div>
      ))}
    </motion.section>
  );
}
