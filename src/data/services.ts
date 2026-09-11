import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Rocket,
  ShoppingCart,
  LayoutDashboard,
  Users,
  Workflow,
  Plug,
  MonitorSmartphone,
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    icon: Globe,
    title: "Sites Institucionais",
    description:
      "Presença digital sólida e profissional, transmitindo credibilidade e autoridade para o seu negócio.",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description:
      "Páginas de alta conversão, criadas para captar leads e transformar visitantes em clientes.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Lojas virtuais completas, rápidas e seguras, preparadas para vender todos os dias.",
  },
  {
    icon: MonitorSmartphone,
    title: "Sistemas Web",
    description:
      "Aplicações sob medida para automatizar processos e resolver as necessidades reais do seu negócio.",
  },
  {
    icon: LayoutDashboard,
    title: "Painéis Administrativos",
    description:
      "Dashboards intuitivos para gerenciar dados, conteúdos e operações com total controle.",
  },
  {
    icon: Users,
    title: "CRM",
    description:
      "Ferramentas personalizadas para organizar contatos, funis de vendas e relacionamento com clientes.",
  },
  {
    icon: Workflow,
    title: "Automações",
    description:
      "Fluxos automatizados que eliminam tarefas repetitivas e aumentam a eficiência da operação.",
  },
  {
    icon: Plug,
    title: "Integrações / API",
    description:
      "Conexão entre sistemas, plataformas e serviços para que tudo funcione de forma integrada.",
  },
];
