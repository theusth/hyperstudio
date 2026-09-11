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
  Sparkles,
  Gauge,
  Smartphone,
  ShieldCheck,
  Search,
  Heart,
  Code2,
  Server,
  Database,
  Cloud,
  Layers,
  Palette,
  MessageCircle,
  BarChart3,
  Lock,
  Zap,
  Settings,
  CreditCard,
  Mail,
  Star,
  Briefcase,
  FileText,
  Boxes,
} from "lucide-react";

export const ICON_LIBRARY = {
  Globe,
  Rocket,
  ShoppingCart,
  LayoutDashboard,
  Users,
  Workflow,
  Plug,
  MonitorSmartphone,
  Sparkles,
  Gauge,
  Smartphone,
  ShieldCheck,
  Search,
  Heart,
  Code2,
  Server,
  Database,
  Cloud,
  Layers,
  Palette,
  MessageCircle,
  BarChart3,
  Lock,
  Zap,
  Settings,
  CreditCard,
  Mail,
  Star,
  Briefcase,
  FileText,
  Boxes,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICON_LIBRARY;

export const ICON_NAMES = Object.keys(ICON_LIBRARY) as IconName[];

export function resolveIcon(name: string | null | undefined): LucideIcon {
  if (name && name in ICON_LIBRARY) {
    return ICON_LIBRARY[name as IconName];
  }
  return Code2;
}
