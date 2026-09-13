"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef, type ReactNode } from "react";

/**
 * Pulls its child toward the pointer while hovered. Used on the primary CTAs
 * and social icons - the small tactile detail that separates a portfolio that
 * feels built from one that feels assembled.
 *
 * Disabled entirely under prefers-reduced-motion and on coarse pointers (where
 * there is no hover to respond to anyway).
 */
export const Magnetic = ({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    // Coarse pointers fire synthetic mouse events on tap; ignore them so the
    // element does not jump under a finger.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};
