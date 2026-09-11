import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="servicos" className="relative py-24 sm:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Serviços"
          title="Soluções digitais sob medida para o seu negócio"
          description="Do primeiro site ao sistema mais robusto, desenvolvemos exatamente o que a sua empresa precisa para crescer."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={(index % 4) * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.04]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/0 blur-2xl transition-all duration-500 group-hover:bg-violet-500/20"
                />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-blue-500/15 text-violet-300 transition-colors duration-300 group-hover:text-violet-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-5 font-display text-base font-semibold text-white">
                  {title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-zinc-400">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
