import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Kind = keyof typeof TOKEN_CLASS;

const TOKEN_CLASS = {
  keyword: "text-[#6a3fc4] dark:text-[#b39bff]",
  name: "text-ink",
  punctuation: "text-ink-muted",
  key: "text-[#0a6b7a] dark:text-[#5fdde0]",
  string: "text-[#8a4f0c] dark:text-[#e8bf7a]",
  plain: "text-ink-muted",
} as const;

const t = (text: string, kind: Kind = "plain") => ({ text, kind });

/** Content is token-described so the syntax colouring needs no runtime parse. */
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

/** Milliseconds per character — the original rAF counter ran at 82 chars/sec. */
const MS_PER_CHAR = 12;
/** Lets the hero headline land before the panel starts typing. */
const START_DELAY = 550;

/**
 * Line geometry resolved once at module scope: how many characters each line
 * holds, and when its reveal should begin.
 */
const TYPED = (() => {
  let cursor = 0;
  const lines = LINES.map((tokens, lineIndex) => {
    const chars = tokens.reduce((sum, token) => sum + token.text.length, 0);
    const delay = START_DELAY + cursor * MS_PER_CHAR;
    cursor += chars;
    return { lineIndex, tokens, chars, delay };
  });
  return { lines, totalMs: START_DELAY + cursor * MS_PER_CHAR };
})();

const PLAIN_TEXT = LINES.map((line) => line.map((token) => token.text).join("")).join(" ");

/**
 * Editor panel for the hero.
 *
 * The type-on effect is pure CSS: each line is a clipping box whose width is
 * animated from `0` to `<n>ch` with a `steps(<n>)` timing function, which in a
 * monospace face lands exactly one character per step. A caret rides the
 * clipping edge as a `border-right` and is dropped when the line finishes.
 *
 * The previous version drove this from React, calling `setTyped` inside a rAF
 * loop — roughly 240 full re-renders of the whole token tree during the first
 * few seconds of page load, competing directly with hydration. Moving it to
 * CSS removed that entirely and let this become a server component: nothing in
 * here ships as JavaScript any more.
 */
export function CodePanel({ className }: { className?: string }) {
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
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-ink-muted uppercase">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px] shadow-emerald-500/60 motion-safe:animate-shimmer"
          />
          live
        </span>
      </div>

      {/* Code body */}
      <div className="relative overflow-x-auto px-3 py-4 sm:px-4 sm:py-5">
        {/* The code is decorative repetition of the headline and the skills
            list, so it is announced once as a sentence rather than read out
            token by token. `aria-label` is not valid on <pre>. */}
        <span className="sr-only">{PLAIN_TEXT}</span>

        <pre aria-hidden="true" className="font-mono text-[11.5px] leading-[1.85] sm:text-[13px]">
          <code>
            {TYPED.lines.map(({ lineIndex, tokens, chars, delay }) => (
              <span
                key={lineIndex}
                className="grid grid-cols-[1.5rem_1fr] sm:grid-cols-[2rem_1fr]"
              >
                <span className="pr-3 text-right select-none text-ink-subtle/45 sm:pr-4">
                  {lineIndex + 1}
                </span>
                {/* `min-w-0` matters: this is the `1fr` track of the line
                    grid, and its automatic minimum size is the min-content of
                    an unbreakable `white-space: pre` string. Left at `auto`
                    that 380px minimum escapes the scroller and stretches the
                    hero grid track itself, laying the whole hero out 430px
                    wide inside a 390px viewport. */}
                <span
                  data-type=""
                  className="min-w-0 whitespace-pre"
                  style={
                    {
                      "--type-chars": chars,
                      "--type-delay": `${delay}ms`,
                    } as CSSProperties
                  }
                >
                  {tokens.map((token, index) => (
                    <span key={index} className={TOKEN_CLASS[token.kind]}>
                      {token.text}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </code>
        </pre>

        <div
          data-entrance=""
          style={{ "--rv-delay": `${TYPED.totalMs}ms`, "--rv-y": "6px" } as CSSProperties}
          className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3 font-mono text-[10.5px] text-ink-muted sm:text-[11px]"
        >
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            typescript
          </span>
          <span>utf-8</span>
          <span>ln {LINES.length}, col 1</span>
          <span className="ml-auto text-accent-2">✓ no problems</span>
        </div>
      </div>

      {/* Top hairline that catches the light on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent opacity-60 transition-opacity duration-500 group-hover/panel:opacity-100"
      />
    </div>
  );
}

export { TiltWrapper } from "./TiltWrapper";
