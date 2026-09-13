"use client";

import Image from "next/image";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { TbSparkles } from "react-icons/tb";

import { projects } from "@/data";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { TiltCard } from "./ui/TiltCard";
import { cn } from "@/lib/utils";

/** Intrinsic size of each screenshot, so none of them get distorted. */
const SHOT_SIZE: Record<string, { width: number; height: number }> = {
  "/apps/OpenDrawing.webp": { width: 900, height: 455 },
  "/apps/OurOffice.webp": { width: 900, height: 455 },
  "/apps/aabBooks.webp": { width: 900, height: 455 },
  "/apps/curlCompass.webp": { width: 900, height: 419 },
  "/apps/customWebsitesClub.webp": { width: 900, height: 455 },
  "/apps/neverLeft.webp": { width: 900, height: 444 },
};

type Project = (typeof projects)[number];

/**
 * `wide` is the full-bleed hero card: at lg+ it splits into image | copy so a
 * 1400px-wide screenshot does not eat 800px of vertical space. `featured` and
 * `compact` stack the image above the copy, differing only in image ratio.
 */
type Variant = "wide" | "featured" | "compact";

const ProjectCard = ({
  project,
  variant,
}: {
  project: Project;
  variant: Variant;
}) => {
  const wide = variant === "wide";
  const detailed = variant !== "compact";

  return (
    <TiltCard max={wide ? 3 : 6} className="h-full [perspective:1400px]">
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(
          "group/card relative flex h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800/60 backdrop-blur-xl transition-all duration-500",
          "hover:border-accent/35 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
          wide ? "flex-col lg:flex-row" : "flex-col",
        )}
      >
        {/* Screenshot */}
        <div
          className={cn(
            "relative overflow-hidden bg-ink-900",
            wide
              ? "border-b border-white/[0.06] lg:w-[58%] lg:shrink-0 lg:border-b-0 lg:border-r"
              : "border-b border-white/[0.06]",
          )}
        >
          {/* Browser chrome, so each shot reads as a real product rather than
              a floating rectangle. */}
          <div className="flex items-center gap-1.5 border-b border-white/[0.05] bg-ink-950/60 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="ml-2 truncate font-mono text-[0.6rem] text-content-faint">
              {project.linkTitle}
            </span>
          </div>

          <div
            className={cn(
              "relative w-full overflow-hidden",
              wide ? "aspect-[16/10] lg:h-[calc(100%-2.6rem)] lg:aspect-auto" : "aspect-[16/10]",
            )}
          >
            <Image
              src={project.img}
              alt={`${project.title} screenshot`}
              width={SHOT_SIZE[project.img]?.width ?? 900}
              height={SHOT_SIZE[project.img]?.height ?? 455}
              loading="lazy"
              sizes={
                wide
                  ? "(max-width: 1024px) 92vw, 54vw"
                  : "(max-width: 768px) 92vw, 40vw"
              }
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-800/70 via-transparent to-transparent"
            />
          </div>

          {project.ai && (
            <span className="absolute right-3 top-12 inline-flex items-center gap-1.5 rounded-full border border-accent-cyan/30 bg-ink-950/85 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-accent-cyan backdrop-blur-md">
              <TbSparkles className="h-3 w-3" />
              AI
            </span>
          )}
        </div>

        {/* Body */}
        <div
          className={cn(
            "flex flex-1 flex-col p-6 sm:p-7",
            wide && "lg:justify-center lg:p-9",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-soft">
                {project.role}
              </p>
              <h3
                className={cn(
                  "mt-2 font-semibold text-content",
                  wide ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
                )}
              >
                {project.title}
              </h3>
            </div>

            <FaArrowUpRightFromSquare className="mt-1 h-3.5 w-3.5 shrink-0 text-content-faint transition-all duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent" />
          </div>

          <p className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-content-faint">
            {project.period}
          </p>

          <p
            className={cn(
              "mt-4 text-pretty text-sm leading-relaxed text-content-muted",
              !wide && "flex-1",
            )}
          >
            {detailed ? project.details : project.summary}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3.5"
              >
                <dd
                  className={cn(
                    "whitespace-nowrap bg-grad-brand bg-clip-text font-bold text-transparent",
                    wide ? "text-2xl" : "text-lg",
                  )}
                >
                  {metric.value}
                </dd>
                <dt className="mt-1 font-mono text-[0.58rem] uppercase leading-tight tracking-[0.1em] text-content-dim">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.06em] text-content-dim"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </a>
    </TiltCard>
  );
};

const RecentProjects = () => {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative scroll-mt-28 py-24 md:py-32">
      <SectionHeading
        eyebrow="Selected work"
        title="Products I"
        accent="shipped"
        lede="Live products with real users and real numbers — not tutorial clones. Each card links to the deployed thing."
      />

      {/* Featured: bigger, two-up */}
      <div className="mt-16 grid gap-4 lg:grid-cols-2">
        {featured.map((project, i) => (
          <Reveal
            key={project.id}
            direction="up"
            delay={i * 0.08}
            amount={0.1}
            className={cn(
              "h-full",
              // The first featured project spans both columns on large screens
              // - OpenDrawing is the strongest story, so it gets the space.
              i === 0 && "lg:col-span-2",
            )}
          >
            <ProjectCard project={project} variant={i === 0 ? "wide" : "featured"} />
          </Reveal>
        ))}
      </div>

      {/* Remaining work */}
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((project, i) => (
          <Reveal
            key={project.id}
            direction="up"
            delay={i * 0.07}
            amount={0.1}
            className="h-full"
          >
            <ProjectCard project={project} variant="compact" />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
