import {
  ClipboardCheck,
  Container,
  Database,
  CreditCard,
  FileText,
  Fingerprint,
  Gavel,
  Layers,
  MemoryStick,
  MonitorSmartphone,
  Plug,
  ShieldCheck,
  Wallet,
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
 * Featured case study: Proptoc — a property snagging, inspection and
 * renovation-coordination platform, built end to end.
 *
 * Unlike the entries below, this one is not on the résumé: the product facts
 * (the inspection method, the report, the blind bidding, the milestone
 * payments, the plans) are taken from the live product itself, and the role
 * and stack are as stated by its author. Nothing is inferred beyond that.
 */
export const featuredProject = {
  name: "Proptoc",
  domain: "proptoc-demo.vercel.app",
  category: "PropTech Platform",
  role: "Full-stack development — architecture through production",
  tagline:
    "A property snagging and renovation platform — 120-point inspections, graded defect reports, blind vendor bidding and milestone-protected payments, built end to end on Next.js and NestJS.",
  overview:
    "Proptoc carries a property owner from handover to finished repairs without leaving the product. An inspection team works the property room by room, a graded report evidences every defect with photos and a Snag Score, vetted trades bid blind on the scoped work, and payment releases against milestones as repairs are approved. I built the platform end to end — the Next.js frontend, the NestJS API behind it, the PostgreSQL model, the Redis caching and the containerised deployment.",
  problem:
    "At handover a new owner has no structured way to find what is wrong, price the fix fairly, or hold a contractor to it. Defects get missed, quotes are not comparable because every trade scopes the job differently, and paying up front removes any leverage once work begins.",
  solution:
    "One platform covering the whole chain. A 120-point room-by-room inspection produces a severity-graded report with photo evidence and a Snag Score within 48 hours. That scoped defect list goes to vetted trades who bid blind — no vendor sees another's price — so quotes compare on price, timeline and experience rather than on scope. Work is then tracked room by room with photo evidence, and payment splits across milestones behind approval gates.",
  contributions: [
    "Built the platform end to end — Next.js frontend, NestJS REST API, PostgreSQL data model, Redis caching and containerised deployment.",
    "Modelled the inspection domain: a 120-point room-by-room method with severity grading, photo evidence and a computed Snag Score, generated into a shareable report.",
    "Implemented the blind bidding marketplace so approved vendors quote without visibility of competitors' pricing, comparable across price, timeline and experience.",
    "Built milestone-based payments with approval gates, releasing funds in stages as work is completed and signed off rather than up front.",
    "Delivered vendor onboarding across specialist trades, with role-separated access for owners, vendors and inspectors.",
    "Shipped tiered plans spanning apartments to unlimited-area properties, including re-inspection and extended defect monitoring.",
  ],
  capabilities: [
    {
      name: "Structured inspections",
      icon: ClipboardCheck,
      description:
        "A 120-point room-by-room method with severity grading and photo evidence.",
    },
    {
      name: "Graded defect reports",
      icon: FileText,
      description: "A Snag Score and evidenced defect list, delivered within 48 hours.",
    },
    {
      name: "Blind vendor bidding",
      icon: Gavel,
      description:
        "Approved trades quote the same scope without seeing competitors' prices.",
    },
    {
      name: "Milestone payments",
      icon: Wallet,
      description: "Funds release in stages behind approval gates rather than up front.",
    },
    {
      name: "Role-separated access",
      icon: Fingerprint,
      description:
        "Owners, vendors and inspectors each reach only what their role allows.",
    },
    {
      name: "Redis caching",
      icon: MemoryStick,
      description: "Frequently read report and marketplace data served from cache.",
    },
  ] satisfies Capability[],
  architecture: [
    {
      label: "Frontend",
      icon: MonitorSmartphone,
      detail:
        "A responsive Next.js application covering the owner, vendor and inspector journeys.",
    },
    {
      label: "API layer",
      icon: Layers,
      detail:
        "NestJS REST APIs serving inspections, reports, bidding and payments, organised along clean architecture boundaries.",
    },
    {
      label: "Access control",
      icon: ShieldCheck,
      detail:
        "Authentication and role-based authorization separating owners, vendors and internal inspectors.",
    },
    {
      label: "Caching",
      icon: MemoryStick,
      detail:
        "Redis in front of frequently read report and marketplace data, keeping hot reads off the database.",
    },
    {
      label: "Data",
      icon: Database,
      detail:
        "PostgreSQL modelling properties, inspections, defects, bids and payment milestones.",
    },
    {
      label: "Delivery",
      icon: Container,
      detail:
        "Services containerised with Docker so the deployed environment matches local development.",
    },
  ],
  outcome:
    "The platform takes a property from handover inspection to signed-off repairs in one place: defects are graded and evidenced rather than argued over, quotes arrive comparable because every trade bids against the same scope, and staged payments keep the owner's leverage until the work is approved.",
  stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Docker"],
  links: {
    live: "https://proptoc-demo.vercel.app",
    github: null,
    note: "Live demo — source code is private.",
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
    category: "Creator Platform",
    description:
      "A creator platform where I built product features and the secure REST APIs behind them, including the Stripe and payment integrations that carry its transaction workflows.",
    contributions: [
      "Built creator-platform features and secure REST APIs, including Stripe/payment integrations for reliable transaction workflows.",
      "Developed responsive Next.js/React interfaces with TypeScript and Tailwind CSS, while leveraging Redis caching to optimize frequently accessed data.",
      "Supported Dockerized services, PostgreSQL and CI/CD workflows, contributing to stable development, testing and production deployments.",
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Docker"],
    links: {
      live: "https://cybrology.com",
      github: null,
      note: "Source code is private",
    },
    motif: "creator",
    accent: "from-[#7c6bff] to-[#35d6e8]",
    icon: CreditCard,
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
