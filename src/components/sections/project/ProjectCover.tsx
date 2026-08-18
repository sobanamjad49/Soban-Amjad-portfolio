import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Generated cover art. The real products are private, so rather than mocking up
 * fake screenshots each card gets an abstract wireframe that hints at what the
 * product does — honest, on-brand, and free of image payload.
 */
export function ProjectCover({
  motif,
  accent,
  className,
}: {
  motif: Project["motif"];
  accent: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative h-full w-full overflow-hidden bg-base-deep",
        className,
      )}
    >
      {/* Accent wash */}
      <div
        className={cn(
          "absolute inset-0 bg-linear-135 opacity-[0.16] transition-opacity duration-700 group-hover/card:opacity-30",
          accent,
        )}
      />
      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-70 [background-size:28px_28px]" />

      <div className="relative flex h-full w-full items-center justify-center p-6">
        {motif === "analytics" ? <AnalyticsMotif /> : <CreatorMotif />}
      </div>

      {/* Vignette so titles stay readable over the art */}
      <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/20 to-transparent" />
    </div>
  );
}

const BARS = [34, 58, 46, 72, 54, 88, 66, 78];

function AnalyticsMotif() {
  return (
    <div className="flex w-full max-w-[240px] flex-col gap-3">
      <div className="flex items-end justify-between gap-1.5 transition-transform duration-700 group-hover/card:scale-[1.04]">
        {BARS.map((height, index) => (
          <span
            key={index}
            style={{ height: `${height}px` }}
            className="w-full rounded-t-[3px] bg-linear-to-t from-accent/20 to-accent/80"
          />
        ))}
      </div>
      <div className="h-px w-full bg-line-strong" />
      <div className="flex gap-2">
        {["Reach", "Engage", "Growth"].map((label) => (
          <span
            key={label}
            className="rounded-md border border-line bg-surface/70 px-2 py-1 font-mono text-[9px] text-ink-subtle"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function CreatorMotif() {
  return (
    <div className="flex w-full max-w-[240px] flex-col gap-2.5 transition-transform duration-700 group-hover/card:scale-[1.04]">
      <div className="flex items-center gap-2.5 rounded-xl border border-line bg-surface/80 p-2.5">
        <span className="size-8 shrink-0 rounded-full bg-linear-to-br from-accent to-accent-2 opacity-80" />
        <span className="flex flex-1 flex-col gap-1.5">
          <span className="block h-1.5 w-2/3 rounded-full bg-ink/25" />
          <span className="block h-1.5 w-1/3 rounded-full bg-ink/15" />
        </span>
        <span className="rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 font-mono text-[9px] text-accent">
          pay
        </span>
      </div>
      <div className="ml-6 rounded-xl rounded-tl-sm border border-line bg-surface/60 p-2.5">
        <span className="block h-1.5 w-full rounded-full bg-ink/15" />
        <span className="mt-1.5 block h-1.5 w-3/5 rounded-full bg-ink/10" />
      </div>
      <div className="mr-6 ml-auto rounded-xl rounded-tr-sm border border-accent/25 bg-accent-soft p-2.5">
        <span className="block h-1.5 w-20 rounded-full bg-accent/40" />
      </div>
    </div>
  );
}
