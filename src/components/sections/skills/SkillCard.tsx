"use client";

import type { Skill } from "@/data/skills";
import { GlowCard } from "@/components/ui/GlowCard";

export function SkillCard({ skill }: { skill: Skill }) {
  const Icon = skill.icon;

  return (
    <GlowCard className="h-full" radius={200}>
      <div className="flex h-full flex-col gap-3 p-4 sm:gap-3.5 sm:p-5">
        <span className="grid size-10 place-items-center rounded-xl border border-line bg-base-deep/60 text-ink-muted transition-all duration-500 group-hover/card:border-accent/45 group-hover/card:bg-accent-soft group-hover/card:text-accent">
          <Icon
            aria-hidden="true"
            strokeWidth={1.6}
            className="size-[18px] transition-transform duration-500 group-hover/card:scale-110 group-hover/card:-rotate-6"
          />
        </span>

        <div className="min-w-0">
          <h4 className="text-[14px] font-semibold tracking-tight sm:text-[15px]">
            {skill.name}
          </h4>
          <p className="mt-1 text-[12px] leading-snug text-ink-subtle text-pretty sm:text-[12.5px]">
            {skill.description}
          </p>
        </div>

        {/* Hover accent rail */}
        <span
          aria-hidden="true"
          className="mt-auto h-px w-6 bg-linear-to-r from-accent to-transparent opacity-0 transition-all duration-500 group-hover/card:w-full group-hover/card:opacity-100"
        />
      </div>
    </GlowCard>
  );
}
