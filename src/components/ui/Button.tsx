"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "whitespace-nowrap transition-colors duration-300 select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-ink text-base hover:bg-ink/90 shadow-[0_12px_32px_-14px_var(--accent-glow)]",
  secondary:
    "border border-line-strong bg-surface/60 text-ink backdrop-blur-sm " +
    "hover:border-accent/50 hover:bg-surface",
  ghost: "text-ink-muted hover:text-ink",
};

const SIZES = {
  md: "h-11 px-5 text-[14px] sm:h-12 sm:px-6 sm:text-[15px]",
  sm: "h-10 px-4 text-[13px] sm:text-sm",
} as const;

type MagneticProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: keyof typeof SIZES;
  /** Pull strength in px. 0 disables the magnetic effect. */
  strength?: number;
  /** Renders an anchor when present, a button otherwise. */
  href?: string;
  external?: boolean;
  download?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  type?: "button" | "submit";
};

/**
 * Resolved once and cached. The previous implementation called
 * `window.matchMedia("(pointer: fine)")` inside the mousemove handler, which
 * allocated a MediaQueryList on every pointer event.
 */
let finePointer: MediaQueryList | null = null;
const isFinePointer = () => {
  if (typeof window === "undefined") return false;
  finePointer ??= window.matchMedia("(pointer: fine)");
  return finePointer.matches;
};

/**
 * Magnetic CTA: the control drifts a few pixels toward the pointer, which makes
 * primary actions feel physical without moving them far enough to become a
 * hit-target problem. Disabled entirely for reduced motion and coarse pointers.
 */
export function MagneticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  strength = 8,
  href,
  external,
  download,
  onClick,
  ariaLabel,
  type = "button",
}: MagneticProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  // Measured once per hover instead of once per mousemove: reading a rect
  // mid-event forces a synchronous layout, and a control cannot move while the
  // pointer is inside it.
  const rect = useRef<DOMRect | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleEnter = () => {
    const node = ref.current;
    if (reduced || strength === 0 || !node || !isFinePointer()) return;
    rect.current = node.getBoundingClientRect();
  };

  const handleMove = (event: MouseEvent) => {
    const box = rect.current;
    if (!box) return;

    const relX = (event.clientX - (box.left + box.width / 2)) / (box.width / 2);
    const relY = (event.clientY - (box.top + box.height / 2)) / (box.height / 2);
    x.set(relX * strength);
    y.set(relY * strength * 0.6);
  };

  const reset = () => {
    rect.current = null;
    x.set(0);
    y.set(0);
  };

  const shared = {
    className: cn(BASE, VARIANTS[variant], SIZES[size], className),
    style: { x: springX, y: springY },
    onMouseEnter: handleEnter,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    onBlur: reset,
    whileTap: reduced ? undefined : { scale: 0.97 },
    "aria-label": ariaLabel,
  } as const;

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        download={download}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...shared}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      {...shared}
    >
      {children}
    </motion.button>
  );
}

/** Small circular link used for socials. */
export function IconLink({
  href,
  label,
  children,
  className,
  external = true,
}: {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        "group inline-flex size-10 items-center justify-center rounded-full",
        "border border-line text-ink-muted transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink",
        "hover:shadow-[0_8px_24px_-12px_var(--accent-glow)]",
        className,
      )}
    >
      {children}
    </a>
  );
}
