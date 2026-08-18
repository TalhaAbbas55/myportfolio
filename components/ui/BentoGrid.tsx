"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

import { personalInfo, stackLists } from "@/data";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import MagicButton from "../MagicButton";

// lottie-react is only needed for the confetti burst after a successful copy,
// so it stays out of the initial bundle.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // change gap-4 to gap-8, change grid-cols-3 to grid-cols-5, remove md:auto-rows-[18rem], add responsive code
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

/**
 * Intrinsic sizes of the original Figma exports. The exports were oversized
 * bitmaps wrapped in SVG (a 464x300 box carrying a 2880x2048 PNG); they are now
 * right-sized WebP. Declaring the original display sizes here keeps the layout
 * byte-identical to before and gives the browser an aspect ratio up front, so
 * swapping the assets cost no layout shift.
 */
const IMG_SIZE: Record<string, { width: number; height: number }> = {
  "/b1.webp": { width: 689, height: 541 },
  "/grid.webp": { width: 351, height: 180 },
  "/b5.webp": { width: 500, height: 383 },
  "/b4.svg": { width: 208, height: 96 },
};

/**
 * Renders decorative bento artwork. Raster assets go through next/image for
 * responsive srcsets; the hand-authored vectors are already a couple of KB, so
 * routing them through the optimizer would only add a round trip.
 */
const BentoArt = ({
  src,
  className,
  priority,
}: {
  src: string;
  className?: string;
  priority?: boolean;
}) => {
  const size = IMG_SIZE[src] ?? { width: 500, height: 500 };

  if (src.endsWith(".svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={size.width}
        height={size.height}
        loading="lazy"
        decoding="async"
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={size.width}
      height={size.height}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes="(max-width: 768px) 100vw, 50vw"
      className={className}
    />
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  //   remove unecessary things here
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = stackLists.left;
  const rightLists = stackLists.right;

  const [copied, setCopied] = useState(false);
  // confetti.json is ~600KB. It used to be a static import, which parked the
  // whole payload in the initial page chunk for an animation that only ever
  // plays after a click. It is now fetched on demand.
  const [confetti, setConfetti] = useState<unknown>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
    } catch {
      // Clipboard access can be denied (insecure origin, permissions);
      // still give the user feedback rather than failing silently.
    }
    setCopied(true);

    if (!confetti) {
      const mod = await import("@/data/confetti.json");
      setConfetti(mod.default);
    }
  };

  return (
    <div
      className={cn(
        // remove p-4 rounded-3xl dark:bg-black dark:border-white/[0.2] bg-white  border border-transparent, add border border-white/[0.1] overflow-hidden relative
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className,
      )}
      style={{
        //   add these two
        //   you can generate the color from here https://cssgradient.io/
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* add img divs */}
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <BentoArt
              src={img}
              // The first bento tile is above the fold, so it is worth fetching eagerly.
              priority={id === 1}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          } `}
        >
          {spareImg && (
            <BentoArt
              src={spareImg}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && (
          // add background animation , remove the p tag
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            `group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10 ${id === 2 ? "!pb-[150px]" : ""}`,
          )}
        >
          {/* change the order of the title and des, font-extralight, remove text-xs text-neutral-600 dark:text-neutral-300 , change the text-color */}
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          {/* add text-3xl max-w-96 , remove text-neutral-600 dark:text-neutral-300*/}
          {/* remove mb-2 mt-2 */}
          <div
            className={cn(
              "font-sans text-lg lg:text-3xl font-bold z-10",
              id === 3 ? "max-w-full lg:max-w-[58%] leading-tight" : "max-w-96",
            )}
          >
            {title}
          </div>

          {/* for the github 3d globe */}
          {id === 2 && <GridGlobe />}

          {/* Tech stack list div */}
          {id === 3 && (
            <div className="mt-6 md:mt-auto flex justify-start lg:justify-end">
              {/* tech stack lists */}
              <div className="grid grid-cols-2 gap-3 lg:gap-4 w-full max-w-[17rem] lg:max-w-[18rem]">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="min-h-11 lg:min-h-14 px-3 py-2 text-xs lg:text-sm rounded-xl text-center bg-[#10132E] border border-white/10 flex items-center justify-center text-white-200"
                  >
                    {item}
                  </span>
                ))}
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="min-h-11 lg:min-h-14 px-3 py-2 text-xs lg:text-sm rounded-xl text-center bg-[#10132E] border border-white/10 flex items-center justify-center text-white-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="mt-5 relative">
              {/* button border magic from tailwind css buttons  */}
              {/* add rounded-md h-8 md:h-8, remove rounded-full */}
              {/* remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 */}
              {/* add handleCopy() for the copy the text */}
              <div
                className={`absolute -bottom-5 right-0 ${
                  copied ? "block" : "block"
                }`}
              >
                {confetti != null && (
                  <Lottie
                    animationData={confetti}
                    loop={false}
                    autoplay
                    style={{ height: 200, width: 400 }}
                    rendererSettings={{
                      preserveAspectRatio: "xMidYMid slice",
                    }}
                  />
                )}
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
