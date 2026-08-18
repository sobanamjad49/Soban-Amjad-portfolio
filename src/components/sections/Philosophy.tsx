import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { principles } from "@/data/philosophy";
import { cn } from "@/lib/utils";

export function Philosophy() {
  return (
    <section
      data-cv="philosophy"
      aria-labelledby="philosophy-heading"
      className="relative overflow-hidden border-y border-line bg-base-deep/40 px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Oversized backdrop word — decorative, hidden from assistive tech.
          The counter-scroll drift is a CSS view-progress timeline, so it runs
          on the compositor rather than through a scroll listener. */}
      <span
        aria-hidden="true"
        className="drift-x pointer-events-none absolute inset-x-0 top-1/2 -z-10 hidden -translate-y-1/2 [--drift-y:-50%] text-center font-display text-[22vw] leading-none font-semibold tracking-tighter text-ink/[0.025] select-none lg:block dark:text-ink/[0.035]"
      >
        PRINCIPLES
      </span>

      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          index="07"
          eyebrow="Engineering philosophy"
          align="center"
          title={
            <span id="philosophy-heading">
              The rules I don&apos;t{" "}
              <span className="text-gradient">negotiate on</span>
            </span>
          }
          description="Opinions earned from shipping and then maintaining what I shipped."
        />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <li key={principle.title} className="relative">
                <Reveal
                  direction="up"
                  delay={index * 0.06}
                  className="h-full"
                >
                  <article
                    className={cn(
                      "group relative flex h-full flex-col gap-4 bg-base p-6 sm:p-8",
                      "transition-colors duration-500 hover:bg-surface",
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="grid size-11 place-items-center rounded-2xl border border-line bg-base-deep/60 text-accent transition-all duration-500 group-hover:border-accent/45 group-hover:bg-accent-soft">
                        <Icon
                          className="size-[19px] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-[11px] tracking-[0.2em] text-ink-subtle/60 transition-colors duration-500 group-hover:text-accent"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                      {principle.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-ink-muted text-pretty sm:text-[14.5px]">
                      {principle.statement}
                    </p>

                    <span
                      aria-hidden="true"
                      className="mt-auto h-px w-8 bg-linear-to-r from-accent to-transparent transition-all duration-700 group-hover:w-20"
                    />
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
