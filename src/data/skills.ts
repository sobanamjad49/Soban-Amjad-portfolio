import {
  Atom,
  Braces,
  Cloud,
  Container,
  Database,
  FileCode2,
  GitBranch,
  GitPullRequest,
  HardDrive,
  Hash,
  Layers,
  MemoryStick,
  Network,
  Palette,
  Route,
  Server,
  SquareTerminal,
  Table2,
  Triangle,
  Wind,
  Boxes,
  Component,
  Code2,
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
 * Every entry below appears in the résumé — either in the Technical Skills
 * table or in an experience/project bullet. Nothing has been added because it
 * is popular.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    caption: "The foundations everything else sits on",
    icon: Code2,
    skills: [
      { name: "TypeScript", description: "Type-safe application code", icon: FileCode2 },
      { name: "JavaScript", description: "ES6+ across the stack", icon: Braces },
      { name: "HTML5", description: "Semantic, accessible markup", icon: Hash },
      { name: "CSS3", description: "Modern layout and styling", icon: Palette },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    caption: "Responsive interfaces across devices",
    icon: Component,
    skills: [
      { name: "React.js", description: "Composable component UI", icon: Atom },
      { name: "Next.js", description: "Server rendering and routing", icon: Triangle },
      { name: "Tailwind CSS", description: "Design-system styling", icon: Wind },
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
      { name: "Express.js", description: "Lightweight HTTP services", icon: Route },
      { name: "RESTful APIs", description: "Secure, documented endpoints", icon: Network },
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
      { name: "Prisma", description: "Schema modelling and queries", icon: Boxes },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    caption: "Development, deployment and infrastructure",
    icon: Container,
    skills: [
      { name: "Docker", description: "Containerised services", icon: Container },
      { name: "Redis", description: "Caching frequent data paths", icon: MemoryStick },
      { name: "Google Cloud", description: "Cloud deployment", icon: Cloud },
      { name: "Vercel", description: "Frontend deployment", icon: Triangle },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    caption: "Version control, testing and collaboration",
    icon: SquareTerminal,
    skills: [
      { name: "Git", description: "Version control workflow", icon: GitBranch },
      { name: "GitHub", description: "Collaboration and reviews", icon: GitPullRequest },
      { name: "Postman", description: "API testing", icon: SquareTerminal },
      { name: "VS Code", description: "Primary development environment", icon: Code2 },
    ],
  },
];

/** Flat list used by the hero marquee — résumé technologies only. */
export const marqueeTech: string[] = [
  "TypeScript",
  "JavaScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "NestJS",
  "Express.js",
  "REST APIs",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Prisma",
  "Docker",
  "Redis",
  "Google Cloud",
  "Vercel",
  "Git",
];
