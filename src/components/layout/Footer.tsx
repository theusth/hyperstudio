import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { NAV_LINKS, WHATSAPP_DISPLAY, buildWhatsAppLink } from "@/lib/constants";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/40">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1fr]">
        <div className="flex flex-col gap-4">
          <a href="#inicio" className="flex items-center gap-2 w-fit">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white">
              H
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              HYPER<span className="text-zinc-400"> STUDIO</span>
            </span>
          </a>
          <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
            Agência de desenvolvimento digital especializada em sites, sistemas
            e soluções sob medida para empresas que querem crescer.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
            Links rápidos
          </h4>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="w-fit text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
            Serviços
          </h4>
          {services.slice(0, 6).map((service) => (
            <a
              key={service.title}
              href="#servicos"
              className="w-fit text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {service.title}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
            Projetos
          </h4>
          {projects.map((project) => (
            <a
              key={project.id}
              href="#projetos"
              className="w-fit text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {project.name}
            </a>
          ))}

          <h4 className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
            Contato
          </h4>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            {WHATSAPP_DISPLAY}
          </a>
        </div>
      </Container>

      <div className="border-t border-white/5 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-zinc-500 sm:flex-row">
          <p>© {currentYear} Hyper Studio. Todos os direitos reservados.</p>
          <p>Desenvolvimento digital sob medida.</p>
        </Container>
      </div>
    </footer>
  );
}
