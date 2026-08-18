"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useFinePointer } from "@/lib/hooks";

/**
 * A dot that tracks the pointer exactly plus a ring that lags behind it and
 * expands over anything interactive.
 *
 * Deliberately additive: the native cursor is never hidden, so nothing breaks
 * if this fails to mount. Skipped entirely on coarse pointers (touch) and when
 * the visitor prefers reduced motion.
 */
export function CustomCursor() {
  const finePointer = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = finePointer && !reduced;

  const [state, setState] = useState({ visible: false, active: false });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    let pending: Element | null = null;

    /**
     * The hit-test is the expensive half of this handler: `closest()` walks
     * the ancestor chain, and a 240Hz mouse fires four times per frame. Only
     * the motion values are updated per event — those never touch React — and
     * the traversal is deferred to one rAF per frame.
     */
    const check = () => {
      frame = 0;
      const active = Boolean(
        pending?.closest?.("a, button, [role='tab'], input, textarea, summary"),
      );
      setState((prev) =>
        prev.visible && prev.active === active ? prev : { visible: true, active },
      );
    };

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      pending = event.target as Element | null;
      if (!frame) frame = window.requestAnimationFrame(check);
    };

    const onLeave = () =>
      setState((prev) => (prev.visible ? { ...prev, visible: false } : prev));

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-70">
      <motion.span
        style={{ x, y }}
        animate={{ opacity: state.visible ? 1 : 0, scale: state.active ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute -mt-[3px] -ml-[3px] block size-1.5 rounded-full bg-accent"
      />
      <motion.span
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: state.active ? 1.9 : 1,
          opacity: state.visible ? (state.active ? 0.9 : 0.4) : 0,
        }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -mt-3.5 -ml-3.5 block size-7 rounded-full border border-accent"
      />
    </div>
  );
}
