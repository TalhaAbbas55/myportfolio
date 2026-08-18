"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { IoClose, IoMenu } from "react-icons/io5";
import { cn } from "@/lib/utils";

// Below this scroll offset the bar is parked in the hero's empty top area and
// covers nothing, so it stays put.
const TOP_THRESHOLD = 80;

// The hero headline passes behind the bar roughly between 140px and 540px of
// scroll. Scrolling up only re-reveals the bar once we are clear of that band,
// so it never reappears on top of the headline. Inside the band the user is on
// their way to the top, where the bar shows again anyway.
const HERO_CLEARANCE = 600;

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  // scrollY (pixels), not scrollYProgress (a 0-1 fraction of the page). The old
  // "stay visible below 5%" rule scaled with page length: on this ~8200px page
  // 5% is ~410px of scrolling, during which the bar sat pinned on top of the
  // hero headline as it scrolled up underneath. A pixel threshold is stable
  // regardless of how long the page gets.
  const { scrollY } = useScroll();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current !== "number") return;

    const previous = scrollY.getPrevious() ?? 0;

    // At the very top the bar sits in the hero's empty space, so keep it.
    if (current < TOP_THRESHOLD) {
      setVisible(true);
      return;
    }

    if (current > previous) {
      // Scrolling down: get out of the way of the content.
      setVisible(false);
      // Don't leave an open menu attached to a bar that just slid away.
      setOpen(false);
      return;
    }

    // Scrolling up: reveal, but not while still inside the hero headline's band.
    if (current > HERO_CLEARANCE) {
      setVisible(true);
    } else {
      setVisible(false);
      setOpen(false);
    }
  });

  // Escape to close, and close on a click outside the bar.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={containerRef}
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          // Mobile keeps a compact bar (just the hamburger); md+ is the original
          // full-width pill with every link laid out inline.
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-6 md:top-10 inset-x-0 mx-auto px-4 py-3 md:px-10 md:py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center",
          className,
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        {/* Desktop: the links inline, as before */}
        <nav
          aria-label="Main"
          className="hidden md:flex items-center justify-center space-x-4"
        >
          {navItems.map((navItem, idx) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 transition-colors"
            >
              <span className="text-sm !cursor-pointer">{navItem.name}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile: a real hamburger toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden flex items-center gap-2 text-neutral-50 px-1 py-0.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-purple"
        >
          <span className="text-sm font-medium tracking-wide">Menu</span>
          {open ? (
            <IoClose className="h-5 w-5" aria-hidden="true" />
          ) : (
            <IoMenu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-nav-panel"
              aria-label="Main"
              // x is animated rather than applied via a `-translate-x-1/2`
              // class because framer-motion writes an inline transform, which
              // would override the class and knock the panel off-centre.
              initial={{ opacity: 0, y: -8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -8, x: "-50%" }}
              transition={{ duration: 0.18 }}
              // Sits just under the bar rather than inside it, so the bar keeps
              // its compact pill shape, and carries its own width so the longer
              // labels are not squeezed by the narrow trigger.
              className="md:hidden absolute top-full left-1/2 mt-2 w-56 max-w-[calc(100vw-2.5rem)] flex flex-col overflow-hidden rounded-xl border border-white/[0.125] p-2"
              style={{
                backdropFilter: "blur(16px) saturate(180%)",
                // Near-opaque on purpose: at 0.92 the hero headline read
                // through the panel and made the links hard to scan.
                backgroundColor: "rgba(9, 13, 33, 0.985)",
              }}
            >
              {navItems.map((navItem, idx) => (
                <Link
                  key={`mobile-link=${idx}`}
                  href={navItem.link}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-neutral-50 hover:bg-white/10 active:bg-white/[0.15] transition-colors"
                >
                  {navItem.name}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
