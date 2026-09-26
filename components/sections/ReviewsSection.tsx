'use client';

import { motion } from 'framer-motion';
import HardCutTransition, { cutChild, cutParent } from '@/components/motion/HardCutTransition';
import { REVIEWS } from '@/lib/site';

export default function ReviewsSection(): React.JSX.Element {
  return (
    <section className="reviews" id="recenze">
      <div className="reviews__head">
        <HardCutTransition>
          <p className="section-label mono">Recenze</p>
        </HardCutTransition>
        <HardCutTransition delay={0.06}>
          <h2 className="section-title">
            Co na to <em>klienti</em>.
          </h2>
        </HardCutTransition>
      </div>

      {REVIEWS.length > 0 ? (
        <motion.ul
          className="reviews__list"
          variants={cutParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {REVIEWS.map((review) => (
            <motion.li key={review.author} className="review" variants={cutChild}>
              <blockquote className="review__quote">{review.quote}</blockquote>
              <footer className="review__by">
                <span className="review__author">{review.author}</span>
                <span className="review__role mono">{review.role}</span>
              </footer>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="reviews__empty mono">Recenze připravujeme.</p>
      )}
    </section>
  );
}
