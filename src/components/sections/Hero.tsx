"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowRight, Download, Mail, MapPin, Sparkles } from "lucide-react";
import { useCallback, useRef, type MouseEvent } from "react";
import { CodePanel, TiltWrapper } from "@/components/sections/hero/CodePanel";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { IconLink, MagneticButton } from "@/components/ui/Button";
import { Entrance, TextReveal } from "@/components/ui/Motion";
import { heroStats, site } from "@/data/site";
import { marqueeTech } from "@/data/skills";
import { cn } from "@/lib/utils";

/** Technologies here are all listed on the résumé. */
const FLOATING_BADGES = [
  { label: "TypeScript", className: "-top-4 -left-6 sm:-left-10", delay: 1.2 },
  { label: "NestJS", className: "top-1/3 -right-5 sm:-right-9", delay: 1.35 },
  { label: "PostgreSQL", className: "-bottom-5 left-6 sm:left-10", delay: 1.5 },
  { label: "Docker", className: "-bottom-4 -right-3 sm:-right-6", delay: 1.65 },
];

export function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  /**
   * Pointer position drives the ambient spotlight — motion values only, so
   * moving the mouse never re-renders the section.
   *
   * These are pixel offsets rather than the 0-1 fractions used previously,
   * because the spotlight is now *translated* instead of having its gradient
   * re-declared. Rewriting a `radial-gradient` position per frame repaints a
   * full-viewport layer; translating a fixed gradient is compositor-only.
   */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 60, damping: 22, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 60, damping: 22, mass: 0.6 });

  // Measured on enter, not per move: a rect read inside a mousemove handler
  // forces a synchronous layout on every pointer event.
  const bounds = useRef<DOMRect | null>(null);

  // Parallax drift for the floating badges, opposite to the pointer.
  const driftX = useTransform(smoothX, (v) => 14 - (v / (bounds.current?.width || 1)) * 28);
  const driftY = useTransform(smoothY, (v) => 10 - (v / (bounds.current?.height || 1)) * 20);

  const measure = useCallback(() => {
    if (reduced) return;
    bounds.current = sectionRef.current?.getBoundingClientRect() ?? null;
  }, [reduced]);

  const handlePointer = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const rect = bounds.current;
      if (!rect) return;
      pointerX.set(event.clientX - rect.left);
      pointerY.set(event.clientY - rect.top);
    },
    [pointerX, pointerY],
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseEnter={measure}
      onMouseMove={handlePointer}
      aria-label="Introduction"
      className="noise-overlay relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pt-28 pb-10 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36"
    >
      {/* Background layers ------------------------------------------------ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 bg-grid [mask-image:radial-gradient(ellipse_78%_62%_at_50%_28%,#000_10%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-56 left-1/2 -z-30 h-[620px] w-[min(1200px,150vw)] -translate-x-1/2 rounded-full aura opacity-80 dark:opacity-100"
      />
      {!reduced && (
        <motion.div
          aria-hidden="true"
          style={{ x: smoothX, y: smoothY }}
          className={cn(
            "pointer-events-none absolute top-0 left-0 -z-20 hidden size-[1360px] opacity-70 md:block",
            "-mt-[680px] -ml-[680px] will-change-transform",
          )}
        >
          <div className="size-full glow-accent" />
        </motion.div>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-64 bg-linear-to-t from-base to-transparent"
      />

      {/* Settles away as the reader scrolls past — a CSS view-progress
          timeline, so it costs the main thread nothing. */}
      <div className="hero-settle mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* ---------------------------------------------------- Left column */}
          {/* min-w-0 on both columns: a grid item defaults to a minimum of
              its own min-content, which lets one wide descendant widen the
              whole track. */}
          <div className="min-w-0 lg:col-span-7 xl:col-span-6">
            <Entrance delay={0.04} y={12}>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-4 pl-2 backdrop-blur-sm">
                <span className="relative flex size-5 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="absolute size-2 rounded-full bg-emerald-500"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute size-2 rounded-full bg-emerald-500 opacity-70 motion-safe:animate-ping"
                  />
                </span>
                <span className="text-[11.5px] font-medium tracking-tight text-ink-muted sm:text-xs">
                  {site.location} · {site.workMode}
                </span>
              </div>
            </Entrance>

            <h1 className="mt-6 sm:mt-8">
              <span className="sr-only">
                {site.name} — {site.role}
              </span>
              <span aria-hidden="true">
              <TextReveal
                text={site.name}
                delay={0.06}
                step={0.05}
                className={cn(
                  "block font-display font-semibold tracking-[-0.045em]",
                  "text-[clamp(2.75rem,12vw,4.25rem)] leading-[0.95]",
                  "sm:text-[clamp(3.5rem,9vw,5.5rem)] xl:text-[5.75rem]",
                )}
              />
              <TextReveal
                text="Software Engineer"
                delay={0.14}
                step={0.035}
                className={cn(
                  "mt-1.5 block font-display font-semibold tracking-[-0.04em] sm:mt-2.5",
                  "text-[clamp(1.5rem,6.6vw,2.25rem)] leading-[1.05]",
                  "sm:text-[clamp(2rem,4.6vw,3rem)] xl:text-[3.15rem]",
                )}
                wordClassName="text-gradient"
              />
              <TextReveal
                text="& Full-Stack Developer"
                delay={0.22}
                step={0.04}
                className={cn(
                  "block font-display font-semibold tracking-[-0.04em] text-ink-muted",
                  "text-[clamp(1.5rem,6.6vw,2.25rem)] leading-[1.15]",
                  "sm:text-[clamp(2rem,4.6vw,3rem)] xl:text-[3.15rem]",
                )}
              />
              </span>
            </h1>

            <Entrance delay={0.4}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-muted text-pretty sm:mt-7 sm:text-[17px]">
                {site.statement}
              </p>
            </Entrance>

            <Entrance delay={0.48}>
              <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <MagneticButton href="#projects" className="w-full sm:w-auto">
                  View My Work
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </MagneticButton>

                <MagneticButton
                  href={site.resume}
                  external
                  variant="secondary"
                  className="w-full sm:w-auto"
                  ariaLabel={`Download Resume — ${site.name} (PDF)`}
                >
                  <Download
                    aria-hidden="true"
                    className="size-4 text-accent transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                  Download Resume
                </MagneticButton>

                <MagneticButton
                  href="#contact"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  <Sparkles
                    aria-hidden="true"
                    className="size-4 text-accent transition-transform duration-500 group-hover:rotate-12"
                  />
                  Contact Me
                </MagneticButton>
              </div>
            </Entrance>

            <Entrance delay={0.56}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 sm:mt-9">
                <div className="flex items-center gap-2.5">
                  <IconLink href={site.github} label="GitHub profile">
                    <GithubIcon className="size-[17px] transition-transform duration-300 group-hover:scale-110" />
                  </IconLink>
                  <IconLink href={site.linkedin} label="LinkedIn profile">
                    <LinkedinIcon className="size-[17px] transition-transform duration-300 group-hover:scale-110" />
                  </IconLink>
                  <IconLink
                    href={`mailto:${site.email}`}
                    label={`Email ${site.name}`}
                    external={false}
                  >
                    <Mail
                      className="size-[18px] transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.75}
                    />
                  </IconLink>
                </div>

                <span aria-hidden="true" className="hidden h-6 w-px bg-line sm:block" />

                <span className="inline-flex items-center gap-1.5 text-[13px] text-ink-subtle">
                  <MapPin className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                  {site.location}
                </span>
              </div>
            </Entrance>
          </div>

          {/* --------------------------------------------------- Right column */}
          <div className="min-w-0 lg:col-span-5 xl:col-span-6">
            <Entrance delay={0.26} y={26} duration={0.7}>
              <div className="relative mx-auto max-w-[560px] lg:max-w-none">
                <TiltWrapper>
                  <CodePanel />
                </TiltWrapper>

                {/* Floating technology badges */}
                {FLOATING_BADGES.map((badge, index) => (
                  <motion.span
                    key={badge.label}
                    aria-hidden="true"
                    initial={reduced ? false : { opacity: 0, scale: 0.85, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: reduced ? 0 : badge.delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={reduced ? undefined : { x: driftX, y: driftY }}
                    className={cn(
                      "absolute z-10 hidden rounded-full border border-line bg-surface/85 px-3 py-1.5",
                      "font-mono text-[10.5px] tracking-tight text-ink-muted shadow-card",
                      "sm:block",
                      index % 2 === 0
                        ? "motion-safe:animate-[floatSlow_9s_ease-in-out_infinite]"
                        : "motion-safe:animate-[floatSlow_11s_ease-in-out_infinite_reverse]",
                      badge.className,
                    )}
                  >
                    {badge.label}
                  </motion.span>
                ))}

                {/* Glow beneath the panel */}
                <div
                  aria-hidden="true"
                  className="glow-accent pointer-events-none absolute -inset-x-10 -bottom-10 -z-10 h-32"
                />
              </div>
            </Entrance>
          </div>
        </div>

        {/* ------------------------------------------------------------ Stats */}
        <Entrance delay={0.64}>
          <dl className="mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-16 lg:mt-20">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="group bg-base px-3 py-5 text-center transition-colors duration-500 hover:bg-surface sm:px-6 sm:py-7 sm:text-left"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                    <span className="text-gradient">{stat.value}</span>
                  </span>
                  <span className="mt-1.5 block text-[11px] leading-snug text-ink-subtle sm:text-[13px]">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Entrance>
      </div>

      {/* --------------------------------------------------------- Tech rail */}
      <Entrance delay={0.72} className="mt-12 sm:mt-14">
        <div className="mask-fade-x relative overflow-hidden">
          <div className="flex w-max motion-safe:animate-marquee motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
              >
                {marqueeTech.map((tech) => (
                  <li
                    key={`${copy}-${tech}`}
                    className="font-mono text-[11px] tracking-[0.16em] whitespace-nowrap text-ink-subtle uppercase sm:text-xs"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Entrance>

      {/* --------------------------------------------------- Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="group mx-auto mt-10 hidden min-h-9 items-center gap-2 px-2 text-[11px] tracking-[0.18em] text-ink-subtle uppercase transition-colors hover:text-ink lg:inline-flex"
      >
        <span className="font-mono">Scroll</span>
        <span className="grid size-7 place-items-center rounded-full border border-line transition-colors group-hover:border-accent/60">
          <ArrowDown
            aria-hidden="true"
            className="size-3.5 transition-transform duration-500 group-hover:translate-y-0.5 motion-safe:animate-[floatSlow_2.4s_ease-in-out_infinite]"
          />
        </span>
      </motion.a>
    </section>
  );
}
