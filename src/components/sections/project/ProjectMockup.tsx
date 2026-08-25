"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { featuredProject } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Architecture viewer for the featured case study.
 *
 * The source is private, so rather than mocking up fake application screens
 * with invented business data this shows the *engineering* the case study
 * describes: the API layer, the access control on it, the Redis cache in front
 * of it and the containerised deployment behind it. Nothing here claims to be
 * a screenshot.
 */

type Row = { label: string; value: string; tone: Tone };
type Tone = "accent" | "positive" | "warning" | "neutral";

const TONE_CLASS: Record<Tone, string> = {
  accent: "bg-accent-soft text-accent border-accent/30",
  // -800 rather than -700: at 9px these pills need 4.5:1, and -700 sat at
  // 4.87-5.11:1 fully opaque — no headroom while the entrance is still fading.
  positive:
    "bg-emerald-500/10 text-emerald-800 border-emerald-500/25 dark:text-emerald-300",
  warning: "bg-amber-500/10 text-amber-800 border-amber-500/25 dark:text-amber-300",
  neutral: "bg-base-deep text-ink-subtle border-line",
};

type View = {
  id: string;
  label: string;
  path: string;
  caption: string;
  nav: string[];
  rows: Row[];
  /** Relative weights for the layer diagram. */
  bars: { label: string; weight: number }[];
};

export const VIEWS: View[] = [
  {
    id: "api",
    label: "REST API",
    path: "nestjs / modules",
    caption: "Scalable NestJS REST APIs serving core platform features",
    nav: ["Controllers", "Services", "Modules", "DTOs", "Guards"],
    rows: [
      { label: "GET  /resources", value: "controller → service", tone: "positive" },
      { label: "POST /resources", value: "validated payload", tone: "accent" },
      { label: "PATCH /resources/:id", value: "guarded route", tone: "warning" },
    ],
    bars: [
      { label: "Controller", weight: 46 },
      { label: "Service", weight: 72 },
      { label: "Repository", weight: 58 },
      { label: "Database", weight: 40 },
    ],
  },
  {
    id: "auth",
    label: "Auth",
    path: "auth / guards",
    caption: "Secure authentication and authorization on protected features",
    nav: ["Sign in", "Sessions", "Guards", "Roles", "Protected routes"],
    rows: [
      { label: "Authentication", value: "credentials verified", tone: "positive" },
      { label: "Authorization", value: "route guard applied", tone: "accent" },
      { label: "Unauthorised request", value: "rejected", tone: "warning" },
    ],
    bars: [
      { label: "Request", weight: 40 },
      { label: "Auth guard", weight: 78 },
      { label: "Handler", weight: 54 },
      { label: "Response", weight: 44 },
    ],
  },
  {
    id: "cache",
    label: "Redis cache",
    path: "cache / redis",
    caption: "Redis caching in front of frequently accessed data",
    nav: ["Cache keys", "TTL", "Invalidation", "Hot paths"],
    rows: [
      { label: "Frequent read", value: "served from cache", tone: "positive" },
      { label: "Cache miss", value: "falls through to db", tone: "accent" },
      { label: "Write", value: "cache invalidated", tone: "warning" },
    ],
    bars: [
      { label: "Client", weight: 38 },
      { label: "API", weight: 60 },
      { label: "Redis", weight: 82 },
      { label: "Postgres", weight: 46 },
    ],
  },
  {
    id: "deploy",
    label: "Deployment",
    path: "docker / deploy",
    caption: "Containerised services, deployed to match local development",
    nav: ["Dockerfile", "Images", "Containers", "Cloud deploy"],
    rows: [
      { label: "Build image", value: "docker", tone: "accent" },
      { label: "Run container", value: "parity with local", tone: "positive" },
      { label: "Deploy", value: "containerised services", tone: "positive" },
    ],
    bars: [
      { label: "Source", weight: 42 },
      { label: "Image", weight: 64 },
      { label: "Container", weight: 76 },
      { label: "Cloud", weight: 70 },
    ],
  },
];

export function ProjectMockup({
  activeId,
  onSelect,
  className,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const view = VIEWS.find((v) => v.id === activeId) ?? VIEWS[0];

  return (
    <div className={cn("group/mockup relative", className)}>
      <div
        aria-hidden="true"
        className="glow-accent pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-0 transition-opacity duration-700 group-hover/mockup:opacity-100"
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-line bg-surface shadow-lift",
          "transition-transform duration-700 ease-out-expo",
          "motion-safe:group-hover/mockup:-translate-y-1.5",
        )}
      >
        {/* Window chrome ------------------------------------------------- */}
        <div className="flex items-center gap-2 border-b border-line bg-base-deep/70 px-3 py-2.5 sm:gap-3 sm:px-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff5f57]/70" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/70" />
            <span className="size-2.5 rounded-full bg-[#28c840]/70" />
          </div>

          <div className="ml-1 flex min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-surface/80 px-2.5 py-1.5">
            <Lock
              className="size-3 shrink-0 text-emerald-500"
              strokeWidth={2}
              aria-hidden="true"
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={view.path}
                initial={reduced ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.22 }}
                className="truncate font-mono text-[10px] text-ink-subtle sm:text-[11px]"
              >
                {view.path}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Layer tabs ---------------------------------------------------- */}
        <div
          role="tablist"
          aria-label="Architecture layers"
          className="scrollbar-none flex gap-1 overflow-x-auto border-b border-line bg-base-deep/40 px-2 py-1.5"
        >
          {VIEWS.map((item) => {
            const isActive = item.id === view.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelect(item.id)}
                className={cn(
                  "relative inline-flex min-h-8 shrink-0 items-center rounded-md px-3 py-1.5 text-[11px] font-medium whitespace-nowrap transition-colors duration-300 sm:text-[12px]",
                  isActive ? "text-ink" : "text-ink-subtle hover:text-ink",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="mockup-tab"
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-md border border-line bg-surface"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                  />
                ) : null}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Body ---------------------------------------------------------- */}
        <div className="flex min-h-[320px] sm:min-h-[360px]">
          <aside className="hidden w-40 shrink-0 border-r border-line bg-base-deep/30 p-3 sm:block lg:w-44">
            <div className="mb-4 flex items-center gap-2 px-1">
              <span className="grid size-6 place-items-center rounded-md bg-accent text-[10px] font-bold text-accent-ink">
                {featuredProject.name.charAt(0)}
              </span>
              <span className="text-[11px] font-semibold tracking-tight">
                {featuredProject.name}
              </span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={view.id}
                initial={reduced ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: 6 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-0.5"
              >
                {view.nav.map((item, index) => (
                  <li key={item}>
                    <span
                      className={cn(
                        "block truncate rounded-md px-2 py-1.5 text-[11px] transition-colors",
                        index === 0
                          ? "bg-accent-soft font-medium text-accent"
                          : "text-ink-subtle",
                      )}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </aside>

          <div className="min-w-0 flex-1 p-3 sm:p-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={view.id}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-3"
              >
                <div>
                  <p className="text-[13px] font-semibold tracking-tight sm:text-sm">
                    {view.label}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-ink-muted text-pretty">
                    {view.caption}
                  </p>
                </div>

                {/* Layer flow */}
                <div className="rounded-lg border border-line bg-base-deep/40 p-3">
                  <ul className="flex items-end justify-between gap-1.5 sm:gap-2">
                    {view.bars.map((bar, index) => (
                      <li key={bar.label} className="flex w-full flex-col items-center gap-1.5">
                        <motion.span
                          aria-hidden="true"
                          className="w-full origin-bottom rounded-t-[3px] bg-linear-to-t from-accent/20 to-accent"
                          style={{ height: `${Math.round(bar.weight * 0.7)}px` }}
                          initial={reduced ? false : { scaleY: 0.06, opacity: 0.4 }}
                          animate={{ scaleY: 1, opacity: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: reduced ? 0 : 0.08 + index * 0.07,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                        <span className="w-full truncate text-center font-mono text-[8.5px] text-ink-muted sm:text-[9.5px]">
                          {bar.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rows */}
                <ul className="flex flex-col gap-1.5">
                  {view.rows.map((row, index) => (
                    <motion.li
                      key={row.label}
                      initial={reduced ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: reduced ? 0 : 0.18 + index * 0.06,
                      }}
                      className="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface px-2.5 py-2"
                    >
                      <span className="truncate font-mono text-[10px] tracking-tight sm:text-[11px]">
                        {row.label}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-medium whitespace-nowrap sm:text-[9.5px]",
                          TONE_CLASS[row.tone],
                        )}
                      >
                        {row.value}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-[10px] tracking-tight text-ink-subtle sm:text-left">
        Architecture diagram — illustrative, not a product screenshot.
      </p>
    </div>
  );
}

/**
 * Cycles through the layers until the visitor interacts, so the section
 * demonstrates itself without demanding a click.
 */
export function useLayerRotation(paused: boolean) {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState(VIEWS[0].id);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (reduced || manual || paused) return;
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const index = VIEWS.findIndex((v) => v.id === current);
        return VIEWS[(index + 1) % VIEWS.length].id;
      });
    }, 4400);
    return () => window.clearInterval(timer);
  }, [reduced, manual, paused]);

  const select = (id: string) => {
    setManual(true);
    setActiveId(id);
  };

  return { activeId, select };
}
