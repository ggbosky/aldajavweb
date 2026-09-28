'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HardCutTransition, {
  HARD_CUT_EASE,
  cutChild,
  cutParent,
} from '@/components/motion/HardCutTransition';
import { WORK, type WorkVideo } from '@/lib/site';

/** How many empty frames hold the place of each set until the videos arrive. */
const PLACEHOLDERS = 3;

/** The id out of a youtube.com/watch?v=…, youtu.be/… or /shorts/… link, if it is one. */
function youtubeId(href: string): string | null {
  try {
    const url = new URL(href);
    if (url.hostname === 'youtu.be') return url.pathname.slice(1) || null;
    if (url.hostname.endsWith('youtube.com')) {
      if (url.pathname.startsWith('/shorts/')) return url.pathname.split('/')[2] ?? null;
      return url.searchParams.get('v');
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * A YouTube video plays in its own frame on the page — the thumbnail swaps
 * for the player only on click, so nothing heavy loads until someone asks.
 * Any other link opens in a new tab.
 */
function VideoFrame({ video }: { video: WorkVideo }): React.JSX.Element {
  const [playing, setPlaying] = useState(false);
  const id = youtubeId(video.href);
  const thumb = video.thumb ?? (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined);

  if (id && playing) {
    return (
      <div className="reel__frame">
        <iframe
          className="reel__player"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  const inner = (
    <>
      {thumb && (
        // A plain <img>: YouTube thumbnails come from their CDN, not from /public.
        // eslint-disable-next-line @next/next/no-img-element
        <img className="reel__thumb" src={thumb} alt="" loading="lazy" />
      )}
      <span className="reel__play" aria-hidden="true">
        ▶
      </span>
    </>
  );

  return id ? (
    <button
      type="button"
      className="reel__frame reel__link"
      onClick={() => setPlaying(true)}
      aria-label={`Přehrát: ${video.title}`}
    >
      {inner}
    </button>
  ) : (
    <a
      className="reel__frame reel__link"
      href={video.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${video.title} (otevře se v nové záložce)`}
    >
      {inner}
    </a>
  );
}

/**
 * Two sets behind one switch. The pressed button fills with the cyan — it
 * carries `aria-pressed` too, since the fill is the only other thing saying
 * which set you are looking at. Reels sit upright, YouTube on its side.
 */
export default function WorkSection(): React.JSX.Element {
  const [activeId, setActiveId] = useState<string>(WORK[0]?.id ?? '');
  const active = WORK.find((category) => category.id === activeId) ?? WORK[0];

  return (
    <section className="sequence" id="prace">
      <HardCutTransition>
        <h2 className="section-title">
          Vyber si, co tě <em>zajímá</em>
        </h2>
      </HardCutTransition>

      <HardCutTransition delay={0.08}>
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
          <motion.ul
            key={active.id}
            className={`reel reel--${active.aspect}`}
            variants={cutParent}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, filter: 'blur(6px)', transition: { duration: 0.2, ease: HARD_CUT_EASE } }}
          >
            {active.videos.length > 0
              ? active.videos.map((video) => (
                  <motion.li key={video.href} variants={cutChild}>
                    <VideoFrame video={video} />
                  </motion.li>
                ))
              : Array.from({ length: PLACEHOLDERS }, (_, index) => (
                  <motion.li key={index} variants={cutChild} aria-hidden="true">
                    <span className="reel__frame reel__frame--empty">
                      <span className="reel__play">▶</span>
                    </span>
                  </motion.li>
                ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
}
