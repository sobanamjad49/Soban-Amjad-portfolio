import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { footerLinks, site } from "@/data/site";

/**
 * Server component — no interactivity beyond plain anchors, so it costs the
 * client bundle nothing.
 */
export function Footer() {
  return (
    <footer className="relative border-t border-line px-4 pt-14 pb-8 sm:px-6 sm:pt-16 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {/* Identity */}
          <div className="max-w-sm">
            <a href="#home" className="group inline-flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl border border-line-strong bg-surface font-display text-[13px] font-semibold tracking-tight">
                <span className="text-gradient">{site.initials}</span>
              </span>
              <span className="font-display text-base font-semibold tracking-tight">
                {site.name}
              </span>
            </a>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-muted">
              {site.role}
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-subtle text-pretty">
              Building scalable web applications, APIs and digital products from{" "}
              {site.location}.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="lg:min-w-40">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-ink-subtle uppercase">
              Navigate
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-1">
              {footerLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="underline-sweep inline-flex min-h-8 items-center text-[14px] text-ink-muted transition-colors duration-300 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-ink-subtle uppercase">
              Connect
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex min-h-8 items-center gap-2.5 text-[14px] text-ink-muted transition-colors duration-300 hover:text-ink"
                >
                  <GithubIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex min-h-8 items-center gap-2.5 text-[14px] text-ink-muted transition-colors duration-300 hover:text-ink"
                >
                  <LinkedinIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex min-h-8 items-center gap-2.5 text-[14px] text-ink-muted transition-colors duration-300 hover:text-ink"
                >
                  <Mail
                    className="size-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Base line */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-[12.5px] text-ink-subtle">
            © 2026 {site.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <p className="hidden font-mono text-[11px] tracking-tight text-ink-subtle sm:block">
              Built with Next.js, TypeScript &amp; Tailwind CSS
            </p>
            <a
              href="#home"
              aria-label="Back to top"
              className="group grid size-9 place-items-center rounded-full border border-line text-ink-subtle transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
            >
              <ArrowUp
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
