import { cn } from "@/lib/utils";

/**
 * Static, server-rendered background layers. Nothing here needs JavaScript —
 * the animation is CSS-only or none at all, which keeps the page shell light.
 */

/** Faint engineering grid, faded out toward the edges. */
export function GridBackdrop({
  className,
  variant = "grid",
}: {
  className?: string;
  variant?: "grid" | "dots";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10",
        variant === "grid" ? "bg-grid" : "bg-dots",
        "[mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,#000_20%,transparent_100%)]",
        className,
      )}
    />
  );
}

/** Soft accent bloom. Used sparingly — one per major section at most. */
export function AuraBackdrop({
  className,
  position = "top",
}: {
  className?: string;
  position?: "top" | "center" | "bottom";
}) {
  const placement =
    position === "top"
      ? "-top-40 left-1/2 -translate-x-1/2"
      : position === "bottom"
        ? "-bottom-48 left-1/2 -translate-x-1/2"
        : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 h-[520px] w-[min(1100px,140vw)] rounded-full",
        "aura opacity-70 dark:opacity-100",
        placement,
        className,
      )}
    />
  );
}

/** Hairline that separates sections without a hard rule. */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "mx-auto h-px w-full max-w-7xl bg-linear-to-r from-transparent via-line-strong to-transparent",
        className,
      )}
    />
  );
}
