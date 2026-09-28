'use client';

import { motion } from 'framer-motion';
import HardCutTransition, { cutChild, cutParent } from '@/components/motion/HardCutTransition';
import { REVIEWS } from '@/lib/site';

/** Empty frames hold the section's shape until the first reviews arrive. */
const PLACEHOLDERS = 3;

export default function ReviewsSection(): React.JSX.Element {
  return (
    <section className="reviews" id="recenze">
      <HardCutTransition>
        <h2 className="section-title">
          Recenze <em>klientů</em>
        </h2>
      </HardCutTransition>

      <motion.ul
        className="reviews__list"
        variants={cutParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {REVIEWS.length > 0
          ? REVIEWS.map((review) => (
              <motion.li key={review.author} className="review" variants={cutChild}>
                <blockquote className="review__quote">{review.quote}</blockquote>
                <footer className="review__by">
                  <span className="review__author">{review.author}</span>
                  <span className="review__role mono">{review.role}</span>
                </footer>
              </motion.li>
            ))
          : Array.from({ length: PLACEHOLDERS }, (_, index) => (
              <motion.li
                key={index}
                className="review review--empty"
                variants={cutChild}
                aria-hidden="true"
              >
                <span className="review__line" />
                <span className="review__line" />
                <span className="review__line review__line--short" />
                <span className="review__line review__line--name" />
              </motion.li>
            ))}
      </motion.ul>
    </section>
  );
}
