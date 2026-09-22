'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import HardCutTransition from '@/components/motion/HardCutTransition';
import { ARSENAL } from '@/lib/site';

/**
 * The roster. One row per discipline: index, title, group — and a description
 * that only resolves when the row is intentionally engaged, so the list reads
 * as a clean index until someone reaches for it.
 *
 * The reveal animates `grid-template-rows` from `0fr` to `1fr` rather than a
 * height, which is the only way to transition to an auto-sized box.
 */
export default function ArsenalSection(): React.JSX.Element {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="arsenal" id="arsenal">
      <div className="arsenal__head">
        <HardCutTransition>
          <p className="section-label mono">Arsenal</p>
        </HardCutTransition>
        <HardCutTransition delay={0.06}>
          <p className="section-lead">
            Nepředávám si projekt s pěti lidmi. Natočím, sestříhám, ozvučím a dodám ve formátech,
            které platforma chce. Jeden člověk, jedna odpovědnost, jeden rytmus.
          </p>
        </HardCutTransition>
      </div>

      <div className="roster">
        {ARSENAL.map((item, index) => (
          <motion.div
            key={item.id}
            className={`roster__row${active === item.id ? ' is-active' : ''}`}
            onHoverStart={() => setActive(item.id)}
            onHoverEnd={() => setActive((current) => (current === item.id ? null : current))}
            onFocus={() => setActive(item.id)}
            onBlur={() => setActive((current) => (current === item.id ? null : current))}
            tabIndex={0}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.04 }}
          >
            <span className="roster__glow" aria-hidden="true" />

            <div className="roster__lead">
              <span className="roster__index mono">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="roster__title">{item.label}</h3>
            </div>

            <div className="roster__meta">
              <span className="roster__group mono">{item.group}</span>
              <div className="roster__reveal">
                <p className="roster__spec">{item.spec}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
