'use client';

import { motion } from 'framer-motion';
import HardCutTransition, { cutChild, cutParent } from '@/components/motion/HardCutTransition';
import { WORK } from '@/lib/site';

const FRAMES = [0, 1, 2, 3];

export default function TimelineSection(): React.JSX.Element {
  return (
    <section className="sequence" id="prace">
      <div className="sequence__head">
        <HardCutTransition>
          <p className="section-label mono">Práce</p>
        </HardCutTransition>
        <HardCutTransition delay={0.06}>
          <h2 className="section-title">
            Čtyři věci, které <em>umím</em> dodat.
          </h2>
        </HardCutTransition>
      </div>

      <motion.ol
        className="clips"
        variants={cutParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-120px' }}
      >
        {WORK.map((block, index) => (
          <motion.li
            key={block.id}
            id={block.id}
            className={`clip clip--${block.accent}`}
            variants={cutChild}
          >
            <div className="clip__rail mono">
              <span className="clip__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="clip__tc">{block.timecodeIn}</span>
              <span className="clip__dur">DUR {block.duration}</span>
            </div>

            {/* Four frames off a strip — the same film language as the hero scene. */}
            <div className="clip__preview" aria-hidden="true">
              <span className="clip__sprockets clip__sprockets--top" />
              <div className="clip__frames">
                {FRAMES.map((frame) => (
                  <i key={frame} style={{ animationDelay: `${frame * 0.22}s` }} />
                ))}
              </div>
              <span className="clip__preview-id mono">{block.format}</span>
              <span className="clip__sprockets clip__sprockets--bottom" />
            </div>

            <div className="clip__body">
              <header className="clip__header">
                <h3 className="clip__client">{block.title}</h3>
                <p className="clip__sector mono">{block.kind}</p>
              </header>
              <p className="clip__headline">{block.headline}</p>
              <p className="clip__text">{block.body}</p>

              <div className="clip__tags">
                {block.role.map((role) => (
                  <span key={role} className="tag">
                    {role}
                  </span>
                ))}
              </div>

              <ul className="clip__deliverables mono">
                {block.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
