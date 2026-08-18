"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { createElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's motion language, in one place.
 *
 * Two easings do all the work: `EASE` (expo-out) for anything entering, and
 * springs for anything the pointer drives. Durations sit between 0.4s and 0.9s.
 * Every primitive collapses to a plain element under `prefers-reduced-motion`,
 * so reduced motion means *no* motion rather than faster motion.
 */
export const EASE = [0.16, 1, 0.3, 1] as const;

const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  span: motion.span,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  header: motion.header,
  figure: motion.figure,
} as const;

export type MotionTag = keyof typeof TAGS;

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * `soft` adds a short blur-to-clear pass — used on hero-adjacent and feature
 * content so not every section shares an identical entrance.
 */
type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  scale?: boolean;
  soft?: boolean;
  as?: MotionTag;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.65,
  direction = "up",
  scale = false,
  soft = false,
  as = "div",
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return createElement(as, { className }, children);

  const Tag = TAGS[as];
  const { x, y } = OFFSET[direction];

  return (
    <Tag
      className={className}
      initial={{
        opacity: 0,
        x,
        y,
        scale: scale ? 0.97 : 1,
        filter: soft ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, margin: "-12% 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

const containerVariants = (step: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

/** Parent for `StaggerItem` children. Drives one shared in-view trigger. */
export function Stagger({
  children,
  className,
  step = 0.07,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
  as?: MotionTag;
}) {
  const reduced = useReducedMotion();

  if (reduced) return createElement(as, { className }, children);

  const Tag = TAGS[as];

  return (
    <Tag
      className={className}
      variants={containerVariants(step, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
    >
      {children}
    </Tag>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
}) {
  const reduced = useReducedMotion();

  if (reduced) return createElement(as, { className }, children);

  const Tag = TAGS[as];

  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  );
}

/**
 * Word-by-word mask reveal for headlines. Each word sits in an
 * `overflow-hidden` wrapper so it slides up from behind its own baseline —
 * a genuine mask reveal, not a fade dressed up as one.
 *
 * `trigger="load"` animates on mount (hero); `trigger="view"` waits for scroll.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  step = 0.045,
  trigger = "load",
  as = "span",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  step?: number;
  trigger?: "load" | "view";
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return createElement(as, { className }, text);

  const motionProps =
    trigger === "load"
      ? { animate: { y: "0%", opacity: 1 } }
      : {
          whileInView: { y: "0%", opacity: 1 },
          viewport: { once: true, margin: "-12% 0px" },
        };

  return createElement(
    as,
    { className, "aria-label": text },
    words.map((word, index) => (
      <span
        key={`${word}-${index}`}
        aria-hidden="true"
        className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
      >
        <motion.span
          className={cn("inline-block", wordClassName)}
          initial={{ y: "110%", opacity: 0 }}
          {...motionProps}
          transition={{ duration: 0.9, delay: delay + index * step, ease: EASE }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      </span>
    )),
  );
}

/** Simple mount fade/slide for above-the-fold content (no scroll trigger). */
export function Entrance({
  children,
  className,
  delay = 0,
  y = 18,
  duration = 0.7,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Editorial image/visual reveal: the container unclips from the bottom while
 * the content settles back from a 1.06 scale. Both properties are composited,
 * so this stays cheap even on a grid of cards.
 */
export function ClipReveal({
  children,
  className,
  innerClassName,
  delay = 0,
  duration = 1,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={className}>
        <div className={innerClassName}>{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      <motion.div
        className={innerClassName}
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: duration + 0.2, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
