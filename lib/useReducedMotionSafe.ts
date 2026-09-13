"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * `useReducedMotion` reports `false` during server rendering and only learns
 * the real preference on the client. Branching on it directly therefore makes
 * the server and the first client render disagree - different inline styles,
 * or a different element tree entirely - which React reports as a hydration
 * failure and recovers from by throwing away the server HTML.
 *
 * This variant always returns `false` for the first client render (matching the
 * server exactly) and flips to the true preference immediately after mount. The
 * reduced-motion user sees at most one frame of the animated variant, and
 * hydration stays clean.
 */
export const useReducedMotionSafe = () => {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && Boolean(prefersReduced);
};
