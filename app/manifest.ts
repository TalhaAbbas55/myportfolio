import type { MetadataRoute } from "next";
import { personalInfo } from "@/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personalInfo.name} | ${personalInfo.headline}`,
    short_name: personalInfo.name,
    description: personalInfo.summary,
    start_url: "/",
    display: "standalone",
    background_color: "#000319",
    theme_color: "#000319",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
