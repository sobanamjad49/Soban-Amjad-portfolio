import {
  Atom,
  Binary,
  Blocks,
  Bot,
  Boxes,
  Cloud,
  Component,
  Container,
  Database,
  FileCode2,
  FlaskConical,
  Hash,
  HardDrive,
  KeyRound,
  Layers,
  MemoryStick,
  MessageSquare,
  MousePointer2,
  Network,
  Palette,
  Radio,
  Route,
  Server,
  Share2,
  ShieldCheck,
  Sparkles,
  Table2,
  TestTube,
  Triangle,
  Waypoints,
  Webhook,
  Wind,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Skill = {
  name: string;
  description: string;
  icon: LucideIcon;
};

export type SkillCategory = {
  id: string;
  title: string;
  caption: string;
  icon: LucideIcon;
  skills: Skill[];
};

/**
 * These mirror the résumé's own Skills table, group for group. Every entry
 * appears there or in an experience/project bullet — nothing has been added
 * because it is popular.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    caption: "Responsive interfaces across devices",
    icon: Component,
    skills: [
      { name: "React", description: "Composable component UI", icon: Atom },
      { name: "Next.js", description: "Server rendering and routing", icon: Triangle },
      { name: "TypeScript", description: "Type-safe application code", icon: FileCode2 },
      { name: "Tailwind CSS", description: "Design-system styling", icon: Wind },
      { name: "HTML5", description: "Semantic, accessible markup", icon: Hash },
      { name: "CSS3", description: "Modern layout and styling", icon: Palette },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    caption: "Services and APIs built to scale",
    icon: Server,
    skills: [
      { name: "Node.js", description: "Async server runtime", icon: Server },
      { name: "NestJS", description: "Modular, scalable services", icon: Layers },
      { name: "Express", description: "Lightweight HTTP services", icon: Route },
      { name: "REST APIs", description: "Secure, documented endpoints", icon: Network },
      { name: "GraphQL", description: "Typed query APIs", icon: Share2 },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    caption: "Schemas designed and managed end to end",
    icon: Database,
    skills: [
      { name: "PostgreSQL", description: "Relational transactional core", icon: Database },
      { name: "MySQL", description: "Relational data workloads", icon: Table2 },
      { name: "MongoDB", description: "Document data models", icon: HardDrive },
      { name: "Supabase", description: "Postgres platform and auth", icon: Zap },
      { name: "Redis", description: "Caching and queues", icon: MemoryStick },
      { name: "Prisma", description: "Schema modelling and queries", icon: Boxes },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    caption: "Distributed systems and real-time delivery",
    icon: Waypoints,
    skills: [
      { name: "Microservices", description: "Independently deployable services", icon: Boxes },
      { name: "Event-driven systems", description: "Asynchronous, decoupled flows", icon: Workflow },
      { name: "WebSockets", description: "Bidirectional real-time channels", icon: Webhook },
      { name: "SSE", description: "Server-pushed event streams", icon: Radio },
      { name: "Message queues", description: "Buffered, reliable work handoff", icon: Layers },
      { name: "Serverless (Lambda)", description: "On-demand compute", icon: Zap },
    ],
  },
  {
    id: "cloud",
    title: "DevOps & Cloud",
    caption: "Development, deployment and infrastructure",
    icon: Container,
    skills: [
      { name: "AWS", description: "Cloud infrastructure", icon: Cloud },
      { name: "GCP", description: "Cloud deployment and GKE", icon: Cloud },
      { name: "Docker", description: "Containerised services", icon: Container },
      { name: "CI/CD (GitHub Actions)", description: "Automated build and deploy", icon: Workflow },
      { name: "Vercel", description: "Frontend deployment", icon: Triangle },
      { name: "Railway", description: "Managed service hosting", icon: Route },
      { name: "Terraform basics", description: "Infrastructure as code", icon: Blocks },
    ],
  },
  {
    id: "testing",
    title: "Testing & Quality",
    caption: "Confidence before release, not after",
    icon: FlaskConical,
    skills: [
      { name: "Playwright", description: "Browser end-to-end testing", icon: TestTube },
      { name: "E2E + coverage", description: "Coverage raised 5% → 70%", icon: ShieldCheck },
      { name: "Integration testing", description: "Services verified together", icon: KeyRound },
    ],
  },
  {
    id: "ai",
    title: "AI-Assisted Dev",
    caption: "Daily use for refactoring, tests and exploration",
    icon: Sparkles,
    skills: [
      { name: "Cursor", description: "AI-native editing workflow", icon: MousePointer2 },
      { name: "Claude Code", description: "Agentic refactoring and review", icon: Sparkles },
      { name: "GitHub Copilot", description: "Inline code completion", icon: Bot },
      { name: "ChatGPT", description: "Exploration and problem solving", icon: MessageSquare },
      { name: "Codex", description: "Test generation and automation", icon: Binary },
    ],
  },
];

/** Flat list used by the hero marquee — résumé technologies only. */
export const marqueeTech: string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "NestJS",
  "GraphQL",
  "PostgreSQL",
  "Supabase",
  "Prisma",
  "Redis",
  "Microservices",
  "WebSockets",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "GitHub Actions",
  "Playwright",
];
