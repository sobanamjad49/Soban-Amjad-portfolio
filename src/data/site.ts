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
   * as "Onsite, Lahore", which is the more specific of the two facts it states.
   */
  location: "Lahore, Pakistan",
  workMode: "Onsite",
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
  resume: "/Soban_Amjad_Resume.pdf",
  /**
   * Set NEXT_PUBLIC_SITE_URL at build time once a domain exists. The localhost
   * fallback keeps metadata valid without inventing a public URL.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
 * lift at Severalnines. No fabricated figures.
 */
export const heroStats = [
  { value: "3+", label: "Years of professional experience" },
  { value: "3", label: "Production platforms delivered" },
  { value: "5→70%", label: "E2E test coverage raised" },
] as const;
