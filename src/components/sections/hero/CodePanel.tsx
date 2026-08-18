"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useFinePointer } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Kind = keyof typeof TOKEN_CLASS;

const TOKEN_CLASS = {
  keyword: "text-[#7a4bd6] dark:text-[#b39bff]",
  name: "text-ink",
  punctuation: "text-ink-subtle",
  key: "text-[#0b7d8f] dark:text-[#5fdde0]",
  string: "text-[#9a5b12] dark:text-[#e8bf7a]",
  plain: "text-ink-muted",
} as const;

const t = (text: string, kind: Kind = "plain") => ({ text, kind });

/** Content is token-described so the typing reveal and the syntax colouring
 *  stay in sync without parsing anything at runtime. */
const LINES = [
  [t("const", "keyword"), t(" "), t("developer", "name"), t(" = ", "punctuation"), t("{", "punctuation")],
  [t("  "), t("name", "key"), t(": ", "punctuation"), t('"Soban Amjad"', "string"), t(",", "punctuation")],
  [t("  "), t("role", "key"), t(": ", "punctuation"), t('"Software Engineer"', "string"), t(",", "punctuation")],
  [
    t("  "),
    t("stack", "key"),
    t(": [", "punctuation"),
    t('"React"', "string"),
    t(", ", "punctuation"),
    t('"Next.js"', "string"),
    t(", ", "punctuation"),
    t('"Node.js"', "string"),
    t(", ", "punctuation"),
    t('"TypeScript"', "string"),
    t("],", "punctuation"),
  ],
  [t("  "), t("focus", "key"), t(": ", "punctuation"), t('"Scalable web applications"', "string")],
  [t("}", "punctuation")],
];

/**
 * Character offsets are static, so they are resolved once at module scope.
 * Render then only ever slices — no mutable accumulators inside a memo.
 */
const POSITIONED = (() => {
  let cursor = 0;
  const lines = LINES.map((tokens, lineIndex) => {
    const start = cursor;
    const positioned = tokens.map((token) => {
      const at = cursor;
      cursor += token.text.length;
      return { ...token, at };
    });
    cursor += 1; // newline
    return { lineIndex, start, tokens: positioned };
  });
  return { lines, total: cursor };
})();

const PLAIN_TEXT = LINES.map((line) => line.map((token) => token.text).join("")).join(" ");

/**
 * Interactive editor panel for the hero.
 *
 * The type-on effect is a single rAF-driven character counter rather than a
 * timer per character, and it settles into a static, fully readable block. The
 * code is exposed to assistive tech once via an `aria-label` on the <pre>.
 */
export function CodePanel({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const done = typed >= POSITIONED.total;

  useEffect(() => {
    if (reduced) {
      // Deferred a frame so this is not a synchronous setState in an effect.
      const id = requestAnimationFrame(() => setTyped(POSITIONED.total));
      return () => cancelAnimationFrame(id);
    }

    let frame = 0;
    let start = 0;
    const DELAY = 900; // let the hero headline land first
    const CPS = 82; // characters per second

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start - DELAY;
      const next =
        elapsed <= 0 ? 0 : Math.min(POSITIONED.total, Math.floor((elapsed / 1000) * CPS));
      setTyped(next);
      if (next < POSITIONED.total) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  const cursorLine = useMemo(() => {
    const found = POSITIONED.lines.filter((line) => typed > line.start).pop();
    return found?.lineIndex ?? 0;
  }, [typed]);

  return (
    <div
      className={cn(
        "group/panel relative overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-lift backdrop-blur-xl",
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-line bg-base-deep/60 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <span className="font-mono text-[11px] tracking-tight text-ink-subtle">
          developer.ts
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-ink-subtle uppercase">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px] shadow-emerald-500/60 motion-safe:animate-shimmer"
          />
          live
        </span>
      </div>

      {/* Code body */}
      <div className="relative overflow-x-auto px-3 py-4 sm:px-4 sm:py-5">
        <pre
          className="font-mono text-[11.5px] leading-[1.85] sm:text-[13px]"
          aria-label={PLAIN_TEXT}
        >
          <code aria-hidden="true">
            {POSITIONED.lines.map(({ lineIndex, tokens }) => (
              <span
                key={lineIndex}
                className="grid grid-cols-[1.5rem_1fr] sm:grid-cols-[2rem_1fr]"
              >
                <span className="pr-3 text-right select-none text-ink-subtle/45 sm:pr-4">
                  {lineIndex + 1}
                </span>
                <span className="whitespace-pre">
                  {tokens.map((token) => (
                    <span key={token.at} className={TOKEN_CLASS[token.kind]}>
                      {token.text.slice(0, Math.max(0, typed - token.at))}
                    </span>
                  ))}
                  {!done && lineIndex === cursorLine ? (
                    <span className="ml-px inline-block h-[1.05em] w-0.5 translate-y-[0.18em] bg-accent" />
                  ) : null}
                </span>
              </span>
            ))}
          </code>
        </pre>

        {done ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3 font-mono text-[10.5px] text-ink-subtle sm:text-[11px]"
          >
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              typescript
            </span>
            <span>utf-8</span>
            <span>ln {LINES.length}, col 1</span>
            <span className="ml-auto text-accent-2">✓ no problems</span>
          </motion.div>
        ) : null}
      </div>

      {/* Top hairline that catches the light on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent opacity-60 transition-opacity duration-500 group-hover/panel:opacity-100"
      />
    </div>
  );
}

/**
 * Cursor-reactive wrapper: gives the panel a subtle 3D tilt on fine pointers.
 * Movement is intentionally small — enough to read as physical, not as a toy.
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
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const enabled = finePointer && !reduced;

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * max, ry: px * max });
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      className={cn("[perspective:1400px]", className)}
    >
      <motion.div
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: "spring", stiffness: 180, damping: 20, mass: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
