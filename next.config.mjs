import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    // Serve AVIF where supported, fall back to WebP.
    formats: ["image/avif", "image/webp"],
    // Cards top out around 384px CSS; these cover 1x through 3x plus the
    // bento backgrounds without generating variants nothing ever requests.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 552, 689],
    // 30 days rather than a year: these filenames are not content-hashed, so a
    // year-long TTL would keep serving a stale image if one is ever replaced
    // under the same name.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  compiler: {
    // Strip console.* from production bundles, keeping error/warn.
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  experimental: {
    // Rewrites barrel imports to deep imports so a single icon does not pull
    // the whole icon set into the bundle.
    optimizePackageImports: [
      "react-icons",
      "framer-motion",
      "@react-three/drei",
      "lottie-react",
    ],
  },

  async headers() {
    return [
      {
        // Static assets under /public. Their filenames are NOT content-hashed
        // (unlike /_next/static, which Next already marks immutable), so this
        // deliberately avoids `immutable`: a day of freshness plus a week of
        // stale-while-revalidate keeps repeat visits instant while still
        // letting a replaced file propagate.
        source: "/:all*(svg|webp|png|jpg|jpeg|gif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

// Only enable Sentry's webpack plugin when a valid auth token is available.
// This avoids noisy warnings during local builds and makes the build independent of Sentry.
const shouldUseSentry = Boolean(process.env.SENTRY_AUTH_TOKEN);

const sentryConfig = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin\#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
};

const sentryOptions = {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Was true, which uploaded source maps for the whole client build. Off keeps
  // the build faster and smaller; stack traces for app code still resolve.
  widenClientFileUpload: false,

  // Was true. IE11 is long dead and transpiling the SDK down to ES5 inflates
  // every client bundle it touches.
  transpileClientSDK: false,

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors.
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
};

export default shouldUseSentry
  ? withSentryConfig(nextConfig, sentryConfig, sentryOptions)
  : nextConfig;
