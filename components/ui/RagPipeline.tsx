"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ragPipeline } from "@/data";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/**
 * Animated RAG pipeline diagram.
 *
 * A token of "data" advances through the stages on a timer, lighting each one
 * as it arrives. It is a diagram of the actual architecture - ingest, chunk,
 * store, retrieve, generate - not decoration, so a technical visitor reads
 * competence out of it in about three seconds.
 *
 * Stacks vertically below `md`, where five horizontal stages would be
 * unreadable.
 */
export const RagPipeline = () => {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % ragPipeline.length),
      1600,
    );
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800/60 p-5 backdrop-blur-xl sm:p-8">
      {/* Header row */}
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-pink/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-amber/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-teal/70" />
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-content-dim">
            retrieval_pipeline.py
          </span>
        </div>
        <span className="rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.08] px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-cyan">
          live trace
        </span>
      </div>

      {/* Stages */}
      <ol className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
        {ragPipeline.map((stage, i) => {
          const isActive = i === active;
          const isPast = i < active;

          return (
            <li
              key={stage.id}
              className="relative flex flex-1 items-center gap-3 md:flex-col md:items-stretch md:gap-0"
            >
              {/* Node */}
              <motion.div
                animate={{
                  scale: reduced ? 1 : isActive ? 1.02 : 1,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "relative z-10 flex-1 rounded-2xl border p-4 transition-colors duration-500 md:mx-1.5",
                  isActive
                    ? "border-accent-cyan/45 bg-accent-cyan/[0.07] shadow-glow-cyan"
                    : isPast
                      ? "border-accent/25 bg-accent/[0.04]"
                      : "border-white/[0.07] bg-white/[0.015]",
                )}
              >
                {/* Step index */}
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-mono text-[0.62rem] tracking-[0.14em] transition-colors duration-500",
                      isActive ? "text-accent-cyan" : "text-content-faint",
                    )}
                  >
                    0{i + 1}
                  </span>

                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                      isActive
                        ? "bg-accent-cyan"
                        : isPast
                          ? "bg-accent/60"
                          : "bg-white/15",
                    )}
                  />
                </div>

                <p
                  className={cn(
                    "mt-2.5 text-sm font-semibold transition-colors duration-500",
                    isActive ? "text-content" : "text-content-muted",
                  )}
                >
                  {stage.label}
                </p>

                <p className="mt-1.5 text-[0.72rem] leading-snug text-content-dim">
                  {stage.detail}
                </p>

                <p
                  className={cn(
                    "mt-3 font-mono text-[0.6rem] uppercase tracking-[0.12em] transition-colors duration-500",
                    isActive ? "text-accent-cyan/90" : "text-content-faint",
                  )}
                >
                  {stage.tech}
                </p>
              </motion.div>

              {/* Connector to the next stage. Horizontal on md+, vertical
                  below it, and only rendered between stages. */}
              {i < ragPipeline.length - 1 && (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute left-[1.15rem] top-full h-3 w-px md:hidden"
                    style={{
                      background: isPast
                        ? "rgba(167,139,250,0.5)"
                        : "rgba(255,255,255,0.1)",
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-3 -translate-y-1/2 md:block"
                    style={{
                      background: isPast
                        ? "rgba(167,139,250,0.55)"
                        : "rgba(255,255,255,0.09)",
                    }}
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>

      {/* Output line */}
      <div className="mt-7 flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-ink-900/70 p-4">
        <span className="mt-0.5 font-mono text-xs text-accent-teal">›</span>
        <p className="font-mono text-[0.72rem] leading-relaxed text-content-muted">
          <span className="text-accent-soft">answer</span>
          <span className="text-content-faint">{" = "}</span>
          <span className="text-accent-cyan">chain</span>
          <span className="text-content-faint">.invoke</span>
          <span className="text-content-faint">{"({ "}</span>
          <span className="text-accent-amber">&quot;query&quot;</span>
          <span className="text-content-faint">{", "}</span>
          <span className="text-accent-amber">&quot;context&quot;</span>
          <span className="text-content-faint">{" })"}</span>
          {!reduced && (
            <span className="ml-1 inline-block h-3.5 w-[7px] translate-y-[2px] animate-blink bg-accent-teal/80" />
          )}
        </p>
      </div>
    </div>
  );
};
