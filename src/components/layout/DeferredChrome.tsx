"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false },
);
const CommandPalette = dynamic(
  () => import("@/components/layout/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false },
);

/**
 * Holds the two pieces of chrome that nobody needs in the first second — the
 * pointer cursor and the ⌘K palette — out of the initial hydration.
 *
 * Both were mounted eagerly at page level, so their bundles were parsed and
 * their effects run while the browser was still trying to paint the hero. The
 * LCP element is hero text, and its paint was 88% render-delay, so anything
 * competing for the main thread at that moment is worth moving.
 *
 * They load on the first idle period instead, with a 2s timeout so a
 * permanently busy main thread still gets them.
 *
 * The shortcut itself is not deferred. A bare keydown listener — a few bytes,
 * registered immediately — watches for ⌘K and pulls the palette in on the
 * spot, opening it as though it had been mounted all along. So the cost moves
 * off the critical path without the shortcut ever being dead.
 */
export function DeferredChrome() {
  const [ready, setReady] = useState(false);
  const [openOnMount, setOpenOnMount] = useState(false);

  useEffect(() => {
    // Once the palette is mounted it owns the shortcut; this hand-off listener
    // has nothing left to do.
    if (ready) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      setOpenOnMount(true);
      setReady(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ready]);

  useEffect(() => {
    if (typeof window.requestIdleCallback !== "function") {
      const timer = window.setTimeout(() => setReady(true), 1200);
      return () => window.clearTimeout(timer);
    }
    const handle = window.requestIdleCallback(() => setReady(true), { timeout: 2000 });
    return () => window.cancelIdleCallback(handle);
  }, []);

  if (!ready) return null;

  return (
    <>
      <CustomCursor />
      <CommandPalette defaultOpen={openOnMount} />
    </>
  );
}
