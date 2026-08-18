import { FaLocationArrow } from "react-icons/fa6";

import { personalInfo, socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      {/* This used to be `-bottom-72 min-h-96`, i.e. a ~1050px tall box hanging
          288px below the page and relying purely on an ancestor's
          overflow-hidden to stay out of the way. Where that clip did not apply
          it added 288px of dead scrollable space under the footer. Anchoring it
          to bottom-0 with a fixed height keeps the same visible extent with
          nothing overhanging. */}
      <div className="w-full absolute left-0 bottom-0 h-[48rem] overflow-hidden">
        {/* Decorative vector (14 KB); loaded lazily since it sits below the fold. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer-grid.svg"
          alt=""
          aria-hidden="true"
          width={1260}
          height={863}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top opacity-50"
        />
      </div>

      <div className="flex flex-col items-center">
        <h2 className="heading lg:max-w-[45vw]">
          Let&apos;s build your next{" "}
          <span className="text-purple">software product</span>
        </h2>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Available for software engineering roles and contract work from{" "}
          {personalInfo.location}. Email, WhatsApp, or LinkedIn all work.
        </p>
        <a href={`mailto:${personalInfo.email}`}>
          <MagicButton
            title="Get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          {personalInfo.name} | {personalInfo.email} | {personalInfo.phone}
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.href}
              target="_blank"
              rel="noreferrer"
              aria-label={info.label}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={info.img}
                alt=""
                aria-hidden="true"
                width={20}
                height={20}
                loading="lazy"
                decoding="async"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
