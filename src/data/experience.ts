export type ExperienceRole = {
  role: string;
  /**
   * LinkedIn-style range with the tenure it works out to, e.g.
   * "Jun 2024 — Mar 2026 · 1 yr 10 mos".
   */
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type ExperienceEntry = {
  company: string;
  employmentType: string;
  /**
   * Combined tenure across the roles below. LinkedIn shows this on the company
   * header of a grouped entry only; a single-role entry states its span on the
   * role itself, so this stays undefined there.
   */
  tenure?: string;
  location: string;
  mode: string;
  /** More than one role means the entry renders grouped under the employer. */
  roles: ExperienceRole[];
};

/**
 * Employers, roles, dates and locations mirror the LinkedIn profile — including
 * the two roles held under one employer, which LinkedIn groups into a single
 * entry. The bullets come from the résumé, lightly rewritten for the web; no
 * responsibility, metric or achievement has been added, and no employer, date
 * or location has been inferred.
 */
export const experience: ExperienceEntry[] = [
  {
    company: "Devsarch",
    employmentType: "Full-time",
    location: "Lahore, Punjab, Pakistan",
    mode: "On-site",
    roles: [
      {
        role: "Full Stack Engineer",
        /** Tenure is stated as of the profile snapshot; refresh alongside it. */
        period: "Apr 2026 — Present · 7 mos",
        summary:
          "Architecture-through-production ownership of multi-tenant SaaS — real-time services, AI and RAG pipelines, and secure payment and healthcare integrations.",
        highlights: [
          "Owned multi-tenant SaaS applications from architecture through production on Next.js, React, TypeScript, NestJS, tRPC, PostgreSQL, Supabase, Prisma and REST/GraphQL APIs, architecting event-driven microservices on 5 real-time and messaging technologies (WebSockets, Pusher, SSE, Redis and message queues).",
          "Shipped production-grade AI/LLM workflows and RAG pipelines across 4 use cases (summarization, classification, semantic search and automation), grounding AI responses in product and customer data through vector databases.",
          "Integrated 4 third-party platforms (Stripe, Square, HelloSign and Google APIs) into secure payment and healthcare solutions, enforcing row-level security and secure data-access patterns for sensitive data.",
          "Deployed real-time platforms running on Python microservices with Docker and Kubernetes on GCP/GKE through CI/CD, backed by Playwright E2E and integration testing and 5 AI coding tools (Cursor, Claude Code, GitHub Copilot, ChatGPT, Codex).",
        ],
        stack: [
          "Next.js",
          "React",
          "TypeScript",
          "NestJS",
          "tRPC",
          "GraphQL",
          "PostgreSQL",
          "Supabase",
          "Prisma",
          "WebSockets",
          "Redis",
          "Kubernetes",
          "GCP",
          "Docker",
          "Stripe",
          "Playwright",
        ],
      },
    ],
  },
  {
    company: "Remote",
    employmentType: "Full-time",
    tenure: "3 yrs 7 mos",
    location: "United States",
    mode: "Remote",
    roles: [
      {
        role: "Full Stack Engineer",
        period: "Jun 2024 — Mar 2026 · 1 yr 10 mos",
        summary:
          "Node.js and TypeScript services behind a database-automation SaaS platform, alongside a substantial lift in test coverage and access control.",
        highlights: [
          "Maintained and extended Node.js/TypeScript services for 4 core platform operations (database automation, monitoring, backups and failover), rolled out Keycloak SSO and access control, and introduced a monorepo architecture for reusable components.",
          "Increased Playwright E2E test coverage from 5% to 70%, reducing production regressions, and optimized React/TypeScript UI responsiveness and dashboard performance across key platform modules.",
        ],
        stack: [
          "Node.js",
          "TypeScript",
          "React",
          "Playwright",
          "Keycloak",
          "Monorepo",
        ],
      },
      {
        role: "Software Engineer",
        period: "Sep 2022 — May 2024 · 1 yr 9 mos",
        summary:
          "Full-stack product delivery with real-time features and Docker-based CI/CD pipelines deploying to four platforms.",
        highlights: [
          "Built and maintained full-stack products with React, Next.js, TypeScript, Node.js, NestJS, PostgreSQL, MongoDB and Supabase, shipping REST APIs, real-time WebSockets/SSE features and event-driven microservices to 4 platforms (AWS, GCP, Vercel and Railway) through Docker-based CI/CD in GitHub Actions.",
          "Established E2E and integration testing with Playwright, and applied AI coding tools across 4 workflows: refactoring, debugging, test generation and code exploration.",
        ],
        stack: [
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "NestJS",
          "PostgreSQL",
          "MongoDB",
          "Supabase",
          "Docker",
          "GitHub Actions",
          "AWS",
          "Playwright",
        ],
      },
    ],
  },
];

export type Credential = {
  qualification: string;
  institution: string;
  /** Résumé states the period for education; kept optional for future entries. */
  period?: string;
  kind: "education" | "certification";
};

export const education: Credential[] = [
  {
    qualification: "BS in Computer Science",
    institution: "Virtual University",
    period: "Sep 2020 — Jun 2024",
    kind: "education",
  },
];

/**
 * The résumé lists no certifications. This stays empty on purpose — the
 * Credentials section drops the card rather than showing invented ones.
 */
export const certifications: Credential[] = [];
