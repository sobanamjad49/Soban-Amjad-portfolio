"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ArrowUpRight, FileText, Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { navItems, site } from "@/data/site";
import { useActiveSection, useScrollLock } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const SECTION_IDS = navItems.map((item) => item.id);
const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  // Clicking an in-page link starts a smooth scroll *downwards*, which would
  // otherwise trip the hide-on-scroll-down rule and pull the bar out from
  // under the pointer mid-journey. Hold it visible until the scroll settles.
  const revealLockUntil = useRef(0);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const active = useActiveSection(SECTION_IDS);
  const { scrollY } = useScroll();

  useScrollLock(menuOpen);

  useMotionValueEvent(scrollY, "change", (current) => {
    setScrolled(current > 16);

    // Hide on downward scroll once past the hero, reveal immediately on the
    // way back up — keeps the reading area clear without hiding navigation.
    const delta = current - lastY.current;
    if (!menuOpen && Date.now() > revealLockUntil.current) {
      if (current > 520 && delta > 6) setHidden(true);
      else if (delta < -6 || current < 240) setHidden(false);
    }
    lastY.current = current;
  });

  const holdNavVisible = useCallback(() => {
    revealLockUntil.current = Date.now() + 1200;
    setHidden(false);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  }, []);

  const closeMenuAndHold = useCallback(() => {
    holdNavVisible();
    closeMenu();
  }, [holdNavVisible, closeMenu]);

  // Escape closes the overlay; the trigger regains focus.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-ink px-4 py-2 text-sm font-medium text-base focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80]"
      >
        Skip to content
      </a>

      {/* Page-load entrance: the bar drops in first, then its contents stagger,
          so navigation arrives before the hero headline finishes revealing. */}
      <motion.header
        initial={reduced ? false : { y: -72, opacity: 0 }}
        animate={{
          y: hidden && !reduced ? "-120%" : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 rounded-full pr-2 pl-4 sm:h-16 sm:pr-3 sm:pl-5",
            "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled || menuOpen
              ? "glass border border-line shadow-[0_8px_32px_-16px_rgb(0_0_0/0.35)]"
              : "border border-transparent bg-transparent",
          )}
        >
          <a
            href="#home"
            onClick={holdNavVisible}
            className="group flex items-center gap-2.5 rounded-full"
          >
            <span className="relative grid size-9 place-items-center rounded-xl border border-line-strong bg-surface font-display text-[13px] font-semibold tracking-tight">
              <span className="text-gradient">{site.initials}</span>
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-xl opacity-0 shadow-[0_0_0_1px_var(--accent)] transition-opacity duration-300 group-hover:opacity-70"
              />
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:inline">
              {site.name}
            </span>
            {/* The name is only visible from `sm` up, and an `aria-label`
                here would replace the visible "SA" rather than extend it —
                which trips the label-in-name check. Composing the name from
                real content keeps both readings consistent. */}
            <span className="sr-only sm:hidden">{site.name}</span>
            <span className="sr-only">— back to top</span>
          </a>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item, index) => {
              const isActive = active === item.id;
              return (
                <motion.li
                  key={item.id}
                  initial={reduced ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: reduced ? 0 : 0.28 + index * 0.05,
                    ease: EASE,
                  }}
                >
                  <a
                    href={item.href}
                    onClick={holdNavVisible}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300",
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full border border-line bg-accent-soft"
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                      />
                    ) : null}
                    {item.label}
                  </a>
                </motion.li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "group hidden h-10 items-center gap-2 rounded-full bg-ink px-4 text-[13px] font-medium text-base sm:inline-flex",
                "transition-transform duration-300 hover:-translate-y-0.5",
                "shadow-[0_10px_28px_-14px_var(--accent-glow)]",
              )}
            >
              <FileText className="size-4" strokeWidth={1.75} aria-hidden="true" />
              Resume
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-accent/50 lg:hidden"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={reduced ? false : { opacity: 0, rotate: -60, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, rotate: 60, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {menuOpen ? (
                    <X className="size-[18px]" strokeWidth={1.75} />
                  ) : (
                    <Menu className="size-[18px]" strokeWidth={1.75} />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        id={menuId}
        open={menuOpen}
        active={active}
        onClose={closeMenu}
        onNavigate={closeMenuAndHold}
        reduced={Boolean(reduced)}
      />
    </>
  );
}

function MobileMenu({
  id,
  open,
  active,
  onClose,
  onNavigate,
  reduced,
}: {
  id: string;
  open: boolean;
  active: string;
  onClose: () => void;
  onNavigate: () => void;
  reduced: boolean;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          key="mobile-menu"
          className="fixed inset-0 z-40 lg:hidden"
          initial={reduced ? { opacity: 0 } : undefined}
          animate={reduced ? { opacity: 1 } : undefined}
          exit={reduced ? { opacity: 0 } : undefined}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-base/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute inset-x-3 top-[4.75rem] origin-top overflow-hidden rounded-3xl border border-line bg-surface/95 p-3 shadow-lift sm:inset-x-5"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.38, ease: EASE }}
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={reduced ? false : { opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: reduced ? 0 : 0.05 + index * 0.045,
                      ease: EASE,
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active === item.id ? "true" : undefined}
                      className={cn(
                        "group flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors duration-300",
                        active === item.id
                          ? "bg-accent-soft text-ink"
                          : "text-ink-muted hover:bg-base-deep hover:text-ink",
                      )}
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] text-ink-subtle">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-ink-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
              <a
                href={site.resume}
                target="_blank"
                rel="noreferrer noopener"
                onClick={onClose}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-ink text-sm font-medium text-base"
              >
                <FileText className="size-4" strokeWidth={1.75} aria-hidden="true" />
                Resume
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub profile"
                className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line text-ink-muted transition-colors hover:text-ink"
              >
                <GithubIcon className="size-[18px]" />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn profile"
                className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line text-ink-muted transition-colors hover:text-ink"
              >
                <LinkedinIcon className="size-[18px]" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
