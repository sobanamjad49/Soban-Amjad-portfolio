/**
 * Identity and copy. Every fact here is taken from the résumé — nothing is
 * inferred, embellished or invented. Rewritten for the web, but the underlying
 * claims are unchanged.
 */

export const site = {
  name: "Soban Amjad",
  initials: "SA",
  role: "Software Engineer & Full-Stack Developer",
  shortRole: "Software Engineer",
  location: "Lahore, Pakistan",
  workMode: "Remote",
  /** Résumé header line. */
  headline: "Software Engineer | Full Stack Developer",
  /** Condensed from the résumé's professional summary. */
  statement:
    "I build scalable web applications and REST APIs with Next.js, React, NestJS and Node.js — focused on clean architecture, maintainable code and production-ready delivery.",
  description:
    "Full-stack software engineer with hands-on experience building scalable web applications using Next.js, React.js, NestJS and Node.js/Express. Skilled in REST API design, authentication and third-party integrations, with PostgreSQL, MongoDB, MySQL, Docker, Redis and Google Cloud Platform.",
  email: "sobanamjad49@gmail.com",
  phone: "+92 313 4183635",
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
 * Only facts the résumé states directly: the 2023–2026 tenure, the three named
 * projects, and the remote working model. No fabricated metrics.
 */
export const heroStats = [
  { value: "3+", label: "Years of professional experience" },
  { value: "3", label: "Production platforms delivered" },
  { value: "Remote", label: "Working model" },
] as const;
