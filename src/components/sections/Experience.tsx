"use client";

import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Award, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { useRef } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, education, experience, type Credential } from "@/data/experience";
import { cn } from "@/lib/utils";

export function Experience() {
  const reduced = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  // The rail fills as the timeline passes through the middle of the viewport.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 78%", "end 60%"],
  });
  const railScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title={
            <span id="experience-heading">
              Professional{" "}
              <span className="text-gradient">engineering experience</span>
            </span>
          }
          description="Building and maintaining full-stack products that run in production."
        />

        {/* ---------------------------------------------------------- Timeline */}
        <div ref={timelineRef} className="relative mt-14 sm:mt-16">
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[15px] w-px bg-line sm:left-[19px]"
          >
            <motion.div
              className="timeline-line h-full w-full origin-top"
              style={reduced ? { transform: "scaleY(1)" } : { scaleY: railScale }}
            />
          </div>

          <ol className="flex flex-col gap-12">
            {experience.map((entry) => (
              <TimelineEntry key={`${entry.company}-${entry.role}`} entry={entry} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({ entry }: { entry: (typeof experience)[number] }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  // "Active" while the entry occupies the reading band — drives the node glow.
  const inView = useInView(ref, { margin: "-30% 0px -40% 0px" });
  const active = reduced || inView;

  return (
    <li ref={ref} className="relative pl-11 sm:pl-16">
      {/* Node */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1 left-0 grid size-8 place-items-center rounded-full border bg-base sm:size-10",
          "transition-[border-color,box-shadow] duration-700",
          active
            ? "border-accent/50 shadow-[0_0_0_6px_var(--accent-soft)]"
            : "border-line",
        )}
      >
        <span
          className={cn(
            "grid size-full place-items-center rounded-full transition-colors duration-700",
            active ? "bg-accent-soft text-accent" : "bg-base-deep/60 text-ink-subtle",
          )}
        >
          <Briefcase className="size-3.5 sm:size-4" strokeWidth={1.75} />
        </span>
      </span>

      <Reveal direction="up" soft>
        <article
          className={cn(
            "group relative overflow-hidden rounded-2xl border bg-surface p-5 shadow-card sm:p-7",
            "transition-[border-color,box-shadow] duration-700",
            active ? "border-line-strong shadow-lift" : "border-line",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-accent/45 to-transparent transition-opacity duration-700",
              active ? "opacity-100" : "opacity-0",
            )}
          />

          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
            <div className="min-w-0">
              <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                {entry.company ?? entry.role}
              </h3>
              {entry.company ? (
                <p className="mt-1 text-[15px] font-medium text-accent sm:text-base">
                  {entry.role}
                </p>
              ) : null}
            </div>

            <div className="flex shrink-0 flex-col gap-1.5 sm:items-end">
              <span className="inline-flex items-center rounded-full border border-line bg-base-deep/60 px-3 py-1 font-mono text-[11px] tracking-tight text-ink-muted">
                {entry.period}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-subtle">
                <MapPin className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                {entry.mode}
              </span>
            </div>
          </div>

          <p className="mt-5 max-w-3xl leading-relaxed text-ink-muted text-pretty">
            {entry.summary}
          </p>

          <Stagger step={0.055} className="mt-6 flex flex-col gap-3">
            {entry.highlights.map((highlight) => (
              <StaggerItem key={highlight}>
                <div className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70"
                  />
                  <p className="text-[14px] leading-relaxed text-ink-muted text-pretty sm:text-[15px]">
                    {highlight}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
            {entry.stack.map((tech) => (
              <li key={tech}>
                <span className="inline-flex items-center rounded-full border border-line bg-base-deep/50 px-2.5 py-1 font-mono text-[11px] tracking-tight text-ink-muted transition-colors duration-300 hover:border-accent/40 hover:text-ink">
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </li>
  );
}

/** Education and certifications, kept as their own clean section. */
export function Credentials() {
  return (
    <section
      aria-labelledby="credentials-heading"
      className="relative px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <h2
              id="credentials-heading"
              className="font-mono text-[11px] tracking-[0.2em] text-ink-subtle uppercase"
            >
              Education &amp; Certifications
            </h2>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
          <CredentialCard title="Education" icon={GraduationCap} items={education} delay={0} />
          <CredentialCard
            title="Certifications"
            icon={Award}
            items={certifications}
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
}

function CredentialCard({
  title,
  icon: Icon,
  items,
  delay,
}: {
  title: string;
  icon: typeof GraduationCap;
  items: Credential[];
  delay: number;
}) {
  return (
    <Reveal direction="up" delay={delay} className="h-full">
      <div
        className={cn(
          "group h-full rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6",
          "transition-[border-color,box-shadow,transform] duration-500",
          "hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift",
        )}
      >
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl border border-line bg-base-deep/60 text-accent transition-colors duration-500 group-hover:border-accent/40 group-hover:bg-accent-soft">
            <Icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h3 className="font-display text-[15px] font-semibold tracking-tight">
            {title}
          </h3>
        </div>

        <ul className="mt-5 flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.qualification} className="border-l border-line pl-4">
              <p className="text-[14.5px] leading-snug font-medium tracking-tight text-pretty">
                {item.qualification}
              </p>
              <p className="mt-1 text-[13px] text-ink-subtle text-pretty">
                {item.institution}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
