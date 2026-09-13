"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { IoClose, IoMenu } from "react-icons/io5";
import { cn } from "@/lib/utils";

/** Below this offset the bar sits in the hero's empty top area, so it stays. */
const TOP_THRESHOLD = 80;

export const FloatingNav = ({
  navItems,
  onOpenPalette,
  className,
}: {
  navItems: { name: string; link: string }[];
  onOpenPalette?: () => void;
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [isMac, setIsMac] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* --- show/hide on scroll direction --- */
  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current !== "number") return;
    const previous = scrollY.getPrevious() ?? 0;

    if (current < TOP_THRESHOLD) {
      setVisible(true);
      return;
    }

    // Scrolling down gets out of the way; scrolling up brings it back.
    const scrollingDown = current > previous;
    setVisible(!scrollingDown);
    if (scrollingDown) setOpen(false);
  });

  /* --- scroll spy ---
     Watches every section the nav links to and marks whichever one occupies
     the reading band (top third of the viewport) as active. */
  useEffect(() => {
    const ids = navItems.map((item) => item.link.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const onScreen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (onScreen[0]) setActive(`#${onScreen[0].target.id}`);
      },
      // A band rather than a line: -45% bottom means a section counts as
      // "current" while its top half is in the upper part of the viewport.
      { rootMargin: "-20% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [navItems]);

  /* --- dismissal + platform detection --- */
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

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
    <motion.div
      ref={containerRef}
      initial={{ opacity: 1, y: -100 }}
      animate={{ y: visible ? 0 : -110, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-5 z-[5000] mx-auto flex max-w-fit items-center gap-2 rounded-2xl border border-white/[0.09] px-2 py-2 md:top-7 md:px-2.5",
        "shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)]",
        className,
      )}
      style={{
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        backgroundColor: "rgba(8, 11, 24, 0.72)",
      }}
    >
      {/* Desktop links */}
      <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
        {navItems.map((navItem) => {
          const isActive = active === navItem.link;

          return (
            <Link
              key={navItem.link}
              href={navItem.link}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative rounded-xl px-3.5 py-2 text-sm transition-colors duration-300",
                isActive
                  ? "text-content"
                  : "text-content-dim hover:text-content-muted",
              )}
            >
              {/* Shared layout pill slides between items. */}
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 -z-10 rounded-xl border border-accent/25 bg-accent/[0.10]"
                />
              )}
              <span className="relative">{navItem.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Command palette trigger */}
      {onOpenPalette && (
        <button
          type="button"
          onClick={onOpenPalette}
          aria-label="Open command palette"
          className="hidden items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.03] px-2.5 py-2 text-content-dim transition-colors duration-300 hover:border-accent/35 hover:text-content focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:flex"
        >
          <span className="font-mono text-[0.65rem] tracking-wide">
            {isMac ? "⌘" : "Ctrl"} K
          </span>
        </button>
      )}

      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-content transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
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
            initial={{ opacity: 0, y: -8, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -8, x: "-50%" }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-full mt-2 flex w-60 max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-white/[0.09] p-2 md:hidden"
            style={{
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              backgroundColor: "rgba(6, 9, 20, 0.97)",
            }}
          >
            {navItems.map((navItem) => (
              <Link
                key={navItem.link}
                href={navItem.link}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm transition-colors",
                  active === navItem.link
                    ? "bg-accent/[0.10] text-content"
                    : "text-content-muted hover:bg-white/[0.06] hover:text-content",
                )}
              >
                {navItem.name}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
