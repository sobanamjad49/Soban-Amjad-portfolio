/**
 * Identity and copy. Every fact here is taken from the résumé — nothing is
 * inferred, embellished or invented. Rewritten for the web, but the underlying
 * claims are unchanged.
 */

export const site = {
  name: "Soban Amjad",
  initials: "SA",
  role: "Full Stack Engineer",
  shortRole: "Full Stack Engineer",
  /**
   * The résumé header gives the location as "Asia"; the current role is listed
   * as on-site in Lahore, which is the more specific of the two facts it states.
   */
  location: "Lahore, Pakistan",
  workMode: "On-site",
  /** Current title on the résumé. */
  headline: "Full Stack Engineer",
  /** Condensed from the résumé's professional summary. */
  statement:
    "I build scalable web applications and REST APIs with Next.js, React, NestJS and Node.js — focused on clean architecture, maintainable code and production-ready delivery.",
  description:
    "Full-stack software engineer with hands-on experience building scalable web applications using Next.js, React.js, NestJS and Node.js/Express. Skilled in REST API design, authentication and third-party integrations, with PostgreSQL, MongoDB, MySQL, Docker, Redis and Google Cloud Platform.",
  email: "sobanamjad49@gmail.com",
  github: "https://github.com/sobanamjad49",
  linkedin: "https://www.linkedin.com/in/soban-amjad-6b3906374",
  /**
   * Versioned so a replaced PDF is never served from a stale cache. The file
   * keeps one filename, so browsers that already hold the previous résumé at
   * this path would otherwise revalidate at best and serve the old copy at
   * worst. Bump this whenever the PDF is replaced.
   */
  resume: "/Soban_Amjad_Resume.pdf?v=2026-08",
  /**
   * NEXT_PUBLIC_SITE_URL wins, so a custom domain can be set without a code
   * change. Vercel injects VERCEL_PROJECT_PRODUCTION_URL (host only, no
   * scheme) on every build, which keeps canonical/OG URLs correct on the
   * deployed site instead of falling through to localhost. Local dev keeps
   * the localhost fallback rather than inventing a public URL.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** id of the <section> this item tracks, for the active indicator */
  id: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const footerLinks: NavItem[] = navItems.filter((item) =>
  ["home", "about", "skills", "projects", "contact"].includes(item.id),
);

/**
 * Only facts the résumé states directly: the tenure since 09/2023, the three
 * named projects, and the one hard metric it gives — the Playwright coverage
 * lift on the SaaS platform role. No fabricated figures.
 */
export const heroStats = [
  { value: "3+", label: "Years of professional experience" },
  { value: "3", label: "Production platforms delivered" },
  { value: "5→70%", label: "E2E test coverage raised" },
] as const;
