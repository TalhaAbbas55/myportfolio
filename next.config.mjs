import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {};

// Only enable Sentry's webpack plugin when a valid auth token is available.
// This avoids noisy warnings during local builds and makes the build independent of Sentry.
const shouldUseSentry = Boolean(process.env.SENTRY_AUTH_TOKEN);

const sentryConfig = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin\#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: "javascript-mastery",
  project: "javascript-nextjs",
};

const sentryOptions = {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Transpiles SDK to be compatible with IE11 (increases bundle size)
  transpileClientSDK: true,

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
