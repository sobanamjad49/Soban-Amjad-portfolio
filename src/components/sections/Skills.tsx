"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LayoutGrid } from "lucide-react";
import { useMemo, useState } from "react";
import { SkillCard } from "@/components/sections/skills/SkillCard";
import { AuraBackdrop } from "@/components/ui/Backdrops";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories, type Skill } from "@/data/skills";
import { cn } from "@/lib/utils";

type FilterId = "all" | (typeof skillCategories)[number]["id"];

const FILTERS = [
  { id: "all" as const, title: "All", icon: LayoutGrid, caption: "The full toolkit" },
  ...skillCategories.map((c) => ({
    id: c.id,
    title: c.title,
    icon: c.icon,
    caption: c.caption,
  })),
];

export function Skills() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<FilterId>("all");

  const visible = useMemo<Array<Skill & { group: string }>>(() => {
    return skillCategories
      .filter((category) => filter === "all" || category.id === filter)
      .flatMap((category) =>
        category.skills.map((skill) => ({ ...skill, group: category.title })),
      );
  }, [filter]);

  const activeCaption =
    FILTERS.find((item) => item.id === filter)?.caption ?? FILTERS[0].caption;

  return (
    <section
      data-cv="skills"
      id="skills"
      aria-labelledby="skills-heading"
      className="relative scroll-mt-24 overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <AuraBackdrop position="top" className="opacity-40 dark:opacity-60" />

      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title={
            <span id="skills-heading">
              The stack I reach for,{" "}
              <span className="text-gradient">and why</span>
            </span>
          }
          description="Tools are only worth listing if you know when not to use them. These are the ones I've shipped with in production."
        />

        {/* ------------------------------------------------------------ Filter */}
        <Reveal delay={0.1} className="mt-10 sm:mt-12">
          <div className="flex flex-col gap-4">
            <div
              role="tablist"
              aria-label="Filter skills by category"
              className="mask-fade-x -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 scrollbar-none"
            >
              {FILTERS.map((item) => {
                const Icon = item.icon;
                const isActive = filter === item.id;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setFilter(item.id as FilterId)}
                    className={cn(
                      "group relative inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4",
                      "text-[13px] font-medium whitespace-nowrap transition-colors duration-300",
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="skill-filter-pill"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-surface shadow-card"
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 400, damping: 34 }
                        }
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full border border-line opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    )}
                    <Icon
                      className={cn(
                        "size-4 transition-colors duration-300",
                        isActive ? "text-accent" : "text-ink-subtle",
                      )}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {item.title}
                  </button>
                );
              })}
            </div>

            <p
              aria-live="polite"
              className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase"
            >
              {activeCaption} · {visible.length} technologies
            </p>
          </div>
        </Reveal>

        {/* -------------------------------------------------------------- Grid */}
        {/* AnimatePresence `initial={false}` keeps the first paint static — the
            grid fades in once via the Reveal wrapper, and only filter changes
            animate individual cards. */}
        <Reveal delay={0.16} className="mt-8 sm:mt-10">
        <motion.ul
          layout={!reduced}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((skill, index) => (
              <motion.li
                key={`${skill.group}-${skill.name}`}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, scale: 0.94, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.94 }}
                transition={{
                  duration: 0.42,
                  delay: reduced ? 0 : Math.min(index * 0.028, 0.3),
                  ease: [0.16, 1, 0.3, 1],
                  layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <SkillCard skill={skill} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        </Reveal>
      </div>
    </section>
  );
}
