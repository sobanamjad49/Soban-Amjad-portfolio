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
        period: "Apr 2026 — Present · 5 mos",
        summary:
          "Architecture-through-production ownership of multi-tenant products — real-time services, AI and RAG pipelines, and secure payment and healthcare integrations.",
        highlights: [
          "Architected and delivered scalable, multi-tenant applications using Next.js, React, TypeScript, NestJS, tRPC, PostgreSQL, Supabase, Prisma and REST/GraphQL APIs, owning features from architecture through production.",
          "Designed microservices and event-driven systems with real-time communication using WebSockets, Pusher, SSE, Redis and message queues, optimizing applications for scalability and low latency.",
          "Built production-grade AI/LLM workflows and RAG pipelines for summarization, classification, semantic search and automation, integrating vector databases to ground AI responses in product and customer data.",
          "Delivered real-time platforms using Python microservices, GCP/GKE, Kubernetes, Docker and CI/CD, with scalable cloud infrastructure and reliable deployment workflows.",
          "Architected secure payment and healthcare solutions integrating Stripe, Square, HelloSign and Google APIs, implementing row-level security and secure data-access patterns for sensitive application data.",
          "Applied Playwright E2E and integration testing alongside AI-assisted development tools such as Cursor, Claude Code, GitHub Copilot, ChatGPT and Codex to improve engineering productivity and code quality.",
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
    tenure: "2 yrs 7 mos",
    location: "United States",
    mode: "Remote",
    roles: [
      {
        role: "Full Stack Engineer",
        period: "Jun 2024 — Mar 2026 · 1 yr 10 mos",
        summary:
          "Node.js and TypeScript services behind a database-automation SaaS platform, alongside a substantial lift in test coverage and access control.",
        highlights: [
          "Developed and maintained Node.js/TypeScript services for database automation, monitoring, backups and failover within a core SaaS platform.",
          "Increased Playwright E2E test coverage from 5% to 70%, reducing production regressions and improving release confidence.",
          "Integrated Keycloak SSO and access control, and introduced a monorepo architecture for reusable components and scalable development.",
          "Improved React/TypeScript UI responsiveness and dashboard performance across key platform modules.",
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
        period: "Sep 2023 — May 2024 · 9 mos",
        summary:
          "Full-stack product delivery with real-time features and Docker-based CI/CD pipelines deploying across four cloud providers.",
        highlights: [
          "Built and maintained full-stack products using React, Next.js, TypeScript, Node.js, NestJS, PostgreSQL, MongoDB and Supabase, owning features from development to production.",
          "Developed scalable REST APIs, real-time features with WebSockets/SSE, and backend services using microservices and event-driven architectures.",
          "Implemented Docker-based CI/CD pipelines with GitHub Actions, supporting reliable deployments across AWS, GCP, Vercel and Railway.",
          "Added E2E and integration testing with Playwright and used AI-assisted development tools for refactoring, debugging, test generation and code exploration.",
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
