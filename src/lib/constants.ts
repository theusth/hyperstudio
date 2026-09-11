export const SITE_NAME = "Hyper Studio";

export const SITE_URL = "https://hyperstudio.com.br";

export const SITE_DESCRIPTION =
  "A Hyper Studio é uma agência de desenvolvimento digital especializada em sites modernos, sistemas web, e-commerce, painéis administrativos, automações e soluções digitais personalizadas.";

export const WHATSAPP_NUMBER = "5535984057883";

export const WHATSAPP_DISPLAY = "+55 35 98405-7883";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Conheci a Hyper Studio e gostaria de solicitar um orçamento para um projeto.";

export function buildWhatsAppLink(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
] as const;
