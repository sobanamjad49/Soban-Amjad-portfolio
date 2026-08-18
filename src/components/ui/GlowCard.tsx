"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
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
 * The spotlight is a single motion-value-driven radial gradient — one composited
 * layer per card, not a per-frame React re-render, so a grid of 24 of these
 * stays cheap. Falls back to a static surface when motion is reduced.
 */
export function GlowCard({
  children,
  className,
  radius = 260,
  interactive = true,
}: GlowCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, var(--accent-soft), transparent 72%)`;
  const borderLight = useMotionTemplate`radial-gradient(${radius * 0.9}px circle at ${mouseX}px ${mouseY}px, var(--accent), transparent 68%)`;

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const handleLeave = () => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "group/card relative isolate overflow-hidden rounded-2xl border border-line bg-surface",
        "transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        interactive &&
          "hover:-translate-y-1 hover:border-line-strong hover:shadow-lift motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {!reduced && (
        <>
          {/* Border highlight: a gradient layer masked to a 1px inset frame. */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-60"
            style={{
              background: borderLight,
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />
          {/* Interior spotlight. */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
            style={{ background }}
          />
        </>
      )}
      {children}
    </div>
  );
}
