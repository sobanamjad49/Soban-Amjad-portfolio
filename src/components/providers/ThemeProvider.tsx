"use client";

import { createContext, useCallback, useContext, useEffect, type ReactNode } from "react";

import { STORAGE_KEY } from "@/lib/boot";

type ThemeContextValue = {
  toggleTheme: () => void;
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

  /**
   * Flipping the class is the whole operation — one style recalc, no snapshot,
   * no React state, no re-render.
   *
   * `theme-instant` suppresses every transition on the page for the single
   * frame the class swap lands on. Without it, the ~40 components carrying a
   * `transition-colors` hover treatment all animate simultaneously, and the
   * resulting sustained repaint measured 2.5-6s per toggle on a throttled
   * mobile CPU. With it, the same toggle lands in around 100ms. It is removed
   * two frames later, so hover transitions behave normally straight after.
   *
   * A circular View Transition wipe was tried here first and cost ~1.1s on the
   * first click, because the browser has to rasterise the whole viewport twice
   * before it can animate.
   */
  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";

    root.classList.add("theme-instant");
    root.classList.toggle("dark", next === "dark");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove("theme-instant"));
    });

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private browsing or blocked storage — still applies for this session.
    }
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

