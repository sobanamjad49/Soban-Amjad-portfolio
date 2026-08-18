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
 * Taken directly from the résumé's Professional Experience section. The
 * bullets are lightly rewritten for the web; no responsibility, metric or
 * achievement has been added.
 */
export const experience: ExperienceEntry[] = [
  {
    company: "Devsarch",
    role: "Software Engineer",
    period: "2023 — 2026",
    mode: "Remote",
    summary:
      "Full-stack engineering across web and mobile products — building the interfaces, the services behind them and the databases underneath, then keeping the result production-ready.",
    highlights: [
      "Designed and developed scalable web and mobile applications using JavaScript, TypeScript, React.js, Next.js and Tailwind CSS.",
      "Built robust backend services and RESTful APIs using Node.js, NestJS and Express.js.",
      "Designed and managed databases using Prisma, PostgreSQL, MongoDB and MySQL.",
      "Implemented authentication, third-party integrations, reusable components and scalable application architecture.",
      "Optimized application performance, resolved complex technical issues and maintained high-quality, production-ready code.",
      "Worked with Docker, Redis, Google Cloud Platform and Vercel for development, deployment and infrastructure.",
      "Used Git, GitHub, Postman and VS Code for version control, API testing, collaboration and development.",
    ],
    stack: [
      "TypeScript",
      "React.js",
      "Next.js",
      "Node.js",
      "NestJS",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Docker",
      "Redis",
      "Google Cloud",
    ],
  },
];

export type Credential = {
  qualification: string;
  institution: string;
  kind: "education" | "certification";
};

export const education: Credential[] = [
  {
    qualification: "Bachelor of Software Engineering",
    institution: "Virtual University of Pakistan",
    kind: "education",
  },
  {
    qualification: "ICS (Computer Science)",
    institution: "KIPS College",
    kind: "education",
  },
];

export const certifications: Credential[] = [
  {
    qualification: "Full Stack Web Development",
    institution: "IDEO College of Technology",
    kind: "certification",
  },
  {
    qualification: "CCNAv7: Introduction to Networks",
    institution: "Cisco Networking Academy",
    kind: "certification",
  },
];
