import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { differentiators } from "@/data/differentiators";

export function Differentiators() {
  return (
    <section className="relative py-24 sm:py-32">
      <GlowBackground className="opacity-60" />
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Diferencial"
          title="Não criamos apenas sites. Criamos ferramentas para negócios."
          description="Cada projeto é pensado para ir além da estética: unimos tecnologia e estratégia para gerar resultado real."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {differentiators.map(({ icon: Icon, title }, index) => (
            <Reveal key={title} delay={(index % 4) * 0.06}>
              <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-8 text-center transition-colors duration-300 hover:border-violet-400/30 hover:bg-white/[0.04]">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-violet-500/15 to-blue-500/15 text-violet-300">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-zinc-200">{title}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
