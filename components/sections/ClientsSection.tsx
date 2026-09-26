'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import HardCutTransition, { cutChild, cutParent } from '@/components/motion/HardCutTransition';
import { CLIENTS } from '@/lib/site';

/**
 * Client marks come in whatever colour their brand book says — navy, red, and
 * one that has not arrived at all. They are knocked back to a single white on
 * this page so the row reads as one band instead of three loose stickers.
 */
export default function ClientsSection(): React.JSX.Element {
  return (
    <section className="clients" id="spoluprace">
      <HardCutTransition>
        <p className="section-label mono">Spolupráce s klienty</p>
      </HardCutTransition>

      <motion.ul
        className="clients__row"
        variants={cutParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {CLIENTS.map((client) => (
          <motion.li key={client.name} className="clients__item" variants={cutChild}>
            {client.logo ? (
              <Image
                className="clients__logo"
                src={client.logo}
                alt={client.name}
                width={320}
                height={120}
              />
            ) : (
              <span className="clients__wordmark">{client.name}</span>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
