import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
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

export const viewport: Viewport = {
  themeColor: "#000319",
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
      <body className={inter.className}>
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
