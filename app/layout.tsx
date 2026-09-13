import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import { Aurora } from "@/components/ui/Aurora";
import { personalInfo } from "@/data";
import { siteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  // Text paints in the fallback immediately instead of blocking on the webfont.
  display: "swap",
  variable: "--font-inter",
  // No explicit `weight`: Inter is a variable font, so one file covers every
  // weight the design uses (200 through 700). Pinning weights here would make
  // next/font fetch a separate static file per weight instead.
});

// Monospace carries the eyebrows, metric labels, code samples and the Cmd-K
// palette. It is what makes the site read as built by an engineer.
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const viewport: Viewport = {
  themeColor: "#04050D",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const title = `${personalInfo.name} | ${personalInfo.headline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.summary,
  applicationName: `${personalInfo.name} Portfolio`,
  authors: [{ name: personalInfo.name, url: siteUrl }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  keywords: [
    personalInfo.name,
    "full-stack developer",
    "software engineer",
    "technical lead",
    "AI engineer",
    "LLM engineer",
    "RAG",
    "LangChain",
    "LangGraph",
    "Python developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "React Native developer",
    "TypeScript",
    "MongoDB",
    "web developer Lahore",
    "software engineer Pakistan",
    "portfolio",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: `${personalInfo.name} Portfolio`,
    title,
    description: personalInfo.summary,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: personalInfo.summary,
    creator: `@${personalInfo.name.replace(/\s+/g, "")}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
};

// Structured data so search engines can render a rich result for the person
// behind the site rather than guessing from the copy.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  url: siteUrl,
  jobTitle: personalInfo.title,
  description: personalInfo.summary,
  email: `mailto:${personalInfo.email}`,
  telephone: personalInfo.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  sameAs: [personalInfo.github, personalInfo.linkedin],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "React Native",
    "Nest.js",
    "Python",
    "LangChain",
    "LangGraph",
    "Retrieval-Augmented Generation",
    "Large Language Models",
    "Vector Databases",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          // Static, build-time constant - no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans bg-ink-950 text-content antialiased selection:bg-accent/30 selection:text-white`}
      >
        {/* Ambient background lives at the layout level so the colour drift is
            continuous across sections rather than restarting at each one. */}
        <Aurora />

        {/* Keyboard users get a way past the fixed nav. */}
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9000] focus:rounded-xl focus:border focus:border-accent/40 focus:bg-ink-800 focus:px-4 focus:py-2 focus:text-sm focus:text-content"
        >
          Skip to content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
