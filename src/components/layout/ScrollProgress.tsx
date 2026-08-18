"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Reading progress rail pinned to the very top of the viewport.
 * Driven by a spring on a motion value, so it never triggers a React render.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-linear-to-r from-accent via-accent-2 to-accent"
    />
  );
}
