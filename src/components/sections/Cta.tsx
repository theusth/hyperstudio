import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { GlowBackground } from "@/components/ui/GlowBackground";

export function Cta({ whatsappLink, companyName }: { whatsappLink: string; companyName: string }) {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent px-6 py-16 text-center sm:px-12 sm:py-24">
            <GlowBackground />
            <h2 className="text-balance mx-auto max-w-3xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Seu próximo projeto começa aqui.
            </h2>
            <p className="text-pretty mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Conte sua ideia para a {companyName} e descubra como podemos
              transformar ela em uma experiência digital profissional.
            </p>
            <div className="mt-10 flex justify-center">
              <ButtonLink href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Falar com a {companyName}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
