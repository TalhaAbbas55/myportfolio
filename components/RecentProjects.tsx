"use client";

import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa6";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

// Real dimensions of each screenshot. They differ slightly, so passing one
// hardcoded pair would distort a couple of the cards.
const SHOT_SIZE: Record<string, { width: number; height: number }> = {
  "/apps/OpenDrawing.webp": { width: 900, height: 455 },
  "/apps/OurOffice.webp": { width: 900, height: 455 },
  "/apps/aabBooks.webp": { width: 900, height: 455 },
  "/apps/curlCompass.webp": { width: 900, height: 419 },
  "/apps/customWebsitesClub.webp": { width: 900, height: 455 },
  "/apps/neverLeft.webp": { width: 900, height: 444 },
};

const RecentProjects = () => {
  return (
    <section className="py-20" id="projects">
      <h2 className="heading">
        Selected <span className="text-purple">projects</span>
      </h2>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item) => (
          <div
            // PinContainer renders its children inside absolutely-positioned,
            // 3D-transformed wrappers, so the content cannot push this box
            // taller. That means this height has to be big enough for the
            // content on its own - see the rem-based image height below.
            className="group h-[27rem] lg:h-[35rem] flex items-center justify-center sm:w-96 w-[80vw] cursor-pointer"
            key={item.id}
            onClick={() => window.open(item.link, "_blank")}
          >
            <PinContainer title={item.linkTitle} href={item.link}>
              {/* Height is in rem, not vh. It used to be `h-[20vh] lg:h-[30vh]`
                  while the card wrapper was a fixed 25rem/32.5rem, so on tall
                  viewports the content outgrew the wrapper and spilled into the
                  row below (~106px of overlap at 1400px tall). A rem height
                  keeps the card a constant size at every viewport. */}
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-visible h-[15rem] lg:h-[17rem] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <Image
                    src="/bg.webp"
                    alt=""
                    aria-hidden="true"
                    width={552}
                    height={330}
                    loading="lazy"
                    sizes="(max-width: 640px) 80vw, 384px"
                  />
                </div>
                <Image
                  src={item.img}
                  alt={`${item.title} screenshot`}
                  width={SHOT_SIZE[item.img]?.width ?? 900}
                  height={SHOT_SIZE[item.img]?.height ?? 455}
                  // All lazy: this section starts ~2500px down, and `eager` made
                  // next/image emit a <link rel=preload> for the first two,
                  // which competed with the hero's critical path for images
                  // nobody had scrolled to yet. The browser's own lazy loading
                  // fetches these well before they enter the viewport, and each
                  // is only ~15-20 KB as AVIF.
                  loading="lazy"
                  sizes="(max-width: 640px) 80vw, 384px"
                  className="z-10 absolute bottom-0"
                />

                {/* Detail overlay. Was a narrow 18rem box of 12px text sitting
                    over the screenshot, which was very hard to read; it now
                    fills the whole image area with a near-opaque backdrop and
                    larger type. */}
                <div className="absolute inset-0 z-30 flex flex-col justify-center gap-2 overflow-hidden rounded-2xl border border-white/15 bg-[#05070f]/[0.97] p-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:rounded-3xl">
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-purple">
                    About this project
                  </p>
                  <p className="overflow-auto text-sm leading-relaxed text-white-100">
                    {item.details}
                  </p>
                </div>
              </div>

              <h3 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h3>

              <p className="text-sm text-purple mt-2">{item.period}</p>

              <p className="text-sm text-white-200 mt-2 line-clamp-2">
                {item.summary}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      {/* Hand-authored vectors, a couple of KB each - the image
                          optimizer would only add a round trip. Deliberately no
                          width/height attributes: box-sizing is border-box, so
                          declaring them would fight the p-2 padding and shrink
                          the icon. The fixed-size parent already prevents any
                          layout shift. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={icon}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="p-2"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                    {item.cta}
                  </p>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
