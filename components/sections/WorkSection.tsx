'use client';

import { useEffect, useRef, useState } from 'react';
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

/** The playlist ffmpeg wrote for this video: `public/video/<slug>/index.m3u8`. */
const streamFor = (slug: string): string => `/video/${slug}/index.m3u8`;

/**
 * Plays an HLS stream in a plain <video>. Safari (and every iPhone) plays HLS
 * natively; everywhere else hls.js is loaded on first play, so it costs
 * nothing for someone who never presses play.
 */
function Player({ video }: { video: WorkVideo }): React.JSX.Element {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const src = streamFor(video.slug);
    let destroy: (() => void) | undefined;
    let cancelled = false;

    // Only one video plays at a time: starting this one pauses the rest.
    const pauseOthers = (): void => {
      document.querySelectorAll<HTMLVideoElement>('video.reel__player').forEach((other) => {
        if (other !== element) other.pause();
      });
    };
    element.addEventListener('play', pauseOthers);

    // Native HLS only for a real .m3u8: a host that serves the playlist under
    // another name (and so another MIME type) goes through hls.js instead.
    if (src.endsWith('.m3u8') && element.canPlayType('application/vnd.apple.mpegurl')) {
      element.src = src;
      void element.play().catch(() => undefined);
    } else {
      void import('hls.js').then(({ default: Hls }) => {
        if (cancelled) return;
        if (!Hls.isSupported()) {
          element.src = src;
          return;
        }
        const hls = new Hls({ capLevelToPlayerSize: true });
        hls.loadSource(src);
        hls.attachMedia(element);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          void element.play().catch(() => undefined);
        });
        destroy = () => hls.destroy();
      });
    }

    return () => {
      cancelled = true;
      element.removeEventListener('play', pauseOthers);
      destroy?.();
    };
  }, [video.slug]);

  return (
    <div className="reel__frame">
      <video
        ref={ref}
        className="reel__player"
        poster={video.thumb}
        controls
        playsInline
        preload="none"
        aria-label={video.title}
      />
    </div>
  );
}

/**
 * The thumbnail with a play mark; a click swaps it for the player in place,
 * so the stream only starts loading once someone asks for it.
 */
function VideoFrame({ video }: { video: WorkVideo }): React.JSX.Element {
  const [playing, setPlaying] = useState(false);

  if (playing) return <Player video={video} />;

  return (
    <button
      type="button"
      className="reel__frame reel__link"
      onClick={() => setPlaying(true)}
      aria-label={`Přehrát: ${video.title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="reel__thumb" src={video.thumb} alt="" loading="lazy" />
      <span className="reel__play" aria-hidden="true">
        <PlayIcon size={22} />
      </span>
    </button>
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
                  <motion.li key={video.slug} variants={cutChild}>
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
