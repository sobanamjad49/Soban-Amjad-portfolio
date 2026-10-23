"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { PALETTE_HANDOFF, PALETTE_REQUESTED } from "@/lib/boot";

type BootWindow = Window & {
  [PALETTE_REQUESTED]?: boolean;
  [PALETTE_HANDOFF]?: () => void;
};

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
 * spot, opening it as though it had been mounted all along. A press that lands
 * before this component has hydrated is caught by the boot script and picked
 * up here on mount. So the cost moves off the critical path without the
 * shortcut ever being dead.
 */
export function DeferredChrome() {
  const [ready, setReady] = useState(false);
  const [openOnMount, setOpenOnMount] = useState(false);
  const [paletteLive, setPaletteLive] = useState(false);
  const markPaletteLive = useCallback(() => setPaletteLive(true), []);

  useEffect(() => {
    // Once the palette has registered its own listener it owns the shortcut,
    // and this hand-off listener has nothing left to do. `ready` alone is not
    // enough: the palette's chunk can still be downloading after it flips.
    if (paletteLive) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      setOpenOnMount(true);
      setReady(true);
    };
    window.addEventListener("keydown", onKeyDown);

    const boot = window as BootWindow;
    boot[PALETTE_HANDOFF]?.();
    let early = 0;
    if (boot[PALETTE_REQUESTED]) {
      // Deferred a tick so the state update lands outside the effect body, and
      // the flag is only consumed once it does — a StrictMode re-run clears
      // the first timer and must still find it set.
      early = window.setTimeout(() => {
        boot[PALETTE_REQUESTED] = false;
        setOpenOnMount(true);
        setReady(true);
      });
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(early);
    };
  }, [paletteLive]);

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
      <CommandPalette defaultOpen={openOnMount} onShortcutReady={markPaletteLive} />
    </>
  );
}
