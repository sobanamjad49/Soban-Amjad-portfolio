import {
  Cloud,
  Database,
  Fingerprint,
  FlaskConical,
  Gauge,
  Layers,
  Network,
  Radio,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  points: string[];
};

/**
 * Each card maps to a responsibility stated in the résumé's experience or
 * project bullets. Nothing here claims work that isn't on the résumé.
 */
export const services: Service[] = [
  {
    title: "Full-Stack Applications",
    description: "Scalable web and mobile applications.",
    detail:
      "End-to-end delivery in JavaScript and TypeScript — React and Next.js on the front, Node services behind them, styled with Tailwind CSS.",
    icon: Layers,
    points: ["React.js & Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "API Development",
    description: "Robust backend services and RESTful APIs.",
    detail:
      "Backend services and REST, GraphQL and tRPC endpoints built with Node.js, NestJS and Express, structured for scale and owned from architecture through production.",
    icon: Network,
    points: ["NestJS & Express", "REST & GraphQL", "tRPC"],
  },
  {
    title: "Database Design",
    description: "Schemas designed and managed properly.",
    detail:
      "Relational and document data modelled with Prisma across PostgreSQL, MongoDB and MySQL — and maintained as the product grows.",
    icon: Database,
    points: ["PostgreSQL & MySQL", "MongoDB", "Prisma"],
  },
  {
    title: "Authentication & Integrations",
    description: "Secure access and third-party services.",
    detail:
      "Authentication and authorization on protected routes, plus third-party integrations wired into real application workflows.",
    icon: Fingerprint,
    points: ["Authentication", "Authorization", "Third-party APIs"],
  },
  {
    title: "Performance Optimization",
    description: "Faster applications, fewer surprises.",
    detail:
      "Profiling and optimising application performance, caching frequently accessed data with Redis, and resolving complex technical issues in production code.",
    icon: Gauge,
    points: ["Redis caching", "Query optimisation", "Production debugging"],
  },
  {
    title: "Real-Time & Event-Driven Systems",
    description: "Microservices that talk to each other as things happen.",
    detail:
      "Event-driven services with real-time communication over WebSockets, SSE and message queues, with Redis in the middle — designed for scalability and low latency.",
    icon: Radio,
    points: ["WebSockets & SSE", "Message queues", "Microservices"],
  },
  {
    title: "Testing & Quality",
    description: "Confidence before release, not after.",
    detail:
      "Playwright end-to-end and integration coverage built into the pipeline — the approach that took one platform's E2E coverage from 5% to 70% and cut production regressions.",
    icon: FlaskConical,
    points: ["Playwright E2E", "Integration testing", "CI/CD pipelines"],
  },
  {
    title: "Cloud & Deployment",
    description: "Containerised delivery to the cloud.",
    detail:
      "Services containerised with Docker and deployed to Google Cloud Platform or Vercel, with environments that behave the same everywhere.",
    icon: Cloud,
    points: ["Docker", "Google Cloud Platform", "Vercel"],
  },
];
