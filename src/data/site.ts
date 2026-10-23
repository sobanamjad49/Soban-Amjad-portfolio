/**
 * Identity and copy. Every fact here is taken from the résumé — nothing is
 * inferred, embellished or invented. Rewritten for the web, but the underlying
 * claims are unchanged.
 */

export const site = {
  name: "Soban Amjad",
  initials: "SA",
  role: "Full Stack Software Engineer",
  shortRole: "Full Stack Engineer",
  /**
   * The résumé header gives the location as "Asia"; the current role is listed
   * as on-site in Lahore, which is the more specific of the two facts it states.
   */
  location: "Lahore, Pakistan",
  /**
   * Shown beside the green pulse in the hero and contact chips, so it states
   * what is being sought rather than the current arrangement. This is a stated
   * preference, not a résumé fact — the résumé still lists the role as on-site.
   */
  availability: "Open to remote opportunities",
  /** Title in the résumé header. */
  headline: "Full Stack Software Engineer",
  /** Condensed from the résumé's professional summary. */
  statement:
    "I own multi-tenant SaaS products from architecture through production — Next.js and React frontends, NestJS, Node.js and Python services, and AI/LLM workflows grounded in real data.",
  description:
    "Full Stack Software Engineer with 4+ years of experience owning multi-tenant SaaS products from architecture through production. Builds Node.js, NestJS, Python and Java services, Next.js/React frontends and PostgreSQL data layers, with Redis-backed real-time systems, AI/LLM workflows and RAG pipelines, shipped on Kubernetes and AWS.",
  email: "sobanamjad49@gmail.com",
  github: "https://github.com/sobanamjad49",
  linkedin: "https://www.linkedin.com/in/soban-amjad-6b3906374",
  /**
   * Versioned so a replaced PDF is never served from a stale cache. The file
   * keeps one filename, so browsers that already hold the previous résumé at
   * this path would otherwise revalidate at best and serve the old copy at
   * worst. Bump this whenever the PDF is replaced.
   */
  resume: "/Soban_Amjad_Resume.pdf?v=2026-10-23",
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
 * Only facts the résumé states directly: the tenure since 09/2022, the three
 * named projects, and the one hard metric it gives — the Playwright coverage
 * lift on the SaaS platform role. No fabricated figures.
 */
export const heroStats = [
  { value: "4+", label: "Years of professional experience" },
  { value: "3", label: "Production platforms delivered" },
  { value: "5→70%", label: "E2E test coverage raised" },
] as const;
