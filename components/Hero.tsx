"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaArrowRight, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

import { personalInfo, heroStats, marqueeStack } from "@/data";
import { GradientButton } from "./ui/GradientButton";
import { RotatingRoles } from "./ui/RotatingRoles";
import { Marquee } from "./ui/Marquee";
import { Magnetic } from "./ui/Magnetic";

// three.js is ~600 KB. It has no business in the initial bundle for a hero
// whose text must paint immediately, so the canvas streams in after mount.
const NeuralCore = dynamic(
  () => import("./ui/NeuralCore").then((m) => m.NeuralCore),
  { ssr: false },
);

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Parallax: the copy drifts up and fades slightly faster than the page
  // scrolls, so the hero dissolves into the next section instead of just
  // sliding away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const coreScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center pb-16 pt-32 md:pt-36"
    >
      {/* 3D core. Sits behind the copy on small screens and beside it on
          large ones, where there is room for both to breathe. */}
      <motion.div
        style={{ scale: coreScale }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center lg:left-auto lg:right-0 lg:w-1/2 lg:justify-center"
      >
        <NeuralCore className="h-[min(92vw,42rem)] w-[min(92vw,42rem)] opacity-[0.55] lg:h-[min(40rem,46vw)] lg:w-[min(40rem,46vw)] lg:opacity-100" />
      </motion.div>

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative z-10 w-full"
      >
        <div className="max-w-2xl">
          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-4 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent-teal" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-teal" />
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-content-muted">
              {personalInfo.availability}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[clamp(2.6rem,8vw,5.25rem)] font-bold leading-[0.95] tracking-[-0.03em] text-content"
          >
            {personalInfo.name}
          </motion.h1>

          {/* Rotating role */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-[clamp(1.15rem,3.4vw,2rem)] font-semibold leading-tight tracking-tight"
          >
            <RotatingRoles roles={personalInfo.roles} />
          </motion.p>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-content-muted sm:text-base"
          >
            {personalInfo.shortSummary}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <GradientButton href="#projects" icon={<FaArrowRight className="h-3.5 w-3.5" />}>
              View my work
            </GradientButton>

            <GradientButton
              href={personalInfo.resume}
              variant="ghost"
              external
              icon={<HiOutlineDocumentArrowDown className="h-4 w-4" />}
            >
              Résumé
            </GradientButton>

            <div className="flex items-center gap-2">
              {[
                { href: personalInfo.github, label: "GitHub", Icon: FaGithub },
                { href: personalInfo.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
              ].map(({ href, label, Icon }) => (
                <Magnetic key={label} strength={0.3}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-content-muted backdrop-blur-md transition-all duration-300 hover:border-accent/45 hover:bg-accent/[0.08] hover:text-content focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Icon className="h-[1.05rem] w-[1.05rem]" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.dl
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-white/[0.07] pt-7 sm:grid-cols-4 sm:gap-x-4"
          >
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="whitespace-nowrap bg-grad-brand bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                  {stat.value}
                </dd>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-content-dim">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* Tech ticker pinned to the bottom of the viewport-height hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 mt-16 w-full"
      >
        <Marquee duration="55s" gap="0.75rem">
          {marqueeStack.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-3 whitespace-nowrap font-mono text-xs uppercase tracking-[0.16em] text-content-dim"
            >
              {tech}
              <span className="h-1 w-1 rounded-full bg-accent/40" />
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
};

export default Hero;
