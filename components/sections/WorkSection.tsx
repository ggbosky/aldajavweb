'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HardCutTransition, {
  HARD_CUT_EASE,
  cutChild,
  cutParent,
} from '@/components/motion/HardCutTransition';
import PlayIcon from '@/components/ui/PlayIcon';
import { WORK, type WorkVideo } from '@/lib/site';

/** How many empty frames hold the place of each set until the videos arrive. */
const PLACEHOLDERS = 3;

type Embed = { src: string; thumb: string };

/**
 * Where a link can play on the page: YouTube (watch, youtu.be, shorts) and
 * Google Drive files shared to anyone with the link. Null for anything else.
 */
function embedFor(href: string): Embed | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }

  let youtube: string | null = null;
  if (url.hostname === 'youtu.be') youtube = url.pathname.slice(1) || null;
  else if (url.hostname.endsWith('youtube.com')) {
    youtube = url.pathname.startsWith('/shorts/')
      ? (url.pathname.split('/')[2] ?? null)
      : url.searchParams.get('v');
  }
  if (youtube) {
    return {
      src: `https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`,
      thumb: `https://i.ytimg.com/vi/${youtube}/hqdefault.jpg`,
    };
  }

  const drive = url.hostname === 'drive.google.com' && url.pathname.match(/\/file\/d\/([^/]+)/);
  if (drive && drive[1]) {
    return {
      src: `https://drive.google.com/file/d/${drive[1]}/preview`,
      thumb: `https://drive.google.com/thumbnail?id=${drive[1]}&sz=w1000`,
    };
  }

  return null;
}

/**
 * YouTube and Drive videos play in their own frame on the page — the
 * thumbnail swaps for the player only on click, so nothing heavy loads until
 * someone asks. Any other link opens in a new tab.
 */
function VideoFrame({ video }: { video: WorkVideo }): React.JSX.Element {
  const [playing, setPlaying] = useState(false);
  const embed = embedFor(video.href);
  const thumb = video.thumb ?? embed?.thumb;

  if (embed && playing) {
    return (
      <div className="reel__frame">
        <iframe
          className="reel__player"
          src={embed.src}
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
        // A plain <img>: the thumbnails come from YouTube / Google, not from /public.
        // eslint-disable-next-line @next/next/no-img-element
        <img className="reel__thumb" src={thumb} alt="" loading="lazy" />
      )}
      <span className="reel__play" aria-hidden="true">
        <PlayIcon size={22} />
      </span>
    </>
  );

  return embed ? (
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
                      <span className="reel__play">
                        <PlayIcon size={22} />
                      </span>
                    </span>
                  </motion.li>
                ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
}
