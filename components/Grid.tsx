import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const Grid = () => (
  <section id="about" className="relative scroll-mt-28 py-24 md:py-32">
    <SectionHeading
      eyebrow="About"
      title="Engineer who owns the"
      accent="whole system"
      lede="From database schema and API contracts through to the interface that consumes them — and increasingly, the model reasoning in between."
    />

    <BentoGrid className="mt-16 w-full">
      {gridItems.map((item, i) => (
        <Reveal
          key={item.id}
          direction="up"
          delay={i * 0.05}
          amount={0.1}
          className={item.className}
        >
          <BentoGridItem
            id={item.id}
            title={item.title}
            description={item.description}
            // The layout classes live on the Reveal wrapper (which is the real
            // grid child now), so the card itself just fills it.
            className="h-full min-h-full"
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          />
        </Reveal>
      ))}
    </BentoGrid>
  </section>
);

export default Grid;
