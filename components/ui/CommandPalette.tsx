"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  TbArrowRight,
  TbBrandGithub,
  TbBrandLinkedin,
  TbCopy,
  TbFileCv,
  TbMail,
  TbSearch,
} from "react-icons/tb";

import { navItems, personalInfo } from "@/data";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Contact" | "Links";
  Icon: React.ComponentType<{ className?: string }>;
  run: () => void;
};

/**
 * Cmd/Ctrl-K palette: jump between sections, copy the email, open the CV.
 *
 * Deliberately keyboard-first - arrows move, Enter runs, Escape closes - and
 * focus is trapped to the input while open, then returned to whatever had it
 * before.
 */
export const CommandPalette = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const go = useCallback(
    (hash: string) => {
      close();
      // Let the exit animation start before scrolling, otherwise the jump and
      // the fade fight each other.
      requestAnimationFrame(() => {
        document
          .querySelector(hash)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [close],
  );

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = navItems.map((item) => ({
      id: `nav-${item.link}`,
      label: item.name,
      hint: item.link,
      group: "Navigate",
      Icon: TbArrowRight,
      run: () => go(item.link),
    }));

    return [
      ...nav,
      {
        id: "copy-email",
        label: "Copy email address",
        hint: personalInfo.email,
        group: "Contact",
        Icon: TbCopy,
        run: async () => {
          try {
            await navigator.clipboard.writeText(personalInfo.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          } catch {
            // Clipboard may be unavailable; fall back to opening the client.
            window.location.href = `mailto:${personalInfo.email}`;
          }
        },
      },
      {
        id: "email",
        label: "Send an email",
        hint: personalInfo.email,
        group: "Contact",
        Icon: TbMail,
        run: () => {
          close();
          window.location.href = `mailto:${personalInfo.email}`;
        },
      },
      {
        id: "resume",
        label: "Download résumé",
        hint: "PDF",
        group: "Links",
        Icon: TbFileCv,
        run: () => {
          close();
          window.open(personalInfo.resume, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "github",
        label: "GitHub",
        hint: "TalhaAbbas55",
        group: "Links",
        Icon: TbBrandGithub,
        run: () => {
          close();
          window.open(personalInfo.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        hint: "talha-abbas-developer",
        group: "Links",
        Icon: TbBrandLinkedin,
        run: () => {
          close();
          window.open(personalInfo.linkedin, "_blank", "noopener,noreferrer");
        },
      },
    ];
  }, [go, close]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint?.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q),
    );
  }, [commands, query]);

  /* Reset and focus on open; restore focus on close. */
  useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setCursor(0);
      // Wait a frame so the input exists before focusing it.
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // preventScroll matters: focusing an element scrolls it into view, which
      // would fight (and win against) the smooth scroll a "jump to section"
      // command just started.
      restoreFocusRef.current?.focus?.({ preventScroll: true });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Keep the cursor inside the (shrinking) result list as the user types. */
  useEffect(() => {
    setCursor((c) => Math.min(c, Math.max(0, results.length - 1)));
  }, [results.length]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(1, results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor(
        (c) => (c - 1 + Math.max(1, results.length)) % Math.max(1, results.length),
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[cursor]?.run();
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[8000] flex items-start justify-center px-4 pt-[12vh]">
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={close}
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={onKeyDown}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.10] bg-ink-800/95 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4">
              <TbSearch className="h-4 w-4 shrink-0 text-content-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section, copy my email…"
                aria-label="Search commands"
                className="w-full bg-transparent py-4 text-sm text-content outline-none placeholder:text-content-faint"
              />
              <kbd className="hidden shrink-0 rounded-md border border-white/[0.09] px-1.5 py-0.5 font-mono text-[0.6rem] text-content-faint sm:block">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[min(22rem,50vh)] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-content-dim">
                  No matches for &ldquo;{query}&rdquo;
                </p>
              )}

              {results.map((cmd, i) => {
                const isFirstOfGroup =
                  i === 0 || results[i - 1].group !== cmd.group;

                return (
                  <div key={cmd.id}>
                    {isFirstOfGroup && (
                      <p className="px-3 pb-1.5 pt-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-content-faint">
                        {cmd.group}
                      </p>
                    )}

                    <button
                      type="button"
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => cmd.run()}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150",
                        i === cursor
                          ? "bg-accent/[0.12] text-content"
                          : "text-content-muted hover:bg-white/[0.04]",
                      )}
                    >
                      <cmd.Icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          i === cursor ? "text-accent" : "text-content-faint",
                        )}
                      />
                      <span className="flex-1 truncate text-sm">
                        {cmd.id === "copy-email" && copied
                          ? "Copied to clipboard"
                          : cmd.label}
                      </span>
                      {cmd.hint && (
                        <span className="hidden shrink-0 font-mono text-[0.62rem] text-content-faint sm:block">
                          {cmd.hint}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Footer legend */}
            <div className="flex items-center gap-4 border-t border-white/[0.07] px-4 py-2.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-content-faint">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-white/[0.09] px-1">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-white/[0.09] px-1">↵</kbd>
                select
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/** Wires the global Cmd/Ctrl-K shortcut. */
export const useCommandPalette = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return { open, setOpen };
};
