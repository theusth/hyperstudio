import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="sobre" className="relative py-24 sm:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-violet-300/90">
            Sobre a Hyper Studio
          </span>
          <h2 className="mt-6 text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Design, tecnologia e estratégia em uma só direção.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col gap-6 text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
            <p>
              Somos uma empresa focada em transformar ideias em produtos digitais
              modernos, funcionais e preparados para gerar resultados.
            </p>
            <p>
              Unimos design, tecnologia e estratégia para criar experiências
              digitais que representam o nível de cada negócio.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
