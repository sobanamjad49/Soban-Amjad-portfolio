"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

/**
 * The icon swap is pure CSS off the `dark` class — no state, no hydration
 * mismatch, and the crossfade rides the same 180ms token transition.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark and light theme"
      title="Toggle theme"
      className={cn(
        "group relative inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full",
        "border border-line text-ink-muted transition-colors duration-300",
        "hover:border-accent/50 hover:text-ink",
        className,
      )}
    >
      {/* Fill that blooms from the centre on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 scale-0 rounded-full bg-accent-soft transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
      />

      <span aria-hidden="true" className="relative block size-[18px]">
        <Sun
          strokeWidth={1.75}
          className={cn(
            "absolute inset-0 size-[18px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "scale-50 -rotate-90 opacity-0",
            "dark:scale-100 dark:rotate-0 dark:opacity-100",
          )}
        />
        <Moon
          strokeWidth={1.75}
          className={cn(
            "absolute inset-0 size-[18px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "scale-100 rotate-0 opacity-100",
            "dark:scale-50 dark:rotate-90 dark:opacity-0",
          )}
        />
      </span>
    </button>
  );
}
