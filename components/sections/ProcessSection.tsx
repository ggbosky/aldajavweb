'use client';

import { motion } from 'framer-motion';
import HardCutTransition, { cutChild, cutParent } from '@/components/motion/HardCutTransition';
import { PROCESS } from '@/lib/site';

export default function ProcessSection(): React.JSX.Element {
  return (
    <section className="process" id="proces">
      <div className="process__head">
        <HardCutTransition>
          <p className="section-label mono">Proces</p>
        </HardCutTransition>
        <HardCutTransition delay={0.06}>
          <h2 className="section-title">
            Pět kroků. Žádné <em>čekání</em> na revizi číslo devět.
          </h2>
        </HardCutTransition>
      </div>

      <motion.ol
        className="process__list"
        variants={cutParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {PROCESS.map((step) => (
          <motion.li key={step.index} className="step" variants={cutChild}>
            <span className="step__index mono">{step.index}</span>
            <h3 className="step__title">{step.title}</h3>
            <p className="step__text">{step.body}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
