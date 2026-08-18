"use client";

import React from "react";

import { highlights, testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const Clients = () => {
  return (
    <section id="skills" className="relative py-20">
      {/* Soft accent glow so landing on #skills does not open on flat black. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-72 w-[min(90vw,42rem)] -translate-x-1/2 rounded-full bg-purple/10 blur-3xl"
      />

      <p className="text-center text-xs uppercase tracking-[0.3em] text-purple">
        What I bring
      </p>

      <h2 className="heading mt-4">
        Core <span className="text-purple">capabilities</span>
      </h2>

      <p className="text-center text-white-200 mt-5 max-w-3xl mx-auto">
        Broad software engineering experience across application architecture,
        backend delivery, product systems, Web3 experimentation, and reliable
        production execution.
      </p>

      {/* Numbers first: this is what a visitor jumping straight to #skills sees. */}
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black-200 p-6 transition-colors duration-300 hover:border-purple/40"
          >
            {/* Accent wash that fades in on hover. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            <div className="relative">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-purple">
                {item.label}
              </p>

              <div className="mt-4 flex items-baseline gap-2">
                {/* nowrap so "Top 1%" is not broken across two lines */}
                <span className="whitespace-nowrap text-4xl font-bold leading-none text-white lg:text-5xl">
                  {item.stat}
                </span>
                <span className="text-sm leading-tight text-white-200">
                  {item.unit}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-white-100">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* The marquee is client reviews, so label it instead of leaving an
          unexplained carousel floating in the section. */}
      <div className="mt-20 flex flex-col items-center">
        <h3 className="text-center text-2xl font-bold text-white md:text-3xl">
          What clients <span className="text-purple">say</span>
        </h3>
        <p className="mt-3 text-center text-sm text-white-200">
          Verified reviews from freelance engagements.
        </p>

        <div
          // remove bg-white dark:bg-black dark:bg-grid-white/[0.05], h-[40rem] to 30rem , md:h-[30rem] are for the responsive design
          className="mt-6 h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
};

export default Clients;
