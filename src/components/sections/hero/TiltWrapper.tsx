"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { useFinePointer } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 180, damping: 20, mass: 0.6 } as const;

/**
 * Cursor-reactive wrapper: gives the panel a subtle 3D tilt on fine pointers.
 * Movement is intentionally small — enough to read as physical, not as a toy.
 *
 * The tilt is held in motion values rather than React state. The previous
 * version called `setTilt` from `onMouseMove`, so every pointer event
 * re-rendered the component *and* restarted a spring animation; and it read a
 * fresh `getBoundingClientRect` each time, forcing a synchronous layout per
 * event. Now the pointer path touches neither React nor layout.
 */
export function TiltWrapper({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduced;

  const bounds = useRef<DOMRect | null>(null);
  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);

  const onEnter = (event: MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;
    bounds.current = event.currentTarget.getBoundingClientRect();
  };

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = bounds.current;
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * max);
    rotateY.set(px * max);
  };

  const onLeave = () => {
    bounds.current = null;
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("[perspective:1400px]", className)}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}
