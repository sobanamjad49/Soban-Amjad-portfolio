import {
  Cloud,
  Container,
  Database,
  Fingerprint,
  Gauge,
  Layers,
  MemoryStick,
  MonitorSmartphone,
  Network,
  Plug,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/** `null` means the link genuinely does not exist publicly — never invent one. */
export type ProjectLinks = {
  live: string | null;
  github: string | null;
  /** Shown in place of a missing link so the absence reads as intentional. */
  note?: string;
};

export type Capability = {
  name: string;
  icon: LucideIcon;
  description: string;
};

/**
 * Featured case study: Keyhole — the résumé project with the deepest
 * engineering detail (APIs, auth, caching, containerisation, cloud deploy).
 * Every statement below traces back to one of its résumé bullets.
 */
export const featuredProject = {
  name: "Keyhole",
  domain: "keyhole.co",
  category: "SaaS Platform",
  role: "Software Engineer",
  tagline:
    "A production SaaS platform built on clean architecture — scalable NestJS APIs, secure authentication and a responsive Next.js frontend, containerised and deployed to Google Cloud.",
  overview:
    "Keyhole is a SaaS platform whose core features are served by a NestJS REST API and consumed by a responsive Next.js frontend. My work spanned the API layer, the authentication and authorization that guards it, the Redis caching in front of frequently accessed data, and the Docker and Google Cloud setup the whole thing runs on.",
  problem:
    "Core platform features needed a REST API that stayed scalable and secure as the product grew — with authentication and authorization applied consistently, frequently accessed data served without repeated round trips to the database, and an environment that behaved the same locally as it did in the cloud.",
  solution:
    "Scalable REST APIs built in NestJS with secure authentication and authorization on the routes that need it. Redis caching sits in front of frequent data access to improve response times, PostgreSQL holds the persistent data, and every service is containerised with Docker and deployed on Google Cloud Platform following clean architecture practices.",
  contributions: [
    "Developed scalable NestJS REST APIs and secure authentication / authorization for core platform features.",
    "Built a responsive Next.js frontend and used Redis caching to improve response times for frequent data access.",
    "Containerized services with Docker, worked with PostgreSQL, and deployed on Google Cloud Platform using clean architecture practices.",
  ],
  capabilities: [
    {
      name: "REST API layer",
      icon: Network,
      description: "Scalable NestJS endpoints serving the platform's core features.",
    },
    {
      name: "Authentication & authorization",
      icon: Fingerprint,
      description: "Secure access control applied to protected platform routes.",
    },
    {
      name: "Responsive frontend",
      icon: MonitorSmartphone,
      description: "A Next.js interface that holds up across device sizes.",
    },
    {
      name: "Redis caching",
      icon: MemoryStick,
      description: "Frequently accessed data served from cache to cut response times.",
    },
    {
      name: "PostgreSQL data layer",
      icon: Database,
      description: "Relational data modelled and managed as the source of truth.",
    },
    {
      name: "Docker & Google Cloud",
      icon: Cloud,
      description: "Containerised services deployed on Google Cloud Platform.",
    },
  ] satisfies Capability[],
  architecture: [
    {
      label: "Frontend",
      icon: MonitorSmartphone,
      detail:
        "A responsive Next.js application consuming the platform API, built to stay consistent across device sizes.",
    },
    {
      label: "API layer",
      icon: Layers,
      detail:
        "Scalable NestJS REST APIs serving core platform features, organised along clean architecture boundaries.",
    },
    {
      label: "Access control",
      icon: ShieldCheck,
      detail:
        "Secure authentication and authorization guarding the platform's protected features.",
    },
    {
      label: "Caching",
      icon: MemoryStick,
      detail:
        "Redis in front of frequently accessed data, added to improve response times on hot read paths.",
    },
    {
      label: "Data",
      icon: Database,
      detail: "PostgreSQL as the relational store behind the API.",
    },
    {
      label: "Delivery",
      icon: Container,
      detail:
        "Services containerised with Docker and deployed on Google Cloud Platform.",
    },
  ],
  /** Qualitative only — the resume states no figures, so none are implied. */
  outcome:
    "Core platform features are served by scalable NestJS APIs with authentication and authorization applied consistently, Redis caching improved response times on frequently accessed data, and the containerised services deploy to Google Cloud Platform from an environment that matches local development.",
  stack: [
    "Next.js",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Google Cloud Platform",
  ],
  links: {
    live: "https://keyhole.co",
    github: null,
    note: "Source code is private — client platform.",
  } satisfies ProjectLinks,
} as const;

export type Project = {
  name: string;
  domain: string;
  category: string;
  description: string;
  contributions: string[];
  stack: string[];
  links: ProjectLinks;
  /** Drives the generated cover visual — no fabricated screenshots. */
  motif: "analytics" | "creator";
  accent: string;
  icon: LucideIcon;
};

export const projects: Project[] = [
  {
    name: "Cybrology",
    domain: "cybrology.com",
    category: "Social Media Analytics Platform",
    description:
      "A social media analytics platform. I contributed backend APIs and third-party service integrations, helped keep the NestJS backend scalable, and built the frontend components that render the results.",
    contributions: [
      "Contributed to the platform by developing backend APIs and integrating third-party services.",
      "Optimized performance and helped maintain a scalable NestJS backend with PostgreSQL, Redis and Docker.",
      "Built responsive Next.js frontend components for consistent cross-device user experiences.",
    ],
    stack: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Google Cloud Platform",
    ],
    links: {
      live: "https://cybrology.com",
      github: null,
      note: "Source code is private",
    },
    motif: "analytics",
    accent: "from-[#7c6bff] to-[#35d6e8]",
    icon: Gauge,
  },
  {
    name: "Talkspresso",
    domain: "talkspresso.com",
    category: "Creator Platform",
    description:
      "A creator platform where I built product features and the secure REST APIs behind them, including the payment integration that drives its transaction workflows.",
    contributions: [
      "Built creator-platform features and secure REST APIs, including payment integration for transaction workflows.",
      "Developed responsive Next.js interfaces and used Redis to optimize frequently accessed data paths.",
      "Supported Dockerized services and PostgreSQL for stable development and deployment workflows.",
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Docker"],
    links: {
      live: "https://talkspresso.com",
      github: null,
      note: "Source code is private",
    },
    motif: "creator",
    accent: "from-[#f0a35e] to-[#e0577f]",
    icon: Plug,
  },
];
