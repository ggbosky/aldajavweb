'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import HardCutTransition, { cutChild, cutParent } from '@/components/motion/HardCutTransition';
import { REVIEWS } from '@/lib/site';

/**
 * Cards in a row: the client's photo sits centred on the top edge, the review
 * in grey italics under it, then the name in bold cyan over a thin white
 * rule (like the stats strip) and the role in the quote's style. Only reviews
 * that exist are shown; the row stays centred however many there are.
 */
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
        {REVIEWS.map((review) => (
          <motion.li key={review.author} className="review" variants={cutChild}>
            <span className="review__photo">
              {review.photo && (
                <Image src={review.photo} alt={review.author} width={160} height={160} />
              )}
            </span>
            <blockquote className="review__quote">{review.quote}</blockquote>
            <p className="review__by">
              <span className="review__author">{review.author}</span>
              <span className="review__role">{review.role}</span>
            </p>
          </motion.li>
        ))}

      </motion.ul>
    </section>
  );
}
