import { ProjectCard } from "@/components/sections/project/ProjectCard";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section
      data-cv="projects"
      aria-labelledby="projects-heading"
      className="relative px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          index="05"
          eyebrow="Selected work"
          title={
            <span id="projects-heading">
              Other platforms I&apos;ve{" "}
              <span className="text-gradient">helped build</span>
            </span>
          }
          description="Product work across social media analytics and creator platforms — backend APIs, third-party integrations and the responsive interfaces on top of them."
        />

        <ul className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-2 lg:gap-6">
          {projects.map((project, index) => (
            <li key={project.name}>
              <Reveal direction="up" delay={index * 0.1} className="h-full" scale soft>
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
