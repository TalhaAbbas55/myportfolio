"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/**
 * 3D tilt + a spotlight that follows the pointer across the card face.
 *
 * The spotlight is driven by CSS custom properties rather than React state so
 * pointer movement never triggers a re-render.
 */
export const TiltCard = ({
  children,
  className,
  innerClassName,
  max = 8,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  max?: number;
  glare?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springCfg = { stiffness: 200, damping: 20, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(py, [0, 1], [max, -max]),
    springCfg,
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-max, max]),
    springCfg,
  );

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    px.set(nx);
    py.set(ny);

    ref.current?.style.setProperty("--mx", `${nx * 100}%`);
    ref.current?.style.setProperty("--my", `${ny * 100}%`);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={reduced ? undefined : onMove}
      onMouseLeave={reduced ? undefined : onLeave}
      style={
        reduced
          ? undefined
          : { rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }
      }
      className={cn("group/tilt relative", className)}
    >
      <div className={cn("relative h-full w-full", innerClassName)}>
        {children}

        {glare && !reduced && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
            style={{
              background:
                "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(167,139,250,0.14), transparent 65%)",
            }}
          />
        )}
      </div>
    </motion.div>
  );
};
