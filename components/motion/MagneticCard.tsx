'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionStyle } from 'framer-motion';
import { cutChild } from '@/components/motion/HardCutTransition';
import type { ReactNode } from 'react';

export type MagneticCardProps = {
  children: ReactNode;
  className?: string;
  /** How far the card leans toward the cursor, in pixels. */
  strength?: number;
};

/**
 * A card that leans toward the cursor and lights a radial highlight under it —
 * the "equipment spec" hover state used across the Arsenal grid.
 */
export default function MagneticCard({
  children,
  className,
  strength = 10,
}: MagneticCardProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const relX = useMotionValue(0.5);
  const relY = useMotionValue(0.5);

  const springX = useSpring(relX, { stiffness: 260, damping: 26, mass: 0.4 });
  const springY = useSpring(relY, { stiffness: 260, damping: 26, mass: 0.4 });

  const translateX = useTransform(springX, [0, 1], [-strength, strength]);
  const translateY = useTransform(springY, [0, 1], [-strength * 0.6, strength * 0.6]);
  const rotateX = useTransform(springY, [0, 1], [4, -4]);
  const rotateY = useTransform(springX, [0, 1], [-5, 5]);
  const glowX = useTransform(springX, (v) => `${v * 100}%`);
  const glowY = useTransform(springY, (v) => `${v * 100}%`);

  const style = {
    x: translateX,
    y: translateY,
    rotateX,
    rotateY,
    '--glow-x': glowX,
    '--glow-y': glowY,
  } as MotionStyle;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={cutChild}
      style={style}
      onPointerMove={(event) => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        relX.set((event.clientX - rect.left) / rect.width);
        relY.set((event.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        relX.set(0.5);
        relY.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}
