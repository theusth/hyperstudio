import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { resolveIcon } from "@/lib/icon-map";

export type TechnologyGroup = {
  category: string;
  technologies: { id: string; name: string; icon: string | null }[];
};

export function Technologies({ groups }: { groups: TechnologyGroup[] }) {
  if (groups.length === 0) return null;

  return (
    <section className="relative py-24 sm:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Tecnologias"
          title="Tecnologias que podem dar vida ao seu projeto"
          description="Selecionamos a stack ideal conforme a necessidade de cada projeto — nem todo projeto utiliza todas elas."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {groups.map((group, groupIndex) => (
            <Reveal key={group.category} delay={groupIndex * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.technologies.map((item) => {
                    const Icon = resolveIcon(item.icon);
                    return (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-zinc-200 transition-colors hover:border-violet-400/30 hover:text-white"
                      >
                        <Icon className="h-3.5 w-3.5 text-violet-400" />
                        {item.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
