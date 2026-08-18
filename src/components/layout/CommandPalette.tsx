"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Command as CommandIcon,
  Download,
  Mail,
  MoonStar,
  Search,
} from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { navItems, site } from "@/data/site";
import { useScrollLock } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  label: string;
  hint: string;
  group: "Navigate" | "Actions";
  icon: React.ComponentType<{ className?: string }>;
  run: (helpers: { toggleTheme: () => void }) => void;
};

const go = (href: string) => () => {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

const open = (href: string) => () => {
  window.open(href, "_blank", "noopener,noreferrer");
};

/** Built once at module scope — the list never changes at runtime. */
const COMMANDS: Command[] = [
  ...navItems.map(
    (item): Command => ({
      id: `nav-${item.id}`,
      label: `Go to ${item.label}`,
      hint: item.href,
      group: "Navigate",
      icon: ArrowRight,
      run: go(item.href),
    }),
  ),
  {
    id: "resume",
    label: "Download Resume",
    hint: "PDF",
    group: "Actions",
    icon: Download,
    run: open(site.resume),
  },
  {
    id: "email",
    label: "Email Soban",
    hint: site.email,
    group: "Actions",
    icon: Mail,
    run: () => {
      window.location.href = `mailto:${site.email}`;
    },
  },
  {
    id: "github",
    label: "Open GitHub",
    hint: "github.com",
    group: "Actions",
    icon: GithubIcon,
    run: open(site.github),
  },
  {
    id: "linkedin",
    label: "Open LinkedIn",
    hint: "linkedin.com",
    group: "Actions",
    icon: LinkedinIcon,
    run: open(site.linkedin),
  },
  {
    id: "theme",
    label: "Toggle theme",
    hint: "Dark / light",
    group: "Actions",
    icon: MoonStar,
    run: ({ toggleTheme }) => toggleTheme(),
  },
];

/**
 * ⌘K / Ctrl-K palette.
 *
 * The dialog markup only mounts while it is open, so the closed state costs a
 * single keydown listener and nothing else — no panel sitting in the DOM, no
 * layout, no paint.
 */
export function CommandPalette({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  useScrollLock(isOpen);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter(
      (c) =>
        c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q),
    );
  }, [query]);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const runCommand = useCallback(
    (command: Command) => {
      close();
      // Let the overlay unmount before scrolling or navigating away.
      window.requestAnimationFrame(() => command.run({ toggleTheme }));
    },
    [close, toggleTheme],
  );

  // Global shortcut. Registered once; the palette itself stays unmounted.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((wasOpen) => !wasOpen);
        setQuery("");
        setActive(0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => {
        if (results.length === 0) return 0;
        const delta = event.key === "ArrowDown" ? 1 : -1;
        return (current + delta + results.length) % results.length;
      });
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const command = results[active];
      if (command) runCommand(command);
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Close command palette"
            onClick={close}
            className="absolute inset-0 cursor-default bg-base/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onKeyDown={onListKeyDown}
            initial={reduced ? false : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-lift"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search
                className="size-4 shrink-0 text-ink-subtle"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                autoFocus
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                placeholder="Search sections and actions…"
                aria-label="Search sections and actions"
                aria-controls={listId}
                className="h-14 w-full bg-transparent text-[15px] text-ink placeholder:text-ink-subtle focus:outline-none"
              />
              <kbd className="hidden shrink-0 rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-ink-subtle sm:block">
                ESC
              </kbd>
            </div>

            <ul id={listId} className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-3 py-6 text-center text-[13.5px] text-ink-subtle">
                  No matches.
                </li>
              ) : (
                results.map((command, index) => {
                  const Icon = command.icon;
                  const isActive = index === active;
                  return (
                    <li key={command.id}>
                      <button
                        type="button"
                        onClick={() => runCommand(command)}
                        onMouseEnter={() => setActive(index)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150",
                          isActive ? "bg-accent-soft text-ink" : "text-ink-muted",
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="flex-1 truncate text-[14px] font-medium">
                          {command.label}
                        </span>
                        <span className="shrink-0 font-mono text-[10.5px] text-ink-subtle">
                          {command.hint}
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>

            <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5 text-[11px] text-ink-subtle">
              <span className="inline-flex items-center gap-1.5">
                <CommandIcon className="size-3" aria-hidden="true" />
                <span className="font-mono">K</span> to toggle
              </span>
              <span className="font-mono">↑ ↓ to move · ↵ to select</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
