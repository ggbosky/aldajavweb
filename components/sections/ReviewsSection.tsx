'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import HardCutTransition, { cutChild, cutParent } from '@/components/motion/HardCutTransition';
import { REVIEWS, REVIEW_SLOTS } from '@/lib/site';

/**
 * Cards in a row: the client's photo sits centred on the top edge, the review
 * in grey italics under it, then "Name | role" in bold cyan. Slots the reviews
 * do not fill yet keep the same shape in grey placeholder bars.
 */
export default function ReviewsSection(): React.JSX.Element {
  const empty = Math.max(0, REVIEW_SLOTS - REVIEWS.length);

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
        {REVIEWS.map((review) => (
          <motion.li key={review.author} className="review" variants={cutChild}>
            <span className="review__photo">
              {review.photo && (
                <Image src={review.photo} alt={review.author} width={160} height={160} />
              )}
            </span>
            <blockquote className="review__quote">{review.quote}</blockquote>
            <p className="review__by">
              {review.author}
              <span className="review__sep" aria-hidden="true">
                |
              </span>
              {review.role}
            </p>
          </motion.li>
        ))}

        {Array.from({ length: empty }, (_, index) => (
          <motion.li
            key={`empty-${index}`}
            className="review review--empty"
            variants={cutChild}
            aria-hidden="true"
          >
            <span className="review__photo" />
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
