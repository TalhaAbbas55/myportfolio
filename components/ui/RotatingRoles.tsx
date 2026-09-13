"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/**
 * Cycles the role line under the name. Reduced-motion users get the first
 * role, held - not a silently blank line.
 */
export const RotatingRoles = ({
  roles,
  interval = 2600,
}: {
  roles: string[];
  interval?: number;
}) => {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, interval);
    return () => clearInterval(id);
  }, [roles.length, interval, reduced]);

  if (reduced) {
    return (
      <span className="bg-grad-brand bg-clip-text text-transparent">
        {roles[0]}
      </span>
    );
  }

  return (
    /* Fixed height + overflow hidden so the swap never reflows the line below.
       The widest role reserves the width, so the line does not jitter either. */
    <span className="relative inline-flex h-[1.25em] items-start overflow-hidden align-bottom">
      {/* Invisible sizer: holds the box at the width of the longest role. */}
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {roles.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>

      {/* No `mode="wait"`: the outgoing and incoming roles overlap, so the
          line is never empty mid-swap. Each is absolutely positioned so they
          can occupy the same space during the crossfade. */}
      <AnimatePresence initial={false}>
        <motion.span
          key={roles[index]}
          initial={{ y: "90%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-90%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0 whitespace-nowrap bg-grad-brand bg-clip-text text-transparent"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
