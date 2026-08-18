/**
 * Reading progress rail pinned to the very top of the viewport.
 *
 * This was a client component running `useScroll` + `useSpring`. A scroll
 * timeline expresses the same thing declaratively and runs on the compositor,
 * so the rail no longer costs a hydration pass, a subscription or a spring
 * integrator — the whole component is now static markup.
 *
 * Where scroll timelines are unsupported the rail sits at `scaleX(0)` and is
 * simply not drawn. It is decorative and `aria-hidden`, so nothing is lost
 * beyond the flourish itself.
 */
export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="scroll-rail fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-linear-to-r from-accent via-accent-2 to-accent"
    />
  );
}
