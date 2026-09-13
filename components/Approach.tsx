"use client";

import React from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

import { journeyCards } from "@/data";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

// three.js + @react-three/fiber weigh several hundred KB and the canvas only
// renders while a card is hovered, so keep it out of the initial bundle.
const CanvasRevealEffect = dynamic(
  () => import("./ui/CanvasRevealEffect").then((m) => m.CanvasRevealEffect),
  { ssr: false },
);

const Approach = () => (
  <section id="beyond" className="relative scroll-mt-28 py-24 md:py-32">
    <SectionHeading
      eyebrow="Beyond the code"
      title="Background,"
      accent="recognition & focus"
      lede="The parts of the story that do not fit in a job title."
    />

    <div className="mt-16 grid gap-4 lg:grid-cols-3">
      {journeyCards.map((item, i) => (
        <Reveal key={item.id} direction="up" delay={i * 0.08}>
          <JourneyCard
            title={item.title}
            label={item.label}
            description={item.description}
          >
            <CanvasRevealEffect
              animationSpeed={item.animationSpeed}
              containerClassName={item.canvasClassName}
              colors={item.colors}
              dotSize={2}
            />
          </JourneyCard>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Approach;

/**
 * Collapsed state shows a label chip and the card title; hovering reveals the
 * full description over an animated dot-matrix canvas.
 *
 * Touch devices have no hover, so the body is always visible below `lg` - the
 * original template hid the entire description behind a hover that mobile
 * users could never trigger.
 */
const JourneyCard = ({
  title,
  label,
  description,
  children,
}: {
  title: string;
  label: string;
  description: string;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/journey relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800/60 p-7 backdrop-blur-xl transition-all duration-500 hover:border-accent/35 hover:shadow-glow"
    >
      {/* Canvas only mounts while hovered - it is a live WebGL context. */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 h-full w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Readability scrim over the canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-ink-950/55 opacity-0 transition-opacity duration-500 group-hover/journey:opacity-100"
      />

      <div className="relative z-10 flex h-full flex-col">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent-soft">
          {label}
        </span>

        <h3 className="mt-6 text-2xl font-bold text-content transition-transform duration-500 group-hover/journey:-translate-y-1">
          {title}
        </h3>

        <p className="mt-4 text-pretty text-sm leading-relaxed text-content-muted transition-transform duration-500 group-hover/journey:-translate-y-1">
          {description}
        </p>
      </div>
    </div>
  );
};
