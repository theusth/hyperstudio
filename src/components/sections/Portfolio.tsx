import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectMockup } from "@/components/ui/ProjectMockup";
import { buildWhatsAppLinkFor } from "@/lib/data";

export type PortfolioProject = {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  coverImage: string | null;
  projectUrl: string | null;
  technologies: string;
};

export function Portfolio({
  projects,
  whatsapp,
}: {
  projects: PortfolioProject[];
  whatsapp: string;
}) {
  if (projects.length === 0) return null;

  return (
    <section id="projetos" className="relative py-24 sm:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Projetos"
          title="Projetos que representam o nível da Hyper Studio"
          description="Uma seleção dos produtos digitais que desenvolvemos, unindo design, tecnologia e propósito de negócio."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {projects.map((project, index) => {
            const technologies = project.technologies
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean);

            return (
              <Reveal key={project.id} delay={(index % 3) * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30">
                  {project.coverImage ? (
                    <div className="aspect-[16/11] w-full overflow-hidden rounded-2xl border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.coverImage}
                        alt={project.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <ProjectMockup label={project.category} />
                  )}

                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <span className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-violet-300/90">
                      {project.category}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {project.name}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-zinc-400">
                      {project.shortDescription}
                    </p>

                    {technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-zinc-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-3">
                      {project.projectUrl ? (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-violet-300"
                        >
                          Ver projeto
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : (
                        <a
                          href={buildWhatsAppLinkFor(
                            whatsapp,
                            `Olá! Vi o projeto ${project.name} no site e gostaria de saber mais.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-violet-300"
                        >
                          Falar sobre este projeto
                          <MessageCircle className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
