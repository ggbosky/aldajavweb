'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import HardCutTransition, { cutChild, cutParent } from '@/components/motion/HardCutTransition';
import { CASE_STUDIES } from '@/lib/site';

const TICKS = Array.from({ length: 41 }, (_, i) => i);

export default function TimelineSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);

  // Local scrub progress for this sequence only — drives the sticky ruler.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const headLeft = useTransform(smooth, (v) => `${v * 100}%`);
  const fillWidth = useTransform(smooth, (v) => `${v * 100}%`);

  return (
    <section className="sequence" id="prace" ref={sectionRef}>
      <div className="sequence__head">
        <HardCutTransition>
          <p className="section-label mono">
            <span>SEQ 01</span>
            <i />
            Vybrané klipy
          </p>
        </HardCutTransition>
        <HardCutTransition delay={0.06}>
          <h2 className="section-title">
            Scrubni <em>timeline</em> a podívej se, co z toho vzniká.
          </h2>
        </HardCutTransition>
      </div>

      <div className="ruler" aria-hidden="true">
        <div className="ruler__ticks">
          {TICKS.map((tick) => (
            <i key={tick} className={tick % 5 === 0 ? 'ruler__tick ruler__tick--major' : 'ruler__tick'} />
          ))}
        </div>
        <motion.div className="ruler__fill" style={{ width: fillWidth }} />
        <motion.div className="ruler__head" style={{ left: headLeft }}>
          <span className="ruler__head-flag" />
        </motion.div>
      </div>

      <motion.ol
        className="clips"
        variants={cutParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-120px' }}
      >
        {CASE_STUDIES.map((study, index) => (
          <motion.li
            key={study.id}
            id={study.id}
            className={`clip clip--${study.accent}`}
            variants={cutChild}
          >
            <div className="clip__rail mono">
              <span className="clip__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="clip__tc">{study.timecodeIn}</span>
              <span className="clip__dur">DUR {study.duration}</span>
            </div>

            <div className="clip__preview" aria-hidden="true">
              <div className="clip__bars">
                {Array.from({ length: 18 }, (_, i) => (
                  <i key={i} style={{ animationDelay: `${i * 0.08}s` }} />
                ))}
              </div>
              <span className="clip__preview-id mono">{study.client.toUpperCase()}</span>
              <span className="clip__sprockets" />
            </div>

            <div className="clip__body">
              <header className="clip__header">
                <h3 className="clip__client">{study.client}</h3>
                <p className="clip__sector mono">
                  {study.sector} <span>·</span> {study.year}
                </p>
              </header>
              <p className="clip__headline">{study.headline}</p>
              <p className="clip__text">{study.body}</p>

              <div className="clip__tags">
                {study.role.map((role) => (
                  <span key={role} className="tag">
                    {role}
                  </span>
                ))}
              </div>

              <ul className="clip__deliverables mono">
                {study.deliverables.map((item) => (
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
