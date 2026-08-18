"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  ExternalLink,
  Layers,
  Lightbulb,
  Lock,
  Target,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import {
  ProjectMockup,
  VIEWS,
  useLayerRotation,
} from "@/components/sections/project/ProjectMockup";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProject } from "@/data/projects";
import { cn } from "@/lib/utils";

export function FeaturedProject() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const { activeId, select } = useLayerRotation(hovered);
  const mockupRef = useRef<HTMLDivElement>(null);

  // The mockup settles into place as the section scrolls in.
  const { scrollYProgress } = useScroll({
    target: mockupRef,
    offset: ["start 90%", "start 45%"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const mockupScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section
      id="projects"
      aria-labelledby="featured-heading"
      className="relative scroll-mt-24 overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-line-strong to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          index="04"
          eyebrow="Featured case study"
          title={
            <span id="featured-heading">
              A SaaS platform built on{" "}
              <span className="text-gradient">clean architecture</span>
            </span>
          }
          description={featuredProject.tagline}
        />

        {/* ------------------------------------------------------ Hero of case */}
        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
          <div className="lg:col-span-5">
            <Reveal direction="right" soft>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  {featuredProject.name}
                </h3>
                <a
                  href={featuredProject.links.live ?? "#"}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex min-h-8 items-center rounded-full border border-line bg-base-deep/60 px-3 py-1.5 font-mono text-[11px] text-ink-muted transition-colors duration-300 hover:border-accent/45 hover:text-ink"
                >
                  {featuredProject.domain}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ml-1 inline size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
              <p className="mt-2 text-[13px] tracking-[0.14em] text-ink-subtle uppercase">
                {featuredProject.category}
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.08}>
              <p className="mt-6 leading-relaxed text-ink-muted text-pretty">
                {featuredProject.overview}
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.14}>
              <div className="mt-7 flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent-soft text-accent">
                  <UserRound className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-ink-subtle uppercase">
                    My role
                  </p>
                  <p className="mt-0.5 text-[14.5px] font-medium tracking-tight">
                    {featuredProject.role}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.2}>
              <ul className="mt-6 flex flex-wrap gap-2">
                {featuredProject.stack.map((tech) => (
                  <li key={tech}>
                    <span className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] tracking-tight text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-ink">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal direction="right" delay={0.26}>
              <ProjectLinks />
            </Reveal>
          </div>

          {/* -------------------------------------------------------- Mockup */}
          <div className="lg:col-span-7">
            <motion.div
              ref={mockupRef}
              style={
                reduced
                  ? undefined
                  : { y: mockupY, scale: mockupScale, opacity: mockupOpacity }
              }
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <ProjectMockup activeId={activeId} onSelect={select} />
            </motion.div>
          </div>
        </div>

        {/* --------------------------------------------- Contributions summary */}
        <div className="mt-20 sm:mt-24">
          <Reveal>
            <SubHeading icon={Target} label="What I built" />
          </Reveal>
          <Stagger step={0.08} className="mt-6 grid gap-3 md:grid-cols-3">
            {featuredProject.contributions.map((contribution, index) => (
              <StaggerItem key={contribution}>
                <GlowCard className="h-full" radius={240}>
                  <div className="flex h-full flex-col gap-3 p-5 sm:p-6">
                    <span className="font-mono text-[10.5px] text-accent/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14px] leading-relaxed text-ink-muted text-pretty sm:text-[14.5px]">
                      {contribution}
                    </p>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* ------------------------------------------------- Problem / Solution */}
        <div className="mt-16 grid gap-4 sm:mt-20 md:grid-cols-2 md:gap-5">
          <CaseCard
            icon={Target}
            label="The problem"
            body={featuredProject.problem}
            tone="warning"
            delay={0}
          />
          <CaseCard
            icon={Lightbulb}
            label="The solution"
            body={featuredProject.solution}
            tone="accent"
            delay={0.08}
          />
        </div>

        {/* ------------------------------------------------------- Architecture */}
        <div className="mt-16 sm:mt-20">
          <Reveal>
            <SubHeading icon={Layers} label="Architecture" />
          </Reveal>

          <Stagger step={0.06} className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProject.architecture.map((layer, index) => {
              const Icon = layer.icon;
              return (
                <StaggerItem key={layer.label}>
                  <GlowCard className="h-full" radius={220}>
                    <div className="flex h-full flex-col gap-3 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="grid size-9 place-items-center rounded-xl border border-line bg-base-deep/60 text-accent transition-colors duration-500 group-hover/card:border-accent/45 group-hover/card:bg-accent-soft">
                          <Icon className="size-4.5" strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <span className="font-mono text-[10.5px] text-ink-subtle/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h4 className="font-display text-[15px] font-semibold tracking-tight">
                        {layer.label}
                      </h4>
                      <p className="text-[13.5px] leading-relaxed text-ink-muted text-pretty">
                        {layer.detail}
                      </p>
                    </div>
                  </GlowCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* -------------------------------------------------- Key functionality */}
        <div className="mt-16 sm:mt-20">
          <Reveal>
            <SubHeading icon={Layers} label="Key functionality" />
          </Reveal>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProject.capabilities.map((capability, index) => {
              const Icon = capability.icon;
              const layer = VIEWS[index % VIEWS.length];
              return (
                <li key={capability.name}>
                  <Reveal delay={index * 0.05} className="h-full">
                    <button
                      type="button"
                      onClick={() => select(layer.id)}
                      className={cn(
                        "group flex h-full w-full flex-col gap-3 rounded-2xl border border-line bg-surface p-5 text-left",
                        "transition-[border-color,transform,box-shadow] duration-500",
                        "hover:-translate-y-1 hover:border-line-strong hover:shadow-lift",
                      )}
                    >
                      <span className="grid size-10 place-items-center rounded-xl border border-line bg-base-deep/60 text-ink-muted transition-all duration-500 group-hover:border-accent/45 group-hover:bg-accent-soft group-hover:text-accent">
                        <Icon
                          className="size-4.5 transition-transform duration-500 group-hover:scale-110"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="block font-display text-[15px] font-semibold tracking-tight">
                        {capability.name}
                      </span>
                      <span className="block text-[13.5px] leading-relaxed text-ink-muted text-pretty">
                        {capability.description}
                      </span>
                    </button>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        {/* -------------------------------------------------------------- Result */}
        <div className="mt-16 sm:mt-20">
          <CaseCard
            icon={TrendingUp}
            label="The result"
            body={featuredProject.outcome}
            tone="accent"
            delay={0}
          />
        </div>
      </div>
    </section>
  );
}

function SubHeading({ icon: Icon, label }: { icon: typeof Layers; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="size-4 text-accent" strokeWidth={1.75} aria-hidden="true" />
      <h3 className="font-mono text-[11px] tracking-[0.2em] text-ink-subtle uppercase">
        {label}
      </h3>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  );
}

function ProjectLinks() {
  const { links } = featuredProject;

  return (
    <div className="mt-8 flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <LinkSlot
          href={links.live}
          label="Live Site"
          icon={<ExternalLink className="size-4" strokeWidth={1.75} aria-hidden="true" />}
          primary
        />
        <LinkSlot
          href={links.github}
          label="GitHub"
          icon={<GithubIcon className="size-4" aria-hidden="true" />}
        />
      </div>
      {links.note ? (
        <p className="flex items-center gap-2 text-[12.5px] text-ink-subtle">
          <Lock className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          {links.note}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Renders a real link when one exists and an explicitly disabled control when
 * it does not — never a fabricated URL.
 */
function LinkSlot({
  href,
  label,
  icon,
  primary = false,
}: {
  href: string | null;
  label: string;
  icon: ReactNode;
  primary?: boolean;
}) {
  const base =
    "inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-medium transition-all duration-300";

  if (!href) {
    return (
      <span
        aria-disabled="true"
        title="Not publicly available"
        className={cn(
          base,
          "cursor-not-allowed border border-dashed border-line text-ink-subtle",
        )}
      >
        {icon}
        {label}
        <span className="font-mono text-[10px] tracking-wider uppercase">private</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        base,
        "group",
        primary
          ? "bg-ink text-base hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-14px_var(--accent-glow)]"
          : "border border-line-strong text-ink hover:-translate-y-0.5 hover:border-accent/50",
      )}
    >
      {icon}
      {label}
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

function CaseCard({
  icon: Icon,
  label,
  body,
  tone,
  delay,
}: {
  icon: typeof Target;
  label: string;
  body: string;
  tone: "warning" | "accent";
  delay: number;
}) {
  return (
    <Reveal direction="up" delay={delay} soft className="h-full">
      <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-card transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-lift sm:p-8">
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-24 -right-16 size-48 rounded-full blur-3xl transition-opacity duration-700",
            tone === "warning"
              ? "bg-amber-500/10 group-hover:bg-amber-500/15"
              : "bg-accent/15 group-hover:bg-accent/25",
          )}
        />
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "grid size-9 place-items-center rounded-xl border",
              tone === "warning"
                ? "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-300"
                : "border-accent/30 bg-accent-soft text-accent",
            )}
          >
            <Icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h3 className="font-mono text-[11px] tracking-[0.2em] text-ink-subtle uppercase">
            {label}
          </h3>
        </div>
        <p className="mt-5 leading-relaxed text-ink-muted text-pretty">{body}</p>
      </div>
    </Reveal>
  );
}
