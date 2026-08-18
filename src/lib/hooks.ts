"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Tracks which section owns the viewport so the navbar indicator can follow
 * the reader. Uses a band across the upper part of the screen rather than a
 * simple "is visible" test, which would light up several sections at once.
 */
export function useActiveSection(ids: string[], offset = 96): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = offset + 24;

      // Bottom of the document: always highlight the final section.
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        setActive(elements[elements.length - 1].id);
        return;
      }

      let current = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    // Deferred to a frame so the first measurement isn't a synchronous
    // setState inside the effect body.
    frame = window.requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return active;
}

/**
 * Media queries via `useSyncExternalStore` so the value is read during render
 * rather than written back through an effect. `serverSnapshot` is always
 * `false`, which is the safe default for every query used here.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True on a device with a precise pointer (mouse/trackpad), false on touch. */
export function useFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}

const emptySubscribe = () => () => {};

/** True only after hydration — guards anything that reads browser state. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/** Locks body scroll while an overlay (the mobile menu) is open. */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { overflow, paddingRight } = document.body.style;
    const gutter = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [locked]);
}
