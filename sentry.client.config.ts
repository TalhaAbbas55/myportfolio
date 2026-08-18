// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// The DSN used to be hardcoded to the project this template was forked from,
// so every visitor's errors and session replays were shipped to someone else's
// Sentry org. It is now opt-in: set NEXT_PUBLIC_SENTRY_DSN to enable it.
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,

    // Was 1 (a trace for every single page load). 10% is plenty of signal for
    // a portfolio and avoids a network request on every visit.
    tracesSampleRate: 0.1,

    debug: false,

    // Session Replay was previously always on, which added roughly 50-60 KB
    // gzipped of JavaScript to every page load. Dropped entirely - it earns
    // nothing on a static portfolio.
    replaysOnErrorSampleRate: 0,
    replaysSessionSampleRate: 0,
  });
}
