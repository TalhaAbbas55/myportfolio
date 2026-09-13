"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  TbDatabaseSearch,
  TbTopologyStar3,
  TbSparkles,
  TbScan,
} from "react-icons/tb";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { SiUdemy } from "react-icons/si";

import { aiIntro, aiCapabilities, aiStack, certifications } from "@/data";
import { SectionHeading } from "./ui/SectionHeading";
import { RagPipeline } from "./ui/RagPipeline";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { TiltCard } from "./ui/TiltCard";
import { Marquee } from "./ui/Marquee";
import { cn } from "@/lib/utils";

const ICONS = {
  database: TbDatabaseSearch,
  workflow: TbTopologyStar3,
  sparkles: TbSparkles,
  scan: TbScan,
} as const;

/** Accent classes resolved statically - Tailwind cannot see interpolated
 *  class names, so these have to be full literals. */
const ACCENT = {
  cyan: {
    text: "text-accent-cyan",
    ring: "group-hover:border-accent-cyan/40",
    bg: "bg-accent-cyan/[0.08]",
    glow: "group-hover:shadow-glow-cyan",
  },
  violet: {
    text: "text-accent",
    ring: "group-hover:border-accent/40",
    bg: "bg-accent/[0.08]",
    glow: "group-hover:shadow-glow",
  },
  pink: {
    text: "text-accent-pink",
    ring: "group-hover:border-accent-pink/40",
    bg: "bg-accent-pink/[0.08]",
    glow: "group-hover:shadow-glow",
  },
  teal: {
    text: "text-accent-teal",
    ring: "group-hover:border-accent-teal/40",
    bg: "bg-accent-teal/[0.08]",
    glow: "group-hover:shadow-glow-cyan",
  },
} as const;

const AiLab = () => {
  const cert = certifications[0];

  return (
    <section id="ai" className="relative scroll-mt-28 py-24 md:py-32">
      {/* Section-local glow so the AI block reads as its own chapter */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[30rem] w-[min(95vw,60rem)] -translate-x-1/2 rounded-full bg-accent-cyan/[0.06] blur-[110px]"
      />

      <SectionHeading
        eyebrow={aiIntro.eyebrow}
        title="Building with LLMs,"
        accent="not just around them"
        lede={aiIntro.body}
      />

      {/* Pipeline diagram */}
      <Reveal direction="up" delay={0.1} className="mt-16">
        <RagPipeline />
      </Reveal>

      {/* Capability cards */}
      <RevealGroup className="mt-6 grid gap-4 md:grid-cols-2" stagger={0.09}>
        {aiCapabilities.map((cap) => {
          const Icon = ICONS[cap.icon as keyof typeof ICONS];
          const accent = ACCENT[cap.accent];

          return (
            <RevealItem key={cap.id}>
              <TiltCard max={5} className="h-full [perspective:1200px]">
                <div
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800/60 p-6 backdrop-blur-xl transition-all duration-500 sm:p-7",
                    accent.ring,
                    accent.glow,
                  )}
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08]",
                      accent.bg,
                    )}
                  >
                    <Icon className={cn("h-5 w-5", accent.text)} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-content">
                    {cap.title}
                  </h3>

                  <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-content-muted">
                    {cap.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {cap.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-content-dim"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {/* Certification + AI stack */}
      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        {/* Certificate */}
        <Reveal direction="right" className="min-w-0 lg:col-span-3">
          <a
            href={cert.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800/60 p-6 backdrop-blur-xl transition-all duration-500 hover:border-accent/40 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-7"
          >
            {/* Certificate sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(167,139,250,0.10)_50%,transparent_65%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />

            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-accent/[0.08]">
                  <SiUdemy className="h-5 w-5 text-accent" />
                </span>
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent-soft">
                    Certified · {cert.issuer}
                  </p>
                  <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-content-faint">
                    {cert.date} · {cert.length}
                  </p>
                </div>
              </div>

              <FaArrowUpRightFromSquare className="mt-1 h-3.5 w-3.5 shrink-0 text-content-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </div>

            <h3 className="relative mt-6 text-balance text-xl font-semibold leading-snug text-content sm:text-2xl">
              {cert.title}
            </h3>

            <p className="relative mt-2.5 text-sm text-content-muted">
              Instructor: {cert.instructor}
            </p>

            {/* The certificate itself. Proof beats a claim, and it is the only
                place on the page a visitor can see the credential first-hand. */}
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900">
              <Image
                src={cert.image}
                alt={`Udemy certificate of completion: ${cert.title}`}
                width={1400}
                height={1041}
                loading="lazy"
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            <ul className="relative mt-6 flex flex-wrap gap-2">
              {cert.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-lg border border-accent/20 bg-accent/[0.06] px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-accent-soft"
                >
                  {skill}
                </li>
              ))}
            </ul>

            <p className="relative mt-6 border-t border-white/[0.06] pt-4 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-content-faint">
              Credential {cert.credentialId}
            </p>
          </a>
        </Reveal>

        {/* AI stack column */}
        <Reveal direction="left" delay={0.1} className="min-w-0 lg:col-span-2">
          <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800/60 p-6 backdrop-blur-xl sm:p-7">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent-cyan">
              AI toolkit
            </p>

            <div className="mt-6 flex flex-1 flex-wrap content-start gap-2">
              {aiStack.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.035,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="cursor-default rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-xs text-content-muted transition-all duration-300 hover:border-accent-cyan/40 hover:bg-accent-cyan/[0.07] hover:text-content"
                >
                  {tool}
                </motion.span>
              ))}
            </div>

            <div className="mt-7 border-t border-white/[0.06] pt-5">
              <Marquee duration="26s" gap="0.5rem" fade={false}>
                <span className="whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-[0.16em] text-content-faint">
                  embeddings · retrieval · reranking · agents · tool calling ·
                  evals ·
                </span>
              </Marquee>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AiLab;
