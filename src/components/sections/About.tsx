import { Check, Layers, ShieldCheck, Workflow } from "lucide-react";
import { GridBackdrop } from "@/components/ui/Backdrops";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutCapabilities } from "@/data/philosophy";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Each card restates a focus the résumé's professional summary names. */
const APPROACH = [
  {
    icon: Workflow,
    title: "Clean architecture",
    body: "Scalable application structure with clear boundaries between the interface, the service layer and the data — so features can be added without unpicking what already works.",
  },
  {
    icon: Layers,
    title: "Full-stack ownership",
    body: "React and Next.js on the front, Node.js, NestJS and Express behind it, and PostgreSQL, MongoDB or MySQL underneath — designed together rather than handed between teams.",
  },
  {
    icon: ShieldCheck,
    title: "Production-ready delivery",
    body: "Authentication and third-party integrations implemented properly, performance optimised, complex issues resolved, and code kept at a standard that survives real usage.",
  },
];

export function About() {
  return (
    <section
      data-cv="about"
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Slow counter-drift on the decorative backdrop only — a CSS view
          timeline, so it never touches the main thread. */}
      <div
        aria-hidden="true"
        className="drift-y pointer-events-none absolute inset-0 -z-10"
      >
        <GridBackdrop variant="dots" className="opacity-60" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <span id="about-heading">
              Full-stack engineering,{" "}
              <span className="text-gradient">built to last</span>
            </span>
          }
          description="I build scalable web applications end to end — REST APIs, authentication, databases and the interfaces on top of them."
        />

        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* ------------------------------------------------------- Narrative */}
          <div className="lg:col-span-7">
            <Reveal direction="right" soft>
              <p className="text-lg leading-relaxed font-light text-ink text-pretty sm:text-xl">
                I&apos;m a full-stack software engineer with hands-on experience
                building scalable web applications using{" "}
                <strong className="font-medium text-ink">Next.js</strong>,{" "}
                <strong className="font-medium text-ink">React.js</strong>,{" "}
                <strong className="font-medium text-ink">NestJS</strong> and{" "}
                <strong className="font-medium text-ink">Node.js / Express</strong>.
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.08}>
              <p className="mt-5 leading-relaxed text-ink-muted text-pretty">
                My work covers REST and GraphQL API design, authentication and
                third-party integrations, backed by PostgreSQL, MySQL, MongoDB
                and Supabase. I build microservices and event-driven systems
                with real-time communication over WebSockets, SSE and message
                queues, and on the infrastructure side I work with Docker,
                Redis, AWS and GCP — containerising services, caching hot data
                paths and shipping through CI/CD pipelines on GitHub Actions.
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.14}>
              <p className="mt-5 leading-relaxed text-ink-muted text-pretty">
                Throughout, the focus stays the same: clean architecture,
                maintainable code and collaborative delivery through Git and
                GitHub. Based in {site.location}, working on-site locally and
                remotely with distributed teams.
              </p>
            </Reveal>

            <Stagger className="mt-10 flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-12">
              {APPROACH.map(({ icon: Icon, title, body }) => (
                <StaggerItem key={title}>
                  <article className="group relative bg-base p-5 transition-colors duration-500 hover:bg-surface sm:p-6">
                    <div className="flex gap-4">
                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_0_0_4px_var(--accent-soft)]">
                        <Icon
                          className="size-4.5 transition-transform duration-500 group-hover:scale-110"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-[15px] font-semibold tracking-tight sm:text-[16px]">
                          {title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted text-pretty">
                          {body}
                        </p>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* ------------------------------------------------------ Capability */}
          <div className="lg:col-span-5">
            <Reveal direction="left" delay={0.1} soft>
              <CapabilityPanel />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityPanel() {
  return (
    <div className="lg:sticky lg:top-28">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-1.5 shadow-card">
        <div className="rounded-[1.35rem] border border-line bg-base-deep/50 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[10.5px] tracking-[0.2em] text-ink-subtle uppercase">
                Core strengths
              </p>
              <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight sm:text-xl">
                What I bring to a build
              </h3>
            </div>
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface font-mono text-[11px] text-accent"
            >
              {aboutCapabilities.length}
            </span>
          </div>

          <ul data-stagger="" className="mt-6 flex flex-col gap-2.5 [--rv-step:60ms]">
            {aboutCapabilities.map((capability) => (
              <li
                key={capability.label}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5",
                  "transition-all duration-400 hover:border-line hover:bg-surface",
                )}
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-md border border-line bg-surface text-accent transition-colors duration-400 group-hover:border-accent/50 group-hover:bg-accent-soft">
                  <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] leading-tight font-medium tracking-tight">
                    {capability.label}
                  </span>
                  <span className="mt-0.5 block font-mono text-[10.5px] leading-snug text-ink-subtle lg:truncate">
                    {capability.detail}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-0 bg-linear-to-r from-accent to-transparent transition-all duration-500 group-hover:w-6"
                />
              </li>
            ))}
          </ul>
        </div>

        <span
          aria-hidden="true"
          className="glow-accent pointer-events-none absolute -top-16 -right-16 size-40"
        />
      </div>
    </div>
  );
}
