'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import HardCutTransition, {
  HARD_CUT_EASE,
  cutChild,
  cutParent,
} from '@/components/motion/HardCutTransition';
import { SOCIALS, WORK } from '@/lib/site';

const FRAMES = [0, 1, 2, 3];
const INSTAGRAM = SOCIALS.find((social) => social.label === 'Instagram');

/**
 * Two categories behind one switch. The active button fills with the cyan — it
 * carries `aria-pressed` too, since the fill is the only other thing saying
 * which set you are looking at. Under it, the category as one spread (frame on
 * one side, what and how on the other) and then its videos.
 */
export default function WorkSection(): React.JSX.Element {
  const [activeId, setActiveId] = useState<string>(WORK[0]?.id ?? '');
  const active = WORK.find((category) => category.id === activeId) ?? WORK[0];

  return (
    <section className="sequence" id="prace">
      <div className="sequence__head">
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

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.3, ease: HARD_CUT_EASE }}
          >
            <article className="clip">
              <figure className="clip__figure">
                {/* Frames off a strip — stands in until the videos arrive. */}
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
                  <span>{active.timecodeIn}</span>
                  <span>DUR {active.duration}</span>
                  <span className="clip__format">{active.format}</span>
                </figcaption>
              </figure>

              <div className="clip__body">
                <header className="clip__header">
                  <h3 className="clip__client">{active.label}</h3>
                  <p className="clip__sector mono">{active.kind}</p>
                </header>

                <p className="clip__headline">{active.headline}</p>
                <p className="clip__text">{active.body}</p>

                <div className="clip__tags">
                  {active.role.map((role) => (
                    <span key={role} className="tag">
                      {role}
                    </span>
                  ))}
                </div>

                <ul className="clip__deliverables mono">
                  {active.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>

            {active.videos.length > 0 ? (
              <motion.ul className="reel" variants={cutParent} initial="hidden" animate="visible">
                {active.videos.map((video) => (
                  <motion.li key={video.href} variants={cutChild}>
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
                      <h4 className="reel__title">{video.title}</h4>
                      <p className="reel__note mono">{video.note}</p>
                      {video.role && video.role.length > 0 && (
                        <p className="reel__role mono">{video.role.join(' · ')}</p>
                      )}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <p className="empty mono">
                Výběr videí připravujeme.
                {INSTAGRAM && (
                  <a href={INSTAGRAM.href} target="_blank" rel="noreferrer noopener">
                    Mezitím na Instagramu ↗
                  </a>
                )}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
