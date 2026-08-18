import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Motion";

type SectionHeadingProps = {
  /** Two-digit index rendered in mono — the "technical spec sheet" cue. */
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:gap-5",
        centered && "items-center text-center",
        className,
      )}
    >
      <Reveal direction="up" duration={0.5}>
        <div
          className={cn(
            "flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-ink-subtle uppercase sm:text-xs",
            centered && "justify-center",
          )}
        >
          <span className="text-accent">{index}</span>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-linear-to-r from-accent/60 to-transparent sm:w-10"
          />
          <span>{eyebrow}</span>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.06}>
        <h2
          className={cn(
            "font-display text-3xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance",
            "sm:text-4xl lg:text-[2.9rem]",
            centered && "mx-auto max-w-3xl",
          )}
        >
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal direction="up" delay={0.12}>
          <p
            className={cn(
              "max-w-2xl text-[15px] leading-relaxed text-ink-muted text-pretty sm:text-base",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}

      {/* Hairline that draws itself in as the heading lands. */}
      <div
        aria-hidden="true"
        data-rule=""
        className={cn(
          "mt-1 h-px w-full max-w-[220px] origin-left bg-linear-to-r from-line-strong to-transparent",
          centered && "origin-center bg-linear-to-r from-transparent via-line-strong to-transparent",
        )}
      />
    </div>
  );
}
