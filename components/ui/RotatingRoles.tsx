"use client";

import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/**
 * Cycles the role line under the name.
 *
 * All roles sit in one vertical column inside a one-line window, and the column
 * slides up by one line per step. Only a single role is ever in view, so roles
 * cannot overlap. (The previous crossfade stacked outgoing and incoming roles in
 * the same spot; in a background tab the timer kept firing while animations were
 * paused, and several roles piled up on top of each other.)
 *
 * The first role is repeated at the end of the column. When the slide reaches
 * that copy, the column snaps back to the top with transitions off, so the loop
 * always moves upward.
 */
export const RotatingRoles = ({
  roles,
  interval = 2600,
}: {
  roles: string[];
  interval?: number;
}) => {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      // Skip ticks while the tab is hidden, so nothing queues up.
      if (document.hidden) return;
      setAnimate(true);
      setIndex((i) => (i >= roles.length ? 1 : i + 1));
    }, interval);
    return () => clearInterval(id);
  }, [roles.length, interval, reduced]);

  // Landed on the trailing copy of the first role: jump to the real one.
  useEffect(() => {
    if (index !== roles.length) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, 550);
    return () => clearTimeout(t);
  }, [index, roles.length]);

  const longest = roles.reduce((a, b) => (b.length > a.length ? b : a), "");
  const column = [...roles, roles[0]];

  return (
    <span className="relative inline-block h-[1.25em] overflow-hidden align-bottom leading-[1.25em]">
      {/* Invisible sizer keeps the window as wide as the longest role. */}
      <span aria-hidden="true" className="invisible block whitespace-nowrap">
        {longest}
      </span>

      <span
        aria-hidden="true"
        className="absolute left-0 top-0 flex flex-col"
        style={{
          transform: `translateY(-${(reduced ? 0 : index) * 1.25}em)`,
          transition: animate
            ? "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)"
            : "none",
        }}
      >
        {column.map((role, i) => (
          <span
            key={i}
            className="block h-[1.25em] whitespace-nowrap bg-grad-brand bg-clip-text text-transparent"
          >
            {role}
          </span>
        ))}
      </span>

      {/* Screen readers get one stable label instead of a changing column. */}
      <span className="sr-only">{roles.join(", ")}</span>
    </span>
  );
};
