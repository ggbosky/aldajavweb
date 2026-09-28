'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import HardCutTransition, { cutChild, cutParent } from '@/components/motion/HardCutTransition';
import { ABOUT, EXPERTISE, type ExpertiseIcon } from '@/lib/site';

/** Line-art marks, drawn inline so they inherit the accent and need no asset. */
function Icon({ name }: { name: ExpertiseIcon }): React.JSX.Element {
  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (name === 'reels') {
    return (
      <svg {...common}>
        <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
        <path d="M10 9.5l5 2.5-5 2.5z" />
      </svg>
    );
  }
  if (name === 'youtube') {
    return (
      <svg {...common}>
        <rect x="2" y="5" width="20" height="14" rx="3.5" />
        <path d="M10.5 9.2l4.5 2.8-4.5 2.8z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <path d="M12 17.5V21" />
    </svg>
  );
}

export default function AboutSection(): React.JSX.Element {
  return (
    <section className="about" id="o-mne">
      <div className="about__split">
        <div className="about__copy">
          <HardCutTransition>
            <h2 className="section-title">
              Za střihem je <em>Aleš</em>
            </h2>
          </HardCutTransition>
          <HardCutTransition delay={0.08}>
            <p className="about__text">{ABOUT.body}</p>
          </HardCutTransition>
        </div>

        {/* The first hero's panel: straight edges, bleeding off the right side,
            its left edge dissolving into black under the text. */}
        <HardCutTransition delay={0.12} className="about__figure">
          <div className="about__portrait">
            <Image src={ABOUT.portrait} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </HardCutTransition>
      </div>

      <motion.ul
        className="expertise"
        variants={cutParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {EXPERTISE.map((item) => (
          <motion.li key={item.label} className="expertise__item" variants={cutChild}>
            <span className="expertise__icon">
              <Icon name={item.icon} />
            </span>
            <h3 className="expertise__label">{item.label}</h3>
            <p className="expertise__note">{item.note}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
