import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  /** Radius of the pointer spotlight in px. */
  radius?: number;
  /** Adds the lift + border brightening on hover. */
  interactive?: boolean;
};

/**
 * Premium card chrome shared by skills, services, principles and projects.
 *
 * This renders about 32 times on the page — 24 of them in the skills grid — so
 * it is deliberately a *server* component. The spotlight used to be driven by
 * `useMotionTemplate`, which meant every card shipped two motion values, two
 * template subscriptions and a React tree to hydrate. Now the gradient reads
 * `--gx`/`--gy` straight from CSS, and a single delegated pointer handler in
 * the boot script writes those two custom properties on whichever card the
 * cursor is over. Nothing in this file ships as JavaScript.
 *
 * The visual is unchanged: same radius, same accent-soft interior spotlight,
 * same masked 1px border highlight, same 500ms hover fade.
 */
export function GlowCard({
  children,
  className,
  radius = 260,
  interactive = true,
}: GlowCardProps) {
  return (
    <div
      data-glow=""
      style={{ "--glow-r": `${radius}px` } as CSSProperties}
      className={cn(
        "group/card relative isolate overflow-hidden rounded-2xl border border-line bg-surface",
        "transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        interactive &&
          "hover:-translate-y-1 hover:border-line-strong hover:shadow-lift motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {/* Border highlight: a gradient layer masked to a 1px inset frame. */}
      <span aria-hidden="true" className="glow-frame" />
      {/* Interior spotlight. */}
      <span aria-hidden="true" className="glow-fill" />
      {children}
    </div>
  );
}
