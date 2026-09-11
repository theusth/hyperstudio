export type ProjectMockup = "ecommerce" | "leads" | "juridico";

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  mockup: ProjectMockup;
  technologies?: string[];
  link?: string;
};

// Para adicionar um novo projeto, basta incluir um novo objeto neste array.
export const projects: Project[] = [
  {
    id: "sl-imports",
    name: "SL Imports",
    category: "E-commerce",
    description:
      "E-commerce premium para venda de iPhones, seminovos, acessórios e captação de clientes pelo WhatsApp.",
    mockup: "ecommerce",
  },
  {
    id: "reve-dpvat-prev",
    name: "Revê DPVAT Prev",
    category: "Institucional & Captação de Leads",
    description:
      "Plataforma digital com site institucional, captação de leads, WhatsApp e painel administrativo.",
    mockup: "leads",
  },
  {
    id: "site-juridico",
    name: "Site Jurídico",
    category: "Jurídico",
    description:
      "Experiência digital premium para escritório/empresa jurídica, com foco em credibilidade e geração de contatos.",
    mockup: "juridico",
  },
];
