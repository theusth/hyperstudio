import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Gauge,
  Smartphone,
  ShieldCheck,
  Search,
  LayoutDashboard,
  Plug,
  Heart,
} from "lucide-react";

export type Differentiator = {
  icon: LucideIcon;
  title: string;
};

export const differentiators: Differentiator[] = [
  { icon: Sparkles, title: "Design exclusivo" },
  { icon: Gauge, title: "Performance" },
  { icon: Smartphone, title: "Responsividade" },
  { icon: ShieldCheck, title: "Segurança" },
  { icon: Search, title: "SEO" },
  { icon: LayoutDashboard, title: "Painéis administrativos" },
  { icon: Plug, title: "Integrações" },
  { icon: Heart, title: "Experiência do usuário" },
];
