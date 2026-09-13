"use client";

import { testimonials } from "@/data";
import { SectionHeading } from "./ui/SectionHeading";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const Testimonials = () => (
  <section id="testimonials" className="relative scroll-mt-28 py-24 md:py-32">
    <SectionHeading
      eyebrow="Testimonials"
      title="What clients"
      accent="say"
      lede="Verified reviews from freelance engagements. Each card links to the original review."
    />

    <div className="relative mt-14 flex flex-col items-center overflow-hidden">
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    </div>
  </section>
);

export default Testimonials;
