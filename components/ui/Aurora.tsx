/**
 * Ambient background: three slow-drifting colour fields plus a fine grid and a
 * noise overlay. Pure CSS - no canvas, no JS, no main-thread cost - so it can
 * sit behind every section without hurting scroll performance.
 *
 * Rendered once in the layout at -z-10, not per section, so the colour drift is
 * continuous as you scroll rather than restarting at each boundary.
 */
export const Aurora = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950"
  >
    {/* Colour fields */}
    <div className="absolute -left-[15%] top-[-10%] h-[55vw] w-[55vw] animate-aurora rounded-full bg-accent-violet/[0.16] blur-[120px]" />
    <div className="absolute right-[-10%] top-[15%] h-[45vw] w-[45vw] animate-aurora-slow rounded-full bg-accent-cyan/[0.10] blur-[130px]" />
    <div className="absolute bottom-[-15%] left-[25%] h-[50vw] w-[50vw] animate-aurora rounded-full bg-accent-pink/[0.07] blur-[140px] [animation-delay:-8s]" />

    {/* Fine grid, masked to fade out toward the edges */}
    <div className="absolute inset-0 bg-grid-white/[0.025] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

    {/* Film grain - kills the banding that large blurred gradients produce */}
    <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay" />

    {/* Vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(4,5,13,0.85)_100%)]" />
  </div>
);
