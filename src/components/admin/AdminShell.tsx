"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  Code2,
  MessageSquareQuote,
  Layers,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { logoutAction } from "@/server/actions/auth";
import type { Role } from "@/generated/prisma/client";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  adminOnly?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projetos", label: "Projetos", icon: FolderKanban },
  { href: "/admin/hero", label: "Hero do site", icon: Layers },
  { href: "/admin/servicos", label: "Serviços", icon: Sparkles },
  { href: "/admin/tecnologias", label: "Tecnologias", icon: Code2 },
  { href: "/admin/depoimentos", label: "Depoimentos", icon: MessageSquareQuote },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/usuarios", label: "Usuários", icon: Users, adminOnly: true },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings, adminOnly: true },
];

export function AdminShell({
  user,
  children,
}: {
  user: { name: string; email: string; role: Role };
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = NAV_ITEMS.filter((item) => !item.adminOnly || user.role === "ADMIN");

  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100">
      <div className="flex">
        <aside
          className={clsx(
            "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-black/60 backdrop-blur-xl transition-transform lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white">
              H
            </span>
            <span className="font-display text-base font-semibold tracking-tight text-white">
              HYPER<span className="text-zinc-500"> ADMIN</span>
            </span>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {items.map((item) => {
              const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-gradient-to-r from-violet-500/20 to-blue-500/10 text-white"
                      : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-zinc-400 hover:bg-white/[0.05] hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Ver site público
            </a>
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-xs font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-white">{user.name}</p>
                <p className="truncate text-[11px] text-zinc-500">
                  {user.role === "ADMIN" ? "Administrador" : "Editor"}
                </p>
              </div>
              <form action={logoutAction}>
                <button
                  type="submit"
                  aria-label="Sair"
                  className="text-zinc-500 hover:text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}

        <div className="flex min-h-screen w-full flex-1 flex-col lg:pl-72">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-black/40 px-4 backdrop-blur-xl sm:px-6 lg:hidden">
            <span className="font-display text-sm font-semibold text-white">HYPER ADMIN</span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
