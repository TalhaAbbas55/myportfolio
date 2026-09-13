"use client";

import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

/**
 * The site's two button treatments. `primary` carries a conic border that
 * sweeps continuously; `ghost` is a glass pill. Both are magnetic on hover.
 *
 * Renders as an <a> when `href` is given so links stay links - the original
 * template wrapped buttons in anchors, which nests interactive elements.
 */
export const GradientButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  icon,
  external = false,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  icon?: ReactNode;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}) => {
  const shared =
    "group relative inline-flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-xl px-6 text-sm font-medium transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 active:scale-[0.98]";

  const inner =
    variant === "primary" ? (
      <>
        {/* Sweeping conic border */}
        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#22D3EE_0%,#8B5CF6_50%,#22D3EE_100%)] motion-reduce:animate-none" />
        <span className="absolute inset-[1.5px] rounded-[10px] bg-ink-900" />
        {/* Shine that wipes across on hover */}
        <span className="absolute inset-[1.5px] rounded-[10px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="relative z-10 flex items-center gap-2.5 font-medium text-content">
          {children}
          {icon && (
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              {icon}
            </span>
          )}
        </span>
      </>
    ) : (
      <>
        <span className="absolute inset-0 rounded-xl border border-white/12 bg-white/[0.04] backdrop-blur-md transition-colors duration-300 group-hover:border-accent/45 group-hover:bg-accent/[0.08]" />
        <span className="relative z-10 flex items-center gap-2.5 text-content-muted transition-colors duration-300 group-hover:text-content">
          {children}
          {icon && (
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              {icon}
            </span>
          )}
        </span>
      </>
    );

  const body = href ? (
    <a
      href={href}
      aria-label={ariaLabel}
      className={cn(shared, className)}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {inner}
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(shared, className)}
    >
      {inner}
    </button>
  );

  return <Magnetic strength={0.25}>{body}</Magnetic>;
};
