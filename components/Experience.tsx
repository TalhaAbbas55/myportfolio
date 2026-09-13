"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";

import { workExperience, education, achievements } from "@/data";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Vertical timeline whose spine fills as you scroll through it.
 *
 * The old version was four identical animated-border cards in a grid, which
 * gave no sense of progression. A timeline reads as a career.
 */
const Experience = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    // Starts filling when the list reaches the lower third of the viewport and
    // completes as its end clears the middle - so the line tracks reading
    // position rather than raw page offset.
    offset: ["start 65%", "end 55%"],
  });

  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });
  const fillScale = useTransform(fill, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative scroll-mt-28 py-24 md:py-32">
      <SectionHeading
        eyebrow="Career"
        title="Five years of"
        accent="shipping"
        lede="Promoted from Software Engineer to Senior after leading 15+ end-to-end builds for international clients — from database schema through deployed UI."
      />

      <div ref={trackRef} className="relative mt-16">
        {/* Spine. Hidden below sm, where the indent would eat too much width. */}
        <div
          aria-hidden="true"
          className="absolute left-[0.4375rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-white/[0.07] sm:block md:left-[7.5rem]"
        >
          <motion.div
            style={{ scaleY: fillScale }}
            className="h-full w-full origin-top bg-gradient-to-b from-accent-cyan via-accent to-accent-pink"
          />
        </div>

        <ol className="space-y-4">
          {workExperience.map((job, i) => (
            <li key={job.id}>
              <Reveal direction="up" delay={i * 0.06} amount={0.15}>
                <article className="group relative sm:pl-10 md:pl-[9.5rem]">
                  {/* Date rail (desktop) */}
                  <div className="absolute left-0 top-6 hidden w-[6.5rem] text-right md:block">
                    <p className="font-mono text-[0.68rem] uppercase leading-tight tracking-[0.1em] text-content-dim">
                      {job.period}
                    </p>
                  </div>

                  {/* Node */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 top-[1.85rem] hidden h-3.5 w-3.5 items-center justify-center rounded-full border-2 transition-colors duration-500 sm:flex md:left-[7.0625rem]",
                      job.current
                        ? "border-accent-cyan bg-ink-950"
                        : "border-white/20 bg-ink-950 group-hover:border-accent",
                    )}
                  >
                    {job.current && (
                      <>
                        <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-accent-cyan/60" />
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                      </>
                    )}
                  </span>

                  {/* Card */}
                  <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800/50 p-6 backdrop-blur-xl transition-all duration-500 hover:border-accent/30 hover:bg-ink-800/80 sm:p-7">
                    {/* Left edge accent that grows on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-grad-brand transition-transform duration-500 group-hover:scale-y-100"
                    />

                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                      <div>
                        <h3 className="text-lg font-semibold text-content sm:text-xl">
                          {job.title}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-accent-soft">
                          {job.company}
                        </p>
                      </div>

                      {job.current && (
                        <span className="rounded-full border border-accent-teal/30 bg-accent-teal/[0.08] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent-teal">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-content-dim">
                      {/* Period repeats here for the mobile layout, where the
                          date rail is not rendered. */}
                      <span className="md:hidden">{job.period}</span>
                      <span className="flex items-center gap-1.5">
                        <FaLocationDot className="h-2.5 w-2.5" />
                        {job.location}
                      </span>
                    </div>

                    <ul className="mt-5 space-y-2.5">
                      {job.points.map((point, pi) => (
                        <li
                          key={pi}
                          className="flex gap-3 text-pretty text-sm leading-relaxed text-content-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/60"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {job.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.06em] text-content-dim"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* Education + achievements */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Reveal direction="up">
          <div className="flex h-full flex-col rounded-3xl border border-white/[0.08] bg-ink-800/50 p-6 backdrop-blur-xl sm:p-7">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent-soft">
              Education
            </p>
            <h3 className="mt-4 text-base font-semibold leading-snug text-content">
              {education.degree}
            </h3>
            <p className="mt-2 text-sm text-content-muted">
              {education.institution}
            </p>
            <p className="mt-3 text-sm text-content-dim">{education.note}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <li
                  key={course}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-content-dim"
                >
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {achievements.map((item, i) => (
          <Reveal key={item.id} direction="up" delay={0.08 * (i + 1)}>
            <div className="group flex h-full flex-col rounded-3xl border border-white/[0.08] bg-ink-800/50 p-6 backdrop-blur-xl transition-colors duration-500 hover:border-accent-amber/30 sm:p-7">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent-amber">
                Achievement
              </p>
              <p className="mt-4 whitespace-nowrap bg-grad-brand bg-clip-text text-3xl font-bold text-transparent">
                {item.stat}
              </p>
              <h3 className="mt-2 text-base font-semibold text-content">
                {item.title}
              </h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-content-muted">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Experience;
