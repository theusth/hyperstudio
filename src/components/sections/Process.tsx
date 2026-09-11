import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <section id="processo" className="relative py-24 sm:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Processo"
          title="Um processo claro, do briefing à entrega"
          description="Metodologia estruturada para garantir qualidade, previsibilidade e um resultado alinhado com o seu negócio."
        />

        <div className="relative grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <div
            aria-hidden
            className="absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
          />
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={(index % 3) * 0.08}>
              <div className="relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <span className="font-display text-3xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)]">
                  {step.number}
                </span>
                <h3 className="font-display text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
