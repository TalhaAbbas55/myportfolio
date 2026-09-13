"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Dot-and-ring cursor. The dot tracks the pointer exactly; the ring lags
 * behind on a spring and swells over interactive elements.
 *
 * Mounts only on fine pointers that are not asking for reduced motion, and the
 * native cursor is never hidden - a custom cursor that disappears on a dropped
 * frame is worse than no custom cursor at all, so this is layered on top.
 */
export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      // Swell over anything the user can actually act on.
      const el = e.target as HTMLElement | null;
      setActive(
        Boolean(
          el?.closest(
            'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]',
          ),
        ),
      );
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[7000] hidden overflow-hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms" }}
    >
      <motion.div
        style={{ x, y }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-200"
          style={{ transform: active ? "scale(0)" : "scale(1)" }}
        />
      </motion.div>

      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="rounded-full border border-accent/60 transition-all duration-200 ease-out"
          style={{
            width: active ? 42 : 26,
            height: active ? 42 : 26,
            backgroundColor: active ? "rgba(167,139,250,0.12)" : "transparent",
            borderColor: active
              ? "rgba(167,139,250,0.85)"
              : "rgba(167,139,250,0.45)",
          }}
        />
      </motion.div>
    </div>
  );
};
