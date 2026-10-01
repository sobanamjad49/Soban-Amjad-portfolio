import {
  ClipboardCheck,
  CreditCard,
  Database,
  FileText,
  Gauge,
  Gavel,
  HardDrive,
  Layers,
  MonitorSmartphone,
  Plug,
  ShieldCheck,
  Smartphone,
  Sparkles,
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
 * Featured case study: PropToc — a two-sided property snagging and
 * maintenance marketplace.
 *
 * Every claim below traces to the résumé's PropToc entry: the React Native
 * customer app and Next.js portals, the NestJS/PostgreSQL/S3 backend, the
 * report engine and weighted Snag Score, the anonymous sealed bidding, and
 * the 50/50 milestone payment flow. Nothing is inferred beyond that.
 */
export const featuredProject = {
  name: "PropToc",
  domain: "proptoc-demo.vercel.app",
  category: "Property snagging and maintenance marketplace",
  role: "Full-stack development — architecture through production",
  tagline:
    "A two-sided marketplace where homeowners buy inspection plans, receive an AI-assisted snagging report and collect bids from vetted vendors — React Native app, Next.js portals and NestJS services.",
  overview:
    "PropToc carries a homeowner from inspection to finished repairs without leaving the product. They buy a property inspection plan, receive an AI-assisted snagging report, and collect bids from vetted maintenance vendors. I built it end to end: a React Native customer app, Next.js admin and vendor portals, and NestJS services on PostgreSQL with file storage on S3.",
  problem:
    "A homeowner has no structured way to record what is wrong with a property, price the fix fairly, or hold a vendor to the work. Defects go undocumented, quotes are not comparable because every vendor scopes the job differently, and paying up front removes all leverage once work begins.",
  solution:
    "One marketplace covering the whole chain. Inspection data becomes a severity-graded report with inline photos and a weighted Snag Score per property. That scoped defect list goes to vetted vendors who bid sealed and anonymous — no vendor sees another or the customer — so offers compare on price and timeline rather than on scope. Payment then splits 50/50 across milestones, with the final instalment held behind customer approval and a dispute state.",
  contributions: [
    "Built a two-sided marketplace where homeowners buy property inspection plans, receive an AI-assisted snagging report and collect bids from vetted maintenance vendors: React Native customer app, Next.js admin and vendor portals, and NestJS services on PostgreSQL with file storage on S3.",
    "Developed a report engine that turns structured inspection data into server-rendered PDFs with inline photos, severity indicators and a weighted Snag Score per property, with an LLM layer that cleans up inspector notes and drafts the summary.",
    "Implemented anonymous sealed bidding: vendors can't see each other or the customer, and identities are revealed only once an offer is accepted.",
    "Built a milestone payment flow (50% upfront, 50% on customer approval) with commission calculation on total project value, invoice generation, payout tracking and a dispute state that holds the final payment.",
  ],
  capabilities: [
    {
      name: "Structured inspections",
      icon: ClipboardCheck,
      description:
        "Inspection data captured as structured records rather than free-form notes.",
    },
    {
      name: "Graded defect reports",
      icon: FileText,
      description:
        "Server-rendered PDFs with inline photos and severity indicators per defect.",
    },
    {
      name: "Weighted Snag Score",
      icon: Gauge,
      description: "A single score per property, computed from the graded defect list.",
    },
    {
      name: "Anonymous sealed bidding",
      icon: Gavel,
      description:
        "Vendors bid without seeing each other or the customer until an offer is accepted.",
    },
    {
      name: "Milestone payments",
      icon: Wallet,
      description:
        "50% upfront and 50% on approval, with a dispute state holding the final payment.",
    },
    {
      name: "LLM summary layer",
      icon: Sparkles,
      description: "Cleans up inspector notes and drafts the report summary.",
    },
  ] satisfies Capability[],
  architecture: [
    {
      label: "Customer app",
      icon: Smartphone,
      detail:
        "A React Native application where homeowners buy inspection plans, read reports and review bids.",
    },
    {
      label: "Web portals",
      icon: MonitorSmartphone,
      detail:
        "Next.js admin and vendor portals covering vendor onboarding, bidding and day-to-day operations.",
    },
    {
      label: "API layer",
      icon: Layers,
      detail:
        "NestJS services covering inspections, reports, bidding and the payment flow.",
    },
    {
      label: "Data",
      icon: Database,
      detail:
        "PostgreSQL modelling properties, inspections, defects, bids and payment milestones.",
    },
    {
      label: "File storage",
      icon: HardDrive,
      detail: "Inspection photos and generated report PDFs stored on S3.",
    },
    {
      label: "Payments",
      icon: CreditCard,
      detail:
        "Commission calculated on total project value, with invoice generation and payout tracking.",
    },
  ],
  outcome:
    "The marketplace takes a property from inspection to signed-off repairs in one place: defects are evidenced and scored rather than argued over, bids arrive comparable because every vendor quotes the same scope blind, and staged payments keep the homeowner's leverage until the work is approved.",
  stack: ["React Native", "Next.js", "NestJS", "PostgreSQL", "S3", "LLM"],
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
    category: "Cyber risk assessment and AI learning platform",
    description:
      "A multi-tenant platform that scores an organisation's cyber risk and turns the gaps it finds into an ordered learning path. I led the team building it, across a Turborepo monorepo pairing a Next.js web app and NestJS API with a BullMQ worker and a Python FastAPI service owning every AI feature.",
    contributions: [
      "Led the team building a multi-tenant platform in a Turborepo monorepo: Next.js 16 App Router web app, NestJS 11 API, a separate BullMQ worker process and a Python FastAPI service that owns all AI features.",
      "Built a risk engine scoring organisations 0–100 from a versioned question bank with server-side skip logic, passive domain checks (TLS, SPF/DKIM/DMARC, breach lookups) and standalone mini tools. Scoring is deterministic and reproducible; the LLM only writes narrative on gaps the rule engine has already flagged, keeping compliance output defensible.",
      "Developed a RAG layer over course transcripts — Whisper transcription, semantic chunking, Vertex AI embeddings and ANN search in AlloyDB with ScaNN — with a structured re-rank that turns a user's risk gaps into an ordered learning path.",
      "Mapped answers to a NIST CSF control library with per-framework status reporting for GDPR, ISO 27001, PDPL, HIPAA, PCI DSS and SOC 2.",
      "Enforced tenant isolation at three layers (JWT claims, a tenant-scoped base repository, Postgres row-level security) with dynamic roles over a seeded permission catalogue, plus an LMS with Bunny.net video, quizzes, certificates, phishing simulations and 7 locales including RTL Arabic.",
    ],
    stack: [
      "Next.js",
      "NestJS",
      "BullMQ",
      "Python FastAPI",
      "Vertex AI",
      "AlloyDB",
      "PostgreSQL",
      "Turborepo",
    ],
    links: {
      live: "https://cybrology.com",
      github: null,
      note: "Source code is private",
    },
    motif: "analytics",
    accent: "from-[#7c6bff] to-[#35d6e8]",
    icon: ShieldCheck,
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
