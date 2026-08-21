export type ExperienceEntry = {
  company: string | null;
  role: string;
  period: string;
  mode: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

/**
 * Taken directly from the résumé's Experience section. The bullets are lightly
 * rewritten for the web; no responsibility, metric or achievement has been
 * added, and no employer, date or location has been inferred.
 */
export const experience: ExperienceEntry[] = [
  {
    company: "DevSarch",
    role: "Full Stack Engineer",
    period: "04/2026 — Present",
    mode: "Onsite · Lahore",
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
  {
    company: "Severalnines",
    role: "Full Stack Engineer",
    period: "06/2024 — 03/2026",
    mode: "Remote · Sweden",
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
    company: "PureLogics",
    role: "Software Engineer",
    period: "09/2023 — 05/2024",
    mode: "Hybrid · Pakistan",
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
    period: "09/2020 — 06/2024",
    kind: "education",
  },
];

/**
 * The résumé lists no certifications. This stays empty on purpose — the
 * Credentials section drops the card rather than showing invented ones.
 */
export const certifications: Credential[] = [];
