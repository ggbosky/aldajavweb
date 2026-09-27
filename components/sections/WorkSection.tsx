'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import HardCutTransition, { cutChild, cutParent } from '@/components/motion/HardCutTransition';
import { SOCIALS, WORK } from '@/lib/site';

const INSTAGRAM = SOCIALS.find((social) => social.label === 'Instagram');

/**
 * Two categories behind one switch. The active button fills with the accent —
 * that fill is the only thing telling you which set you are looking at, so it
 * carries `aria-pressed` too rather than leaving it to colour alone.
 */
export default function WorkSection(): React.JSX.Element {
  const [activeId, setActiveId] = useState<string>(WORK[0]?.id ?? '');
  const active = WORK.find((category) => category.id === activeId) ?? WORK[0];

  return (
    <section className="work" id="prace">
      <div className="work__head">
        <HardCutTransition>
          <p className="section-label mono">Práce</p>
        </HardCutTransition>
        <HardCutTransition delay={0.06}>
          <h2 className="section-title">
            Vyber si, co tě <em>zajímá</em>.
          </h2>
        </HardCutTransition>
      </div>

      <HardCutTransition delay={0.12}>
        <div className="switch" role="group" aria-label="Kategorie práce">
          {WORK.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`switch__btn${category.id === active?.id ? ' is-active' : ''}`}
              aria-pressed={category.id === active?.id}
              onClick={() => setActiveId(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </HardCutTransition>

      {active && active.videos.length > 0 ? (
        <motion.ul
          key={active.id}
          className="reel"
          variants={cutParent}
          initial="hidden"
          animate="visible"
        >
          {active.videos.map((video) => (
            <motion.li key={video.href} className="reel__item" variants={cutChild}>
              <a
                className="reel__link"
                href={video.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="reel__frame" aria-hidden="true">
                  {video.thumb && (
                    <Image
                      className="reel__thumb"
                      src={video.thumb}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 90vw, 30vw"
                    />
                  )}
                  <span className="reel__play">▶</span>
                </span>
                <h3 className="reel__title">{video.title}</h3>
                <p className="reel__note mono">{video.note}</p>
                {video.role && video.role.length > 0 && (
                  <p className="reel__role">{video.role.join(' · ')}</p>
                )}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="work__empty mono">
          Výběr videí připravujeme.
          {INSTAGRAM && (
            <>
              {' '}
              <a href={INSTAGRAM.href} target="_blank" rel="noreferrer noopener">
                Mezitím na Instagramu ↗
              </a>
            </>
          )}
        </p>
      )}
    </section>
  );
}
