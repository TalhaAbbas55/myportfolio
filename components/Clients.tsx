"use client";

import React from "react";

import { highlights, testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const Clients = () => {
  return (
    <section id="skills" className="py-20">
      <h1 className="heading">
        Core <span className="text-purple">capabilities</span>
      </h1>

      <p className="text-center text-white-200 mt-4 max-w-3xl mx-auto">
        Broad software engineering experience across application architecture,
        backend delivery, product systems, Web3 experimentation, and reliable
        production execution.
      </p>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div
          // remove bg-white dark:bg-black dark:bg-grid-white/[0.05], h-[40rem] to 30rem , md:h-[30rem] are for the responsive design
          className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full max-lg:mt-10">
          {highlights.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-black-200 px-6 py-5"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-purple">
                {item.label}
              </p>
              <p className="text-white mt-3 text-base leading-7">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
