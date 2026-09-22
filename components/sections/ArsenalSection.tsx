'use client';

import { motion } from 'framer-motion';
import HardCutTransition, { cutChild, cutParent } from '@/components/motion/HardCutTransition';
import { ARSENAL } from '@/lib/site';

/**
 * A spec sheet, not an inventory: three phases of the job, each with the things
 * that happen in it. Grouping does the work an index column used to do, so no
 * row has to carry its own number or repeat its own category.
 */
export default function ArsenalSection(): React.JSX.Element {
  return (
    <section className="arsenal" id="arsenal">
      <div className="arsenal__head">
        <HardCutTransition>
          <p className="section-label mono">Arsenal</p>
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

      <div className="phases">
        {ARSENAL.map((group) => (
          <motion.section
            key={group.id}
            className="phase"
            variants={cutParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.h3 className="phase__label mono" variants={cutChild}>
              {group.label}
            </motion.h3>

            <ul className="phase__items">
              {group.items.map((item) => (
                <motion.li key={item.label} className="kit" variants={cutChild}>
                  <span className="kit__bar" aria-hidden="true" />
                  <h4 className="kit__label">{item.label}</h4>
                  <p className="kit__spec">{item.spec}</p>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>
    </section>
  );
}
