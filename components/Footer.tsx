"use client";

import { useState } from "react";
import { FaArrowRight, FaCheck, FaRegCopy } from "react-icons/fa6";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { MdOutlineMail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

import { personalInfo, socialMedia } from "@/data";
import { GradientButton } from "./ui/GradientButton";
import { Reveal } from "./ui/Reveal";
import { Magnetic } from "./ui/Magnetic";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (insecure origin, denied permission). The
      // address is visible on the button itself, so there is still a path.
    }
  };

  return (
    <footer id="contact" className="relative scroll-mt-28 pb-12 pt-24 md:pt-32">
      {/* Contact card */}
      <Reveal direction="up">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-ink-800/60 px-6 py-16 backdrop-blur-xl sm:px-12 md:py-20">
          {/* Glow behind the card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[min(90%,40rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          />

          <div className="relative flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent-soft">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent-teal" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-teal" />
              </span>
              Available for work
            </span>

            <h2 className="mt-6 max-w-3xl text-balance text-3xl font-bold leading-[1.12] tracking-tight text-content sm:text-4xl md:text-5xl">
              Let&apos;s build something{" "}
              <span className="bg-grad-brand bg-clip-text text-transparent">
                worth shipping
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-content-muted sm:text-base">
              {personalInfo.availability}. Based in {personalInfo.location} (
              {personalInfo.timezone}) and comfortable working across time zones
              — email, WhatsApp or LinkedIn all reach me.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <GradientButton
                href={`mailto:${personalInfo.email}`}
                icon={<FaArrowRight className="h-3.5 w-3.5" />}
              >
                Get in touch
              </GradientButton>

              <GradientButton
                onClick={copyEmail}
                variant="ghost"
                icon={
                  copied ? (
                    <FaCheck className="h-3.5 w-3.5 text-accent-teal" />
                  ) : (
                    <FaRegCopy className="h-3.5 w-3.5" />
                  )
                }
                ariaLabel="Copy email address"
              >
                {copied ? "Copied" : personalInfo.email}
              </GradientButton>

              <GradientButton
                href={personalInfo.resume}
                variant="ghost"
                external
                icon={<HiOutlineDocumentArrowDown className="h-4 w-4" />}
              >
                Résumé
              </GradientButton>
            </div>

            {/* Quick facts */}
            <dl className="mt-12 grid w-full max-w-2xl gap-3 sm:grid-cols-2">
              {[
                {
                  Icon: MdOutlineMail,
                  label: "Email",
                  value: personalInfo.email,
                  href: `mailto:${personalInfo.email}`,
                },
                {
                  Icon: IoLocationOutline,
                  label: "Location",
                  value: `${personalInfo.location} · ${personalInfo.timezone}`,
                },
              ].map(({ Icon, label, value, href }) => {
                const body = (
                  <>
                    <Icon className="h-4 w-4 shrink-0 text-accent" />
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-content-faint">
                        {label}
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-content-muted">
                        {value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <div key={label}>
                    {href ? (
                      <a
                        href={href}
                        className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 text-left transition-colors duration-300 hover:border-accent/30 hover:bg-accent/[0.05]"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 text-left">
                        {body}
                      </div>
                    )}
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </Reveal>

      {/* Bottom bar */}
      <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] pt-8 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-content">
            {personalInfo.name}
          </p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-content-faint">
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {socialMedia.map((info) => (
            <Magnetic key={info.id} strength={0.3}>
              <a
                href={info.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={info.label}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-accent/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={info.img}
                  alt=""
                  aria-hidden="true"
                  width={18}
                  height={18}
                  loading="lazy"
                  decoding="async"
                  className="opacity-70 transition-opacity duration-300 hover:opacity-100"
                />
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
