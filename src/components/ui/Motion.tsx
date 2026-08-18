import { createElement, Fragment, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's entrance language, in one place.
 *
 * These are **server components**. Every reveal here is a CSS transition or
 * keyframe declared in globals.css; the only JavaScript involved is the single
 * shared IntersectionObserver in `<RevealObserver />`, which adds `.rv-in` to
 * an element once and then stops watching it.
 *
 * The previous implementation wrapped each of these in a Framer Motion
 * component with its own `whileInView` viewport observer. On a 4x-throttled
 * mobile CPU that measured 20s of style recalculation, 2.4s of total blocking
 * time and 75 dropped frames in a single page scroll, because it produced 191
 * JS-written inline styles and 72 `filter` layers. Same choreography, none of
 * that cost — and because nothing here needs hooks, the sections that use them
 * no longer have to be client components.
 *
 * Durations and delays are expressed in seconds at the call site (matching the
 * old Motion API) and converted to CSS `ms` custom properties here.
 */

/** Expo-out. Still exported: pointer-driven Motion code shares this curve. */
export const EASE = [0.16, 1, 0.3, 1] as const;

type Tag =
  | "div"
  | "section"
  | "article"
  | "ul"
  | "ol"
  | "li"
  | "span"
  | "p"
  | "h2"
  | "h3"
  | "header"
  | "figure";

export type MotionTag = Tag;

type Direction = "up" | "down" | "left" | "right" | "none";

const ms = (seconds: number) => `${Math.round(seconds * 1000)}ms`;

/** Only emits the custom properties that differ from the stylesheet default. */
function revealVars(delay: number, duration?: number): CSSProperties {
  const style: Record<string, string> = {};
  if (delay) style["--rv-delay"] = ms(delay);
  if (duration !== undefined) style["--rv-duration"] = ms(duration);
  return style as CSSProperties;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  scale?: boolean;
  /** Adds a short blur-to-clear pass. Fine-pointer devices only. */
  soft?: boolean;
  as?: Tag;
  /** Retained for API compatibility — reveals never replay. */
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration,
  direction = "up",
  scale = false,
  soft = false,
  as = "div",
}: RevealProps) {
  const style = revealVars(delay, duration) as Record<string, string>;
  if (scale) style["--rv-scale"] = "0.97";

  return createElement(
    as,
    {
      className,
      "data-reveal": direction,
      ...(soft ? { "data-reveal-soft": "" } : {}),
      ...(Object.keys(style).length ? { style } : {}),
    },
    children,
  );
}

/**
 * Parent for `StaggerItem` children. One observer trigger for the whole group;
 * the per-child offset comes from `nth-child` rules, not from JavaScript.
 */
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
  as?: Tag;
}) {
  const style: Record<string, string> = {};
  if (step !== 0.07) style["--rv-step"] = ms(step);
  if (delay) style["--rv-base"] = ms(delay);

  return createElement(
    as,
    {
      className,
      "data-stagger": "",
      ...(Object.keys(style).length ? { style } : {}),
    },
    children,
  );
}

/**
 * A direct child of `Stagger`. Carries no reveal state of its own — the
 * stylesheet targets `[data-stagger] > *`, so this is just the element.
 */
export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  return createElement(as, { className }, children);
}

/**
 * Word-by-word mask reveal for headlines. Each word sits in an
 * `overflow-hidden` wrapper so it slides up from behind its own baseline.
 *
 * `trigger="load"` runs as soon as the words paint — no observer, no
 * hydration wait. `trigger="view"` holds the keyframe paused until the
 * headline scrolls in.
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
  const words = text.split(" ");

  return createElement(
    as,
    { className, "aria-label": text, "data-words": trigger },
    words.map((word, index) => (
      // The separating space lives *outside* the clipping wrapper: trailing
      // whitespace inside an inline-block is dropped at the end of the line
      // box, which would run every word together.
      <Fragment key={`${word}-${index}`}>
        <span
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
        >
          <span
            data-word=""
            className={cn("inline-block", wordClassName)}
            style={{ "--rv-delay": ms(delay + index * step) } as CSSProperties}
          >
            {word}
          </span>
        </span>
        {index < words.length - 1 ? " " : null}
      </Fragment>
    )),
  );
}

/** Mount fade/slide for above-the-fold content (no scroll trigger). */
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
  const style: Record<string, string> = { "--rv-duration": ms(duration) };
  if (delay) style["--rv-delay"] = ms(delay);
  if (y !== 18) style["--rv-y"] = `${y}px`;

  return (
    <div className={className} data-entrance="" style={style as CSSProperties}>
      {children}
    </div>
  );
}

/**
 * Editorial visual reveal: the container unclips from the bottom while the
 * content settles back from a 1.06 scale.
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
  const style: Record<string, string> = {};
  if (delay) style["--rv-delay"] = ms(delay);
  if (duration !== 1) style["--rv-duration"] = ms(duration);

  return (
    <div
      className={cn("overflow-hidden", className)}
      data-clip=""
      style={style as CSSProperties}
    >
      <div className={innerClassName} data-clip-inner="">
        {children}
      </div>
    </div>
  );
}
