import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processStages } from "@/data/process";

/**
 * "How I build" — the delivery sequence, as a numbered rail.
 *
 * A server component: the only client code here is the shared reveal
 * primitives, so none of this markup is shipped twice.
 */
export function Process() {
  return (
    <section
      data-cv="process"
      aria-labelledby="process-heading"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          index="06"
          eyebrow="How I build"
          title={
            <span id="process-heading">
              From requirement to{" "}
              <span className="text-gradient">running in production</span>
            </span>
          }
          description="The same sequence on every build — designed up front, implemented across the stack, then deployed and measured."
        />

        <Stagger
          as="ol"
          step={0.08}
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {processStages.map(({ step, title, summary, tools, icon: Icon }) => (
            <StaggerItem key={step} as="li" className="group relative bg-base">
              <div className="flex h-full flex-col p-6 transition-colors duration-500 group-hover:bg-surface sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-2xl border border-line bg-base-deep/60 text-accent transition-all duration-500 group-hover:border-accent/45 group-hover:bg-accent-soft">
                    <Icon
                      className="size-5 transition-transform duration-500 group-hover:-translate-y-0.5"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-2xl font-semibold text-ink/[0.08] transition-colors duration-500 group-hover:text-accent/30 dark:text-ink/[0.1]"
                  >
                    {step}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-muted text-pretty">
                  {summary}
                </p>

                {tools.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full border border-line px-2.5 py-1 font-mono text-[10.5px] tracking-tight text-ink-subtle"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* Accent rail that fills in on hover. */}
                <span
                  aria-hidden="true"
                  className="mt-auto block h-px w-0 bg-linear-to-r from-accent to-transparent pt-0 transition-all duration-500 group-hover:w-16"
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-[13.5px] leading-relaxed text-ink-subtle">
            Every tool named above appears on my CV — this is the workflow I
            actually use, not an idealised one.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
