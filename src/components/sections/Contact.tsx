"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { MagneticButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Contact() {
  return (
    <section
      data-cv="contact"
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          index="09"
          eyebrow="Contact"
          align="center"
          title={
            <span id="contact-heading">
              Let&apos;s Work <span className="text-gradient">Together</span>
            </span>
          }
          description="Open to full-stack engineering roles and remote opportunities worldwide."
        />

        <Reveal delay={0.1} scale className="mt-14 sm:mt-16">
          <ContactCard />
        </Reveal>
      </div>
    </section>
  );
}

function ContactCard() {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // Clipboard blocked — the mailto button next to this still works.
    }
  };

  return (
    <div className="noise-overlay relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-lift sm:p-10 lg:p-14">
      {/* Ambient layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-64 w-[120%] -translate-x-1/2 rounded-full aura"
      />

      <div className="relative flex flex-col items-center text-center">
        <motion.span
          aria-hidden="true"
          initial={reduced ? false : { scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid size-14 place-items-center rounded-2xl border border-line bg-base-deep/60 text-accent shadow-[0_0_0_6px_var(--accent-soft)] sm:size-16"
        >
          <Mail className="size-6 sm:size-7" strokeWidth={1.5} />
        </motion.span>

        <p className="mt-6 max-w-lg text-lg leading-relaxed font-light text-ink text-pretty sm:text-xl">
          Have a project, idea or opportunity? Send it over and let&apos;s talk
          about how it should be built.
        </p>

        {/* Email row --------------------------------------------------- */}
        <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-2 sm:flex-row">
          <a
            href={`mailto:${site.email}`}
            className={cn(
              "group flex min-w-0 flex-1 items-center justify-center gap-2.5 rounded-full border border-line",
              "bg-base-deep/50 px-4 py-3 transition-all duration-300",
              "hover:border-accent/45 hover:bg-accent-soft",
            )}
          >
            <Mail
              className="size-4 shrink-0 text-accent"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span className="truncate font-mono text-[12.5px] tracking-tight sm:text-[13.5px]">
              {site.email}
            </span>
          </a>

          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? "Email address copied" : "Copy email address"}
            className={cn(
              "inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border px-4",
              "text-[13px] font-medium transition-all duration-300 sm:w-12 sm:px-0",
              copied
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                : "border-line text-ink-muted hover:border-accent/45 hover:text-ink",
            )}
          >
            {copied ? (
              <Check className="size-4" strokeWidth={2} aria-hidden="true" />
            ) : (
              <Copy className="size-4" strokeWidth={1.75} aria-hidden="true" />
            )}
            <span className="sm:hidden">{copied ? "Copied" : "Copy address"}</span>
          </button>
        </div>

        {/* Actions ------------------------------------------------------ */}
        <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <MagneticButton
            href={`mailto:${site.email}`}
            className="w-full sm:w-auto"
          >
            Send Email
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </MagneticButton>

          <MagneticButton
            href={site.linkedin}
            external
            variant="secondary"
            className="w-full sm:w-auto"
          >
            <LinkedinIcon className="size-4" aria-hidden="true" />
            LinkedIn
          </MagneticButton>

          <MagneticButton
            href={site.github}
            external
            variant="secondary"
            className="w-full sm:w-auto"
          >
            <GithubIcon className="size-4" aria-hidden="true" />
            GitHub
          </MagneticButton>
        </div>

        {/* Meta — every value below is taken from the résumé header. ------ */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 border-t border-line pt-6 text-[12.5px] text-ink-subtle">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
            {site.location}
          </span>
          <a
            href={`tel:${site.phone.replace(/\s+/g, "")}`}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-full px-1 transition-colors duration-300 hover:text-ink"
          >
            <Phone className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
            {site.phone}
          </a>
          <span className="inline-flex items-center gap-2">
            <span className="relative flex size-2">
              <span
                aria-hidden="true"
                className="absolute inline-flex size-2 rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping"
              />
              <span
                aria-hidden="true"
                className="relative inline-flex size-2 rounded-full bg-emerald-500"
              />
            </span>
            {site.workMode}
          </span>
        </div>
      </div>
    </div>
  );
}
