'use client';

import { motion } from 'framer-motion';
import HardCutTransition, { cutParent } from '@/components/motion/HardCutTransition';
import MagneticCard from '@/components/motion/MagneticCard';
import { ARSENAL } from '@/lib/site';

export default function ArsenalSection(): React.JSX.Element {
  return (
    <section className="arsenal" id="arsenal">
      <div className="arsenal__head">
        <HardCutTransition>
          <p className="section-label mono">
            <span>SEQ 02</span>
            <i />
            Arsenal &amp; produkce
          </p>
        </HardCutTransition>
        <HardCutTransition delay={0.06}>
          <h2 className="section-title">
            Kompletní <em>pipeline</em> — od nápadu po export.
          </h2>
        </HardCutTransition>
        <HardCutTransition delay={0.12}>
          <p className="section-lead">
            Nepředávám si projekt s pěti lidmi. Natočím, sestříhám, ozvučím a dodám ve formátech,
            které platforma chce. Jeden člověk, jedna odpovědnost, jeden rytmus.
          </p>
        </HardCutTransition>
      </div>

      <motion.div
        className="arsenal__grid"
        variants={cutParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {ARSENAL.map((item) => (
          <MagneticCard key={item.id} className="spec">
            <span className="spec__group mono">{item.group}</span>
            <h3 className="spec__label">{item.label}</h3>
            <p className="spec__text mono">{item.spec}</p>
            <span className="spec__glow" aria-hidden="true" />
          </MagneticCard>
        ))}
      </motion.div>
    </section>
  );
}
