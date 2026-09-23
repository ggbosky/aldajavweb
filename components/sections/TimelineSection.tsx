'use client';

import { motion } from 'framer-motion';
import HardCutTransition, { cutChild, cutParent } from '@/components/motion/HardCutTransition';
import { WORK } from '@/lib/site';

const FRAMES = [0, 1, 2, 3];

/**
 * Four entries, read as a spread rather than a stack of cards: a hairline, the
 * frame on one side, the copy on the other, and the side swaps every entry.
 */
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
        {WORK.map((block) => (
          <motion.li
            key={block.id}
            id={block.id}
            className={`clip clip--${block.accent}`}
            variants={cutChild}
          >
            <figure className="clip__figure">
              {/* Frames off a strip — a placeholder until real stills exist. */}
              <div className="clip__preview" aria-hidden="true">
                <span className="clip__sprockets clip__sprockets--top" />
                <div className="clip__frames">
                  {FRAMES.map((frame) => (
                    <i key={frame} style={{ animationDelay: `${frame * 0.22}s` }} />
                  ))}
                </div>
                <span className="clip__sprockets clip__sprockets--bottom" />
              </div>
              <figcaption className="clip__meta mono">
                <span>{block.timecodeIn}</span>
                <span>DUR {block.duration}</span>
                <span className="clip__format">{block.format}</span>
              </figcaption>
            </figure>

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
