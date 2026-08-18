"use client";

import { createContext, useCallback, useContext, useEffect, type ReactNode } from "react";

const STORAGE_KEY = "sa-theme";

type ThemeContextValue = {
  /** `origin` lets the toggle expand the new theme from the button itself. */
  toggleTheme: (origin?: { x: number; y: number }) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * The theme lives on `document.documentElement` as a single `dark` class, set
 * before first paint by `themeScript`. Nothing about it is mirrored into React
 * state — the toggle icon is driven by CSS off that same class — which means no
 * hydration mismatch, no flash, and no re-render on theme change.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Follow the OS only while the visitor has not made an explicit choice.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      document.documentElement.classList.toggle("dark", event.matches);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";

    const apply = () => {
      root.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Private browsing or blocked storage — still applies for this session.
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Progressive enhancement: a circular wipe from the toggle where the browser
    // supports View Transitions, a plain colour cross-fade everywhere else.
    if (reduced || !origin || typeof document.startViewTransition !== "function") {
      root.classList.add("theme-shift");
      apply();
      window.setTimeout(() => root.classList.remove("theme-shift"), 460);
      return;
    }

    const { x, y } = origin;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // Light -> dark grows the new layer; dark -> light retracts the old one,
    // which reads more naturally than always growing.
    const grow = next === "dark";
    root.classList.toggle("theme-reveal-out", !grow);

    const transition = document.startViewTransition(apply);

    void transition.ready.then(() => {
      const clip = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${radius}px at ${x}px ${y}px)`,
      ];
      root.animate(
        { clipPath: grow ? clip : [...clip].reverse() },
        {
          duration: 620,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: grow
            ? "::view-transition-new(root)"
            : "::view-transition-old(root)",
        },
      );
    });

    void transition.finished.then(() => root.classList.remove("theme-reveal-out"));
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>");
  return context;
}

/**
 * Injected as a blocking inline script in <head>. Dark is the intended default,
 * so an unknown visitor with no OS preference still lands on dark.
 */
export const themeScript = `
(function(){
  try {
    var stored = localStorage.getItem("${STORAGE_KEY}");
    var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    if ((stored || (prefersLight ? "light" : "dark")) === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`.trim();
