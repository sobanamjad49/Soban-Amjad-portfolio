import {
  Boxes,
  Code2,
  Gauge,
  Rocket,
  Search,
  TestTube,
  type LucideIcon,
} from "lucide-react";

export type ProcessStage = {
  step: string;
  title: string;
  summary: string;
  /** Named only where the résumé lists the tool for that activity. */
  tools: string[];
  icon: LucideIcon;
};

/**
 * How the work actually runs, stage by stage.
 *
 * Every stage — and in particular every tool named in it — traces back to a
 * line on the résumé. Notably, "Verify" says API testing in Postman and code
 * review rather than an automated test suite, because a test framework is not
 * something the résumé claims.
 */
export const processStages: ProcessStage[] = [
  {
    step: "01",
    title: "Understand",
    summary:
      "Start with the requirement and the constraint behind it — what the feature has to do, who it serves and where it has to fit in what already exists.",
    tools: [],
    icon: Search,
  },
  {
    step: "02",
    title: "Architect",
    summary:
      "Design the shape before writing it: scalable application architecture with clear boundaries between the interface, the service layer and the data, following clean architecture practices.",
    tools: ["Clean architecture", "REST API design"],
    icon: Boxes,
  },
  {
    step: "03",
    title: "Build",
    summary:
      "Implement across the stack — responsive interfaces, REST APIs with authentication and third-party integrations, and the relational or document schema underneath them.",
    tools: ["Next.js", "React.js", "NestJS", "Node.js", "Express.js"],
    icon: Code2,
  },
  {
    step: "04",
    title: "Verify",
    summary:
      "Exercise endpoints directly while building them, and keep changes reviewable — small, readable commits over a shared branch history.",
    tools: ["Postman", "Git", "GitHub"],
    icon: TestTube,
  },
  {
    step: "05",
    title: "Deploy",
    summary:
      "Containerise the services so the deployed environment behaves like the development one, then ship to the cloud.",
    tools: ["Docker", "Google Cloud", "Vercel"],
    icon: Rocket,
  },
  {
    step: "06",
    title: "Improve",
    summary:
      "Optimise performance where the measurements point — caching frequently accessed data, resolving complex technical issues and keeping the code production-ready.",
    tools: ["Redis"],
    icon: Gauge,
  },
];
