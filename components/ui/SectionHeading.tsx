import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * Every section opens with the same three-part header: a monospace eyebrow, a
 * two-tone title, and an optional lede. Enforcing it in one component is what
 * keeps eight sections reading as one site.
 */
export const SectionHeading = ({
  eyebrow,
  title,
  accent,
  lede,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  /** Trailing words rendered in the brand gradient. */
  accent?: string;
  lede?: string;
  align?: "center" | "left";
  className?: string;
}) => (
  <div
    className={cn(
      "flex flex-col",
      align === "center" ? "items-center text-center" : "items-start text-left",
      className,
    )}
  >
    <Reveal direction="up">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent-soft backdrop-blur-sm">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        {eyebrow}
      </span>
    </Reveal>

    <Reveal direction="up" delay={0.08}>
      <h2 className="mt-5 text-balance text-3xl font-bold leading-[1.15] tracking-tight text-content sm:text-4xl md:text-5xl">
        {title}
        {accent && (
          <>
            {" "}
            <span className="bg-grad-brand bg-clip-text text-transparent">
              {accent}
            </span>
          </>
        )}
      </h2>
    </Reveal>

    {lede && (
      <Reveal direction="up" delay={0.16}>
        <p
          className={cn(
            "mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-content-muted sm:text-base",
            align === "center" && "mx-auto",
          )}
        >
          {lede}
        </p>
      </Reveal>
    )}
  </div>
);
