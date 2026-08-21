import {
  Cloud,
  Database,
  Gauge,
  Layers,
  Network,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Principle = {
  title: string;
  statement: string;
  icon: LucideIcon;
};

/**
 * These are the résumé's own Strengths, expanded into short professional
 * statements. The strengths themselves are verbatim from the résumé.
 */
export const principles: Principle[] = [
  {
    title: "Full-Stack Development",
    statement:
      "Comfortable across the whole stack — the interface, the service behind it and the database underneath are one system, not three handoffs.",
    icon: Layers,
  },
  {
    title: "REST API Design",
    statement:
      "APIs designed as contracts: predictable resources, secure endpoints and responses the frontend can rely on.",
    icon: Network,
  },
  {
    title: "Database Design",
    statement:
      "Relational and document schemas modelled around the domain, across PostgreSQL, MySQL and MongoDB.",
    icon: Database,
  },
  {
    title: "Software Architecture",
    statement:
      "Clean architecture and scalable application structure, so features can be added without unpicking what already works.",
    icon: Workflow,
  },
  {
    title: "Cloud Deployment",
    statement:
      "Containerised services with Docker, deployed to Google Cloud Platform and Vercel with consistent environments.",
    icon: Cloud,
  },
  {
    title: "Performance Optimization",
    statement:
      "Caching frequently accessed data and optimising slow paths, so applications stay responsive under real usage.",
    icon: Gauge,
  },
  {
    title: "Clean Code",
    statement:
      "Maintainable, high-quality, production-ready code — written to be read by whoever picks it up next.",
    icon: Sparkles,
  },
  {
    title: "Team Collaboration",
    statement:
      "Collaborative delivery through Git and GitHub — reviews, shared conventions and a history that explains itself.",
    icon: Users,
  },
];

export type AboutCapability = {
  label: string;
  detail: string;
};

/** Drawn from the résumé's technical skills and experience bullets. */
export const aboutCapabilities: AboutCapability[] = [
  { label: "Full-Stack Development", detail: "React · Next.js · Node.js" },
  { label: "API Design", detail: "NestJS · REST · GraphQL · tRPC" },
  { label: "Database Design", detail: "PostgreSQL · MongoDB · Supabase · Prisma" },
  { label: "Authentication", detail: "SSO · row-level security · access control" },
  { label: "Real-Time Systems", detail: "WebSockets · SSE · message queues" },
  { label: "AI & LLM Workflows", detail: "RAG pipelines · vector databases" },
  { label: "Cloud Infrastructure", detail: "Docker · Kubernetes · AWS · GCP" },
  { label: "Testing & Quality", detail: "Playwright E2E · integration testing" },
];
