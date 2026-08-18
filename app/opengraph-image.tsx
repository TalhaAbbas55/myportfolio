import { ImageResponse } from "next/og";
import { personalInfo } from "@/data";

// Rendered once at build time, so social previews cost no hand-made asset and
// no runtime work. Deliberately not on the edge runtime - that would opt the
// route out of static generation.
export const alt = `${personalInfo.name} - ${personalInfo.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #000319 0%, #0c0e23 55%, #1a1035 100%)",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#CBACF9",
          }}
        >
          {personalInfo.location}
        </div>

        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.05,
            marginTop: 28,
          }}
        >
          {personalInfo.name}
        </div>

        <div
          style={{
            fontSize: 44,
            color: "#BEC1DD",
            marginTop: 24,
            lineHeight: 1.25,
          }}
        >
          {personalInfo.headline}
        </div>

        <div
          style={{
            display: "flex",
            gap: "18px",
            marginTop: 48,
            fontSize: 26,
            color: "#C1C2D3",
          }}
        >
          {["React", "Next.js", "TypeScript", "Node.js", "MongoDB"].map(
            (tech) => (
              <div
                key={tech}
                style={{
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 999,
                  padding: "10px 26px",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {tech}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
