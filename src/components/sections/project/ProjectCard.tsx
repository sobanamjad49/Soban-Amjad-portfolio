import { ArrowUpRight, ExternalLink, Lock } from "lucide-react";
import { ProjectCover } from "@/components/sections/project/ProjectCover";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { GlowCard } from "@/components/ui/GlowCard";
import { ClipReveal } from "@/components/ui/Motion";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  const { links } = project;

  return (
    <GlowCard className="h-full" radius={300}>
      <article className="flex h-full flex-col">
        {/* Cover ---------------------------------------------------------- */}
        {/* Clip-path unclips the frame while the art settles from 1.06 → 1,
            so the visual arrives like a design showcase rather than a fade. */}
        <ClipReveal
          className="relative aspect-16/10 w-full border-b border-line sm:aspect-16/9"
          innerClassName="absolute inset-0"
          duration={1.05}
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover/card:scale-105">
            <ProjectCover motif={project.motif} accent={project.accent} />
          </div>

          {/* Gradient overlay that fades in on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-accent/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          />

          <span className="absolute top-3 left-3 z-10 rounded-full border border-line bg-surface/85 px-2.5 py-1 font-mono text-[10px] tracking-tight text-ink-muted backdrop-blur-md">
            {project.category}
          </span>
        </ClipReveal>

        {/* Body ----------------------------------------------------------- */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:translate-x-1">
              {project.name}
            </h3>
            <span
              aria-hidden="true"
              className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-line text-ink-subtle transition-all duration-500 group-hover/card:border-accent/50 group-hover/card:bg-accent-soft group-hover/card:text-accent"
            >
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
            </span>
          </div>

          <p className="mt-1 font-mono text-[11px] text-ink-subtle">{project.domain}</p>

          <p className="mt-3.5 text-[14px] leading-relaxed text-ink-muted text-pretty">
            {project.description}
          </p>

          <ul className="mt-4 flex flex-col gap-1.5">
            {project.contributions.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-accent/60"
                />
                <span className="text-[13px] leading-relaxed text-ink-subtle text-pretty">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech}>
                <span className="inline-flex rounded-md border border-line bg-base-deep/50 px-2 py-1 font-mono text-[10.5px] text-ink-subtle">
                  {tech}
                </span>
              </li>
            ))}
          </ul>

          {/* Actions ------------------------------------------------------ */}
          <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-line pt-5">
            {links.live ? (
              <a
                href={links.live}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  "group/link inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong px-3.5",
                  "text-[12.5px] font-medium transition-all duration-300",
                  "hover:border-accent/50 hover:bg-accent-soft hover:text-ink",
                )}
              >
                <ExternalLink className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                Live Demo
                <span className="sr-only"> — {project.name}</span>
              </a>
            ) : (
              <DisabledAction label="Live Demo" icon={<ExternalLink className="size-3.5" strokeWidth={1.75} aria-hidden="true" />} />
            )}

            {links.github ? (
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group/link inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong px-3.5 text-[12.5px] font-medium transition-all duration-300 hover:border-accent/50 hover:bg-accent-soft"
              >
                <GithubIcon className="size-3.5" aria-hidden="true" />
                GitHub
                <span className="sr-only"> — {project.name}</span>
              </a>
            ) : (
              <DisabledAction label="GitHub" icon={<GithubIcon className="size-3.5" aria-hidden="true" />} />
            )}
          </div>
        </div>
      </article>
    </GlowCard>
  );
}

/** Absent links are shown as explicitly unavailable rather than invented. */
function DisabledAction({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <span
      aria-disabled="true"
      title="Private repository — not publicly available"
      className="inline-flex h-9 cursor-not-allowed items-center gap-1.5 rounded-full border border-dashed border-line px-3.5 text-[12.5px] text-ink-subtle"
    >
      {icon}
      {label}
      <Lock className="size-3" strokeWidth={2} aria-hidden="true" />
    </span>
  );
}
