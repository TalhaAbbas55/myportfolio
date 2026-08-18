/**
 * Canonical origin for the deployed site.
 *
 * Set NEXT_PUBLIC_SITE_URL in the Vercel project to override. Vercel also
 * injects VERCEL_PROJECT_PRODUCTION_URL, which keeps preview builds honest
 * without hardcoding a domain.
 */
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export const siteUrl = (fromEnv || "https://talha-abbas.vercel.app").replace(
  /\/$/,
  "",
);
