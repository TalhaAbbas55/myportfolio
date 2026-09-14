import {
  TbBrain,
  TbCloud,
  TbCurrencyEthereum,
  TbLayout,
  TbServer,
  TbTools,
} from "react-icons/tb";

import { skillCategories, highlights } from "@/data";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { cn } from "@/lib/utils";

type Category = (typeof skillCategories)[number];
type Accent = Category["accent"];

/** Full literals - Tailwind's scanner cannot resolve interpolated names. */
const ACCENT: Record<
  Accent,
  { text: string; icon: string; chip: string; card: string; glow: string }
> = {
  cyan: {
    text: "text-accent-cyan",
    icon: "bg-accent-cyan/[0.1] text-accent-cyan",
    chip: "hover:border-accent-cyan/45 hover:bg-accent-cyan/[0.08]",
    card: "hover:border-accent-cyan/30",
    glow: "bg-accent-cyan/10",
  },
  violet: {
    text: "text-accent",
    icon: "bg-accent/[0.1] text-accent",
    chip: "hover:border-accent/45 hover:bg-accent/[0.08]",
    card: "hover:border-accent/30",
    glow: "bg-accent/10",
  },
  teal: {
    text: "text-accent-teal",
    icon: "bg-accent-teal/[0.1] text-accent-teal",
    chip: "hover:border-accent-teal/45 hover:bg-accent-teal/[0.08]",
    card: "hover:border-accent-teal/30",
    glow: "bg-accent-teal/10",
  },
  amber: {
    text: "text-accent-amber",
    icon: "bg-accent-amber/[0.1] text-accent-amber",
    chip: "hover:border-accent-amber/45 hover:bg-accent-amber/[0.08]",
    card: "hover:border-accent-amber/30",
    glow: "bg-accent-amber/10",
  },
  pink: {
    text: "text-accent-pink",
    icon: "bg-accent-pink/[0.1] text-accent-pink",
    chip: "hover:border-accent-pink/45 hover:bg-accent-pink/[0.08]",
    card: "hover:border-accent-pink/30",
    glow: "bg-accent-pink/10",
  },
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  ai: TbBrain,
  frontend: TbLayout,
  backend: TbServer,
  cloud: TbCloud,
  web3: TbCurrencyEthereum,
  practices: TbTools,
};

/**
 * Every category is visible at once in a zigzag bento: the three big
 * categories take two columns, the smaller ones one, alternating sides so the
 * grid does not read as a stack of identical rows.
 */
const LAYOUT: { id: string; wide: boolean }[] = [
  { id: "ai", wide: true },
  { id: "cloud", wide: false },
  { id: "web3", wide: false },
  { id: "frontend", wide: true },
  { id: "backend", wide: true },
  { id: "practices", wide: false },
];

const Skills = () => {
  const ordered = LAYOUT.map(({ id, wide }) => ({
    category: skillCategories.find((c) => c.id === id),
    wide,
  })).filter(
    (x): x is { category: Category; wide: boolean } => Boolean(x.category),
  );

  return (
    <section id="skills" className="relative scroll-mt-28 py-24 md:py-32">
      <SectionHeading
        eyebrow="Capabilities"
        title="The stack I"
        accent="actually ship with"
        lede="The tools behind the products above, grouped by where they sit in the system."
      />

      {/* Metrics */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item, i) => (
          <Reveal key={item.id} direction="up" delay={i * 0.07}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800/50 p-6 backdrop-blur-xl transition-all duration-500 hover:border-accent/35 hover:shadow-glow">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-grad-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent-soft">
                  {item.label}
                </p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="whitespace-nowrap bg-grad-brand bg-clip-text text-3xl font-bold leading-none text-transparent lg:text-4xl">
                    {item.stat}
                  </span>
                  <span className="text-xs leading-tight text-content-dim">
                    {item.unit}
                  </span>
                </div>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-content-muted">
                  {item.value}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* All categories, no switching */}
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ordered.map(({ category, wide }, i) => {
          const accent = ACCENT[category.accent];
          const Icon = ICONS[category.id] ?? TbTools;

          return (
            <Reveal
              key={category.id}
              direction="up"
              delay={(i % 3) * 0.07}
              amount={0.15}
              className={cn("min-w-0", wide && "md:col-span-2")}
            >
              <article
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800/50 p-6 backdrop-blur-xl transition-colors duration-500 sm:p-7",
                  accent.card,
                )}
              >
                {/* Corner glow in the category colour */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-90",
                    accent.glow,
                  )}
                />

                <header className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08]",
                        accent.icon,
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-content">
                        {category.label}
                      </h3>
                      <p className="mt-0.5 text-xs text-content-dim">
                        {category.blurb}
                      </p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em]",
                      accent.text,
                    )}
                  >
                    {String(category.skills.length).padStart(2, "0")} tools
                  </span>
                </header>

                <ul className="relative mt-6 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className={cn(
                        "cursor-default rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[0.8rem] text-content-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-content",
                        accent.chip,
                      )}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
