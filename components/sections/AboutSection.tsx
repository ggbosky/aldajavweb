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
            <p className="section-label mono">{ABOUT.heading}</p>
          </HardCutTransition>
          <HardCutTransition delay={0.06}>
            <p className="about__text">{ABOUT.body}</p>
          </HardCutTransition>
        </div>

        <HardCutTransition delay={0.12} className="about__figure">
          {/* The same shadow falloff as the old hero: the frame dissolves into the page. */}
          <div className="about__portrait">
            <Image
              src={ABOUT.portrait}
              alt=""
              width={747}
              height={1024}
              sizes="(max-width: 900px) 90vw, 40vw"
            />
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
