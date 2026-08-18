"use client";

import { ArrowUpRight } from "lucide-react";
import { AuraBackdrop } from "@/components/ui/Backdrops";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, type Service } from "@/data/services";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative scroll-mt-24 overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <AuraBackdrop position="center" className="opacity-30 dark:opacity-50" />

      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          index="06"
          eyebrow="Services"
          title={<span id="services-heading">What I Build</span>}
          description="The kinds of systems I'm brought in for — and what I make sure gets designed in rather than retrofitted."
        />

        <ul className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.title}>
              <Reveal direction="up" delay={index * 0.07} className="h-full">
                <ServiceCard service={service} index={index} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <GlowCard className="h-full" radius={280}>
      <div className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-12 place-items-center rounded-2xl border border-line bg-base-deep/60 text-accent transition-all duration-500 group-hover/card:border-accent/45 group-hover/card:bg-accent-soft group-hover/card:shadow-[0_0_0_5px_var(--accent-soft)]">
            <Icon
              className="size-5 transition-transform duration-500 group-hover/card:-translate-y-0.5 group-hover/card:scale-110"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </span>

          <span
            aria-hidden="true"
            className="font-mono text-[11px] text-ink-subtle/70 transition-colors duration-500 group-hover/card:text-accent"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-6 font-display text-lg font-semibold tracking-tight sm:text-xl">
          {service.title}
        </h3>
        <p className="mt-2 text-[14.5px] leading-relaxed font-medium text-ink">
          {service.description}
        </p>
        <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-muted text-pretty">
          {service.detail}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
          {service.points.map((point) => (
            <li key={point}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-base-deep/50 px-2.5 py-1 font-mono text-[10.5px] text-ink-subtle transition-colors duration-500 group-hover/card:border-line-strong">
                <span
                  aria-hidden="true"
                  className="size-1 rounded-full bg-accent/70 transition-transform duration-500 group-hover/card:scale-150"
                />
                {point}
              </span>
            </li>
          ))}
        </ul>

        <ArrowUpRight
          aria-hidden="true"
          className="mt-5 size-4 self-end text-ink-subtle opacity-0 transition-all duration-500 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-accent group-hover/card:opacity-100"
        />
      </div>
    </GlowCard>
  );
}
