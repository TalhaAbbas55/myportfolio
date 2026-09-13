import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Infinite horizontal ticker.
 *
 * Seamlessness depends on the translate distance matching exactly one copy of
 * the track plus its trailing gap. The track holds two identical copies with
 * `gap: var(--gap)` between and after them, so its width is `2w + 2g`; the
 * keyframe therefore translates by exactly -50% of that. Any padding on the
 * track would break that equality, so there is none - callers space items with
 * the `gap` prop instead of their own margins.
 */
export const Marquee = ({
  children,
  reverse = false,
  duration = "40s",
  gap = "1rem",
  className,
  fade = true,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: string;
  /** Space between items, and between the two copies of the track. */
  gap?: string;
  className?: string;
  fade?: boolean;
}) => (
  <div
    className={cn(
      "group relative flex w-full min-w-0 overflow-hidden",
      fade &&
        "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
      className,
    )}
    style={{
      ["--duration" as string]: duration,
      ["--gap" as string]: gap,
    }}
  >
    <div
      className={cn(
        "flex w-max shrink-0 items-center",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
        "group-hover:[animation-play-state:paused] motion-reduce:animate-none",
      )}
      // Trailing gap included, so the seam between the last item of one copy
      // and the first of the next matches every other gap.
      style={{ gap: "var(--gap)", paddingRight: "var(--gap)" }}
    >
      {children}
      <span aria-hidden="true" className="contents">
        {children}
      </span>
    </div>
  </div>
);
